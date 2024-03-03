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
    public class TaxCalculation
    {
        private readonly WorkFlowCalls _workFlowCalls;
        public TaxCalculation(WorkFlowCalls workFlowCalls)
        {
            _workFlowCalls = workFlowCalls;
        }
        [FunctionName(nameof(TaxCalculationForSerReq))]
        public IActionResult TaxCalculationForSerReq(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string srid = req.Query["srid"];

            var taxDetails = _workFlowCalls.GetTaxCalculationDetails(srid);

            return new OkObjectResult(taxDetails);
        }
    }
}
