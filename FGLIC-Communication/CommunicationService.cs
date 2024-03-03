using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using FGLIC_Communication.Models;
using System.Net.Http;
using System.Text;
using System.Linq;
using FGLIC_Communication.Data;
using Microsoft.Extensions.Configuration;
using System.Data.Entity.Core.Common.CommandTrees.ExpressionBuilder;
using System.Data.Entity.Migrations;
using Newtonsoft.Json.Linq;
using System.Xml.Linq;
using System.Globalization;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using System.Dynamic;
using System.Reflection;
using System.IO.Enumeration;

namespace FGLIC_Communication
{
    public class CommunicationService
    {
        public CommunDBContext _communDbContext;
        public IConfiguration configuration;
        public string EMAILApi;
        public string SMSApi;
        public string ReceipientTo;
        public string ReceipientCC;
        public string MobileNos;
        public CommunicationService()
        {
            //configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("AppSettings.json", optional: true, reloadOnChange: true).AddEnvironmentVariables().Build();
            var connectionString = Environment.GetEnvironmentVariable("SQLConnectionString"); //configuration.GetConnectionString("DefaultConnection");
             EMAILApi = Environment.GetEnvironmentVariable("EMAIL");// configuration.GetSection("FalconApi")["EMAIL"];
             SMSApi = Environment.GetEnvironmentVariable("SMS");//configuration.GetSection("FalconApi")["SMS"];
            ReceipientTo = Environment.GetEnvironmentVariable("ReceipientTo"); //configuration.GetSection("EmailSettings")["ReceipientTo"];
             ReceipientCC = Environment.GetEnvironmentVariable("ReceipientCC"); //configuration.GetSection("EmailSettings")["ReceipientCC"];
             MobileNos = Environment.GetEnvironmentVariable("MobileNos"); //configuration.GetSection("EmailSettings")["MobileNos"];
            _communDbContext = new CommunDBContext(connectionString);

        }
        [FunctionName("CommunicationService")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Communication Service Reqeust Triggere Started");
            string name = req.Query["name"];

            log.LogInformation("Connection string Ended.");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            log.LogInformation("Binding CommunicationRequest  Started.");
           List< CommunicationRequest> data = JsonConvert.DeserializeObject<List<CommunicationRequest>>(requestBody);
            List<Response> Commresponse = new List<Response>();
            for (int i = 0; i < data.Count; i++)
            {
                Response responses = new Response()
                {
                    responseHeader = new ResponseHeader() { },
                    responseBody = new ResponseBody() { }
                };
                log.LogInformation(" CommunDBContext Started.");

                List<CommunicationRequest> typedData = (List<CommunicationRequest>)(object)data;
                log.LogInformation("Get details from db Started.");
                int Type = (int)(CommType)Enum.Parse(typeof(CommType), typedData[i].CommType.ToString());
                string TemplateId = typedData[i].TemplateID;
                var TemplateDetails = _communDbContext.CommuConfg.SingleOrDefault(x => x.TemplateID.ToString() == TemplateId && x.CommType == Type);
                if (TemplateDetails == null)
                {
                    if (typedData[i].TemplateID == null || typedData[i].TemplateID == "")
                    {
                        responses.responseBody.errormessage = "The TemplateID filed is required";
                        Commresponse.Add(responses);
                        return new OkObjectResult(Commresponse);
                    }
                    else if (typedData[i].CommType == null)
                    {
                        responses.responseBody.errormessage = "The CommType filed is required";
                        Commresponse.Add(responses);
                        return new OkObjectResult(Commresponse);
                    }
                    else
                    {
                        responses.responseBody.errormessage = "The TemplateID and CommType is doesn't match";
                        Commresponse.Add(responses);
                        return new OkObjectResult(Commresponse);
                    }
                }
                else
                {
                    if (TemplateDetails.SenderEMail == null || TemplateDetails.SenderEMail == "")
                    {
                        responses.responseBody.errormessage = "The SenderEMail filed is required";
                        Commresponse.Add(responses);
                        return new OkObjectResult(Commresponse);
                    }
                    else if (TemplateDetails.Subject == null || TemplateDetails.Subject == "")
                    {
                        responses.responseBody.errormessage = "The Subject filed is required";
                        Commresponse.Add(responses);
                        return new OkObjectResult(Commresponse);
                    }
                    else if (TemplateDetails.CommType == null)
                    {
                        responses.responseBody.errormessage = "The CommType filed is required";
                        Commresponse.Add(responses);
                        return new OkObjectResult(Commresponse);
                    }
                }
                string SrvReqRefNo = typedData[i].SrvReqRefNo;
                var ServiceRequestDetails = _communDbContext.ServRequest.SingleOrDefault(x => x.SrvReqRefNo.ToString() == SrvReqRefNo);
                LAPolicy PolyceAndApplicationNumber = null;
                // Checking for Dummy ServiceRequest and No Communication History also logged for this serviceRequest
                if(SrvReqRefNo != "1234")
                {
                    if (ServiceRequestDetails == null)
                    {
                        string PolicyNumber = data[i].PolicyNumber;
                        PolyceAndApplicationNumber = _communDbContext.LA_Policy.Where(x => x.LA_PolicyNo == PolicyNumber).SingleOrDefault();
                        if (PolyceAndApplicationNumber == null)
                        {
                            LAPolicy lAPolicy = new LAPolicy()
                            {
                                LA_PolicyNo = data[i].PolicyNumber
                            };
                            _communDbContext.LA_Policy.AddOrUpdate(lAPolicy);
                            _communDbContext.SaveChanges();
                            PolyceAndApplicationNumber = _communDbContext.LA_Policy.Where(x => x.LA_PolicyNo == PolicyNumber).SingleOrDefault();
                        }
                    }
                    else
                    {
                        PolyceAndApplicationNumber = _communDbContext.LA_Policy.Where(x => x.PolicyRef == ServiceRequestDetails.PolicyRef).SingleOrDefault();
                    }
                }
                

                int policyRef = PolyceAndApplicationNumber == null ? 0 : (int)PolyceAndApplicationNumber.PolicyRef;
                CommuHist commuHists = new CommuHist()
                {
                    SrvReqID = ServiceRequestDetails == null ? 0 : ServiceRequestDetails.SrvReqID,
                    TemplateID = TemplateDetails.FalconideTempID.ToString(),
                    CommType = (byte)typedData[i].CommType,
                    //ReceipientTo = string.Join(", ", data[i].ReceipientTo),
                    //ReceipientCC = string.Join(", ", data[i].ReceipientCC),
                    //MobileNos = data[i].MobileNos,
                    ReceipientTo = string.Join(", ", ReceipientTo),
                    ReceipientCC = string.Join(", ", ReceipientCC),
                    MobileNos = string.Join(", ", MobileNos),
                    ScheduledTime = data[i].ScheduledTime,
                    TriggeredTime = DateTime.Now,
                    PolicyRef = policyRef
                };
                _communDbContext.CommuHist.Add(commuHists);

                if (SrvReqRefNo != "1234")
                {
                    _communDbContext.SaveChanges();
                }
                var commid = _communDbContext.CommuHist.OrderByDescending(q => q.CommID).FirstOrDefault();
                if (typedData != null)
                {

                    if (typedData[i].CommType.ToString() == "EMAIL")
                    {
                        //file 
                        string[] filenames = new string[] { };
                        string[] fileContents = new string[] { };
                        if (typedData[i].Attachments != null)
                        {
                            filenames = typedData[i].Attachments.Where(x => x.FileName != null).Select(x => x.FileName).ToArray();
                            fileContents = typedData[i].Attachments.Where(x => x.FileContent != null).Select(x => x.FileContent).ToArray();
                        }


                        EmailRequest emailRequest = new EmailRequest();
                        emailRequest.requestHeader = new RequestHeader
                        {
                            source = ServiceRequestDetails?.Source ?? "POS",   // [FISS].[ServRequest].source
                            policyNo = PolyceAndApplicationNumber?.LA_PolicyNo ?? "", //[LifeAsiaObj].[LA_Policy].LA_PolicyNo
                            appNo = PolyceAndApplicationNumber?.FG_ApplNo ?? "", //[LifeAsiaObj].[LA_Policy].FG_ApplNo
                        };
                        emailRequest.requestBody = new RequestBody
                        {
                            from = TemplateDetails.SenderEMail, // [COMMS].[CommuConfg].senderemail
                            fromname = TemplateDetails.SenderName, //[COMMS].[CommuConfg].senderename
                            subject = TemplateDetails.Subject, //[COMMS].[CommuConfg].subject
                                                               //recipients = typedData[i].ReceipientTo.Split(',').Select(s => s.Trim()).ToList(),
                                                               //recipientsCC = typedData[i].ReceipientCC.Split(',').Select(s => s.Trim()).ToList(),
                                                               //recipients = ReceipientTo.Split(',').Select(s => s.Trim()).ToList(),
                                                               //recipientsCC = ReceipientCC.Split(',').Select(s => s.Trim()).ToList(),
                            recipients = new List<string>()
                            {
                                ReceipientTo
                            },
                            recipientsCC = new List<string>()
                            {
                                ReceipientCC
                            },
                            otherAttributes = typedData[i].CommBody.ToString(),
                            apiHeader = { $"" + DateTime.Now.ToString("yyyyMMddHHmmss") + "-" + commid.CommID + "".ToString() },
                            template = Convert.ToInt32(TemplateDetails.FalconideTempID.ToString()),
                            filename = filenames,
                            filecontent = fileContents
                        };
                        // Return the created EmailRequest instance
                        using (var client = new HttpClient())
                        {
                            string jsonContent = JsonConvert.SerializeObject(emailRequest);
                            var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
                            // Create an HttpRequestMessage and set headers
                            var request = new HttpRequestMessage(HttpMethod.Post, EMAILApi);
                            request.Headers.Add("Ocp-Apim-Subscription-Key", "dc2821ba8f7a42e291c8e473aedafadb");
                            request.Content = content;

                            HttpResponseMessage response = await client.SendAsync(request);

                            commuHists.ApiHeader = emailRequest.requestBody.apiHeader[0].ToString();
                            string SmsResponse = await response.Content.ReadAsStringAsync();
                            JObject requestedId = JObject.Parse(SmsResponse);
                            if ((bool)requestedId["responseHeader"]["issuccess"] == true)
                            {
                                commuHists.DeliveryStatus = 1;
                                responses.responseHeader.CommType = "EMAIL";
                                responses.responseHeader.apiHeader = emailRequest.requestBody.apiHeader[0].ToString();
                                responses.responseHeader.issuccess = (bool)requestedId["responseHeader"]["issuccess"];
                                responses.responseHeader.CommID = Convert.ToInt32(commid.CommID);
                                responses.responseHeader.message = (string)requestedId["responseHeader"]["message"];
                                responses.responseBody.errormessage = "";
                            }

                            else
                            {
                                //Insert into communication History
                                commuHists.DeliveryStatus = 2;
                                commuHists.FailureReason = (string)requestedId["responseHeader"]["message"];

                                //Response
                                responses.responseHeader.CommType = "EMAIL";
                                responses.responseHeader.issuccess = (bool)requestedId["responseHeader"]["issuccess"];
                                responses.responseHeader.apiHeader = emailRequest.requestBody.apiHeader[0].ToString();
                                responses.responseHeader.CommID = Convert.ToInt32(commid.CommID);
                                responses.responseHeader.message = (string)requestedId["responseHeader"]["message"];
                                responses.responseBody.errormessage = (string)requestedId["responseHeader"]["errormessage"];
                                responses.responseBody.errorcode = (string)requestedId["responseHeader"]["errorcode"];
                            }

                            if(SrvReqRefNo != "1234")
                            {
                                _communDbContext.CommuHist.AddOrUpdate(commuHists);
                                _communDbContext.SaveChanges();
                            }
                            Commresponse.Add(responses);
                        }
                    }
                    else if (typedData[i].CommType.ToString() == "SMS")
                    {
                       
                        if (typedData[i].MobileNos.Count() != 10)
                        {
                            responses.responseBody.errormessage = "Invalid mobile number-" + typedData[i].MobileNos + "";
                            Commresponse.Add(responses);
                            return new OkObjectResult(Commresponse);
                        }
                        if (typedData[i].MobileNos.ToString() == null || typedData[i].MobileNos.ToString() == "")
                        {
                            responses.responseBody.errormessage = "The mobile number filed is required";
                            Commresponse.Add(responses);
                            return new OkObjectResult(Commresponse);
                        }
                        var values = JsonConvert.DeserializeObject<Dictionary<string, string>>("{" + data[i].CommBody.ToString() + "}");

                        string Dltid;
                        Dltid = GetDltid();
                        SmsRequest SmsRequest = new SmsRequest();
                        SmsRequest.RequestHeader = new SmsRequestHeader
                        {
                            source = ServiceRequestDetails.Source == null ? "" : ServiceRequestDetails.Source,   // [FISS].[ServRequest].source
                            policyNo = PolyceAndApplicationNumber.LA_PolicyNo, //[LifeAsiaObj].[LA_Policy].LA_PolicyNo
                            applicationNo = PolyceAndApplicationNumber.FG_ApplNo,
                            dob = ""//[LifeAsiaObj].[LA_Policy].FG_ApplNo
                        };
                        SmsRequest.RequestBody = new SmsRequestBody
                        {
                            //messageText =typedData.CommBody,
                            messageText = DynamicbindingofSms(TemplateDetails.Subject, values),
                            //mobileNumber = typedData[i].MobileNos,
                            mobileNumber = MobileNos,
                            SMS_Resource = "",
                            DataKey = "",
                            DataValue = "",
                            Dltid= Dltid,
                        };
                        // Return the created EmailRequest instance
                        using (var client = new HttpClient())
                        {
                            string jsonContent = JsonConvert.SerializeObject(SmsRequest);
                            var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");
                            // Create an HttpRequestMessage and set headers
                            var request = new HttpRequestMessage(HttpMethod.Post, SMSApi);
                            request.Headers.Add("Ocp-Apim-Subscription-Key", "dc2821ba8f7a42e291c8e473aedafadb");
                            request.Content = content;
                            HttpResponseMessage response = await client.SendAsync(request);
                            string SmsResponse = await response.Content.ReadAsStringAsync();
                            JObject requestedId = JObject.Parse(SmsResponse);
                            if ((bool)requestedId["responseHeader"]["issuccess"] == true)
                            {
                                commuHists.DeliveryStatus = 1;
                                commuHists.ApiHeader = (string)requestedId["responseBody"]["requestID"];

                                responses.responseHeader.apiHeader = (string)requestedId["responseBody"]["requestID"];
                                responses.responseHeader.issuccess = (bool)requestedId["responseHeader"]["issuccess"];
                                responses.responseHeader.CommType = "SMS";
                                responses.responseHeader.CommID = Convert.ToInt32(commid.CommID);
                                responses.responseHeader.message = (string)requestedId["responseHeader"]["message"];
                                responses.responseBody.errormessage = "";
                            }

                            else
                            {
                                commuHists.DeliveryStatus = 2;
                                commuHists.FailureReason = (string)requestedId["responseHeader"]["message"];
                                responses.responseHeader.CommType = "SMS";
                                responses.responseHeader.issuccess = (bool)requestedId["responseHeader"]["issuccess"];
                                responses.responseHeader.apiHeader = "";
                                responses.responseHeader.CommID = Convert.ToInt32(commid.CommID);
                                responses.responseHeader.message = (string)requestedId["responseHeader"]["message"];
                                responses.responseBody.errormessage = (string)requestedId["responseHeader"]["errormessage"];
                                responses.responseBody.errorcode = (string)requestedId["responseHeader"]["errorCode"];
                            }
                            _communDbContext.CommuHist.AddOrUpdate(commuHists);
                            _communDbContext.SaveChanges();
                            Commresponse.Add(responses);

                        }
                    }
                    else
                    {
                        responses.responseBody.errormessage = "The CommType is Wrong";
                        Commresponse.Add(responses);
                        return new OkObjectResult(Commresponse);
                    }

                }
                
            }
            return new OkObjectResult(Commresponse);        
        }
        public string DynamicbindingofSms(string Template, Dictionary<string, string> smsData)
        {
            var matches = Regex.Matches(Template, "{.*?}");
            for (int i = 0; i < matches.Count; i++)
            {
                string propertyNameToCheck = matches[i].Value.Replace("{", "").Replace("}", "");
                var value = smsData.SingleOrDefault(x => x.Key.Equals(propertyNameToCheck)).Value;
                if(value != null)
                {
                    Template = Template.Replace(matches[i].ToString(), value.ToString());
                }
                else
                {
                    Template = Template.Replace(matches[i].ToString(),"");
                }               
            }
            return Template;
        }      
        public string GetDltid()
        {
            return  DateTime.UtcNow.ToString("yyyyMMddHHmmss") + new Random().Next(0000, 9999);
        }
    }
}
