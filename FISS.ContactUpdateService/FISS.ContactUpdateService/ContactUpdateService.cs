using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http.Headers;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using FISS.ContactUpdateService.Data;
using FISS.ContactUpdateService.Models;
using System.Linq;
using System.Security.Policy;
using Microsoft.Extensions.Primitives;
using System.Globalization;
using Microsoft.SqlServer.Server;

namespace FISS.ContactUpdateService
{
    public class ContactUpdateService
    {

        public ContactUpdateDbContext _ContactUpdateDbContext;
        public IConfiguration configuration;
        public ContactUpdateService()
        {
            configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("host.json", optional: true, reloadOnChange: true).AddEnvironmentVariables().Build();
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            _ContactUpdateDbContext = new ContactUpdateDbContext(connectionString);
        }
        [FunctionName("ContactUpdateService")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string name = req.Query["name"];

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

           
            ContactUpdateRequest ContactUpdateRequest = JsonConvert.DeserializeObject<ContactUpdateRequest>(requestBody);
            List<ContactUpdate> ContactUpdateList = new List<ContactUpdate>();
            Response responseMessage = new Response()
            {
                responseBody = new ResponseBody() { },
                responseHeader = new ResponseHeader() { }
            };
            try
            {
                string SerReqID = ContactUpdateRequest.SerReqID;
                var ServiceRequestDetails = _ContactUpdateDbContext.ServRequest.Where(x => x.SrvReqRefNo == SerReqID.ToString()).SingleOrDefault();
                if (ServiceRequestDetails == null)
                {
                    if (ContactUpdateRequest.SerReqID != "")
                    {
                        responseMessage.responseBody.errormessage = "The SerReqID is Wrong";
                        return new OkObjectResult(responseMessage);
                    }
                    else
                    {
                        responseMessage.responseBody.errormessage = "The SerReqID filed is required";
                        return new OkObjectResult(responseMessage);
                    }
                }
                int flag = 0;
                if (ContactUpdateRequest != null)
                {
                    foreach (var Tag in ContactUpdateRequest.ServReqValues)
                    {

                        if (ContactUpdateRequest.ServReqValues != null)
                        {
                            var TagDtTyp = _ContactUpdateDbContext.ContactAndUpdateStructure.ToList().Where(x =>x.CallType== ServiceRequestDetails.CallType && x.SubType== ServiceRequestDetails.SubType && x.TagName == Tag.TagName.ToString()).Select(x => new { x.TagDtTyp,x.TagDtFormat}).FirstOrDefault();
                            if (TagDtTyp == null)
                            {
                                TagDtTyp = _ContactUpdateDbContext.ContactAndUpdateStructure.ToList().Where(x => x.CallType == 999 && x.SubType == 999 && x.TagName == Tag.TagName.ToString()).Select(x => new { x.TagDtTyp, x.TagDtFormat }).FirstOrDefault();
                            }
                            if (TagDtTyp != null)
                            {
                                if (Tag.TagValue is not null)
                                {                               
                                    var b = IsValueOfType(Tag.TagValue, Type.GetType(TagDtTyp.TagDtTyp), TagDtTyp.TagDtFormat);
                                    if (b == true)
                                    {
                                        ContactUpdate contactUpdate = new ContactUpdate()
                                        {
                                            TagValue = Tag.TagValue.ToString(),
                                            TagName = Tag.TagName,
                                            SrvReqID = ServiceRequestDetails.SrvReqID,
                                            Status = Tag.Status
                                        };
                                        ContactUpdateList.Add(contactUpdate);
                                        flag = 1;
                                    }
                                    else
                                    {
                                        if (TagDtTyp.TagDtTyp == "System.DateTime")
                                        {
                                            flag = 0;
                                            responseMessage.responseHeader.issuccess = false;
                                            responseMessage.responseHeader.apiHeader = "";
                                            responseMessage.responseHeader.message = "Failure";
                                            responseMessage.responseBody.errormessage = "" + Tag.TagName.ToString() + " TagValue Datetime Format Mismatch";
                                            responseMessage.responseBody.errorcode = "";
                                            return new OkObjectResult(responseMessage);
                                        }
                                        else
                                        {
                                            flag = 0;
                                            responseMessage.responseHeader.issuccess = false;
                                            responseMessage.responseHeader.apiHeader = "";
                                            responseMessage.responseHeader.message = "Failure";
                                            responseMessage.responseBody.errormessage = "" + Tag.TagName.ToString() + " TagValue datatype Mismatch";
                                            responseMessage.responseBody.errorcode = "";
                                            return new OkObjectResult(responseMessage);
                                        }
                                    }
                                }
                                else
                                {
                                    flag = 0;
                                    responseMessage.responseHeader.issuccess = false;
                                    responseMessage.responseHeader.apiHeader = "";
                                    responseMessage.responseHeader.message = "Failure";
                                    responseMessage.responseBody.errormessage = "" + Tag.TagName.ToString() + " TagValue Is Empty";
                                    responseMessage.responseBody.errorcode = "";
                                    return new OkObjectResult(responseMessage);
                                }
                            }
                            else
                            {
                                flag = 0;
                                responseMessage.responseHeader.issuccess = false;
                                responseMessage.responseHeader.apiHeader = "";
                                responseMessage.responseHeader.message = "Failure";

                                responseMessage.responseBody.errorcode = "";
                                if (Tag.TagName.ToString() != "")
                                {
                                    responseMessage.responseBody.errormessage = "" + Tag.TagName.ToString() + " TagName Is Wrong";
                                }
                                else
                                {
                                    responseMessage.responseBody.errormessage = "" + Tag.TagName.ToString() + " TagName Is Empty";
                                }
                                return new OkObjectResult(responseMessage);
                            }
                        }

                    }

                    if (flag == 1)
                    {
                        _ContactUpdateDbContext.ContactUpdate.AddRange(ContactUpdateList);
                        _ContactUpdateDbContext.SaveChanges();
                        responseMessage.responseHeader.issuccess = true;
                        responseMessage.responseHeader.message = "Success";
                    }
                }
                else
                {
                    responseMessage.responseHeader.issuccess = false;
                    responseMessage.responseHeader.apiHeader = "";
                    responseMessage.responseHeader.message = "Failure";
                    responseMessage.responseBody.errormessage = "invalid Details";
                    responseMessage.responseBody.errorcode = "";
                }
                return new OkObjectResult(responseMessage);
            }
            catch (Exception ex)
            {
                return new OkObjectResult("Failure");
            }
            
        }
        public static bool IsValueOfType(dynamic value, Type targetType, string datetimeFormat)
        {
            DateTime d;

            if (value != null)
            {
                if (targetType == typeof(string))
                {
                    if (value is string)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else if (targetType == typeof(int))
                {
                    if (value is Int32 || value is int || value is Int16 || value is Int64 || value is UInt16)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }

                }
                else if (targetType == typeof(bool))
                {
                    if (value is bool)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else if (targetType == typeof(decimal) || targetType == typeof(double)|| targetType == typeof(float))
                {
                    if (value is decimal || value is Decimal || (value is double && (double)value == (double)value) || (value is float && (float)value == (float)value))
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }

                else if (targetType == typeof(DateTime))
                {
                    if (value is DateTime || DateTime.TryParseExact(value.ToString(), datetimeFormat, CultureInfo.InvariantCulture, DateTimeStyles.None, out d))
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else if (targetType == typeof(char))
                {
                    if (value is char ||value is Char)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else if (targetType == typeof(byte))
                {
                    if (value is byte ||value is Byte)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                return false;
            }
            else
            {
                return false;
            }
        }


        [FunctionName("GetContactUpdate")]
        public async Task<IActionResult> GetContactUpdate(
           [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
           ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string name = req.Query["name"];

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            ContactUpdateRequest ContactRequest = JsonConvert.DeserializeObject<ContactUpdateRequest>(requestBody);
            List<ContactUpdate> ContactUpdateList = new List<ContactUpdate>();
            var ServiceRequestDetails = _ContactUpdateDbContext.ServRequest.Where(x => x.SrvReqRefNo == ContactRequest.SerReqID.ToString()).SingleOrDefault();
            var ContactUpdate = _ContactUpdateDbContext.ContactUpdate.Where(x => x.SrvReqID.ToString() == ServiceRequestDetails.SrvReqID.ToString()).ToList();
            ContactUpdateRequest contactUpdateRequest = new ContactUpdateRequest()
            {
                SerReqID = "",
                ServReqValues = new List<ServReqValue>(),

            };
             foreach (var con in ContactUpdate)
            {
                contactUpdateRequest.SerReqID = con.SrvReqID.ToString();
                ServReqValue servReqValue = new ServReqValue()
                {
                    Status= con.Status,
                    TagName = con.TagName,
                    TagValue= con.TagValue
                };
                contactUpdateRequest.ServReqValues.Add(servReqValue);
            }
            return new OkObjectResult(contactUpdateRequest);
        }
    }
}
