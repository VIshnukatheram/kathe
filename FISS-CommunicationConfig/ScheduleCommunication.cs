using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using FISS_CommunicationConfig.Services;
using System.Collections.Generic;

namespace FISS_CommunicationConfig
{
    public class ScheduleCommunication
    {

        private readonly WorkFlowCalls _workFlowCalls;
        public ScheduleCommunication(WorkFlowCalls workFlowCalls)
        {
            _workFlowCalls = workFlowCalls;
        }
        [FunctionName(nameof(ScheduleCommunicationAPI))]
        public IActionResult ScheduleCommunicationAPI(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string CommType = req.Query["CommType"];
            string status = req.Query["status"];
            int CommuType = 2;
            var listOfPayload = _workFlowCalls.GetListOfCommunicationPayloadForInterest(CommuType, status="INTERESTCOMM");

            return new OkObjectResult(listOfPayload);
        }
    }
}
