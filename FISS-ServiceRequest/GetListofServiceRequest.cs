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
using System.Text.Json;
using System.Collections.Generic;

namespace FISS_ServiceRequest
{
    public class GetListofServiceRequest
    {
        private readonly WorkFlowCalls _workFlowCalls;
        public GetListofServiceRequest(WorkFlowCalls workFlowCalls)
        {
            _workFlowCalls = workFlowCalls;
        }
        [FunctionName(nameof(GetListServiceRequests))]
        public IActionResult GetListServiceRequests(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            string role = req.Query["role"];
            int userId = Convert.ToInt32(req.Query["userId"]);
            log.LogInformation("Get List of Services API is triggerd");
            try
            {
                var listOfservice = _workFlowCalls.GetListServiceRequests(role, userId);

                return new OkObjectResult(listOfservice);

            }
            catch (Exception ex)
            {
                log.LogError(ex.Message);
                return new OkObjectResult(ex.Message);
            }
        }

        [FunctionName(nameof(GetServiceRequests))]
        public IActionResult GetServiceRequests(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            string serReqId = req.Query["srId"];
            log.LogInformation("Get Service Request for selected Id API is triggerd");
            try
            {
                var listOfservice = _workFlowCalls.GetServiceRequest(serReqId);
                //dynamic PayLoad = JsonConvert.DeserializeObject<dynamic>(listOfservice.TransactionPayload);
                //listOfservice.TransPayload = PayLoad;
                return new OkObjectResult(listOfservice);

            }
            catch (Exception ex)
            {
                log.LogError(ex.Message);
                return new OkObjectResult(ex.Message);
            }
        }
    
    }
}
