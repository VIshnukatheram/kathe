using FISS_CommonServiceAPI.Models.POSAdmin;
using FISS_CommonServiceAPI.Services;
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
using Azure;
using FG_STModels.Models.LifeAsia;
using Newtonsoft.Json;
using FG_STModels.Models.Core;
using System.IO;
using FG_STModels.Models.Shared;

namespace FISS_CommonServiceAPI
{
    public class DoNotCall
    {
        private readonly WorkFlowCalls _workFlowCalls;
        public DoNotCall(WorkFlowCalls workFlowCalls)
        {
            _workFlowCalls = workFlowCalls;
        }
        [FunctionName(nameof(GetDND))]
        public IActionResult GetDND(
          [HttpTrigger(AuthorizationLevel.Function, "Get", Route = null)] HttpRequest req,
          ILogger log)
        {
            log.LogInformation("Do not call API Triggered Initiated");
            string ClntAttr = req.Query["ClntAttr"];
            string PolAttr = req.Query["PolAttr"];
            var ClnAndPol = _workFlowCalls.Getpolicy(ClntAttr, PolAttr);
            if(ClnAndPol == null)
            {
                return new OkObjectResult(false);
            }
            else
            {
                return new OkObjectResult(ClnAndPol);
            }
        }
        [FunctionName(nameof(PostDND))]
        public async Task<IActionResult> PostDND(
         [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
         ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            TagRequest ClntAttrr = JsonConvert.DeserializeObject<TagRequest>(requestBody);
        
            if (ClntAttrr != null)
            {
              var  Result =   _workFlowCalls.ValidateTagname(ClntAttrr);
                return new OkObjectResult(Result);
            }
            else
            { 
                return new OkObjectResult(false);
            }
         
        }
    }
}
