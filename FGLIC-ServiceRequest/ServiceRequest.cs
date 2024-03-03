using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Net;
using FGLIC_ServiceRequest.Models.DB;
using FGLIC_ServiceRequest.Models.Shared;
using FGLIC_ServiceRequest.Models.Request;
using System.Net.Http;
using System.Text;
using FGLIC_ServiceRequest.Models.Response;
using Microsoft.Extensions.Options;
using FGLIC_ServiceRequest.Services;
using System.Collections.Generic;
using Microsoft.IdentityModel.Tokens;
using System.Security.Permissions;
using System.Linq;
using System.Data.Entity;
using Microsoft.VisualBasic;

namespace FGLIC_ServiceRequest
{
    public class ServiceRequest
    {
        private readonly HttpService _httpService;
        private readonly FGDBContext _gdbContext;
        private readonly CommonService _commonService;
        public ServiceRequest(HttpService httpService, FGDBContext fGDBContext, CommonService commonService)
        {
            _httpService = httpService;
            _gdbContext = fGDBContext;
            _commonService = commonService;
        }
        [FunctionName(nameof(CreateServiceRequest))]
        public async Task<IActionResult> CreateServiceRequest(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Service Request Method is Triggered");
            string requestBody = "";

            string apiUrl = _commonService._apiUrls.LAURLS.PaymentLink;
            try
            {
                // Get Body
                requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                var reqBody = JsonConvert.DeserializeObject<PaymentLinkRequest>(requestBody);

                // Calling FG LIC API
                PaymentLinkFGRequest reqBodyPayment = new()
                {
                    requestHeader = new()
                    {
                        applicationNo = reqBody.ApplicationNo,
                        source = "POS", // Need to change
                        dob = reqBody.DOB,
                        policyNo = reqBody.PolicyNo.ToString()
                    },
                    requestBody = new()
                    {
                        paymentmode = "SI"
                    }
                };
                var laResponse = await _httpService.HttpPostCall<PaymentLinkFGRequest, PaymentLinkFGResponse>(reqBodyPayment, apiUrl);

                if (laResponse.Error == null)
                {
                    string uniquServiceRequest = _commonService.GetUniqueServiceRequestId();
                    var policy = _gdbContext.Policy.Where(x => x.LA_PolicyNo == reqBody.PolicyNo).FirstOrDefault();
                    Policy policyDetails = new()
                    {
                        LA_PolicyNo = reqBody.PolicyNo,
                        FG_ApplNo = reqBody.ApplicationNo,
                    };
                    if (policy == null)
                    {
                        _gdbContext.Policy.Add(policyDetails);
                        _gdbContext.SaveChanges();

                    }
                    ServiceRequestModel sampleRequest = new()
                    {
                        SrvReqID = 0,
                        SrvReqRefNo = uniquServiceRequest,
                        Category = reqBody.Category,
                        CallType = reqBody.CallType,
                        SubType = reqBody.SubType,
                        ReqSource = reqBody.RequestSource,
                        ReqMode = reqBody.RequestMode,
                        PolicyRef = (int)(policy == null ? policyDetails.PolicyRef : policy.PolicyRef),
                        CustomerRef = reqBody.CustomerId,
                        CustRole = reqBody.CustRole,
                        BranchRef = reqBody.BranchId,
                        CurrentStatus = TicketStatus.CLOSED.ToString(),
                        CreatedOn = DateTime.Now,
                        CreatedByRef = reqBody.CreatedByRef,
                        ModifiedOn = DateTime.Now,
                        ModifiedByRef = reqBody.ModifiedByRef
                    };

                    _gdbContext.ServRequest.Add(sampleRequest);
                    _gdbContext.SaveChanges();

                    // Communictation Service API
                    List<CommunicationRequest> communicationRequest = reqBody.CommunicationRequest;
                    
                    foreach (var comm in communicationRequest)
                    {
                        comm.SrvReqRefNo = uniquServiceRequest;

                        string templateUpdated = "";
                        if (comm.CommType == 1)
                        {
                            comm.TemplateID = "13";
                            templateUpdated = string.Format(comm.CommBody, laResponse.ResponseOutput.responseBody.redirectlink.ToString());
                        }
                        else if (comm.CommType == 2)
                        {
                            comm.TemplateID = "14";
                            templateUpdated = string.Format(comm.CommBody, laResponse.ResponseOutput.responseBody.redirectlink.ToString());
                        }

                        comm.CommBody = templateUpdated;
                    }
                        string communicationURL = _commonService._apiUrls.CommonURLS.Email;
                    var communicationResponse = await _httpService.HttpPostCall<List<CommunicationRequest>, List<CommunicationResponse>>(communicationRequest, communicationURL);

                    if (communicationResponse.Error == null)
                    {
                        return new OkObjectResult(uniquServiceRequest);
                    }
                    else
                    {
                        return new OkObjectResult(communicationResponse.Error);
                    }
                }
                else
                {
                    log.LogError("FG API Failed", reqBodyPayment);
                    log.LogInformation(JsonConvert.SerializeObject(reqBodyPayment));
                    log.LogInformation(JsonConvert.SerializeObject(laResponse));
                    return new OkObjectResult(laResponse.Error);
                }
            }
            catch (Exception ex)
            {
                log.LogError(ex.Message);
                log.LogInformation(requestBody);
                return new OkObjectResult(ex.Message);
            }

        }

        [FunctionName(nameof(GetLatestServiceRequests))]
        public async Task<IActionResult> GetLatestServiceRequests(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            string policyNo = req.Query["policyNo"];
            log.LogInformation("Get Latest Service API is triggerd with Policy" + policyNo);
            try
            {
                var policy = _gdbContext.Policy.Where(x => x.LA_PolicyNo == policyNo).FirstOrDefault();
                if (policy == null)
                {
                    List<object> array = new List<object>();
                    return new OkObjectResult(array);
                }

                var masters = _gdbContext.AppMasters;
                var lists = await _gdbContext.ServRequest.Where(x => x.PolicyRef == policy.PolicyRef).OrderByDescending(x => x.CreatedOn)
                    //.Join()
                    .Select(x => new
                    {
                        Date = x.CreatedOn,
                        ServiceNo = x.SrvReqRefNo,
                        x.CallType,
                        CallTypeName = masters.Where(y => y.MstCategory == "CALL_TYP" && y.MstID == x.CallType).FirstOrDefault().MstDesc,
                        x.SubType,
                        SubTypeName = masters.Where(y => y.MstCategory == "SUB_TYP" && y.MstParentID == x.CallType && y.MstID == x.SubType).FirstOrDefault().MstDesc,
                        Status = x.CurrentStatus,
                        Category = masters.Where(y => y.MstCategory == "CATEGORY" && y.MstID == x.Category).FirstOrDefault().MstDesc,
                        CreatedBy = x.CreatedByRef,
                        Source = masters.Where(y => y.MstCategory == "REQST_SOURCE" && y.MstID == x.ReqSource).FirstOrDefault().MstDesc,
                        TAT = 1
                    })
                    .ToListAsync();

                return new OkObjectResult(lists);

            }
            catch (Exception ex)
            {
                log.LogError(ex.Message);
                return new OkObjectResult(ex.Message);
            }
        }
    }
}
