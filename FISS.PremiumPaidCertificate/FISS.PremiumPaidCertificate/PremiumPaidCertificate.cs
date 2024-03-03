using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using FISS.PremiumPaidCertificate.Models.PPCModels;


namespace FISS.PremiumPaidCertificate
{
    public  class PremiumPaidCertificate
    {
        private readonly ServiceRequest _ServiceRequest;

        public PremiumPaidCertificate(ServiceRequest ServiceRequest)
        {
            _ServiceRequest= ServiceRequest;
        }
        [FunctionName("PremiumPaidCertificate")]
        public  async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            PPCResponse fGPPCApiResponse = new PPCResponse()
            {
                responseHeader = new ResponseHeader() { },
                responseBody = new ResponseBody() { }
            };
            PPCService data = JsonConvert.DeserializeObject<PPCService>(requestBody);
            if (data != null)
            {
                var ServiceRequestResponse = _ServiceRequest.CreateServiceRequest(data);
                if (ServiceRequestResponse.Result != null)
                {                  
                   var PPCResponse = _ServiceRequest.GetPPCData(data,log);
                    if (PPCResponse != null)
                    {
                        return new OkObjectResult(PPCResponse.Result);
                    }
                    else
                    {
                        return new OkObjectResult(PPCResponse.Result);
                    }
                 
                }
                else
                {
                    fGPPCApiResponse.responseHeader.issuccess = false;
                    fGPPCApiResponse.responseHeader.message = "Service Request Not Created";
                    return new OkObjectResult(fGPPCApiResponse);
                }
            }
            else
            {
                fGPPCApiResponse.responseHeader.issuccess = false;
                fGPPCApiResponse.responseHeader.message = "Internal server error";
                return new OkObjectResult(data);
            }

        }
    }

}
