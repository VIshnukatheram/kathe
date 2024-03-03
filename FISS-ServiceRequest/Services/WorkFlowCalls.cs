using FISS_ServiceRequest.Models.DB;
using FISS_ServiceRequest.Models.Request;
using FISS_ServiceRequest.Models.Response;
using FISS_ServiceRequest.Models.Shared;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.SqlServer.TransactSql.ScriptDom;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_ServiceRequest.Services
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

        public bool DeDuplicate(string newPhNo)
        {
            if(newPhNo == "9998887770")
            {
                return false;
            }
            else
            {
                return true;
            }
            
        }

        public void AssignTo(string serviceRequstId)
        {
            
            var contact = _gdbContext.ServRequest.Where(x => x.SrvReqRefNo == serviceRequstId).FirstOrDefault();
            if (contact != null)
            {
                contact.CurrentStatus = TicketStatus.PENDING.ToString();
                contact.AssignedToRole = Roles.POS.ToString();
                contact.AssignedToUser = 1;
                _gdbContext.SaveChanges();
                _logger.LogInformation("Assigned To POS role Successfully");
            }
        }

        public void UpdateStatus(string serviceRequstId, string statusCode)
        {
            var contact = _gdbContext.ServRequest.Where(x => x.SrvReqRefNo == serviceRequstId).FirstOrDefault();
            if (contact != null)
            {
                contact.CurrentStatus = statusCode;
                _gdbContext.SaveChanges();
                _logger.LogInformation("Updated Status Successfully for Service Reqeust Id"+serviceRequstId);
            }
        }
        public async Task<Response<ContactUpdateDetailsResponse>> LAContactUpdate(string mobileNo, string clientNo)
        {
            ContactUpdateDetailsRequest contactUpdateMob = new()
            {
                RequestHeader = new()
                {
                    Source = "POS",
                    CarrierCode = "2",
                    Branch = "PRA",
                    UserId = "WEBSITE",
                    UserRole = "10",
                    PartnerId = "MSPOS"
                },
                RequestBody = new()
                {
                    ClientNo = clientNo,
                    MobileNo = mobileNo
                }
            };
            string contactUpdateMobNum = _commonService._apiUrls.LAURLS.ContactUpdateMobileNum;
            var contactResponse = await _httpService.HttpPostCall<ContactUpdateDetailsRequest, ContactUpdateDetailsResponse>(contactUpdateMob, contactUpdateMobNum);
            return contactResponse;
        }

        public async Task<Response<List<CommunicationResponse>>> CommunicationCall(List<CommunicationRequest> communicationRequest)
        {
            string communicationURL = _commonService._apiUrls.CommonURLS.Email;
            var communicationResponse = await _httpService.HttpPostCall<List<CommunicationRequest>, List<CommunicationResponse>>(communicationRequest, communicationURL);
            return communicationResponse;
        }

        public Policy GetPolicy(string policyName)
        {
            return _gdbContext.Policy.Where(x => x.LA_PolicyNo == policyName).FirstOrDefault();
        }
        public ServiceRequestModel CreateServiceRequest(ServiceRequestPayload reqBody)
        {
            // Create Service request
            string uniquServiceRequest = _commonService.GetUniqueServiceRequestId();

            var policy = GetPolicy(reqBody.PolicyNo.ToString());
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
                ReqMode = reqBody.RequestChannel,
                PolicyRef = policy == null ? policyDetails.PolicyRef : policy.PolicyRef,
                CustomerRef = reqBody.CustomerId,
                CustRole = reqBody.CustRole,
                BranchRef = reqBody.BranchId,
                CurrentStatus = TicketStatus.OPEN.ToString(),
                CreatedOn = DateTime.Now,
                CreatedByRef = reqBody.CreatedByRef,
                ModifiedOn = DateTime.Now,
                ModifiedByRef = reqBody.ModifiedByRef,
                TransactionPayload = JsonConvert.SerializeObject(reqBody.TransactionData),
                ReasonDelayed = reqBody.ReasonDelayed,
                ReasonForChange = reqBody.ReasonForChange,
                RequestDateTime = reqBody.RequestDateTime,
                CustSignDateTime = reqBody.CustSignDateTime,
                PolicyStatus = reqBody.PolicyStatus,
                PlanName = reqBody.Plan,
                ProposerName = reqBody.ProposerName,
                CommunicationPayload = JsonConvert.SerializeObject(reqBody.CommunicationRequest),
                DOB = reqBody.DOB
            };

            _gdbContext.ServRequest.Add(sampleRequest);
            _gdbContext.SaveChanges();
            _logger.LogInformation("Service Request Created Successfully");
            return sampleRequest;
        }

        public List<POSList> GetListServiceRequests(string role, int userId)
        {
            var masters = _gdbContext.AppMasters;
            var lists = _gdbContext.ServRequest.Where(x => x.AssignedToRole == role && x.AssignedToUser == userId && x.CurrentStatus == TicketStatus.PENDING.ToString())
                .Join(_gdbContext.Policy, x => x.PolicyRef, y => y.PolicyRef, (x,y) => new {Service = x, Policy = y })
                .Select(x => new POSList
                {
                    Date = x.Service.CreatedOn,
                    PolicyNo = x.Policy.LA_PolicyNo,
                    ServiceNo = x.Service.SrvReqRefNo,
                    CallType = x.Service.CallType,
                    CallTypeName = masters.Where(y => y.MstCategory == "CALL_TYP" && y.MstID == x.Service.CallType).FirstOrDefault().MstDesc,
                    SubType = x.Service.SubType,
                    SubTypeName = masters.Where(y => y.MstCategory == "SUB_TYP" && y.MstParentID == x.Service.CallType && y.MstID == x.Service.SubType).FirstOrDefault().MstDesc,
                    Status = x.Service.CurrentStatus,
                    PolicyStatus = x.Service.PolicyStatus,
                    ProposerName = x.Service.ProposerName,
                    Plan = x.Service.PlanName,
                    AssignedToRole = x.Service.AssignedToRole,
                    AssignedToUser = x.Service.AssignedToUser.ToString(),
                    DOB = x.Service.DOB,
                })
                .ToList();

            return lists;
        }

        public ServiceRequestModel GetServiceRequest(string serviceRequestId)
        {
            var servicereq = _gdbContext.ServRequest.Where(x => x.SrvReqRefNo == serviceRequestId).FirstOrDefault();
            return servicereq;
        }

        public ServCommTemplate GetTemplateId(int callType, int subType, int commType, string status)
        {
            return _gdbContext.ServCommTemplates.Where(x => x.CallType == callType && x.SubType == subType && x.CommType == commType && x.TemplateDesc == status).FirstOrDefault();
        }

        public ServiceRequestTransection POSActions(POSPayload payload)
        {
            ServiceRequestTransection transactiondata = new()
            {
                SrvReqRefNo = payload.SrvReqRefNo,
                TransactionPayload = payload.TransactionPayload,
                Comments = payload.Comments,
                RequirementComments = payload.RequirementComments,
                RequirementList = JsonConvert.SerializeObject(payload.RequirementList),
                Status = payload.Status,
            };
            _gdbContext.ServiceRequestTransections.Add(transactiondata);
            _gdbContext.SaveChanges();
            return transactiondata;
        }

        public List<RaiseRequirementResponse> GetRaiseRequirement(int callType, int subType)
        {
            var listofRaiseReq = _gdbContext.RaiseRequirements.Where(x => x.CallType == callType && x.SubType == subType)
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

            //var listofRaiseReq = _gdbContext.AppMasters.Where(x => x.MstCategory == MasterCategorys.RAISE_REQMNT.ToString())
            //                 .Join(_gdbContext.RaiseRequirements, x => x.MstID, y => y.RaiseReqId, (x, y) => new { RasieReq = y, Master = x })
            //                .Select(x => new RaiseRequirementResponse
            //                {
            //                    CallType = x.RasieReq.CallType,
            //                    SubType = x.RasieReq.SubType,
            //                    RaiseReqId = x.RasieReq.RaiseReqId,
            //                    RaiseReqDesc = x.Master.MstDesc,
            //                    Status = x.RasieReq.Status
            //                })
            //                .ToList();

            return listofRaiseReq;
        }

        public List<ServiceRequestTransectionData> GetTransactionData(int SrvReqID)
        {
            
                return _gdbContext.ServiceRequestTransectionData.Where(x => x.SrvReqID == SrvReqID).ToList();
           
        }
    }
}
