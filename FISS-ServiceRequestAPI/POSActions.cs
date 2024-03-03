using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using FISS_ServiceRequestAPI.Models.DB;
using FISS_ServiceRequestAPI.Models.Request;
using FISS_ServiceRequestAPI.Services;

namespace FISS_ServiceRequestAPI
{
    public class POSActions
    {
        private readonly WorkFlowCalls _workFlowCalls;
        public POSActions(WorkFlowCalls workFlowCalls)
        {
            _workFlowCalls = workFlowCalls;
        }
        [FunctionName(nameof(POSActionsOnServReq))]
        public async Task<IActionResult> POSActionsOnServReq(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("POS Actions API Triggered");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var data = JsonConvert.DeserializeObject<POSPayload>(requestBody);

            var serviceRequest = _workFlowCalls.GetServiceRequest(data.SrvReqRefNo);

            if(serviceRequest == null)
            {
                return new OkObjectResult("Invalid Service Request Ref No " + data.SrvReqRefNo);
            }
            var tranData = _workFlowCalls.POSActions(data, serviceRequest);

            log.LogInformation("Contact Number Update Workflow For POS app Triggered");

            POSWorkFlowPayload pOSWorkFlowPayload = new()
            {
                CommunicationRequest = serviceRequest.CommunicationPayload,
                POSActions = tranData,
                RequestType = serviceRequest.CallType+"_"+serviceRequest.SubType+"_Update"
            };
            if(data.Status == "INTERNAL")
            {
                _workFlowCalls.AssignToBOEInternal(serviceRequest.SrvReqID);
            }
            else
            {
                // Surrender and Loan
                if ((serviceRequest.CallType == 8 && serviceRequest.SubType == 1) || (serviceRequest.CallType == 9 && serviceRequest.SubType == 1) || (serviceRequest.CallType == 11 && serviceRequest.SubType == 1) || (serviceRequest.CallType == 12 && serviceRequest.SubType == 1))
                {
                    pOSWorkFlowPayload.RequestType = serviceRequest.CallType.ToString();
                    await _workFlowCalls.SurrenderWorkFlowCallForRequest(pOSWorkFlowPayload);
                }
                else if (serviceRequest.CallType == 25)
                {
                    pOSWorkFlowPayload.RequestType = serviceRequest.CallType.ToString();
                    await _workFlowCalls.PaymentReprocessingWorkFlowCallForRequest(pOSWorkFlowPayload);
                }
                else
                {
                    await _workFlowCalls.ContactTypeWorkFlowCallForPOS(pOSWorkFlowPayload);
                }
            }
         
            log.LogInformation("Contact Number Update WorkFlow  For POS App Ended");
            string status = "";
            if(data.Status== "APPROVED")
            {
                status = "Service Request Approved";
            }
            else if(data.Status == "INTERNAL")
            {
                status = "Service Request Intenally Send Back";
            }
            else
            {
                status = "Service Request Rejected";
            }
            tranData.Message = status + " Successfully";
            //_workFlowCalls.GetSubTypeName(serviceRequest.CallType,serviceRequest.SubType)+" "+ status + " Successfully";

            return new OkObjectResult(tranData);
        }
    }
}
