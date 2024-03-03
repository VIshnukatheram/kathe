using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using FISS_ServiceRequest.Services;
using FISS_ServiceRequest.Models.Request;
using FISS_ServiceRequest.Models.Shared;
using System.Collections.Generic;
using System.Transactions;
using FISS_ServiceRequest.Models.DB;
using System.Linq;
using Newtonsoft.Json.Linq;

namespace FISS_ServiceRequest
{
    public class POSActions
    {
        private readonly WorkFlowCalls _workFlowCalls;
        public readonly FGDBContext _FGdbContext;
        public POSActions(WorkFlowCalls workFlowCalls, FGDBContext fGdbContext)
        {
            _workFlowCalls = workFlowCalls;
            _FGdbContext = fGdbContext;
        }
        [FunctionName(nameof(POSActionsOnServReq))]
        public async Task<IActionResult> POSActionsOnServReq(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");


            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var data = JsonConvert.DeserializeObject<POSPayload>(requestBody);

            var serviceRequest = _workFlowCalls.GetServiceRequest(data.SrvReqRefNo);

            var communicationRequest = JsonConvert.DeserializeObject<List<CommunicationRequest>>(serviceRequest.CommunicationPayload);
            if(data.Status == "APPROVED")
            {
                //var transaction = JsonConvert.DeserializeObject<TransactionData>(serviceRequest.TransactionPayload);
                var transection = _workFlowCalls.GetTransactionData((int)serviceRequest.SrvReqID);
                string mobileNEW= transection.Where(x => x.TagName == "Mobile_New").First().TagValue;
                string mobileOLD = transection.Where(x => x.TagName == "Mobile_Old").First().TagValue;
                string clientID = transection.Where(x => x.TagName == "Client_Id").First().TagValue;
                var contactResponse = await _workFlowCalls.LAContactUpdate(mobileNEW, clientID);
                if (contactResponse.ResponseOutput.ResponseHeader.IsSuccess == true)
                {
                    _workFlowCalls.UpdateStatus(serviceRequest.SrvReqRefNo, TicketStatus.CLOSED.ToString());
                }
                else
                {
                    log.LogInformation("Failed To Update Life Asia API. Assigned Service Reqeust to POS");
                    //return new OkObjectResult(contactResponse.ResponseOutput.ResponseHeader.Message);

                }
                foreach (var comm in communicationRequest)
                {
                    var template = _workFlowCalls.GetTemplateId(999, 999, comm.CommType, TicketStatus.CLOSED.ToString());
                    string category = "Mobile Number Update";//((CategoryStatus)serviceRequest.Category).ToString();

                    object tempContent = JsonConvert.DeserializeObject(template.MailContent) ?? "";
                    string templateUpdated = "";
                    if (comm.CommType == 1)
                    {
                        templateUpdated = string.Format(tempContent.ToString(), category, mobileOLD, mobileNEW);
                    } else if(comm.CommType == 2)
                    {
                        templateUpdated = string.Format(tempContent.ToString(), category, mobileOLD, mobileNEW);
                    }

                    comm.SrvReqRefNo = serviceRequest.SrvReqRefNo;
                    comm.CommBody = templateUpdated;
                    comm.TemplateID = template.TemplateID.ToString();
                }
                await _workFlowCalls.CommunicationCall(communicationRequest);
            } else if(data.Status == "REJECTED")
            {
                _workFlowCalls.UpdateStatus(serviceRequest.SrvReqRefNo, TicketStatus.REJECT.ToString());
                foreach (var comm in communicationRequest)
                {
                    var template = _workFlowCalls.GetTemplateId(999, 999, comm.CommType, TicketStatus.REJECT.ToString());
                    string category = "Mobile Number Update";//((CategoryStatus)serviceRequest.Category).ToString();

                    object tempContent = JsonConvert.DeserializeObject(template.MailContent) ?? "";
                    //string templateUpdated = string.Format(tempContent.ToString(), category, serviceRequest.SrvReqRefNo, data.RequirementComments , serviceRequest.CreatedOn.ToString("dddd, dd MMMM yyyy"));
                    string templateUpdated = "";
                    if (comm.CommType == 1)
                    {
                        string value = ReasonsList(data.RequirementList);
                        templateUpdated = string.Format(tempContent.ToString(), serviceRequest.ProposerName, serviceRequest.SrvReqRefNo, value.ToString());
                    }
                    else if (comm.CommType == 2)
                    {
                        string value = ReasonsList(data.RequirementList);
                        templateUpdated = string.Format(tempContent.ToString(), category, serviceRequest.SrvReqRefNo,value.ToString(), serviceRequest.CreatedOn.ToString("dddd, dd MMMM yyyy"));
                    }
                    comm.SrvReqRefNo = serviceRequest.SrvReqRefNo;
                    comm.CommBody = templateUpdated;
                    comm.TemplateID = template.TemplateID.ToString();
                }
                await _workFlowCalls.CommunicationCall(communicationRequest);
            } else
            {
                log.LogInformation("Status Code is Wrong");
                return new OkObjectResult("Please Give Valid Status codes");
            }
            var tranData = _workFlowCalls.POSActions(data);

            return new OkObjectResult(tranData);
        }

        [FunctionName(nameof(GetRaiseRequirements))]
        public IActionResult GetRaiseRequirements(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            try
            {
                int callType = Int32.Parse(req.Query["calltype"]);
                int subType = Int32.Parse(req.Query["subtype"]);

                var listofRequirements = _workFlowCalls.GetRaiseRequirement(callType, subType);
                return new OkObjectResult(listofRequirements);
            }
            catch (Exception ex)
            {
                return new OkObjectResult(ex.Message);
            }

        }
        public string ReasonsList(List<int> req)
        {
            string value = "";

            Dictionary<int, string> documents = new Dictionary<int, string>();
            int i = 0;
            foreach (var fg in req)
            {               
                var result = _FGdbContext.AppMasters
                    .Where(events => events.MstID == fg && events.MstCategory == "RAISE_REQMNT")
                    .Select(events => new { events.MstID, events.MstDesc })  // Adjust the property name accordingly
                    .FirstOrDefault();

                if (result != null)
                {
                    i += 1;
                    documents.Add(Convert.ToInt32(result.MstID), result.MstDesc);
                    value += "" +i+ ". " + result.MstDesc + ".<br>";
                }

            }
            return value;
        }
    }
}
