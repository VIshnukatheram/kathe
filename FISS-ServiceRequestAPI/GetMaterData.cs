using FG_STModels.Models.Core;
using FG_STModels.Models.FISS;
using FG_STModels.Models.LifeAsia;
using FG_STModels.Models.Masters;
using FISS_ServiceRequestAPI.Models.Request;
using FISS_ServiceRequestAPI.Models.Shared;
using FISS_ServiceRequestAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;

namespace FISS_ServiceRequestAPI
{
    public class GetMaterData
    {
        private readonly WorkFlowCalls _workFlowCalls;
        private readonly CommonService _CommonService;

        public GetMaterData(WorkFlowCalls workFlowCalls, CommonService commonService)
        {
            _workFlowCalls = workFlowCalls;
            _CommonService = commonService;
        }
        [FunctionName(nameof(GetRaiseRequirements))]
        public IActionResult GetRaiseRequirements(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            try
            {
                int callType = Int32.Parse(req.Query["calltype"]);
                int subType = Int32.Parse(req.Query["subtype"]);
                int Role = Int32.Parse(req.Query["Role"]);
                var listofRequirements = _workFlowCalls.GetRaiseRequirement(callType, subType,Role);
                return new OkObjectResult(listofRequirements);
            }
            catch (Exception ex)
            {
                return new OkObjectResult(ex.Message);
            }

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
                
                return _workFlowCalls.GetMasterData(data.MasterRequest);
            }
            catch (Exception ex)
            {
                log.LogError(ex.Message);
                log.LogInformation(requestBody);
                return new OkObjectResult(ex.Message);
            }
        }

        [FunctionName(nameof(GetMasterTransectionData))]
        public IActionResult GetMasterTransectionData(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Get master Transection Data API is triggerd");
            try
            {
                int callType = Int32.Parse(req.Query["calltype"]);
                int subType = Int32.Parse(req.Query["subtype"]);

                var listofRequirements = _workFlowCalls.GetMasterTransectionData(callType, subType);
                return new OkObjectResult(listofRequirements);
            }
            catch (Exception ex)
            {
                return new OkObjectResult(ex.Message);
            }
        }
        [FunctionName(nameof(GetProcesDocLnk))]
        public IActionResult GetProcesDocLnk(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("GetProcesDocLnk Triggered" );
            try
            {
                string requestBody = new StreamReader(req.Body).ReadToEnd();
                return new OkObjectResult(_workFlowCalls.GetProcesDocLnks(JsonConvert.DeserializeObject<ReqDocList>(requestBody)));
            }
            catch (Exception ex)
            {
                return new OkObjectResult(ex.Message);
            }
        }
        [FunctionName(nameof(GetDocMaster))]
        public IActionResult GetDocMaster(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("GetProcesDocLnk Triggered");
            try
            {
                string requestBody = new StreamReader(req.Body).ReadToEnd();
                return new OkObjectResult(_workFlowCalls.GetDocMaster(JsonConvert.DeserializeObject<ProdDocLnk>(requestBody)));
            }
            catch (Exception ex)
            {
                return new OkObjectResult(ex.Message);
            }
        }
        [FunctionName(nameof(GetProdDocLnk))]
        public IActionResult GetProdDocLnk(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("GetProdDocLnk Triggered");
            try
            {
                string requestBody = new StreamReader(req.Body).ReadToEnd();
                return new OkObjectResult(_workFlowCalls.GetProdDocLnk(JsonConvert.DeserializeObject<ProdDocLnk>(requestBody)));
            }
            catch (Exception ex)
            {
                return new OkObjectResult(ex.Message);
            }
        }
        [FunctionName(nameof(GetBankDeatils))]
        public Task<IActionResult> GetBankDeatils(
           [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
           ILogger log)
        {
            string policyNo = req.Query["policyNo"];
            string clientId = req.Query["clientId"];
            log.LogInformation("Get Bank Deatils triggerd with Policy" + policyNo);
            try
            {
                var bankDtls = _workFlowCalls.GetPolBankData(policyNo, clientId);
                List<PolBankDtls> bank = new List<PolBankDtls> { bankDtls };
                if (bankDtls != null)
                {
          
                    return Task.FromResult<IActionResult>(new OkObjectResult(bank));
                }
                else
                {
                    return Task.FromResult<IActionResult>(new OkObjectResult(bank));
                }
            }
            catch (Exception ex)
            {
                log.LogError(ex.Message);
                return Task.FromResult<IActionResult>(new OkObjectResult(ex.Message));
            }
        }
        [FunctionName(nameof(SearchLocation))]
        public IActionResult SearchLocation(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("SearchLocation Triggered");
            try
            {
                string requestBody = new StreamReader(req.Body).ReadToEnd();
                Search _Search =  JsonConvert.DeserializeObject<Search>(requestBody);
                switch (_Search.searchLocationBy)
                {
                    case SearchLocationBy.State:
                        return new OkObjectResult(null);
                        break;
                    case SearchLocationBy.District:
                        return new OkObjectResult(null);
                        break;
                    case SearchLocationBy.City:
                        return new OkObjectResult(null);
                        break;
                    case SearchLocationBy.Village:
                        return new OkObjectResult(null);
                        break;
                    case SearchLocationBy.PinCode:
                        return new OkObjectResult(_Search.FindLocationByPinCode(_Search.postalCode));
                        break;
                    default:
                        return new OkObjectResult(null);
                        break;
                }
            }
            catch (Exception ex)
            {
                return new OkObjectResult(ex.Message);
            }
        }
        [FunctionName(nameof(SaveEmailResponseDtls))]
        public async Task <IActionResult> SaveEmailResponseDtls(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("SaveEmailResponseDtls Test Triggered");
            try
            {
                EmailMgmt emailMgmt = new EmailMgmt(Environment.GetEnvironmentVariable("SQLConnectionString"));
                string requestBody = new StreamReader(req.Body).ReadToEnd();
                EmailClassify _EmailClassify = JsonConvert.DeserializeObject<EmailClassify>(requestBody);
                ServiceRequestPayload ServReqPayLoad = new ServiceRequestPayload();

                foreach (EmailClassCTST item in _EmailClassify.emailClassCTSTs)
                {
                    #region GetDataFromLifeAsia
                    SearchApiRequest searchApiRequest = new SearchApiRequest();
                    searchApiRequest.requestheader.source = "POS";
                    searchApiRequest.requestheader.policyNo = item.LA_PolicyNo;
                    HttpService httpService = new HttpService();
                    var GetSearchAPIResponse =  await httpService.HttpPostCall<SearchApiRequest , LifeAsiaResponse > (searchApiRequest,string.Format("{0}/POSMicroservice/Generic/api/SearchAPI/GetSearchAPI", _CommonService._apiUrls.LAURLS.BASE_URL));
                    #endregion
                    if (GetSearchAPIResponse.ResponseOutput.responseHeader.issuccess)
                    {
                        foreach (var policy in GetSearchAPIResponse.ResponseOutput.responseBody.searchDetails) 
                        {
                            searchApiRequest.requestheader.carrierCode = "2";
                            searchApiRequest.requestheader.userId = "website";
                            searchApiRequest.requestheader.Branch = "PRA";
                            searchApiRequest.requestheader.userRole = "10";
                            searchApiRequest.requestheader.partnerId = "MPOS";
                            searchApiRequest.requestheader.processId = "POS";
                            searchApiRequest.requestBody.PolicyNumber = item.LA_PolicyNo;
                            var GetPolicyEnquiryResponse = await httpService.HttpPostCall<SearchApiRequest, LifeAsiaResponse>(searchApiRequest, string.Format("{0}/POSMicroservice/PolicyServicing/api/PolicyEnquiry/GetPolicyEnquiry", _CommonService._apiUrls.LAURLS.BASE_URL));
                            if (GetPolicyEnquiryResponse.ResponseOutput.responseHeader.issuccess)
                            {
                                //searchApiRequest.requestheader.monthendExtension = "N"
                                searchApiRequest.requestheader.monthendDate = "09/12/2023";
                                ServReqPayLoad.Category = FG_STModels.Models.Shared.RequestCategory.Request;
                                ServReqPayLoad.CallType = item.CallType;
                                ServReqPayLoad.SubType = item.SubType;
                                ServReqPayLoad.PolicyNo = item.LA_PolicyNo;
                                ServReqPayLoad.RequestDateTime = DateTime.Now;
                                ServReqPayLoad.RequestSource = 1;
                                ServReqPayLoad.RequestChannel = 2;
                                ServReqPayLoad.CustRole = 1;
                                ServReqPayLoad.ReasonDelayed = string.Empty;
                                ServReqPayLoad.PolicyStatus = policy.policyStatus;
                                ServReqPayLoad.Plan = GetPolicyEnquiryResponse.ResponseOutput.responseBody.ctypedes;
                                ServReqPayLoad.ProposerName = GetPolicyEnquiryResponse.ResponseOutput.responseBody.ownername;
                                ServReqPayLoad.DOB = string.Empty;
                                ServReqPayLoad.CustSignDateTime = DateTime.Now;
                                ServReqPayLoad.RequestDateTime = DateTime.Now;
                                ServReqPayLoad.TransactionData = new List<TransactionData>();
                                ServReqPayLoad.Uploads = new List<FG_STModels.Models.OmniDocs.DMSLinks>();
                                ServiceRequest sampleRequest = _workFlowCalls.CreateServiceRequest(ServReqPayLoad);
                                item.serviceRequest = sampleRequest;
                                item.SrvReqRefNo = sampleRequest.SrvReqRefNo;
                                item.SrvReqID = sampleRequest.SrvReqID;
                            }
                        }
                    }
                }
                return new OkObjectResult(emailMgmt.SaveEmailClassify(_EmailClassify));
            }
            catch (Exception ex)
            {
                return new OkObjectResult(ex.Message);
            }
        }
        [FunctionName(nameof(GetPlanFundMst))]
        public async Task<IActionResult> GetPlanFundMst(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("Get GetPlanFundMst is triggerd");
            string requestBody = "";
            try
            {
                requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                return _workFlowCalls.GetPlanFundMst(JsonConvert.DeserializeObject<PlanFundMst>(requestBody));
            }
            catch (Exception ex)
            {
                log.LogError(ex.Message);
                log.LogInformation(requestBody);
                return new OkObjectResult(ex.Message);
            }
        }

        [FunctionName(nameof(GetAssistanceDetails))]
        public IActionResult GetAssistanceDetails(
          [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
          ILogger log)
        {
            try
            {
                int callType = Int32.Parse(req.Query["calltype"]);
                int subType = Int32.Parse(req.Query["subtype"]);

                var listofRequirements = _workFlowCalls.GetAssistanceDetails(callType, subType);
                return new OkObjectResult(listofRequirements);
            }
            catch (Exception ex)
            {
                return new OkObjectResult(ex.Message);
            }

        }
    }
}