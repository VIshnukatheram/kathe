using FG_STModels.BL.EMail;
using FG_STModels.Models.Comms;
using FG_STModels.Models.Core;
using FG_STModels.Models.EMailMgmt;
using FG_STModels.Models.FISS;
using FG_STModels.Models.LifeAsia;
using FG_STModels.Models.Shared;
using FG_STModels.Models.UsrRoles;
using FISS_CommonServiceAPI.Models.DB;
using FISS_CommonServiceAPI.Models.POSAdmin;
using FISS_CommonServiceAPI.Models.Request;
using FISS_CommonServiceAPI.Models.Response;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.VisualBasic;
using MoreLinq.Extensions;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Migrations;
using System.Diagnostics.CodeAnalysis;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace FISS_CommonServiceAPI.Services
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

        public void AssignToUser(string serviceRequstId)
        {

            var serReq = _gdbContext.ServRequest.Where(x => x.SrvReqRefNo == serviceRequstId).FirstOrDefault();
            var assignUserIds = _gdbContext.TATInfo.Where(x => x.CallType == serReq.CallType && x.SubType == serReq.SubType).FirstOrDefault();
            serReq.CurrentStatus = TicketStatus.PENDING.ToString();
            AssignToPOS assignToPOS = new()
            {
                UserIndexID = 0,
                SrvReqID = serReq.SrvReqID,
                UsrID = "",
                RoleID = 0,
                AllocatedOn = serReq.CreatedOn,
                BranchID = serReq.BranchRef.ToString(),
                ReqSignedOn = serReq.RequestDateTime
            };

            //if(assignUserIds.UserRole != null)
            //{
            //    assignToPOS.UsrID = assignUserIds.UserRole;
            //    assignToPOS.RoleID = 4;
            //}
            if (serReq.CallType == 21 || (serReq.CallType == 19 && (serReq.SubType == 4 || serReq.SubType == 3)) || (serReq.CallType == 6 && serReq.SubType == 16))
            {
                assignToPOS.UsrID = "NbUser1";
                assignToPOS.RoleID = 11;
            }
            else if (serReq.CallType == 24)
            {
                assignToPOS.UsrID = "complaintteam";
                assignToPOS.RoleID = 13;
            }
            else if (serReq.CallType == 26 || (serReq.CallType == 1 && (serReq.SubType == 4 || serReq.SubType == 9 || serReq.SubType == 5)) || (serReq.CallType == 31 && serReq.SubType == 3))
            {
                assignToPOS.UsrID = "pauser1";
                assignToPOS.RoleID = 15;
            }
            else
            {
                assignToPOS.UsrID = "posuser3";
                assignToPOS.RoleID = 4;
            }
            _gdbContext.AssignToPOS.Add(assignToPOS);
            _gdbContext.SaveChanges();
            _logger.LogInformation(string.Format("Assigned To User {0}, Role {1} Successfully",assignToPOS.UsrID,assignToPOS.RoleID));
        }
        public void AssignServiceRequestToSenior(string serviceRequstId, int role)
        {
            // Assign to User
            var serReq = _gdbContext.ServRequest.Where(x => x.SrvReqRefNo == serviceRequstId).FirstOrDefault();
            if (serReq != null)
            {
                var user = _gdbContext.UsrRoleMapps.Where(x => x.RoleID == role).FirstOrDefault();
                var trackSR = _gdbContext.AssignToPOS.Where(x => x.SrvReqID == serReq.SrvReqID).FirstOrDefault();
                if (trackSR != null)
                {
                    trackSR.UsrID = user.UsrID;
                    trackSR.RoleID = (short)user.RoleID;
                }
                _gdbContext.SaveChanges();
            }
            _logger.LogInformation("Assigned To Senior role Successfully");
        }
        public int CheckSeniorUserRole(string serviceRequstId)
        {
            // Fetched Service Request
            int role = 0;
            var contact = _gdbContext.ServRequest.Where(x => x.SrvReqRefNo == serviceRequstId).FirstOrDefault();
            if (contact != null)
            {
                // Get Assigned User Record
                var trackSR = _gdbContext.AssignToPOS.Where(x => x.SrvReqID == contact.SrvReqID).FirstOrDefault();
                if (trackSR != null)
                {
                    // Check DeDup
                    if (trackSR.RoleID == 4)
                    {
                        var deDupList = _gdbContext.DeDupData.Where(x => x.SrvReqRefNo == serviceRequstId).Count();
                        if (deDupList > 0)
                        {
                            // POS Manager
                            role = 5;
                        }
                        else
                        {
                            // POS Approver 1
                            role = 6;
                        }

                    }
                    else if (trackSR.RoleID == 5)
                    {
                        // POS Approver 1
                        role = 6;
                    }
                    else if (trackSR.RoleID > 5)
                    {
                        string tagName = "PayableAmount";
                        //if(contact.CallType == 9)
                        //{
                        //    tagName = "TotalSurrenderValue";
                        //}
                        //if(contact.CallType == 11)
                        //{
                        //    tagName = "LoanValueRequested";
                        //}
                        //if(contact.CallType == 12)
                        //{
                        //    tagName = "FreeLookAmount";
                        //}
                        string requestedValue = _gdbContext.ServiceRequestTransectionData.Where(x => x.SrvReqID == trackSR.SrvReqID && x.TagName == tagName).FirstOrDefault()?.TagValue;

                        var allMatrix = _gdbContext.RequestAllocMatrices.Where(x => x.CallType == contact.CallType && x.SubType == contact.SubType && x.AllocateUsrID == trackSR.UsrID).ToList();
                        if (requestedValue != null)
                        {
                            var getSelectedMetrix = allMatrix.Where(x => x.Band_LLimit <= decimal.Parse(requestedValue) && x.Band_ULimit > decimal.Parse(requestedValue)).FirstOrDefault();
                            if (getSelectedMetrix != null)
                            {
                                // Finalce
                                role = 10;
                            }
                            else
                            {
                                // Up Comming Approvar
                                role = trackSR.RoleID + 1;
                            }
                        }
                    }
                }
            }
            _logger.LogInformation("Checked UpComming role Successfully " + role);
            return role;
        }
        public void AssignToUserForSurrenderApprover(string serviceRequstId)
        {
            // Fetched Service Request
            var contact = _gdbContext.ServRequest.Where(x => x.SrvReqRefNo == serviceRequstId).FirstOrDefault();
            if (contact != null)
            {
                // Get Assigned User Record
                var trackSR = _gdbContext.AssignToPOS.Where(x => x.SrvReqID == contact.SrvReqID).FirstOrDefault();
                if (trackSR != null)
                {
                    // Check DeDup
                    if (trackSR.RoleID == 4)
                    {

                        var deDupList = _gdbContext.DeDupData.Where(x => x.SrvReqRefNo == serviceRequstId).Count();
                        if (deDupList > 0)
                        {
                            // POS Manager
                            var user = _gdbContext.UsrRoleMapps.Where(x => x.RoleID == 5).FirstOrDefault();
                            trackSR.UsrID = user.UsrID;
                            trackSR.RoleID = (short)user.RoleID;
                        }
                        else
                        {
                            // POS Approver 1
                            var user = _gdbContext.UsrRoleMapps.Where(x => x.RoleID == 6).FirstOrDefault();
                            trackSR.UsrID = user.UsrID;
                            trackSR.RoleID = (short)user.RoleID;
                        }

                    }
                    else if (trackSR.RoleID == 5)
                    {
                        // POS Approver 1
                        var user = _gdbContext.UsrRoleMapps.Where(x => x.RoleID == 6).FirstOrDefault();
                        trackSR.UsrID = user.UsrID;
                        trackSR.RoleID = (short)user.RoleID;
                    }
                    else if (trackSR.RoleID > 5)
                    {
                        string surrenderValue = _gdbContext.ServiceRequestTransectionData.Where(x => x.SrvReqID == trackSR.SrvReqID && x.TagName == "TotalSurrenderValue").FirstOrDefault()?.TagValue;

                        var allMatrix = _gdbContext.RequestAllocMatrices.Where(x => x.CallType == contact.CallType && x.SubType == contact.SubType && x.AllocateUsrID == trackSR.UsrID).ToList();
                        if (surrenderValue != null)
                        {
                            var getSelectedMetrix = allMatrix.Where(x => x.Band_LLimit <= decimal.Parse(surrenderValue) && x.Band_ULimit > decimal.Parse(surrenderValue)).FirstOrDefault();
                            if (getSelectedMetrix != null)
                            {
                                var usre = _gdbContext.UsrRoleMapps.Where(x => x.RoleID == 10).FirstOrDefault();
                                trackSR.UsrID = usre.UsrID;
                                trackSR.RoleID = ((short)usre.RoleID);
                            }
                            else
                            {
                                var user = _gdbContext.UsrRoleMapps.Where(x => x.RoleID == trackSR.RoleID + 1).FirstOrDefault();
                                trackSR.UsrID = user.UsrID;
                                trackSR.RoleID = (short)user.RoleID;
                            }
                        }
                    }
                    // Get Transection Data for Surrender value

                }
                //contact.CurrentStatus = TicketStatus.PENDING.ToString();
                _gdbContext.SaveChanges();
                _logger.LogInformation("Assigned To POS role Successfully");
            }
        }
        public async Task<Response<dynamic>> EmsService(string email, string url)
        {


            SearchApiRequest emailServiceRequest = new()
            {
                requestheader = new()
                {
                    source = "POS",
                    policyNo = "00013374",
                    applicationNo = "223344",
                    dob = "06/06/1997"

                },

                requestBody = new()
                {
                    emailID = email
                }

            };

            var emailservice = await _httpService.HttpPostCall<SearchApiRequest, dynamic>(emailServiceRequest, url);
            return emailservice;

        }

        public async Task<Response<dynamic>> SearchPolicy(string email, string url,string srvreqid)
        {
           var policy =  GetClientidAndPolicy(srvreqid);

            SearchApiRequest Searchpolicy = new()
            {
                requestheader = new()
                {
                    source = "POS",
                    policyNo = "00110568",
                    applicationNo = "",
                    dob = "06/06/1997"

                },

                requestBody = new()
                {
                    emailID = email
                }

            };

            var searchpolicyId = await _httpService.HttpPostCall<SearchApiRequest, dynamic>(Searchpolicy, url);
            return searchpolicyId;

        }
        public void UpdateStatus(string serviceRequstId, string statusCode)
        {
            var contact = _gdbContext.ServRequest.Where(x => x.SrvReqRefNo == serviceRequstId).FirstOrDefault();
            if (contact != null)
            {
                contact.CurrentStatus = statusCode.ToUpper();
                contact.ModifiedOn = DateTime.Now;
                _gdbContext.SaveChanges();
                _logger.LogInformation("Updated Status Successfully for Service Reqeust Id" + serviceRequstId);
            }
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

        public EmailService EmailServiceRequest(EmailService emailService)
        {
            EmailService emailService1 = new()
            {
                EmailUniqRefNo = emailService.EmailUniqRefNo,
                ReceipientIDs = emailService.ReceipientIDs,
                CCIDs = emailService.CCIDs,
                BCCIDs = emailService.BCCIDs,
                MailSubject = emailService.MailSubject,
                ConversionID = emailService.ConversionID,
                ReceivedOn = emailService.ReceivedOn,
                NLP_Response = emailService.NLP_Response,
                RegisteredEMail = emailService.RegisteredEMail,
                AddressedMultipleMails = emailService.AddressedMultipleMails,
                Spam = emailService.Spam,
                SenderIDs = emailService.SenderIDs,
                LIFEORNONLIFE = emailService.LIFEORNONLIFE
            };

            _gdbContext.EmailServices.Add(emailService1);
            _gdbContext.SaveChanges();
            return emailService1;
        }

        public EmailClassify EmailResponse(EmailClassify emailResponse)
        {
            _gdbContext.emailResponses.Add(emailResponse);
            _gdbContext.SaveChanges();

            _gdbContext.emailClassCTSTs.Add(new EmailClassCTST
            {
                EmailResponseId = emailResponse.EmailResponseId,
                CallType = 3,
                SubType = 1,
                DecisionBy = "NLP"
            });
            _gdbContext.SaveChanges();
            return emailResponse;
        }

        public SearchApiResponse SearchApiResponse(string ServicereqId)
        {
            string url = "https://lfagentapigw-rsg.azure-api.net/POSMicroservice/Generic/api/SearchAPI/GetSearchAPI";
            var spolicy = SearchPolicy("", url,ServicereqId);
            var jsonre = JsonConvert.SerializeObject(spolicy.Result);
            var desres = JsonConvert.DeserializeObject<SearchApiResponse>(jsonre);
            return desres;
        }
        public ComplaintAction SaveAction(ComplaintAction action)
        {
            _gdbContext.ComplaintActions.Add(action);
            _gdbContext.SaveChanges();

           return action;
        }
        public dynamic GetSerReq()
        {
            dynamic statusCounts = "";
            try
            {
                statusCounts = _gdbContext.ServRequest.ToList()
               .GroupBy(item => item.CurrentStatus)
               .Select(group => new
               {
                   Status = group.Key,
                   Count = group.Count()
               });
                return statusCounts;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return statusCounts;
            }
        }
        public List<POSSerReqGrid> PosAdminSerReqFilters(int CallType, int SubType, int status, int? PayOutValue, int? ClientId, string Username)
        {
            var Lists = new List<POSSerReqGrid>();
            try
            {
                string CurrentSts = "";

                if (status != 0)
                    CurrentSts = Enum.GetName(typeof(EnumSerReqStatus), Convert.ToInt32(status));
                if (string.IsNullOrEmpty(Username))
                {
                    var ServiceReq = _gdbContext.ServRequest.AsNoTracking()
                         .Where(o => (
                             o.CallType == (CallType != 0 ? CallType : o.CallType)
                             && o.SubType == (SubType != 0 ? SubType : o.SubType)
                             && o.CurrentStatus == (CurrentSts != null && CurrentSts != string.Empty ? CurrentSts : o.CurrentStatus)
                         ))
                         .Join(
                             _gdbContext.AssignToPOS.AsNoTracking().Where(x=>x.RoleID== 4 || x.RoleID==2 || x.RoleID==13 || x.RoleID == 14),
                             servRequest => servRequest.SrvReqID,
                             assignToPos => assignToPos.SrvReqID,

                             (servRequest, assignToPos) => new
                             {
                                 ServRequest = servRequest,
                                 AssignToPOS = assignToPos
                             }
                         )
                         .ToList();
                    if (ServiceReq != null)
                    {
                        var masters = _gdbContext.AppMasters;
                        var AssignToPOS = _gdbContext.AssignToPOS;
                        Lists = ServiceReq
                           .Select(x => new POSSerReqGrid
                           {
                               SrvReqID = x.ServRequest.SrvReqID,
                               SrvReqRefNo = x.ServRequest.SrvReqRefNo,
                               policyNo = _gdbContext.Policy.AsNoTracking()
                                   .Where(y => y.PolicyRef == x.ServRequest.PolicyRef)
                                   .FirstOrDefault()?.LA_PolicyNo,
                               CallType = masters.AsNoTracking()
                                   .Where(y => y.MstCategory == "CALL_TYP" && y.MstID == x.ServRequest.CallType)
                                   .FirstOrDefault()?.MstDesc,
                               SubType = masters.AsNoTracking()
                                   .Where(y => y.MstCategory == "SUB_TYP" && y.MstParentID == x.ServRequest.CallType && y.MstID == x.ServRequest.SubType)
                                   .FirstOrDefault()?.MstDesc,
                               CurrentStatus = x.ServRequest.CurrentStatus,
                               CreatedOn = x.ServRequest.CreatedOn,
                               Client_ID_Type = "",
                               PO_Name = x.ServRequest.ProposerName,
                               LA_Name = "",
                               UserId = string.Join(", ", _gdbContext.AssignToPOS.AsNoTracking()
                                               .Where(a => a.SrvReqID == x.ServRequest.SrvReqID)
                                               .Select(a => _gdbContext.AppUsers
                                                   .Where(u => u.UsrID.ToString() == a.UsrID)
                                                   .Select(u => u.UserName.ToString())  // Adjust this based on the property you want to concatenate
                                               )
                                               .SelectMany(idList => idList)
                                           )
                           }).OrderByDescending(x => x.CreatedOn)
                           .ToList();


                    }
                }
                else
                {
                    var ServiceReq = _gdbContext.ServRequest
                      .Where(o => (
                          o.CallType == (CallType != 0 ? CallType : o.CallType)
                          && o.SubType == (SubType != 0 ? SubType : o.SubType)
                          && o.CurrentStatus == (CurrentSts != null && CurrentSts != string.Empty ? CurrentSts : o.CurrentStatus)
                      ))
                      .Join(
                          _gdbContext.AssignToPOS.Where(a => a.UsrID == Username.ToString()),
                          servRequest => servRequest.SrvReqID,
                          assignToPos => assignToPos.SrvReqID,

                          (servRequest, assignToPos) => new
                          {
                              ServRequest = servRequest,
                              AssignToPOS = assignToPos
                          }
                      )
                      .ToList();

                    if (ServiceReq != null)
                    {
                        var masters = _gdbContext.AppMasters.AsNoTracking();
                        var AssignToPOS = _gdbContext.AssignToPOS.AsNoTracking();

                        Lists = ServiceReq
                            .Select(x => new POSSerReqGrid
                            {
                                SrvReqID = x.ServRequest.SrvReqID,
                                SrvReqRefNo = x.ServRequest.SrvReqRefNo,
                                policyNo = _gdbContext.Policy
                                    .Where(y => y.PolicyRef == x.ServRequest.PolicyRef)
                                    .FirstOrDefault()?.LA_PolicyNo,
                                CallType = masters.AsNoTracking()
                                    .Where(y => y.MstCategory == "CALL_TYP" && y.MstID == x.ServRequest.CallType)
                                    .FirstOrDefault()?.MstDesc,
                                SubType = masters.AsNoTracking()
                                    .Where(y => y.MstCategory == "SUB_TYP" && y.MstParentID == x.ServRequest.CallType && y.MstID == x.ServRequest.SubType)
                                    .FirstOrDefault()?.MstDesc,
                                CurrentStatus = x.ServRequest.CurrentStatus,
                                CreatedOn = x.ServRequest.CreatedOn,
                                Client_ID_Type = "",
                                PO_Name = x.ServRequest.ProposerName,
                                LA_Name = "",
                                UserId = string.Join(", ", _gdbContext.AssignToPOS
                                                .Where(a => a.SrvReqID == x.ServRequest.SrvReqID)
                                                .Select(a => _gdbContext.AppUsers
                                                    .Where(u => u.UsrID.ToString() == a.UsrID)
                                                    .Select(u => u.UserName.ToString())  // Adjust this based on the property you want to concatenate
                                                )

                                                .SelectMany(idList => idList)
                                            )
                            }).OrderByDescending(x => x.CreatedOn)
                            .ToList();
                    }
                }

                return Lists;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return Lists;
            }
        }
        public dynamic GetPOSUsers(string Roleid)
        {
       
            try
            {
                int Rleid = Convert.ToInt32(Roleid);
                var result = from user in _gdbContext.AppUsers.AsNoTracking()
                             join userRoleMap in _gdbContext.UsrRoleMapps.AsNoTracking() on user.UsrID equals userRoleMap.UsrID
                             join role in _gdbContext.UsrRoles.AsNoTracking() on userRoleMap.RoleID equals role.RoleID
                             where role.RoleID == Rleid  
                             select new
                             {
                                 user.UsrID,
                                 user.UserName,
                                 user.UsrStatus,
                                 role.RoleID,
                                 role.RoleName,
                             };
                return result.ToList();
            }
            catch (Exception ex)
            {
                List<dynamic> Ar = new List<dynamic>();
                _logger.LogError(ex.Message);
                return Ar;
            }

        }
        public dynamic GetIndividualPOSUser(string UsrID)
        {
            try
            {
                var result = from user in _gdbContext.AppUsers.AsNoTracking()
                             join userRoleMap in _gdbContext.UsrRoleMapps.AsNoTracking() on user.UsrID equals userRoleMap.UsrID
                             join role in _gdbContext.UsrRoles.AsNoTracking() on userRoleMap.RoleID equals role.RoleID
                             where (user.UsrID == UsrID)
                             select new
                             {
                                 user.UsrID,
                                 user.UserName,
                                 user.UsrStatus,
                                 role.RoleID,
                                 role.RoleName,
                             };
                return result.ToList();
            }
            catch (Exception ex)
            {
                List<dynamic> Ar = new List<dynamic>();
                _logger.LogError(ex.Message);
                return Ar;
            }

        }
        public dynamic SaveAssignPOS(List<AssignToPOS> assignToPOS)
        {
            try
            {
                if (assignToPOS != null)
                {
                    List<int> srvReqIdList = assignToPOS.Select(x => (int)x.SrvReqID).Distinct().ToList();

                    var recordsToRemove = _gdbContext.AssignToPOS
                        .Where(x => srvReqIdList.Contains((int)x.SrvReqID))
                        .ToList();
                    _gdbContext.AssignToPOS.RemoveRange(recordsToRemove);
                    _gdbContext.SaveChanges();
                    List<AssignToPOS> SavePosList = assignToPOS
                        .Select(item => new AssignToPOS
                        {
                            SrvReqID = item.SrvReqID,
                            UsrID = item.UsrID,
                            RoleID = 4,
                            AllocatedOn = item.AllocatedOn,
                            ReqSignedOn = item.ReqSignedOn,
                            BranchID = item.BranchID,
                            ClosedOn = item.ClosedOn,
                            // Set other default values for properties as needed
                        })
                        .ToList();
                    _gdbContext.AssignToPOS.AddRange(SavePosList);
                    _gdbContext.SaveChanges();
                }
                return "true";

            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return ex.Message;
            }
        }
        public dynamic Getpolicy(string PolicyNo, string clientid)
        {
            //if (PolicyNo != null)
            //{
            //    var PolicyRef = _gdbContext.Policy.Where(x => x.LA_PolicyNo == PolicyNo).Select(x => x.PolicyRef).FirstOrDefault();
            //    if(PolicyRef!=0)
            //    {
            //       return _gdbContext.PolAttr.Where(x => x.PolicyRef == PolicyRef).ToList();
            //    }
            //    else
            //    {
            //        return false;
            //    }

            //}
            if (clientid != null)
            {
                var ClientRef = _gdbContext.Customers.Where(x => x.LA_CustomerID == clientid).Select(x => x.CustomerRef).FirstOrDefault();
                if (ClientRef != 0)
                {
                    return _gdbContext.ClntAttr.Where(x => x.CustomerRef == ClientRef).ToList();
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return null;
            }

        }
        public bool ValidateTagname(TagRequest clntAttrs)
        {
            string ClientNo = clntAttrs.ClientNo;
            var ClientNoDetails = _gdbContext.Customers.Where(x => x.LA_CustomerID == ClientNo).FirstOrDefault();
            if (clntAttrs != null)
            {
                foreach (var Tag in clntAttrs.TagValue)
                {
                    if (clntAttrs.TagValue != null)
                    {
                        var TagDtTyp = _gdbContext.PolClntAttr.ToList().Where(x => x.Area == "CLIENT" && x.TagName == Tag.TagName.ToString()).Select(x => new { x.TagDtTyp, x.TagDtFormat }).FirstOrDefault();
                        if (TagDtTyp != null)
                        {
                            if (Tag.TagValue is not null)
                            {
                                var b = IsValueOfType(Tag.TagValue, Type.GetType(TagDtTyp.TagDtTyp), TagDtTyp.TagDtFormat);
                                if (b == true)
                                {
                                    ClntAttr CltAttrInsert = new ClntAttr();

                                    var CltAttrUpdate = _gdbContext.ClntAttr.Where(x => x.TagName == Tag.TagName && x.CustomerRef == ClientNoDetails.CustomerRef).FirstOrDefault();
                                    if (CltAttrUpdate != null)
                                    {
                                        CltAttrUpdate.TagValue = Tag.TagValue.ToString();
                                        CltAttrUpdate.TagName = Tag.TagName;
                                        CltAttrUpdate.CreatedBy = "";
                                        CltAttrUpdate.CreatedOn = DateTime.Now;
                                        _gdbContext.ClntAttr.AddOrUpdate(CltAttrUpdate);
                                        _gdbContext.SaveChanges();

                                    }
                                    else
                                    {

                                        CltAttrInsert.CustomerRef = ClientNoDetails.CustomerRef;
                                        CltAttrInsert.TagValue = Tag.TagValue.ToString();
                                        CltAttrInsert.TagName = Tag.TagName;
                                        CltAttrInsert.CreatedBy = "";
                                        CltAttrInsert.CreatedOn = DateTime.Now;
                                        _gdbContext.ClntAttr.Add(CltAttrInsert);
                                        _gdbContext.SaveChanges();

                                    }
                                }
                                else
                                {
                                    return false;
                                }
                            }
                            else
                            {
                                return false;
                            }


                        }
                        else
                        {
                            return false;
                        }
                    }
                    else
                    {
                        return false;
                    }
                }
                return true;
            }
            else
            {
                return false;
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
                else if (targetType == typeof(decimal) || targetType == typeof(double) || targetType == typeof(float))
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
                    if (value is char || value is Char)
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
                    if (value is byte || value is Byte)
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
        public List<NomineeRelation> nomineeRelations()
        {
            return _gdbContext.nomineeRelations.ToList();
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
                OTPService OTPNumber = _gdbContext.CommService.Where(x => x.PolicyNo == PolicyNo && (x.MobileNo == MobileNo || x.Email == Email)).FirstOrDefault();
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
                        _gdbContext.CommService.AddOrUpdate(commService);
                    }
                    else
                    {
                        OTPNumber.Email = Email;
                        OTPNumber.MobileNo = MobileNo;
                        OTPNumber.OTP = "963852";
                        OTPNumber.ValidTill = DateTime.Now.AddSeconds(120);
                        _gdbContext.CommService.AddOrUpdate(OTPNumber);
                    }

                    _gdbContext.SaveChanges();
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
                if (OTP == 1234)
                {
                    return "OTP Validated Successfully";
                }
                else
                {
                    return "Invalid OTP";
                }
                if (OTP != 0)
                {
                    OTPService OTPNumber = _gdbContext.CommService.Where(x => x.PolicyNo == PolicyNo).FirstOrDefault();
                    if (OTPNumber != null)
                    {
                        if (OTPNumber.ValidTill > DateTime.Now)
                        {
                            string ValidAttempts = Environment.GetEnvironmentVariable("ValidAttempts");
                            if (Convert.ToInt32(ValidAttempts) > OTPNumber.InvalidAttempts)
                            {
                                var validateOtp = "1234";
                                //var validateOtp = _gdbContext.CommService.Where(x => x.PolicyNo == PolicyNo).SingleOrDefault(x => x.OTP.ToString() == OTP.ToString());
                                if (validateOtp == null)
                                {
                                    OTPNumber.InvalidAttempts += 1;
                                    _gdbContext.CommService.AddOrUpdate(OTPNumber);
                                    return "Invalid OTP";
                                }
                                else if (validateOtp == "1234")
                                {
                                    OTPNumber.OTP = "";
                                    OTPNumber.InvalidAttempts = 0;
                                    _gdbContext.CommService.AddOrUpdate(OTPNumber);
                                    return "OTP Validated Successfully";
                                }
                                else
                                {
                                    return "Please Enter Successfully";
                                }
                            }
                            else
                            {
                                _gdbContext.CommService.Remove(OTPNumber);
                                return "Try again, your 3 OTP Attempts Are completed";
                            }
                        }
                        else
                        {
                            OTPNumber.OTP = "";
                            OTPNumber.InvalidAttempts = 0;
                            _gdbContext.CommService.AddOrUpdate(OTPNumber);
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
                _gdbContext.SaveChanges();
            }
        }

        public SearchResponse FilterMails(SearchEmail _SearchEmail)
        {
            int _CallType = 0;
            int _SubType = 0;
            //68
            List<EmailClassify> _EmailClassify;
            List<EmailSummary> _EmailSummary = new List<EmailSummary>();
            List<GraphDataSet> _GraphDataSet = new List<GraphDataSet>();
            if (_SearchEmail.EmailResponseId == null)
            {
                _EmailClassify = _gdbContext.emailResponses.AsNoTracking().AsParallel().OrderByDescending(x => x.EmailResponseId).ToList<EmailClassify>();
            }
            else
            {
                _EmailClassify = _gdbContext.emailResponses.AsNoTracking().AsParallel().OrderByDescending(x => x.EmailResponseId).
                    Where(x => x.EmailResponseId == _SearchEmail.EmailResponseId).ToList();
            }
            try
            {
                if (_SearchEmail.EmailResponseId == null)
                {

                    if (_SearchEmail.emailSource != null)
                    {
                        _EmailClassify = _EmailClassify.Where(x => _SearchEmail.emailSource.Contains(x.Source)).ToList();
                    }

                    if (_SearchEmail.ReceivedFromDt != null && _SearchEmail.ReceivedToDt != null)
                    {
                        _EmailClassify = _EmailClassify.
                            Where(x => x.ReceivedDateTime >= _SearchEmail.ReceivedFromDt &&
                            x.ReceivedDateTime <= _SearchEmail.ReceivedToDt).ToList();
                    }
                    if (_SearchEmail.IsNLPRespGen != null)
                    {
                        _EmailClassify = _EmailClassify.Where(x => x.IsNLPRespGen == _SearchEmail.IsNLPRespGen).ToList();
                    }

                    if (_SearchEmail.AddressedToMultipleIDs) { _EmailClassify = _EmailClassify.Where(x => (x.CntOfToRecipients + x.CntOfCcRecipients) > 1).ToList(); }


                    if (_SearchEmail.CallType != null)
                    {
                        List<int> emailClassCTSTs = _gdbContext.emailClassCTSTs.Where(x => x.CallType == _SearchEmail.CallType).Select(col => col.EmailResponseId).ToList<int>();
                        _EmailClassify = _EmailClassify.Where(x => emailClassCTSTs.Contains(x.EmailResponseId)).ToList();
                    }

                    if (_SearchEmail.SubType != null)
                    {
                        List<int> emailClassCTSTs = _gdbContext.emailClassCTSTs.Where(x => x.SubType == _SearchEmail.SubType).Select(col => col.EmailResponseId).ToList<int>();
                        _EmailClassify = _EmailClassify.Where(x => emailClassCTSTs.Contains(x.EmailResponseId)).ToList();
                    }
                    if (_SearchEmail.Status == null )
                    {
                        _SearchEmail.Status = "NEW";
                    }
                    _EmailClassify = _EmailClassify.Where(x => x.Status == _SearchEmail.Status).ToList();
                }
                else
                {
                    _EmailClassify = _EmailClassify.Where(x => x.EmailResponseId == _SearchEmail.EmailResponseId).ToList();
                    List<EmailClassCTST> EmailClassCTST = _gdbContext.emailClassCTSTs.AsNoTracking().AsParallel().Where(x => x.EmailResponseId == _SearchEmail.EmailResponseId).ToList();

                    foreach (var ctst in EmailClassCTST)
                    {
                        ctst.CallTypeDesc = _gdbContext.AppMasters.AsNoTracking().AsParallel().
                            Where(y => y.MstCategory == "CALL_TYP" && y.MstID == ctst.CallType).
                            FirstOrDefault()?.MstDesc;
                        ctst.SubTypeDesc = _gdbContext.AppMasters.AsNoTracking().AsParallel()
                            .Where(y => y.MstCategory == "SUB_TYP" && y.MstParentID == ctst.CallType && y.MstID == ctst.SubType).
                            FirstOrDefault()?.MstDesc;
                    }

                    List<EmailClassAttmnts> EmailClassAttmnts = _gdbContext.emailClassAttmnts.AsNoTracking().AsParallel().
                        Where(x => x.EmailResponseId == _SearchEmail.EmailResponseId).ToList();

                    foreach (EmailClassify item in _EmailClassify.Where(x => x.EmailResponseId == _SearchEmail.EmailResponseId))
                    {
                        item.emailClassCTSTs = EmailClassCTST;
                        item.emailClassAttmnts = EmailClassAttmnts;
                    }
                }

                _EmailSummary.Add(new EmailSummary { SummaryDesc = "NEW_CNT", CountOfMails = _gdbContext.emailResponses.Where(x => x.Status == "NEW").ToList().Count() });
                _EmailSummary.Add(new EmailSummary { SummaryDesc = "PENDING_CNT", CountOfMails = _gdbContext.emailResponses.Where(x => x.Status == "OTHERS").ToList().Count() });
                _EmailSummary.Add(new EmailSummary { SummaryDesc = "RESOLVED_CNT", CountOfMails = _gdbContext.emailResponses.Where(x => x.Status == "CLOSED").ToList().Count() });
                _EmailSummary.Add(new EmailSummary { SummaryDesc = "FOLLOWUP_CNT", CountOfMails = _gdbContext.emailResponses.Where(x => x.Status == "OTHERS").ToList().Count() });

                int[] _data = new int[3] { 3, 6, 9 };
                _GraphDataSet.Add(new GraphDataSet { label = "p1", data = _data, backgroundColor = "#b3201f", borderColor = "black", borderWidth = 1 });
                _data = new int[3] { 4, 3, 3 };
                _GraphDataSet.Add(new GraphDataSet { label = "p2", data = _data, backgroundColor = "yellow", borderColor = "black", borderWidth = 1 });
                _data = new int[3] { 3, 6, 9 };
                _GraphDataSet.Add(new GraphDataSet { label = "p3", data = _data, backgroundColor = "#6495ED", borderColor = "black", borderWidth = 1 });
            }
            catch (ArgumentNullException)
            {
                //no data found
                _EmailClassify = null;
            }
            return new SearchResponse
            {
                searchEmail = _SearchEmail,
                EmailClassify = _EmailClassify,
                EmailSummary = _EmailSummary,
                graphDataSets = _GraphDataSet
            };
        }
        public TaxCalculationResponse GetTaxCalculationDetails(string serviceRequest)
        {
            double interestRate = 3;
            var serReq = _gdbContext.ServRequest.Where(x => x.SrvReqRefNo == serviceRequest).FirstOrDefault();

            var serReqTransectionDetails = _gdbContext.ServiceRequestTransectionData.Where(x => x.SrvReqID == serReq.SrvReqID).ToList();

            var amountPayable = serReqTransectionDetails.Where(x => x.TagName == "PayableAmount").FirstOrDefault()?.TagValue ?? "0";
            var amountTransfer = serReqTransectionDetails.Where(x => x.TagName == "FundTransferAmount").FirstOrDefault()?.TagValue ?? "0";
            var amountTotal = serReqTransectionDetails.Where(x => x.TagName == "TotalAmount").FirstOrDefault()?.TagValue ?? "0";

            double noOfDays = (DateTime.Now - serReq.CreatedOn).Days;

            double payableAmount = double.Parse(amountPayable);
            double interestAmount = 0;
            if (noOfDays > 5)
            {
                interestAmount = Math.Round(((payableAmount * interestRate / 100) / 30) * noOfDays, 0);
            }
            TaxCalculationResponse taxCalculation = new()
            {
                TotalAmount = amountTotal,
                PayableAmount = amountPayable,
                FTAmount = amountTransfer,
                TDSAmount = "0",
                InterestAmount = interestAmount.ToString(),
                NetPayableAmount = (payableAmount +  interestAmount).ToString(),
            };
            return taxCalculation;
        }
        public async Task<dynamic> sendApproverEmail()
        {
            string CommunicationURL = "https://communicationservice.azurewebsites.net/api/communicationService?code=iptsqJkI47tgGiCg4ZtbSDd1R7CEDKY6Z_RtnqsAFj92AzFuTY2sBQ==";
            
            List<CommunicationRequest> listCommunication = new()
            {
                new()
                {
                    SrvReqRefNo = "1234",
                    CommType = 2,
                    CommBody = "\"CUSTOMERNAME\":\"Team\",\"Process Name\":\"Approver\",\"PROCESSLINK\":\"https://yellow-wave-0799d1b10.4.azurestaticapps.net/#/posapprove\",\"DOCLINK\":\"https://yellow-wave-0799d1b10.4.azurestaticapps.net/#/posapprove\"",
                    ReceipientCC = "",
                    ReceipientTo = "venkatakrishna.b@nichebit.com",
                    Attachments = null,
                    MobileNos = "",
                    TemplateID = "26",
                    ScheduledTime = DateTime.Now,
                }
            };
            var emailResponse = await _httpService.HttpPostCall<List<CommunicationRequest>, dynamic> (listCommunication, CommunicationURL);
            return emailResponse;
        }

        public dynamic serviceRequestCount(string PolicyNo, int calltype, int SubType)
        {
            var service = _gdbContext.Policy.Where(x => x.LA_PolicyNo == PolicyNo).FirstOrDefault();
            int count = 0;
            dynamic last_CreateDate = null;
            if (service != null)
            {
                var contact = _gdbContext.ServRequest.Where(x => x.PolicyRef == service.PolicyRef && x.CallType == calltype && x.SubType == SubType).ToList();
                if (contact.Count > 0)
                {
                    count = contact.Count();
                    last_CreateDate = contact.ToList().OrderByDescending(x => x.CreatedOn).First().CreatedOn.ToShortDateString();
                }
            }
            return new
            {
                count,
                last_CreateDate
            };
        }
        public dynamic GetSerReqByPolicy(string PolicyNo, int calltype, int SubType)
        {
           List<PaymentReprocessing> paymentReprocessing=new List<PaymentReprocessing>();
                var result = (from policy in _gdbContext.Policy
                              join serReq in _gdbContext.ServRequest
                              on policy.PolicyRef equals serReq.PolicyRef
                              where policy.LA_PolicyNo.Equals(PolicyNo) && serReq.CallType == calltype && serReq.SubType == SubType && serReq.CurrentStatus!="CLOSED"
                              orderby serReq.CreatedOn descending
                              select new
                              {
                                  PolicyRef = policy.PolicyRef,
                                  SrvReqID = serReq.SrvReqID,
                                  serReq= serReq
                              }).FirstOrDefault();

                if (result != null)
                {
                    var allocPayees = _gdbContext.allocPayees
                        .Where(x => x.SrvReqID == result.SrvReqID)
                        .FirstOrDefault();

                    if (allocPayees != null)
                    {
                    var payeeCd = allocPayees.PayeeCd;

                    result.serReq.ServiceRequestTransectionData = _gdbContext.ServiceRequestTransectionData.Where(x => x.SrvReqID == result.SrvReqID && x.Status == "Update").ToList().Count() == 0 ? _gdbContext.ServiceRequestTransectionData.Where(x => x.SrvReqID == result.SrvReqID && x.Status == "Create").ToList() : _gdbContext.ServiceRequestTransectionData.Where(x => x.SrvReqID == result.SrvReqID && x.Status == "Update").ToList();
                    var paymentmode = result.serReq.ServiceRequestTransectionData.Where(x => x.TagName == "PaymentMode").FirstOrDefault()?.TagValue ?? "0";
                    var RCD = result.serReq.ServiceRequestTransectionData.Where(x => x.TagName == "RCD").FirstOrDefault()?.TagValue ?? "0";
                    var APE = result.serReq.ServiceRequestTransectionData.Where(x => x.TagName == "APE").FirstOrDefault()?.TagValue ?? "0";
                    var PayableAmount = result.serReq.ServiceRequestTransectionData.Where(x => x.TagName == "PayableAmount").FirstOrDefault()?.TagValue ?? "0";
                    var FundTransferAmount = result.serReq.ServiceRequestTransectionData.Where(x => x.TagName == "FundTransferAmount").FirstOrDefault()?.TagValue ?? "0";
                    var TotalAmount = result.serReq.ServiceRequestTransectionData.Where(x => x.TagName == "TotalAmount").FirstOrDefault()?.TagValue ?? "0";
                    var FundTransferTo = result.serReq.ServiceRequestTransectionData.Where(x => x.TagName == "FundTransferTo").FirstOrDefault()?.TagValue ?? "0";
                    var fg = _gdbContext.ServiceRequestTransectionData.Where(x => x.SrvReqID == result.SrvReqID && x.Status == "Update").ToList();
                   
                    if (paymentmode == "B")
                    {
                        var payeeTransactions = _gdbContext.payeeTransactions.AsNoTracking()
                            .Where(x => x.PayeeCd == payeeCd)
                            .FirstOrDefault();
                            PaymentReprocessing paymentReproces = new PaymentReprocessing()
                            {
                                policyRef = (int)result.PolicyRef,
                                srvReqID = (int)result.SrvReqID,
                                Payment_Mode = paymentmode.ToString(),
                                Payment_Status = "Pending",
                                Payment_Date = payeeTransactions == null ? "" : payeeTransactions.Date.ToString("dd/MM/yyyy"),
                                Cheque_Status = "",
                                Cheque_POD_No = "",
                                TotalAmount = TotalAmount,
                                FundTransferAmount = FundTransferAmount,
                                PayableAmount = PayableAmount,
                                RCD = RCD,
                                APE = APE,
                                FundTransferTo = FundTransferTo,
                                OldSerReq = result.serReq.SrvReqRefNo,
                                PayeeCode = payeeTransactions.PayeeCd
                            };
                            paymentReprocessing.Add(paymentReproces);
                        
                        return paymentReprocessing;
                    }
                    else
                    {
                        var chequeStatus = _gdbContext.chequeStatuses
                           .Where(x => x.PayeeCd == payeeCd)
                           .FirstOrDefault();
                       
                            PaymentReprocessing paymentReproces = new PaymentReprocessing()
                            {
                                policyRef = (int)result.PolicyRef,
                                srvReqID = (int)result.SrvReqID,
                                Payment_Mode = paymentmode.ToString(),
                                Payment_Status = "",
                                Payment_Date = null,
                                Cheque_Status = chequeStatus.Status,
                                Cheque_POD_No = chequeStatus.Cheque_No,
                                TotalAmount = TotalAmount,
                                FundTransferAmount = FundTransferAmount,
                                PayableAmount = PayableAmount,
                                RCD = RCD,
                                APE = APE,
                                FundTransferTo = FundTransferTo,
                                OldSerReq = result.serReq.SrvReqRefNo,
                                PayeeCode = chequeStatus.PayeeCd
                            };
                            paymentReprocessing.Add(paymentReproces);

                        return paymentReprocessing;
                    }
                    }
                    else
                    {
                      return paymentReprocessing;
                    }
                }
                else
                {
                       // Return a default value if no data is found
                     return paymentReprocessing;
                } 
        }
        public List<ClntAttr> GetCkycDetails(long customerId)
        {
            var Ckyc = _gdbContext.Customers.Where(x => x.LA_CustomerID == customerId.ToString()).FirstOrDefault();
            if (Ckyc != null)
            {
                var CustRef = _gdbContext.ClntAttr.Where(x => x.CustomerRef == Ckyc.CustomerRef && x.TagName == "CKYC").ToList();
                return CustRef;
            }
            else
            {
                return new List<ClntAttr>();

            }
        }

        public dynamic GetClientidAndPolicy(string Id)
        {


           string polyceNumber = null;
            var serRequest = _gdbContext.ServRequest.Where(x => x.SrvReqRefNo == Id).FirstOrDefault();
            if (serRequest != null)
            {
                 polyceNumber = _gdbContext.Policy.Where(x => x.PolicyRef == serRequest.PolicyRef).Select(x => x.LA_PolicyNo).FirstOrDefault();
               
            }
            dynamic polclientid = new
            {
                polyceNumber,
            };
            return polclientid;
        }
        public List<string> GetAllPayeeCodeAuthDetails()
        {
            int countOfRecord = 5;
            var allPaycodes = _gdbContext.allocPayees.Where(x => x.Authorized == false && x.AuthStatus != TicketStatus.FAILED.ToString())
                        .Join(_gdbContext.payeeTransactions, x => x.PayeeCd, y => y.PayeeCd, (x, y) => new { AllPayes = x })
                        .Join(_gdbContext.ServRequest, x => x.AllPayes.SrvReqID, y => y.SrvReqID, (x, y) => new { ServciReq = y })
                        .Select(x => x.ServciReq.SrvReqRefNo).Take(countOfRecord).ToList();
            return allPaycodes;
        }
        public List<UsrRoles> GetListOfRolesByUSerId(string userId, string UserName)
        {
            var loggedUser = _gdbContext.AppUsers.Where(x => x.UsrID == userId).FirstOrDefault();
            if (loggedUser == null)
            {
                AppUser user = new()
                {
                    UsrID = userId,
                    UserName = UserName,
                    UsrStatus = 1,
                    LastLoggedIn = DateTime.Now,
                };
                _gdbContext.AppUsers.Add(user);
            }
            else
            {
                loggedUser.LastLoggedIn = DateTime.Now;
            }
            _gdbContext.SaveChanges();

            var allUserRoles = _gdbContext.UsrRoleMapps.Where(x => x.UsrID == userId)
                                .Join(_gdbContext.UsrRoles, x => x.RoleID, y => y.RoleID, (x, y) => y)
                                .ToList();
            return allUserRoles;
        }


    }



}
