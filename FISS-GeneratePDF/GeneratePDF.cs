using FG_STModels.Models.Shared;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.IO;
using System.Threading.Tasks;

namespace FISS_GeneratePDF
{
    public class GeneratePDF
    {
        private IConfiguration _configuration;
        public GeneratePDF(IConfiguration configuration) {
            _configuration = configuration;
        }
        [FunctionName(nameof(GeneratePDF))]
        public async Task<IActionResult> GeneratePDFDoc(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Start Function GeneratePDFDoc");
            
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            BodyContent reqBody = JsonConvert.DeserializeObject<BodyContent>(requestBody);
            GenerateContent generateContent = new GenerateContent(log, _configuration, req);
            try
            {
                return new OkObjectResult(generateContent.PDFContent(reqBody));
            }
            catch (Exception ex)
            {
                log.LogError(ex.Message);
                log.LogInformation(requestBody);
                return new OkObjectResult(ex.Message);
            }
        }
    }
}
