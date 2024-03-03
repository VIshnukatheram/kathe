using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Runtime.InteropServices;
using FISS_CommonServiceAPI.Services;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using FISS_CommonServiceAPI.Models.DB;
using System.Data.Entity;
using System.Linq;
using FG_STModels.Models.FISS;
using System.Net.Http;
using System.Text;

namespace FISS_CommonServiceAPI
{
    public class EmailServicesRequests
    {
        private readonly WorkFlowCalls _workFlowCalls;

        private readonly FGDBContext _fgdbcontext;

        private readonly HttpClient _httpClient;

        private readonly EmailManagementNlp _emailManagementNlp;
        public EmailServicesRequests(WorkFlowCalls workFlowCalls, FGDBContext fgdbcontext, 
            HttpClient httpClient, EmailManagementNlp emailManagementNlp)
        {
            _workFlowCalls = workFlowCalls;
            _fgdbcontext = fgdbcontext;
            _httpClient = httpClient;
            _emailManagementNlp = emailManagementNlp;
        }
        [FunctionName("InsertNlpEmail")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log, ExecutionContext context)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                 EmailClassify nlpEmail = Newtonsoft.Json.JsonConvert.DeserializeObject<EmailClassify>(requestBody);
                _emailManagementNlp.mailman(nlpEmail);
               
                return new OkObjectResult(nlpEmail) ;
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult($"Error: {ex.Message}");
            }
        }
    }
}
