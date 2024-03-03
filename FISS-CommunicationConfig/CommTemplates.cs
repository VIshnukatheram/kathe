using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using FISS_CommunicationConfig.Services;
using FISS_CommunicationConfig.Models.Request;
using System.Collections.Generic;

namespace FISS_CommunicationConfig
{
    public class CommTemplates
    {
        private readonly WorkFlowCalls _workFlowCalls;
        public CommTemplates(WorkFlowCalls workFlowCalls)
        {
            _workFlowCalls = workFlowCalls;
        }
        [FunctionName(nameof(GenerateTemplate))]
        public async Task<IActionResult> GenerateTemplate(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Communication Config API Triggered");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var reqBody = JsonConvert.DeserializeObject<List<CommunicationRequest>>(requestBody);

            log.LogInformation("All Query Parameters "+ JsonConvert.SerializeObject(req.Query));

            var serviceReqNo = req.Query["srid"];
            var status = req.Query["status"];
            var response = _workFlowCalls.UpdateCommunicationTemplate(reqBody, serviceReqNo, status);

            log.LogInformation("Response " + JsonConvert.SerializeObject(response));

            return new OkObjectResult(response);
        }
    }
}
