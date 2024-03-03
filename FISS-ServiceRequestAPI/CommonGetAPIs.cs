using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using FISS_ServiceRequestAPI.Services;

namespace FISS_ServiceRequestAPI
{
    public class CommonGetAPIs
    {
        private readonly WorkFlowCalls _workFlowCalls;
        public CommonGetAPIs(WorkFlowCalls workFlowCalls)
        {
            _workFlowCalls = workFlowCalls;
        }
        [FunctionName(nameof(GetDoNotDisturbAPI))]
        public IActionResult GetDoNotDisturbAPI(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Get Do Not Disturb API Trigged.");

            string policy = req.Query["policy"];
            string mobileNo = req.Query["mobileNo"];

            var dndRecord = _workFlowCalls.GetDNDData(policy, mobileNo);
            dynamic response = new
            {
                NoOfTimeCallMadeInLastMonth = 0,
                DNDStatus = dndRecord?.DndStatus ?? false
            };

            return new OkObjectResult(response);
        }
        [FunctionName(nameof(GetChequeReprocessingData))]
        public IActionResult GetChequeReprocessingData(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Get Cheque Reprocessing API Trigged.");

            string policy = req.Query["policy"];

            var reprocessingRecord = _workFlowCalls.GetPaymentReprocessingData(policy,11,1);

            return new OkObjectResult(reprocessingRecord);
        }

        [FunctionName(nameof(TransectionPayouts))]
        public IActionResult TransectionPayouts(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Get TransectionPayouts.");

            string policy = req.Query["policy"];
            int callType = Int32.Parse(req.Query["calltype"]);
            int subType = Int32.Parse(req.Query["subtype"]);

            var test = _workFlowCalls.GetTransectionPayouts(policy, callType, subType);

            return new OkObjectResult(test);
        }
    }
}
