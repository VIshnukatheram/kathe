using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using FGLIC_ServiceRequest.Models.Shared;
using FGLIC_ServiceRequest.Models.DB;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace FGLIC_ServiceRequest
{
    public class ConfigurationService
    {
        private readonly FGDBContext _gdbContext;
        public ConfigurationService(FGDBContext fGDBContext) {
            _gdbContext = fGDBContext;
        }

        [FunctionName(nameof(GetMasterData))]
        public async Task<IActionResult> GetMasterData(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Get master API is triggerd");
            string requestBody = "";
            try
            {
                requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var data = JsonConvert.DeserializeObject<CommonServiceModel>(requestBody);
                var lists = _gdbContext.AppMasters.Where(x => data.MasterRequest.Contains(x.MstCategory))
                           .GroupBy(x => x.MstCategory).Select(x => new { x.Key, Value = x.OrderBy(x => x.MstDesc).ToList() }).ToList();

                return new OkObjectResult(lists);

            } catch (Exception ex)
            {
                log.LogError(ex.Message);
                log.LogInformation(requestBody);
                return new OkObjectResult(ex.Message);
            }
        }
    }
}
