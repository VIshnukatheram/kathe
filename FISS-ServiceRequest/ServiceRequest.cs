using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using FISS_ServiceRequest.Models.DB;
using FISS_ServiceRequest.Models.Shared;
using FISS_ServiceRequest.Services;
using FISS_ServiceRequest.Models.Request;
using System.Collections.Generic;
using System.Transactions;

namespace FISS_ServiceRequest
{
    public class ServiceRequest
    {
        private readonly WorkFlowCalls _workFlowCalls;
        public ServiceRequest(WorkFlowCalls workFlowCalls)
        {
            _workFlowCalls = workFlowCalls;
        }

        [FunctionName(nameof(CreateServiceRequest))]
        public async Task<IActionResult> CreateServiceRequest(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Service Request Method is Triggered");
            string requestBody = "";

            try
            {   
                requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var reqBody = JsonConvert.DeserializeObject<ServiceRequestPayload>(requestBody);
                log.LogInformation("Payload Deserialzed Completed Successfully");

                #region Service Request Service
                var sampleRequest = _workFlowCalls.CreateServiceRequest(reqBody);
                var uniquServiceRequest = sampleRequest.SrvReqRefNo;
                #endregion

                #region Communication Service
                // Communictation Service API
                List<CommunicationRequest> communicationRequest = reqBody.CommunicationRequest;
                foreach (var comm in communicationRequest)
                {
                    var template = _workFlowCalls.GetTemplateId(999, 999, comm.CommType, TicketStatus.OPEN.ToString());
                    string category = "Mobile Number Update";// ((CategoryStatus)reqBody.Category).ToString();
                    object tempContent = JsonConvert.DeserializeObject(template.MailContent) ?? "";
                    
                    //string templateUpdated = string.Format(tempContent.ToString(), category, uniquServiceRequest, template.TAT+" days", DateTime.Now.ToString("dddd, dd MMMM yyyy"));
                    string templateUpdated = "";
                    if (comm.CommType == 1)
                    {
                        templateUpdated = string.Format(tempContent.ToString(), uniquServiceRequest, category, reqBody.PolicyNo, template.TAT + " days");
                    }
                    else if (comm.CommType == 2)
                    {
                        templateUpdated = string.Format(tempContent.ToString(), category, uniquServiceRequest, template.TAT + " days", DateTime.Now.ToString("dddd, dd MMMM yyyy"));
                    }
                    comm.SrvReqRefNo = uniquServiceRequest;
                    comm.CommBody = templateUpdated;
                    comm.TemplateID = template.TemplateID.ToString();
                }
                await _workFlowCalls.CommunicationCall(communicationRequest);


                #endregion

                // De-Deplicate
                bool deDeplicate = _workFlowCalls.DeDuplicate(reqBody.TransactionData.NewMobileNo.ToString());

                if(deDeplicate)
                {
                    _workFlowCalls.AssignTo(uniquServiceRequest);

                } 
                else
                {
                    var contactResponse = await _workFlowCalls.LAContactUpdate(reqBody.TransactionData.NewMobileNo.ToString(),reqBody.TransactionData.ClientId);
                    if (contactResponse.ResponseOutput.ResponseHeader.IsSuccess == true)
                    {
                        _workFlowCalls.UpdateStatus(uniquServiceRequest, TicketStatus.CLOSED.ToString());
                        
                        List<CommunicationRequest> communication = reqBody.CommunicationRequest;
                        foreach (var comm in communicationRequest)
                        {
                            var template = _workFlowCalls.GetTemplateId(999, 999, comm.CommType, TicketStatus.CLOSED.ToString());
                            string category = "Contact Number Update";//((CategoryStatus)reqBody.Category).ToString();

                            object tempContent = JsonConvert.DeserializeObject(template.MailContent) ?? "";
                            //string templateUpdated = string.Format(tempContent.ToString(), category, reqBody.TransactionData.ExistingMobileNo, reqBody.TransactionData.NewMobileNo);
                            string templateUpdated = "";
                            if (comm.CommType == 1)
                            {
                                templateUpdated = string.Format(tempContent.ToString(), uniquServiceRequest, reqBody.PolicyNo, reqBody.ProposerName);
                            }
                            else if (comm.CommType == 2)
                            {
                                templateUpdated = string.Format(tempContent.ToString(), category, reqBody.TransactionData.ExistingMobileNo, reqBody.TransactionData.NewMobileNo);
                            }
                            comm.SrvReqRefNo = uniquServiceRequest;
                            comm.CommBody = templateUpdated;
                            comm.TemplateID = template.TemplateID.ToString();
                        }
                        await _workFlowCalls.CommunicationCall(communication);
                    }
                    else
                    {
                        log.LogInformation("Failed To Update Life Asia API. Assigned Service Reqeust to POS");
                        _workFlowCalls.AssignTo(uniquServiceRequest);
                    }
                }
                
                return new OkObjectResult(sampleRequest);

            } catch (Exception ex)
            {
                log.LogError(ex.Message);
                log.LogInformation(requestBody);
                return new OkObjectResult(ex.Message);
            }
        }
    }
}
