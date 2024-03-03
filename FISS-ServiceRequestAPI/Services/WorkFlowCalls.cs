using FG_STModels.BL.OmniDoc;
using FG_STModels.Models.Comms;
using FG_STModels.Models.Core;
using FG_STModels.Models.FISS;
using FG_STModels.Models.LifeAsia;
using FG_STModels.Models.Masters;
using FG_STModels.Models.OmniDocs;
using FISS_ServiceRequestAPI.Models.DB;
using FISS_ServiceRequestAPI.Models.Request;
using FISS_ServiceRequestAPI.Models.Response;
using FISS_ServiceRequestAPI.Models.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace FISS_ServiceRequestAPI.Services
{
    public class WorkFlowCalls
    {
        private readonly HttpService _httpService;
        private readonly FGDBContext _gdbContext;
        private readonly CommonService _commonService;
        private readonly ILogger _logger;

        public WorkFlowCalls(HttpService httpService, FGDBContext fGDBContext, CommonService commonService, ILogger<WorkFlowCalls> logger)
        {
            _httpService = httpService;
            _gdbContext = fGDBContext;
            _commonService = commonService;
            _logger = logger;
        }
        public async Task<Response<List<CommunicationResponse>>> CommunicationCall(List<CommunicationRequest> communicationRequest)
        {
            string communicationURL = _commonService._apiUrls.CommonURLS.Email;
            var communicationResponse = await _httpService.HttpPostCall<List<CommunicationRequest>, List<CommunicationResponse>>(communicationRequest, communicationURL);
            return communicationResponse;
        }
        public PolBankDtls GetPolBankData(string Policy_No, string Client_Id)
        {
            PolBankDtls pol = _gdbContext.PolBankDtl.AsNoTracking().FirstOrDefault(x => x.LA_PolicyNo == Policy_No && x.LA_CustomerID == Client_Id);
            return pol;
        }
        public Policy GetPolicy(string policyNo)
        {
            return _gdbContext.Policy.Where(x => x.LA_PolicyNo == policyNo).FirstOrDefault();
        }
        public Customer GetCustomer(string customerNo)
        {
            return _gdbContext.Customers.Where(x => x.LA_CustomerID == customerNo).FirstOrDefault();
        }
        public ServiceRequest CreateServiceRequest(ServiceRequestPayload reqBody)
        {
            // Create Service request
            string uniquServiceRequest = _commonService.GetUniqueServiceRequestId();

            // Policy Check
            var policy = GetPolicy(reqBody.PolicyNo);
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

            // Customer Check
            var customer = GetCustomer(reqBody.CustomerId);
            Customer customerDetails = new()
            {
                LA_CustomerID = reqBody.CustomerId
            };
            if (customer == null)
            {
                _gdbContext.Customers.Add(customerDetails);
                _gdbContext.SaveChanges();
            }

            List<ServRequestDtls> transectionDatas = new();
            foreach (var data in reqBody.TransactionData)
            {
                ServRequestDtls serviceRequestTransectionData = new()
                {
                    ServRequestDtlId = 0,
                    SrvReqID = 0,
                    Status = data.Status,
                    TagName = data.TagName,
                    TagValue = data.TagValue
                };
                transectionDatas.Add(serviceRequestTransectionData);
            }

            List<DMSLinks> dmsLinkList = new();
            foreach (var data in reqBody.Uploads)
            {
                DMSLinks dMSLink = new()
                {
                    SrvReqID = 0,
                    UploadedOn = DateTime.UtcNow,
                    UploadedBy = data.UploadedBy,
                    UserID = data.UserID,
                    IndexName = data.IndexName,
                    DocumentName = data.DocumentName,
                    DocumentSize = data.DocumentSize,
                    FileLocation = data.FileLocation,
                    SentToDMS = false,
                    SentToDMSOn = null,
                    BlobFileName = data.BlobFileName,
                    FileExtnMime = data.FileExtnMime
                };
                dmsLinkList.Add(dMSLink);
                #region Sync Uploaded images into DMS Omnidocs
                OmniDocFunctions omniDocFunctions = new OmniDocFunctions();
                omniDocFunctions.UploadFile(ref dMSLink, policyDetails, _gdbContext.AppMasters);
                #endregion
            }

            ServiceRequest sampleRequest = new()
            {
                SrvReqID = 0,
                SrvReqRefNo = uniquServiceRequest,
                Category =  (short)reqBody.Category,
                CallType = reqBody.CallType,
                SubType = reqBody.SubType,
                ReqSource = reqBody.RequestSource,
                ReqMode = reqBody.RequestChannel,
                PolicyRef = (int)(policy == null ? policyDetails.PolicyRef : policy.PolicyRef),
                CustomerRef = (int)(customer == null ? customerDetails.CustomerRef : customer.CustomerRef),
                CustRole = reqBody.CustRole,
                BranchRef = reqBody.BranchId,
                CurrentStatus = reqBody.Category == FG_STModels.Models.Shared.RequestCategory.Request ? TicketStatus.OPEN.ToString() : TicketStatus.CLOSED.ToString(),
                CreatedOn = DateTime.Now,
                CreatedByRef = reqBody.CreatedByRef,
                ModifiedOn = DateTime.Now,
                ModifiedByRef = reqBody.ModifiedByRef,
                TransactionPayload = null,
                ReasonDelayed = reqBody.ReasonDelayed,
                ReasonForChange = reqBody.ReasonForChange,
                RequestDateTime = reqBody.RequestDateTime,
                CustSignDateTime = reqBody.CustSignDateTime,
                PolicyStatus = reqBody.PolicyStatus,
                PlanName = reqBody.Plan,
                ProposerName = reqBody.ProposerName,
                CommunicationPayload = JsonConvert.SerializeObject(reqBody.CommunicationRequest),
                DOB = reqBody.DOB,
                ServiceRequestTransectionData = transectionDatas,
                DMSLink = dmsLinkList.Count() == 0 ? null : dmsLinkList

            };

            _gdbContext.ServRequest.Add(sampleRequest);
            _gdbContext.SaveChanges();

            sampleRequest.TAT = GetTATValue(sampleRequest.CallType, sampleRequest.SubType);
            _logger.LogInformation("Service Request Created Successfully");
            return sampleRequest;

        }
        public ServiceRequest UpdateServiceRequest(ServiceRequestPayload updatedReqBody)
        {
            var serviceRequest = _gdbContext.ServRequest.Where(x => x.SrvReqID == updatedReqBody.SrvReqID)
                                    .Include(x => x.ServiceRequestTransectionData).FirstOrDefault();
            if(serviceRequest != null)
            {

                // Customer Check
                var customer = GetCustomer(updatedReqBody.CustomerId);
                Customer customerDetails = new()
                {
                    LA_CustomerID = updatedReqBody.CustomerId
                };
                if (customer == null)
                {
                    _gdbContext.Customers.Add(customerDetails);
                    _gdbContext.SaveChanges();
                }
                serviceRequest.ReqSource = updatedReqBody.RequestSource;
                serviceRequest.ReqMode = updatedReqBody.RequestChannel;
                serviceRequest.CustomerRef = (int)(customer == null ? customerDetails.CustomerRef : customer.CustomerRef);
                serviceRequest.CustRole = updatedReqBody.CustRole;
                serviceRequest.ModifiedOn = DateTime.Now;
                serviceRequest.ModifiedByRef = updatedReqBody.ModifiedByRef;
                serviceRequest.ReasonDelayed = updatedReqBody.ReasonDelayed;
                serviceRequest.ReasonForChange = updatedReqBody.ReasonForChange;
                serviceRequest.RequestDateTime = updatedReqBody.RequestDateTime;
                serviceRequest.CustSignDateTime = updatedReqBody.CustSignDateTime;

                foreach (var data in updatedReqBody.TransactionData)
                {
                    var transData = serviceRequest.ServiceRequestTransectionData.Where(x => x.TagName == data.TagName).LastOrDefault();
                    if(transData == null)
                    {
                        ServRequestDtls serviceRequestTransectionData = new()
                        {
                            ServRequestDtlId = 0,
                            SrvReqID = serviceRequest.SrvReqID,
                            Status = data.Status,
                            TagName = data.TagName,
                            TagValue = data.TagValue
                        };
                        serviceRequest.ServiceRequestTransectionData.Add(serviceRequestTransectionData);
                    }
                    else
                    {
                        transData.TagValue = data.TagValue;
                    }
                }

                _gdbContext.SaveChanges();
            }
            return serviceRequest;
        }
        public int GetTATValue(int callType, int subType)
        {
            return _gdbContext.TATInfo.Where(x => x.CallType == callType && x.SubType == subType).FirstOrDefault()?.TAT ?? 0;
        }
        public List<POSList> GetPOSListServiceRequests(string role, string userId)
        {
            var ServiceReq = _gdbContext.UserIndex
                    .Where(x => x.RoleID.ToString() == role && x.UsrID == userId)
                    .Join(_gdbContext.ServRequest.Include(x => x.ServiceRequestTransectionData).Where(x => x.CurrentStatus == "PENDING"), x => x.SrvReqID, y => y.SrvReqID, (x, y) => new { ServRequest = y, UserIndex = x, TransectionData = y.ServiceRequestTransectionData})
                    .ToList();

            var masters = _gdbContext.AppMasters;
            //var UserIndex = _gdbContext.UserIndex;
            var Lists = ServiceReq
               .Select(x => new POSList
               {
                   Date = x.ServRequest.CreatedOn,
                   SrvReqID = x.ServRequest.SrvReqID,
                   ServiceNo = x.ServRequest.SrvReqRefNo,
                   PolicyNo = _gdbContext.Policy
                       .Where(y => y.PolicyRef == x.ServRequest.PolicyRef)
                       .FirstOrDefault()?.LA_PolicyNo,
                   CallType = x.ServRequest.CallType,
                   CallTypeName = masters.AsNoTracking()
                       .Where(y => y.MstCategory == "CALL_TYP" && y.MstID == x.ServRequest.CallType)
                       .FirstOrDefault()?.MstDesc,
                   SubType = x.ServRequest.SubType,
                   SubTypeName = masters.AsNoTracking()
                       .Where(y => y.MstCategory == "SUB_TYP" && y.MstParentID == x.ServRequest.CallType && y.MstID == x.ServRequest.SubType)
                       .FirstOrDefault()?.MstDesc,
                   Status = x.ServRequest.CurrentStatus,
                   PolicyStatus = x.ServRequest.PolicyStatus,
                   Plan = x.ServRequest.PlanName,
                   ProposerName = x.ServRequest.ProposerName,
                   AssignedToUser = x.ServRequest.AssignedToUser.ToString(),
                   AssignedToRole = x.ServRequest.AssignedToRole,
                   DOB = x.ServRequest.DOB,
                   POName = x.ServRequest.ProposerName,
                   ProductType = x.ServRequest.ServiceRequestTransectionData?.Where(x => x.TagName == "ProductType").FirstOrDefault()?.TagValue,
                   APE = x.ServRequest.ServiceRequestTransectionData?.Where(x => x.TagName == "APE").FirstOrDefault()?.TagValue,
                   RCD = x.ServRequest.ServiceRequestTransectionData?.Where(x => x.TagName == "RCD").FirstOrDefault()?.TagValue,
                   TransectionData = x.ServRequest.ServiceRequestTransectionData

               }).OrderByDescending(x=> x.Date)
               .ToList() ;


            return Lists;

        }
        public ServiceRequest GetServiceRequest(string serviceRequestId)
        {
            var servicereq = _gdbContext.ServRequest.Where(x => x.SrvReqRefNo == serviceRequestId)
                                .Include(x => x.ServiceRequestTransectionData)
                                .FirstOrDefault();
            return servicereq;
        }
        public List<DeDupData> GetDeDupPayload(string serviceRequestId)
        {
            var servicereq = _gdbContext.DeDupData.Where(x => x.SrvReqRefNo == serviceRequestId).ToList();
            return servicereq;
        }
        // Recent Six Months Any Changes ON Policy Level
        public string GetRecentModificationOnPolicy(int policyRefNo)
        {
            return "no";
        }

        public string GetPolicyNo(int policyRefNo)
        {
            var policy = _gdbContext.Policy.Where(x => x.PolicyRef == policyRefNo).FirstOrDefault();

            return policy?.LA_PolicyNo;
        }
        // Recent Six Months Any Changes ON Policy Level of persanal Details
        public string GetRecentPersonalDetailsModificationOnPolicy(int policyRefNo)
        {
            int[] callTypes = { 5, 6 };
            int countOfSerReq = _gdbContext.ServRequest.Where(x => x.PolicyRef == policyRefNo && callTypes.Contains(x.CallType)).Count();
            return countOfSerReq > 0 ? "yes" : "no";
        }
        public ServCommTemplate GetTemplateId(int callType, int subType, int commType, string status)
        {
            return _gdbContext.ServCommTemplates.Where(x => x.CallType == callType && x.SubType == subType && x.CommType == commType && x.TemplateDesc == status).FirstOrDefault();
        }
        public List<RaiseRequirementResponse> GetRaiseRequirement(int callType, int subType ,int role)
        {
            var listofRaiseReq = new List<RaiseRequirementResponse>();
            if (role == 0)
            {
                 listofRaiseReq = _gdbContext.RaiseRequirements.Where(x => x.CallType == callType && x.SubType == subType)
                                .Join(_gdbContext.AppMasters.Where(x => x.MstCategory == MasterCategorys.RAISE_REQMNT.ToString()), x => x.RaiseReqId, y => y.MstID, (x, y) => new { RasieReq = x, Master = y })
                                .Select(x => new RaiseRequirementResponse
                                {
                                    CallType = x.RasieReq.CallType,
                                    SubType = x.RasieReq.SubType,
                                    RaiseReqId = x.RasieReq.RaiseReqId,
                                    RaiseReqDesc = x.Master.MstDesc,
                                    Status = x.RasieReq.Status
                                })
                                .ToList();

                return listofRaiseReq;
            }
            else
            {
                 listofRaiseReq = _gdbContext.AppMasters.Where(x => x.MstCategory == MasterCategorys.RAISE_REQMNT_BOE.ToString()).Select(x => new RaiseRequirementResponse
                {
                    CallType = 0,
                    SubType = 0,
                    RaiseReqId =0,
                    RaiseReqDesc =x.MstDesc,
                    Status =""
                }).ToList();
               return listofRaiseReq;
            }
        }
        public async Task<dynamic> ContactTypeWorkFlowCallForBOE(ServiceRequest communicationRequest)
        {
            string contactNumUpdateURL = _commonService._apiUrls.WorkFlowURLS.ContactNumberUpdate;
            var communicationResponse = await _httpService.HttpPostCall<ServiceRequest , dynamic>(communicationRequest, contactNumUpdateURL);
            return communicationResponse;
        }
        public async Task<dynamic> GenericSerReqQuery(ServiceRequest communicationRequest)
        {
            string contactNumUpdateURL = _commonService._apiUrls.WorkFlowURLS.GenericSerReqQuery;
            var communicationResponse = await _httpService.HttpPostCall<ServiceRequest , dynamic>(communicationRequest, contactNumUpdateURL);
            return communicationResponse;
        }
        public async Task<dynamic> SurrenderWorkFlowCallForQuery(ServiceRequest serviceRequest)
        {
            string surrenderQueryURL = _commonService._apiUrls.WorkFlowURLS.SurrenderQuery;
            var workFlowResponse = await _httpService.HttpPostCall<ServiceRequest , dynamic>(serviceRequest, surrenderQueryURL);
            return workFlowResponse;
        }
        public async Task<dynamic> SurrenderWorkFlowCallForRequest(POSWorkFlowPayload pOSWorkFlowPayload)
        {
            string surrenderQueryURL = _commonService._apiUrls.WorkFlowURLS.SurrenderRequest;
            var workFlowResponse = await _httpService.HttpPostCall<POSWorkFlowPayload, dynamic>(pOSWorkFlowPayload, surrenderQueryURL);
            return workFlowResponse;
        }
        public async Task<dynamic> PaymentReprocessingWorkFlowCallForRequest(POSWorkFlowPayload pOSWorkFlowPayload)
        {
            string surrenderQueryURL = _commonService._apiUrls.WorkFlowURLS.PaymentReprocessing;
            var workFlowResponse = await _httpService.HttpPostCall<POSWorkFlowPayload, dynamic>(pOSWorkFlowPayload, surrenderQueryURL);
            return workFlowResponse;
        }
        public async Task<dynamic> ContactTypeWorkFlowCallForPOS(POSWorkFlowPayload pOSWorkFlowPayload)
        {
            string contactNumUpdateURL = _commonService._apiUrls.WorkFlowURLS.ContactNumberUpdateForPOS;
            var communicationResponse = await _httpService.HttpPostCall<POSWorkFlowPayload, dynamic>(pOSWorkFlowPayload, contactNumUpdateURL);
            return communicationResponse;
        }
        public async Task<IActionResult> GetBOEListServiceRequests(long policyRef)
        {
            var masters = _gdbContext.AppMasters;
            var tatInfo = _gdbContext.TATInfo;
            var lists = await _gdbContext.ServRequest.Where(x => x.PolicyRef == policyRef).OrderByDescending(x => x.CreatedOn)
                            .Select(x => new BOELatestRequestList
                            {
                                Date = x.CreatedOn,
                                ServiceNo = x.SrvReqRefNo,
                                CallType = x.CallType,
                                CallTypeName = masters.Where(y => y.MstCategory == "CALL_TYP" && y.MstID == x.CallType).FirstOrDefault().MstDesc,
                                SubType = x.SubType,
                                SubTypeName = masters.Where(y => y.MstCategory == "SUB_TYP" && y.MstParentID == x.CallType && y.MstID == x.SubType).FirstOrDefault().MstDesc,
                                Status = x.CurrentStatus,
                                Category = masters.Where(y => y.MstCategory == "CATEGORY" && y.MstID == (long) x.Category).FirstOrDefault().MstDesc,
                                CreatedBy = x.CreatedByRef,
                                Source = masters.Where(y => y.MstCategory == "REQST_SOURCE" && y.MstID == x.ReqSource).FirstOrDefault().MstDesc,
                                ClosedDate = x.ModifiedOn,
                                CurrentTAT = 0,
                                TAT = tatInfo.Where(y => y.CallType == x.CallType && y.SubType == x.SubType).FirstOrDefault() == null ? 0 : tatInfo.Where(y => y.CallType == x.CallType && y.SubType == x.SubType).FirstOrDefault().TAT,
                            })
                            .ToListAsync();
            foreach(var item in lists)
            {
                if(item.Status == TicketStatus.CLOSED.ToString())
                {
                    item.CurrentTAT = (item.ClosedDate - item.Date).Days;
                }
                else
                {
                    item.CurrentTAT = (DateTime.Now - item.Date).Days;
                }
            }
            return new OkObjectResult(lists);
        }
        public IActionResult GetMasterData(string[] data)
        {
            var lists = _gdbContext.AppMasters.Where(x => data.Contains(x.MstCategory))
                           .GroupBy(x => x.MstCategory).Select(x => new { x.Key, Value = (_gdbContext.AppMasters.Where(y => y.MstCategory == x.Key )
                           .Select(col => new { col.MstCategory, col.MstID, col.MstDesc, col.MstParentID } ))}).ToList();
            return new OkObjectResult(lists);
        }
        public List<MaterTransectionData> GetMasterTransectionData(int callType, int subType)
        {
            return _gdbContext.MaterTransectionData.Where(x => x.CallType == callType && x.SubType == subType).ToList();
        }
        
        public ServiceRequestTransection POSActions(POSPayload payload, ServiceRequest serReq)
        {
            List<ServRequestDtls> transectionDatas = new();
            foreach (var data in payload?.TransactionPayload)
            {
                ServRequestDtls serviceRequestTransectionData = new()
                {
                    ServRequestDtlId = 0,
                    SrvReqID = serReq.SrvReqID,
                    Status = data.Status,
                    TagName = data.TagName,
                    TagValue = data.TagValue
                };
                transectionDatas.Add(serviceRequestTransectionData);
            }

            ServiceRequestTransection transactiondata = new()
            {
                SrvReqRefNo = payload.SrvReqRefNo,
                TransactionPayload = null,
                Comments = payload.Comments,
                RequirementComments = payload.RequirementComments,
                RequirementList = JsonConvert.SerializeObject(payload.RequirementList),
                Status = payload.Status.ToUpper(),
            };
            try
            {
                _gdbContext.ServiceRequestTransectionData.AddRange(transectionDatas);
                _gdbContext.ServiceRequestTransections.Add(transactiondata);
                _gdbContext.SaveChanges();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
            }
            return transactiondata;
        }
        public string GetSubTypeName(int callType, int subtype)
        {
            return _gdbContext.AppMasters.Where(x => x.MstParentID == callType && x.MstID == subtype && x.MstCategory == "SUB_TYP").FirstOrDefault()?.MstDesc;
        }
        public List<BankIFSC> GetIFSCCode(string BankIFSC)
        {
            BankIFSC New = new BankIFSC();
            List<BankIFSC> fg = new List<BankIFSC>();
            New = _gdbContext.BankIFSC.Where(x => x.IFSC == BankIFSC).FirstOrDefault();
            New.BANK= New.BANK +"-"+New.BRANCH;
            fg.Add(New);
            return fg;
        }
        public List<ProcesDocLnk> GetProcesDocLnks(ReqDocList reqDocList)
        {
            return _gdbContext.ProcesDocLnk.
                Where(x => x.CALL_TYP == reqDocList.Call_Typ && x.SUB_TYP == reqDocList.Sub_Typ).ToList<ProcesDocLnk>();
        }
        public dynamic GetDocMaster(ProdDocLnk reqDocList)
        {
            var lstDocType = _gdbContext.ProdDocLnk.
                Where(x => x.ProdType == reqDocList.ProdType && x.ProdCode == reqDocList.ProdCode && x.ProdUIN == reqDocList.ProdUIN)
                .Select(x => new { x.DocType }).
            Union(_gdbContext.ProcesDocLnk.
            Where(x => x.CALL_TYP == reqDocList.CALL_TYP && x.SUB_TYP == reqDocList.SUB_TYP)
            .Select(x => new { x.DocType })).ToList();
            return lstDocType;
        }
        public List<ProdDocLnk> GetProdDocLnk(ProdDocLnk reqDocList)
        {
            if (reqDocList.CALL_TYP != null && reqDocList.SUB_TYP != null)
            {
                return _gdbContext.ProdDocLnk.AsNoTracking().AsParallel().
                    Where(x => x.ProdType == reqDocList.ProdType && x.ProdCode == reqDocList.ProdCode &&
                               x.CALL_TYP == reqDocList.CALL_TYP && x.SUB_TYP == reqDocList.SUB_TYP && x.ProdUIN == reqDocList.ProdUIN
                               ).ToList<ProdDocLnk>();
            }
            else
            {
                return _gdbContext.ProdDocLnk.AsNoTracking().AsParallel().
                    Where(x => x.ProdType == reqDocList.ProdType && x.ProdCode == reqDocList.ProdCode && x.ProdUIN == reqDocList.ProdUIN).ToList<ProdDocLnk>();

            }
        }
        public async Task<dynamic> RaiseCloseFlow(ServiceRequest serviceRequest)
        {
            string surrenderQueryURL = _commonService._apiUrls.WorkFlowURLS.RaiseCloseFlow;
            var workFlowResponse = await _httpService.HttpPostCall<ServiceRequest, dynamic>(serviceRequest, surrenderQueryURL);
            return workFlowResponse;
        }

        public List<FinanceDownlaodResponse> GetFinanceList(FinanceDownloadRequest request)
        {
            try
            {
                var userReq = _gdbContext.UserIndex
                    .Where(x => x.RoleID == 10 && request.FromDate < x.AllocatedOn && request.ToDate > x.AllocatedOn)
                    .Join(_gdbContext.ServRequest.Include(x => x.ServiceRequestTransectionData), x => x.SrvReqID, y => y.SrvReqID, (x, y) => new { ServiceRequst = y, UserIndex = x })
                    .Join(_gdbContext.AllocPayees.Where(x => x.IsDownloaded == false), a => a.ServiceRequst.SrvReqID, b => b.SrvReqID, (a, b) => new { AllocRecord = b, a.ServiceRequst })
                    .Select(x =>
                       new FinanceDownlaodResponse
                       {
                           TransactionType = x.ServiceRequst.ServiceRequestTransectionData.Where(y => y.TagName == "PaymentMode").FirstOrDefault().TagValue == "C" ? "C": "N",
                           BeneficiaryAccountNumber = x.ServiceRequst.ServiceRequestTransectionData.Where(y => y.TagName == "BankAccountNumber").FirstOrDefault().TagValue,
                           IFSCCode = x.ServiceRequst.ServiceRequestTransectionData.Where(y => y.TagName == "BankIFSC").FirstOrDefault().TagValue,
                           InstrumentAmount = x.ServiceRequst.ServiceRequestTransectionData.Where(y => y.TagName == "PayableAmount").FirstOrDefault().TagValue,
                           BeneficiaryName = x.ServiceRequst.ServiceRequestTransectionData.Where(y => y.TagName == "NameAsMentionedInTheBank").FirstOrDefault().TagValue,
                           DraweeLocation = x.ServiceRequst.ServiceRequestTransectionData.Where(y => y.TagName == "PaymentMode").FirstOrDefault().TagValue == "C" ? "MUMBAI" : "",
                           PrintLocation = x.ServiceRequst.ServiceRequestTransectionData.Where(y => y.TagName == "PaymentMode").FirstOrDefault().TagValue == "C" ? "MUMBAI" : "",
                           BlankForNEFT1 = x.ServiceRequst.ServiceRequestTransectionData.Where(y => y.TagName == "Address1").FirstOrDefault().TagValue, // Addree Only For Check
                           BeneAddress2 = x.ServiceRequst.ServiceRequestTransectionData.Where(y => y.TagName == "Address2").FirstOrDefault().TagValue,  // Addree Only For Check
                           BlankForNEFT2 = x.ServiceRequst.ServiceRequestTransectionData.Where(y => y.TagName == "Address3").FirstOrDefault().TagValue,  // Addree Only For Check
                           BeneAddress4 = x.AllocRecord.PayeeCd,
                           BeneAddress5 = _gdbContext.Policy.Where(y => y.PolicyRef == x.ServiceRequst.PolicyRef).FirstOrDefault().LA_PolicyNo,
                           InstructionReferenceNumber = "", // Given By Department
                           CustomerReferenceNumber = _gdbContext.AppMasters.Where(y => y.MstCategory == "CALL_TYP" && y.MstID == x.ServiceRequst.CallType).FirstOrDefault().MstDesc,
                           PaymentDetails1 = _gdbContext.Policy.Where(y => y.PolicyRef == x.ServiceRequst.PolicyRef).FirstOrDefault().LA_PolicyNo,
                           PaymentDetails2 = "GROSS AMOUNT",
                           PaymentDetails3 = x.ServiceRequst.ServiceRequestTransectionData.Where(y => y.TagName == "PayableAmount").FirstOrDefault().TagValue,
                           PaymentDetails4 = "TDS AMOUNT",
                           PaymentDetails5 = "",
                           PaymentDetails6 = "NET PAYABLE",
                           PaymentDetails7 = x.ServiceRequst.ServiceRequestTransectionData.Where(y => y.TagName == "PayableAmount").FirstOrDefault().TagValue,
                           ChequeNo = x.ServiceRequst.ServiceRequestTransectionData.Where(y => y.TagName == "PaymentMode").FirstOrDefault().TagValue == "C" ? x.AllocRecord.AllocPayeeID.ToString() : "", // Unique Check No 
                           ChqTrnDate = DateTime.Now.ToString(),
                           MICRNumber = "",
                           BeneBankName = x.ServiceRequst.ServiceRequestTransectionData.Where(y => y.TagName == "BankName").FirstOrDefault().TagValue,
                           BeneBankBranchName = "",
                           BeneficiaryEmailId = "",
                           BankReference = "",
                           PayeeCode = x.AllocRecord.PayeeCd,
                           PolicyNo = _gdbContext.Policy.Where(y => y.PolicyRef == x.ServiceRequst.PolicyRef).FirstOrDefault().LA_PolicyNo,
                           UserName = x.ServiceRequst.ModifiedByRef,
                           DOAL1 = "",
                           DOAL2 = "",
                           DOAL3 = "",
                           CEO = "",
                           CFO = "",
                           SentToBankFlagging = "",
                       }
                    )
                    .ToList();

                var serReqForUpdates = _gdbContext.UserIndex
                     .Where(x => x.RoleID == 10 && request.FromDate < x.AllocatedOn && request.ToDate > x.AllocatedOn)
                     .Join(_gdbContext.AllocPayees.Where(x => x.IsDownloaded == false), a => a.SrvReqID, b => b.SrvReqID, (a, b) => new { AllocRecord = b, a }).ToList();
                foreach (var data in serReqForUpdates)
                {
                    data.AllocRecord.IsDownloaded = true;
                    data.AllocRecord.DownloadedOn = DateTime.Now;
                    data.AllocRecord.DownloadedBy = "Finance";
                }
                _gdbContext.SaveChanges();

                //.Join(_gdbContext.AllocPayees, a => a.ServiceRequst.SrvReqID, b => b.SrvReqID, (a, b) => new { AllocRecord = b, a.ServiceRequst })

                return userReq;
            } catch(Exception ex)
            {
                _logger.LogError(ex.Message);
                return null;
            }
        }
        
        public void AssignToPaymentAssistance(ServiceRequest serviceRequest)
        {
            UserIndex assignToPaymentAssistance = new()
            {
                UserIndexID = 0,
                SrvReqID = serviceRequest.SrvReqID,
                UsrID = "paymentassistance",
                RoleID = 12,
                AllocatedOn = DateTime.Now,
                BranchID = serviceRequest.BranchId.ToString(),
                ReqSignedOn = serviceRequest.RequestDateTime
            };

            _gdbContext.UserIndex.Add(assignToPaymentAssistance);
            _gdbContext.SaveChanges();
        }
        public DnD_LIST GetDNDData(string policyNo,string mobileNo)
        {
            var policy = _gdbContext.Policy.Where(x => x.LA_PolicyNo == policyNo).FirstOrDefault();
            if (policy == null)
            {
                return null;
            }
            else
            {
                return _gdbContext.DnD_LIST.Where(x => x.PolicyRef == policy.PolicyRef && x.DndCntctNo == mobileNo).FirstOrDefault();
            }
        }
        public IActionResult GetPlanFundMst(PlanFundMst planFundMst)
        {
            return new OkObjectResult(_gdbContext.PlanFundMst.Where(x => x.Plan_Code == planFundMst.Plan_Code));
        }
        public void InsertListOfPayeeCodeAuthorization(List<PayeeTransaction> payeeTransactions)
        {
            _gdbContext.PayeeTransaction.AddRange(payeeTransactions);
            _gdbContext.SaveChanges();
        }
        public void InsertListOfCheckStatus(List<ChequeStatus> chequeStatuses)
        {
            _gdbContext.ChequeStatus.AddRange(chequeStatuses);
            _gdbContext.SaveChanges();
        }
        public void InsertListOfInterestCommunication(List<InterestCommunication> interestCommunications)
        {
            _gdbContext.InterestCommunications.AddRange(interestCommunications);
            _gdbContext.SaveChanges();
        }

        public dynamic GetPaymentReprocessingData(string policyNo, int callType, int subType)
        {
            var record = _gdbContext.Policy.Where(x => x.LA_PolicyNo == policyNo)
                             .Join(_gdbContext.ServRequest, x => x.PolicyRef, y => y.PolicyRef, (x, y) => new { policy = x })
                             .Select(x => new { policy = x }).ToList();
            return record;
        }
        public List<AssistanceResponse> GetAssistanceDetails(int callType, int subType)
        {
            var listofRaiseReq = _gdbContext.Assistance.Where(x => x.CallType == callType && x.SubType == subType)
                            .Join(_gdbContext.AppMasters.Where(x => x.MstCategory == MasterCategorys.ASSISTANCE.ToString()), x => x.AssistanceId, y => y.MstID, (x, y) => new { AssiReq = x, Master = y })
                            .Select(x => new AssistanceResponse
                            {
                                CallType = x.AssiReq.CallType,
                                SubType = x.AssiReq.SubType,
                                AssistanceId = x.AssiReq.AssistanceId,
                                AssistanceDesc = x.Master.MstDesc,
                                Status = x.AssiReq.Status
                            })
                            .ToList();

            return listofRaiseReq;
        }
        public TransectionPayouts GetTransectionPayouts(string policyNo, int callType, int subType)
        {
            var policyRecord = _gdbContext.Policy.Where(x => x.LA_PolicyNo == policyNo).FirstOrDefault();
            if(policyRecord == null)
            {
                return null;
            }
            var serviceReq  = _gdbContext.ServRequest
                                .Where(x => x.CallType == callType && x.SubType == subType && x.PolicyRef == policyRecord.PolicyRef)
                                .OrderByDescending(x => x.CreatedOn).FirstOrDefault();
            if(serviceReq == null)
            {
                return null;
            }
            var transectionDataForSR = _gdbContext.ServiceRequestTransectionData.Where(x => x.SrvReqID == serviceReq.SrvReqID).ToList();
            TransectionPayouts payouts = new()
            {
                TypeOfPayOut = _gdbContext.AppMasters.Where(x => x.MstCategory == "CALL_TYP" && x.MstID == callType).FirstOrDefault()?.MstDesc,
                FundTransfer = transectionDataForSR.Where(x => x.TagName == "FundTransfer").FirstOrDefault()?.TagValue ?? "",
                FundTransferAmount = transectionDataForSR.Where(x => x.TagName == "FundTransferAmount").FirstOrDefault()?.TagValue ?? "",
                FundTransderTo = transectionDataForSR.Where(x => x.TagName == "FundTransferTo").FirstOrDefault()?.TagValue ?? "",
                RequestDate = serviceReq.CreatedOn,
                ValueDate = serviceReq.CreatedOn,
                Amount = transectionDataForSR.Where(x => x.TagName == "PayableAmount").FirstOrDefault()?.TagValue ?? "",
                SplitsOfAmount = transectionDataForSR.Where(x => x.TagName == "PayableAmount").FirstOrDefault()?.TagValue,
                PaymentDate = DateTime.Now, // Functinality Not yet Done, After Uploding the Excel Date by Finace
                PayoutStatus = serviceReq.CurrentStatus,
            };
            return payouts;
        }
        public void AssignToBOEInternal(long srId)
        {
            var srInbox = _gdbContext.UserIndex.Where(x => x.SrvReqID == srId).FirstOrDefault();
            srInbox.UsrID = "boeadmin";
            srInbox.RoleID = 1;
            _gdbContext.SaveChanges();
        }
    }


}
