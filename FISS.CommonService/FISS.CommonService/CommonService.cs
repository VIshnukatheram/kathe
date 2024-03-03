using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using FISS.CommonService.Data;
using Microsoft.Extensions.Configuration;
using FISS.CommonService.Models;
using System.Linq;
using System.Data.Entity.Migrations;
using Newtonsoft.Json.Linq;
using System.Net.Http;
using System.Text;
using System.Text.Json;

namespace FISS.CommonService
{
    public class CommonService
    {
        public CommonServiceDbContext _commonServiceDbContext;
        public IConfiguration configuration;
        public string StaticMobileNumber;
        public CommonService()
        {
            configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("Host.json", optional: true, reloadOnChange: true).AddEnvironmentVariables().Build();
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            _commonServiceDbContext = new CommonServiceDbContext(connectionString);
            StaticMobileNumber = configuration.GetSection("OTPSettings").GetValue<string>("OTPMobileNumber");
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
            name = name ?? data?.name;
            CommonServiceRequest generateOTP = JsonConvert.DeserializeObject<CommonServiceRequest>(requestBody);
            int Type = (int)(CommType)Enum.Parse(typeof(CommType), generateOTP.CommType.ToString());
            CommonServiceResponse OTPResponse = new CommonServiceResponse()
            {
                responseBody = new ResponseBody() { },
                responseHeader = new ResponseHeader() { }
            };
            if(generateOTP.PolicyNo =="" || generateOTP.PolicyNo == null)
            {
                OTPResponse.responseBody.errormessage = "PolicyNo is Required";
                return new OkObjectResult(OTPResponse);
            }
            else if((generateOTP.MobileNo=="" || generateOTP.MobileNo == null) && (generateOTP.EmailId == "" || generateOTP.EmailId == null))
            {                
                OTPResponse.responseBody.errormessage = "MobileNo or EmailId is Required";
                return new OkObjectResult(OTPResponse);
            }
            else if(generateOTP.Body == "" || generateOTP.Body == null)
            {
                OTPResponse.responseBody.errormessage = "Body is Required";
                return new OkObjectResult(OTPResponse);
            }

             dynamic body = JsonConvert.DeserializeObject<dynamic>("{"+generateOTP.Body.ToString()+"}");
             string customerName = body.CustomerName;
             string purpose = body.Purpose;
           
            if (generateOTP.MobileNo != "")
            {
                  if (generateOTP.OTP == 0)
                    {
                    try
                    { 
                        int otp = GenerateOTP(generateOTP.MobileNo, generateOTP.EmailId, generateOTP.PolicyNo);
                        if (otp!=0)
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
                                var request = new HttpRequestMessage(HttpMethod.Post, configuration.GetSection("OTPSettings").GetValue<string>("OTPApi"));
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
                    catch(Exception EX)
                    {
                        log.LogInformation(EX.Message);
                    }
                }
                
                if (generateOTP.OTP != 0)
                {
                    try
                    {
                        var ValidateResponse = ValidateOTP(generateOTP.PolicyNo, generateOTP.OTP);
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
                    catch(Exception EX)
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
        private static string GetOTP()
        {
            Random random = new Random();
            return random.Next(100000, 999999).ToString("D6");
        }
        public int GenerateOTP(string MobileNo, string Email, string PolicyNo)
        {
            OTPService commService = new OTPService();
            try
            {
                OTPService OTPNumber = _commonServiceDbContext.CommService.Where(x => x.PolicyNo == PolicyNo && (x.MobileNo == MobileNo || x.Email == Email)).FirstOrDefault();
                var otp = GetOTP();
                if (otp != null)
                {
                    if (OTPNumber == null)
                    {
                       
                        commService.Email = Email;
                        commService.PolicyNo = PolicyNo;
                        commService.MobileNo = MobileNo;
                        commService.OTP = "963852";
                        commService.ValidTill = DateTime.Now.AddSeconds(120);
                        _commonServiceDbContext.CommService.AddOrUpdate(commService);
                    }
                    else
                    {
                        OTPNumber.Email = Email;
                        OTPNumber.MobileNo = MobileNo;
                        OTPNumber.OTP = "963852";
                        OTPNumber.ValidTill = DateTime.Now.AddSeconds(120);
                        _commonServiceDbContext.CommService.AddOrUpdate(OTPNumber);
                    }
                   
                    _commonServiceDbContext.SaveChanges();
                }
                return Convert.ToInt32(otp);
            }
            catch (Exception)
            {
                return 0;
            }
        }
        public string ValidateOTP(string PolicyNo, int OTP)
        {
            try
            {
                if (OTP != 0)
                {
                    OTPService OTPNumber = _commonServiceDbContext.CommService.Where(x => x.PolicyNo == PolicyNo).FirstOrDefault();
                    if (OTPNumber != null)
                    {
                        if (OTPNumber.ValidTill > DateTime.Now)
                        {
                            if (configuration.GetValue<int>("ValidAttempts") > OTPNumber.InvalidAttempts)
                            {
                                var validateOtp = _commonServiceDbContext.CommService.Where(x => x.PolicyNo == PolicyNo).SingleOrDefault(x => x.OTP.ToString() == OTP.ToString());
                                if (validateOtp == null)
                                {
                                    OTPNumber.InvalidAttempts += 1;
                                    _commonServiceDbContext.CommService.AddOrUpdate(OTPNumber);
                                    return "Invalid OTP";
                                }
                                else
                                {
                                    OTPNumber.OTP = "";
                                    OTPNumber.InvalidAttempts = 0;
                                    _commonServiceDbContext.CommService.AddOrUpdate(OTPNumber);
                                    return "OTP Validated Successfully";
                                }
                            }
                            else
                            {
                                _commonServiceDbContext.CommService.Remove(OTPNumber);
                                return "Try again, your 3 OTP Attempts Are completed";
                            }
                        }
                        else
                        {
                            OTPNumber.OTP = "";
                            OTPNumber.InvalidAttempts = 0;
                            _commonServiceDbContext.CommService.AddOrUpdate(OTPNumber);
                            return "Try again,OTP Is Expired";
                        }

                    }
                    else
                    {
                        return "GENERATE_OTP";
                    }

                }
                else
                {
                    return "OTP Is Required";
                }

            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            finally
            {
                _commonServiceDbContext.SaveChanges();
            }
        }
    }
}