using FG_STModels.Models.FISS;
using FG_STModels.Models.Shared;
using FISS_ServiceRequestAPI.Models.Request;
using FISS_ServiceRequestAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace FISS_ServiceRequestAPI
{
    public class ServiceRequestAPI
    {
        private readonly WorkFlowCalls _workFlowCalls;
        private WorkFlowConfigs _WorkFlowConfigs;// = JsonConvert.DeserializeObject<WorkFlowConfigs>(File.ReadAllText("C:/Navin/Nichebit/Future/FISS-Code-Dev/navinkondayur/FISS-Code/FISS-ServiceRequestAPI/Config/WorkFlowConfig.json"));
        public ServiceRequestAPI(WorkFlowCalls workFlowCalls)
        {
            _workFlowCalls = workFlowCalls;
        }

        [FunctionName(nameof(CreateServiceRequest))]
        public async Task<IActionResult> CreateServiceRequest(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log,
            ExecutionContext executionContext)
        {
            log.LogInformation("Service Request Method is Triggered");
            string requestBody = "";
            try
            {
                requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var reqBody = JsonConvert.DeserializeObject<ServiceRequestPayload>(requestBody);
                log.LogInformation("Payload Deserialzed Completed Successfully");
                ServiceRequest sampleRequest = null;
                if (reqBody.SrvReqID == 0)
                {
                    sampleRequest = _workFlowCalls.CreateServiceRequest(reqBody);
                }
                else
                {
                     sampleRequest = _workFlowCalls.UpdateServiceRequest(reqBody);
                }

                // Creating Another Service Request For payment assisance
                //if (reqBody.CallType == 1 && reqBody.SubType == 1 && reqBody.Category == RequestCategory.Request)
                //{
                //    var PaymentAssistanceSerReq = _workFlowCalls.CreateServiceRequest(reqBody);
                //    _workFlowCalls.AssignToPaymentAssistance(PaymentAssistanceSerReq);
                //}
                if (reqBody.Category == RequestCategory.Request)
                {
                    log.LogInformation("Contact Number Update Workflow app Triggered");
                    if (reqBody.CallType == 2 || (reqBody.CallType == 11 && reqBody.SubType == 2) )
                    {
                        await _workFlowCalls.GenericSerReqQuery(sampleRequest);
                    }
                    else
                    {
                        await _workFlowCalls.ContactTypeWorkFlowCallForBOE(sampleRequest);
                    }

                    log.LogInformation("Contact Number Update WorkFlow App Ended");
                }
                else if (reqBody.CallType == 1 || (reqBody.CallType == 14 && reqBody.SubType == 7))
                {
                    log.LogInformation("Fetch Life Aisa API Workflow app Triggered");

                    // Customer FreeLook Process
                    await _workFlowCalls.GenericSerReqQuery(sampleRequest);

                    log.LogInformation("Fetch Life Aisa API WorkFlow App Ended");
                }
                // Surrender Enquiry
                else if (reqBody.CallType == 9 && (reqBody.SubType == 2 || reqBody.SubType == 3))
                {
                    log.LogInformation("Surrender Workflow app Triggered");

                    if (reqBody.SubType == 2 && reqBody.TransactionData.Where(x => x.TagName == "CustomerRetained").FirstOrDefault()?.TagValue.ToUpper() == "YES")
                    {
                        // Customer Retained
                    }
                    else
                    {
                        await _workFlowCalls.SurrenderWorkFlowCallForQuery(sampleRequest);
                    }

                    log.LogInformation("Surrender WorkFlow App Ended");
                }
                // Loan Enquiry
                else if (reqBody.CallType == 11 && reqBody.SubType == 2)
                {
                    log.LogInformation("Loan Workflow app Triggered");

                    if (reqBody.TransactionData.Where(x => x.TagName == "EnquiryType").FirstOrDefault()?.TagValue == "ShareProcess")
                    {
                        // Customer Load Process
                        await _workFlowCalls.SurrenderWorkFlowCallForQuery(sampleRequest);
                    }

                    log.LogInformation("Loan WorkFlow App Ended");
                }
                else if (reqBody.CallType == 12 && reqBody.SubType == 2)
                {
                    log.LogInformation("FreeLook Workflow app Triggered");

                    // Customer FreeLook Process
                    await _workFlowCalls.SurrenderWorkFlowCallForQuery(sampleRequest);

                    log.LogInformation("FreeLook WorkFlow App Ended");
                }
                else if (reqBody.CallType == 20 || reqBody.CallType == 6 || reqBody.CallType == 12 || reqBody.CallType == 13 || reqBody.CallType==10 || reqBody.CallType == 17 || reqBody.CallType == 27 || reqBody.CallType == 18 ||reqBody.CallType==19 )
                {
                    log.LogInformation("Process Enquiry Workflow app Triggered");

                    // Customer FreeLook Process
                    await _workFlowCalls.SurrenderWorkFlowCallForQuery(sampleRequest);

                    log.LogInformation("Process Enquiry WorkFlow App Ended");
                    log.LogInformation("Process Enquiry WorkFlow App Ended");
                }
                else {
                    try
                    {
                        _WorkFlowConfigs = new WorkFlowConfigs();
                        _WorkFlowConfigs.LoadConfig(executionContext.FunctionAppDirectory);
                        string WorkFlowName = _WorkFlowConfigs.WorkFlowConfig.Where(x => x.Call_Typ == reqBody.CallType && x.Sub_Typ == reqBody.SubType).FirstOrDefault()?.WorkFlowName;

                        if (!string.IsNullOrEmpty(WorkFlowName))
                        {
                            switch (WorkFlowName.ToUpper())
                            {
                                case "RAISECLOSEFLOW":
                                    await _workFlowCalls.RaiseCloseFlow(sampleRequest);
                                    break;
                                case "PARTIALWITHDRAWALENQUIRY":
                                    await _workFlowCalls.SurrenderWorkFlowCallForQuery(sampleRequest);
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                    catch (ArgumentNullException)
                    {
                    }
                }
                return new OkObjectResult(sampleRequest);

            }
            catch (Exception ex)
            {
                log.LogError(ex.Message);
                log.LogInformation(requestBody);
                return new OkObjectResult(ex.Message);
            }
        }
    }
}