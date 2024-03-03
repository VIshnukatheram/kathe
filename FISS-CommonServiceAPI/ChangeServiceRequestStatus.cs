using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using FISS_CommonServiceAPI.Services;

namespace FISS_CommonServiceAPI
{
    public class ChangeServiceRequestStatus
    {
        private readonly WorkFlowCalls _workFlowCalls;
        public ChangeServiceRequestStatus(WorkFlowCalls workFlowCalls)
        {
            _workFlowCalls = workFlowCalls;
        }
        [FunctionName(nameof(ChangeStatusForSelectedServiceRequest))]
        public IActionResult ChangeStatusForSelectedServiceRequest(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string servicerequestId = req.Query["srid"];
            string status = req.Query["status"];
            log.LogInformation("Service Request Id "+servicerequestId);
            log.LogInformation("Status "+status);

            _workFlowCalls.UpdateStatus(servicerequestId, status);

            log.LogInformation("Status Change for Service Request is Ended");

            return new OkObjectResult(servicerequestId);
        }
    }
}
