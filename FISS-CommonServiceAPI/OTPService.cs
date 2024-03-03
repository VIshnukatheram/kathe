using FISS.CommonService.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using FG_STModels.Models.FISS;
using Microsoft.Extensions.Configuration;
using FG_STModels.Models.Comms;
using Microsoft.Extensions.Logging;
using FISS_CommonServiceAPI.Services;

namespace FISS_CommonServiceAPI
{
    public class CommonService
    {
        public string StaticMobileNumber;
        private readonly WorkFlowCalls _workFlowCalls;
        public CommonService(WorkFlowCalls workFlowCalls)
        {
            _workFlowCalls = workFlowCalls;
            StaticMobileNumber = Environment.GetEnvironmentVariable("OTPMobileNumber");
        }
        [FunctionName("OTPService")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            string name = req.Query["name"];
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            OTPServiceRequest generateOTP = JsonConvert.DeserializeObject<OTPServiceRequest>(requestBody);
            int Type = (int)(CommType)Enum.Parse(typeof(CommType), generateOTP.CommType.ToString());
            CommonServiceResponse OTPResponse = new CommonServiceResponse()
            {
                responseBody = new ResponseBody() { },
                responseHeader = new ResponseHeader() { }
            };
            if (generateOTP.PolicyNo == "" || generateOTP.PolicyNo == null)
            {
                OTPResponse.responseBody.errormessage = "PolicyNo is Required";
                return new OkObjectResult(OTPResponse);
            }
            else if ((generateOTP.MobileNo == "" || generateOTP.MobileNo == null) && (generateOTP.EmailId == "" || generateOTP.EmailId == null))
            {
                OTPResponse.responseBody.errormessage = "MobileNo or EmailId is Required";
                return new OkObjectResult(OTPResponse);
            }
            else if (generateOTP.Body == "" || generateOTP.Body == null)
            {
                OTPResponse.responseBody.errormessage = "Body is Required";
                return new OkObjectResult(OTPResponse);
            }

            dynamic body = JsonConvert.DeserializeObject<dynamic>("{" + generateOTP.Body.ToString() + "}");
            string customerName = body.CustomerName;
            string purpose = body.Purpose;

            if (generateOTP.MobileNo != "")
            {
                if (generateOTP.OTP == 0)
                {
                    try
                    {
                        int otp = _workFlowCalls.GenerateOTP(generateOTP.MobileNo, generateOTP.EmailId, generateOTP.PolicyNo);
                        if (otp != 0)
                        {
                            OTPRequest oTPRequest = new OTPRequest()
                            {
                                RequestHeader = new OTPRequestHeader()
                                {
                                    source = "",
                                    policyNo = generateOTP.PolicyNo,
                                    applicationNo = "",
                                    dob = "",

                                },
                                RequestBody = new OTPRequestBody()
                                {
                                    //messageText = TemplateDetails.Subject.Replace("{Cutomername}", "vishnu").Replace("{PolicyNo}", generateOTP.PolicyNo).Replace("{OTP}", otp.ToString()),
                                    Message = "Dear " + customerName + " , " + "963852" + "  is the OTP to validate " + purpose + "  for your FG Assured Plus policy no." + generateOTP.PolicyNo + " . -Future Generali India Life Insurance Company Ltd",
                                    //MobileNo = generateOTP.MobileNo
                                    MobileNo = StaticMobileNumber
                                },
                            };
                            using (var client = new HttpClient())
                            {
                                string jsonContent = JsonConvert.SerializeObject(oTPRequest);
                                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
                                // Create an HttpRequestMessage and set headers
                                var request = new HttpRequestMessage(HttpMethod.Post, Environment.GetEnvironmentVariable("OTPApi"));
                                request.Headers.Add("Ocp-Apim-Subscription-Key", "dc2821ba8f7a42e291c8e473aedafadb");
                                request.Content = content;

                                HttpResponseMessage response = await client.SendAsync(request);

                                string SmsResponse = await response.Content.ReadAsStringAsync();
                                JObject requestedId = JObject.Parse(SmsResponse);
                                if ((bool)requestedId["responseHeader"]["issuccess"] == true)
                                {
                                    OTPResponse.responseHeader.apiHeader = (string)requestedId["responseBody"]["requestID"];
                                    OTPResponse.responseHeader.issuccess = (bool)requestedId["responseHeader"]["issuccess"];
                                    OTPResponse.responseHeader.message = (string)requestedId["responseHeader"]["message"];
                                    OTPResponse.responseBody.errormessage = "";
                                }

                                else
                                {
                                    OTPResponse.responseHeader.issuccess = (bool)requestedId["responseHeader"]["issuccess"];
                                    OTPResponse.responseHeader.apiHeader = (string)requestedId["responseBody"]["requestID"];
                                    OTPResponse.responseHeader.message = (string)requestedId["responseHeader"]["message"];
                                    OTPResponse.responseBody.errormessage = (string)requestedId["responseHeader"]["errormessage"];
                                    OTPResponse.responseBody.errorcode = (string)requestedId["responseHeader"]["errorcode"];
                                }
                            }
                        }
                    }
                    catch (Exception EX)
                    {
                        log.LogInformation(EX.Message);
                    }
                }

                if (generateOTP.OTP != 0)
                {
                    try
                    {
                        var ValidateResponse = _workFlowCalls.ValidateOTP(generateOTP.PolicyNo, generateOTP.OTP);
                        if (ValidateResponse == "OTP Validated Successfully")
                        {
                            OTPResponse.responseHeader.apiHeader = "";
                            OTPResponse.responseHeader.issuccess = true;
                            OTPResponse.responseHeader.message = ValidateResponse;
                            OTPResponse.responseBody.errormessage = "";
                        }
                        else
                        {
                            OTPResponse.responseHeader.issuccess = false;
                            OTPResponse.responseHeader.apiHeader = "";
                            OTPResponse.responseHeader.message = "Failure";
                            OTPResponse.responseBody.errormessage = ValidateResponse;
                            OTPResponse.responseBody.errorcode = "";
                        }
                    }
                    catch (Exception EX)
                    {
                        log.LogInformation(EX.Message);
                    }
                }
            }
            else
            {
            }
            return new OkObjectResult(OTPResponse);
        }
       
    }
}
