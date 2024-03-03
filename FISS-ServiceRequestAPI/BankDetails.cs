using FISS_ServiceRequestAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using FISS_ServiceRequestAPI.Models.DB;
using FG_STModels.Models.Core;

namespace FISS_ServiceRequestAPI
{
    public class BankDetails
    {
        private readonly WorkFlowCalls _workFlowCalls;
        public BankDetails(WorkFlowCalls workFlowCalls)
        {
            _workFlowCalls = workFlowCalls;
        }
        
        [FunctionName(nameof(IFSCBank))]
        public IActionResult IFSCBank(
         [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
         ILogger log)
        {
            string ISFC = req.Query["ISFC"];
            log.LogInformation("Get Bank Deatils triggerd with Policy" + ISFC);
            try
            {
                var ISFCCode = _workFlowCalls.GetIFSCCode(ISFC);
                if (ISFCCode.Count>0)
                {
                    return new OkObjectResult(ISFCCode);
                }
                else
                {
                    return new OkObjectResult("Invalid IFSC Code");
                }
            }
            catch (Exception ex)
            {
                log.LogError(ex.Message);
                return new OkObjectResult("Failure");
            }
        }
    }
}
