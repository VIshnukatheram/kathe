
    using FISS_CommonServiceAPI.Services;
    using global::FISS_CommonServiceAPI.Services;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Azure.WebJobs;
    using Microsoft.Azure.WebJobs.Extensions.Http;
    using Microsoft.Extensions.Logging;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    namespace FISS_CommonServiceAPI
    {
    public class GetSerReqCount
    {
            private readonly WorkFlowCalls _workFlowCalls;
            public GetSerReqCount(WorkFlowCalls workFlowCalls)
            {
                _workFlowCalls = workFlowCalls;
            }

            [FunctionName(nameof(GetServiceRequestCount))]
            public IActionResult GetServiceRequestCount(
                [HttpTrigger(AuthorizationLevel.Function, "Get", Route = null)] HttpRequest req,
                ILogger log)
            {
                try
                {
                    string policyNo = req.Query["PolicyNo"];
                    string callType = req.Query["callType"];
                    string subType = req.Query["subType"];
                    var count = _workFlowCalls.serviceRequestCount(policyNo,Convert.ToInt32(callType),Convert.ToInt32(subType));
                    return new OkObjectResult(count);
                }
                catch (Exception ex)
                {
                    log.LogError($"An error occurred: {ex.Message}");
                    return new StatusCodeResult(500); // Internal Server Error
                }
            }

        [FunctionName(nameof(PaymentReprocessing))]
        public IActionResult PaymentReprocessing(
                [HttpTrigger(AuthorizationLevel.Function, "Get", Route = null)] HttpRequest req,
                ILogger log)
        {
            try
            {
                string policyNo = req.Query["PolicyNo"];
                string callType = req.Query["callType"];
                string subType = req.Query["subType"];
                if(subType=="7")
                {
                    callType = "9";
                    subType = "1";
                }
                else if(subType == "10")
                {
                    callType = "11";
                    subType = "1";
                }
                else if (subType == "11")
                {
                    callType = "8";
                    subType = "1";
                }
                var count = _workFlowCalls.GetSerReqByPolicy(policyNo, Convert.ToInt32(callType), Convert.ToInt32(subType));
                return new OkObjectResult(count);
            }
            catch (Exception ex)
            {
                log.LogError($"An error occurred: {ex.Message}");
                return new StatusCodeResult(500); // Internal Server Error
            }
        }
        [FunctionName(nameof(GetPayCodeAuthList))]
        public IActionResult GetPayCodeAuthList(
           [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
           ILogger log)
        {

            var listOfSR = _workFlowCalls.GetAllPayeeCodeAuthDetails();
            return new OkObjectResult(listOfSR);
        }
    }
    }

