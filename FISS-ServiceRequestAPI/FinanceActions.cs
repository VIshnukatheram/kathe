using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using FISS_ServiceRequestAPI.Models.Response;
using System.Collections.Generic;
using FISS_ServiceRequestAPI.Services;
using FISS_ServiceRequestAPI.Models.Request;

namespace FISS_ServiceRequestAPI
{
    public class FinanceActions
    {
        private readonly WorkFlowCalls _workFlowCalls;
        public FinanceActions(WorkFlowCalls workFlowCalls)
        {
            _workFlowCalls = workFlowCalls;
        }
        [FunctionName(nameof(FinanceActionsOnSerReq))]
        public async Task<IActionResult> FinanceActionsOnSerReq(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function For Finnance Download List.");
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var request = JsonConvert.DeserializeObject<FinanceDownloadRequest>(requestBody);

            var dowlaod = _workFlowCalls.GetFinanceList(request);



            return new OkObjectResult(dowlaod);
        }
    }
}
