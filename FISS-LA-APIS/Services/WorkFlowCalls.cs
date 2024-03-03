using Azure;
using FG_STModels.Models.LifeAsia;
using FG_STModels.Models.Masters;
using FG_STModels.Models.Shared;
using FISS_LA_APIS.Models.DB;
using FISS_LA_APIS.Models.Request;
using FISS_LA_APIS.Models.Response;
using FISS_ServiceRequest.Models.DB;
using FISS_ServiceRequest.Models.Response;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using System.Xml.Serialization;
using LAURLS = FISS_ServiceRequest.Models.Shared.LAURLS;
using Azure.Storage.Blobs;
using FG_STModels.Models.FISS;
using FG_STModels.Models.Core;
using Newtonsoft.Json.Linq;

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
        public LAURLS GetURLS()
        {
            return _commonService._apiUrls.LAURLS;
        }
        public async Task<Response<ContactUpdateDetailsResponse>> LAContactUpdate(dynamic reqBody, string url)
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
                RequestBody = reqBody
            };
            var contactResponse = await _httpService.HttpPostCall<ContactUpdateDetailsRequest, ContactUpdateDetailsResponse>(contactUpdateMob, url);
            return contactResponse;
        }

        public async Task<Response<EmailServiceResponse>> EmsService(dynamic reqbody, string url)
        {


            EmailServiceRequest emailServiceRequest = new()
            {
                RequestHeader = new()
                {
                    //Source = "",//EmailSource.Undefined,
                    PolicyNo = "00013374",
                    ApplicationNo = "223344",
                    Dob = DateTime.Now
                },

                ResponseBody = reqbody

            };

            var emailservice = await _httpService.HttpPostCall<EmailServiceRequest, EmailServiceResponse>(emailServiceRequest, url);
            return emailservice;

        }

        public async Task<Response<AddressDetailsResponse>> LAContactAddressUpdates(dynamic reqBody, string url)
        {
            AddressUpdateDetailsRequest contactUpdateAdd = new()
            {
                RequestHeader = new()
                {
                    Source = "POS",
                    CarrierCode = "2",
                    Branch = "PRA",
                    UserId = "WEBSITE",
                    UserRole = "10",
                    PartnerId = "MSPOS",
                    ProcessId = "1",
                    MonthEndExtension = "N",
                    MonthEndDate = "12/10/2023"
                },
                RequestBody = reqBody
            };
            var contactResponse = await _httpService.HttpPostCall<AddressUpdateDetailsRequest, AddressDetailsResponse>(contactUpdateAdd, url);
            return contactResponse;
        }
        public string BankUpdate(List<ServiceRequestTransectionData> data,string ServiceRequestId)
        {
            try
            {
                var id = GetClientidAndPolicy(ServiceRequestId);
                string PolicyNo = id.polyceNumber;
                string CustomerID = id.cLientId;
                if (id != null)
                {

                    string BankName = data?.Where(x => x.TagName == "Bank_Name_New" || x.TagName == "BankName").FirstOrDefault()?.TagValue;
                    string BankIFSC = data?.Where(x => x.TagName == "Bank_IFSC_New" || x.TagName == "BankIFSC").FirstOrDefault()?.TagValue;
                    string AccHldrName = data?.Where(x => x.TagName == "Acc_HldrName_New" || x.TagName == "NameAsMentionedInTheBank").FirstOrDefault()?.TagValue;
                    string AccNumberNew = data?.Where(x => x.TagName == "Acc_Number_New" || x.TagName == "BankAccountNumber").FirstOrDefault()?.TagValue;
                    string AccType = data?.Where(x => x.TagName == "Acc_Type_New" || x.TagName == "AccType").FirstOrDefault()?.TagValue ?? "1";
                    string AccNumberOld = data?.Where(x => x.TagName == "Acc_Number_Old").FirstOrDefault()?.TagValue;
                    string Client_Id = data?.Where(x => x.TagName == "Client_Id").FirstOrDefault()?.TagValue;

                    if(Client_Id == null)
                    {
                        Client_Id = CustomerID;
                    }
                    DateTime VerifiedOn = DateTime.Now;
                           var bankDtls = _gdbContext.PolBankDtls.Where(x =>x.LA_PolicyNo== PolicyNo && x.LA_CustomerID== Client_Id).FirstOrDefault();
                    if (bankDtls != null)
                    {

                        //Insert data into PolBankDtlsHist
                        var polhist = JsonConvert.SerializeObject(bankDtls);
                             PolBankDtlsHist polBankDtlsHist=JsonConvert.DeserializeObject<PolBankDtlsHist>(polhist);
                        polBankDtlsHist.Acc_Active = false;
                        bankDtls.CreatedBy = "";
                        bankDtls.CreatedOn = DateTime.Now;
                        _gdbContext.PolBankDtlsHist.Add(polBankDtlsHist);
                        _gdbContext.SaveChanges();


                        //Insert data into PolBankDtls
                        bankDtls.Bank_Name = BankName;
                        bankDtls.Bank_IFSC = BankIFSC;
                        bankDtls.Acc_HldrName = AccHldrName;
                        bankDtls.Acc_Number = AccNumberNew;
                        bankDtls.Acc_Type = long.Parse(AccType);
                        bankDtls.RegistredOn = VerifiedOn;
                        bankDtls.SrvReqID = id.ServiceRequestid;
                        bankDtls.Acc_Active = true;
                        bankDtls.CreatedBy = "";
                        bankDtls.CreatedOn = DateTime.Now;
                        _gdbContext.Entry(bankDtls).State = EntityState.Modified;
                        // _gdbContext.PolBankDtls.AddOrUpdate(bankDtls);
                        _gdbContext.SaveChanges();
                        return "True";
                    }
                    else
                    {


                        PolBankDtls polBankDtls = new PolBankDtls();
                        //Insert data into PolBankDtls
                        polBankDtls.LA_PolicyNo = PolicyNo;
                        polBankDtls.LA_CustomerID = Client_Id;
                        polBankDtls.Bank_Name = BankName;
                        polBankDtls.Bank_IFSC = BankIFSC;
                        polBankDtls.Acc_HldrName = AccHldrName;
                        polBankDtls.Acc_Number = AccNumberNew;
                        polBankDtls.Acc_Type = long.Parse(AccType);
                        polBankDtls.RegistredOn = VerifiedOn;
                        polBankDtls.SrvReqID = id.ServiceRequestid;
                        polBankDtls.Acc_Active = true;
                        polBankDtls.CreatedBy = "";
                        polBankDtls.CreatedOn = DateTime.Now;
                        _gdbContext.PolBankDtls.Add(polBankDtls);
                        _gdbContext.SaveChanges();
                        return "True";
                    }
                }
                else
                {
                    return "Invalid PolicyNumber";
                }

            }
            catch(Exception)
            {
                return "false";
            }
        }

        public async Task<bool> DeDuplicate(string contact, string url, string deDupType, string serReqRefNo)
        {
            List<dynamic> EMAIL = new List<dynamic>()
            { };
            if (deDupType == "EMAIL")
            {
                DeDupEmailRequest dupEmailRequest = new()
                {
                    EmailAddress = contact,
                };
                var dedupResponse = await _httpService.HttpPostCall<DeDupEmailRequest, DeDupResponse>(dupEmailRequest, url);
                if(dedupResponse.ResponseOutput.ResponseHeader.Issuccess == true && dedupResponse.ResponseOutput.ResponseBody.ClientDetails.Count == 0)
                {
                    return false;
                }
               
                EMAIL.Add(dedupResponse.ResponseOutput);
                DeDupData deDupData = new()
                {
                    Type = deDupType,
                    DeDupPayload = JsonConvert.SerializeObject(EMAIL),
                    CreatedDate = DateTime.Now,
                    SrvReqRefNo = serReqRefNo
                };
                _gdbContext.DeDupData.Add(deDupData);
                _gdbContext.SaveChanges();
            }

            if (deDupType == "PHONE")
            {
                DeDupMobileNumberRequest dupEmailRequest = new()
                {
                    MobileNo = contact,
                };
                var dedupResponse = await _httpService.HttpPostCall<DeDupMobileNumberRequest, DeDupResponse>(dupEmailRequest, url);
                if (dedupResponse.ResponseOutput.ResponseHeader.Issuccess == true && dedupResponse.ResponseOutput.ResponseBody.ClientDetails.Count == 0)
                {
                    return false;
                }
                EMAIL.Add(dedupResponse.ResponseOutput);
                DeDupData deDupData = new()
                {
                    Type = deDupType,
                    DeDupPayload = JsonConvert.SerializeObject(EMAIL),
                    CreatedDate = DateTime.Now,
                    SrvReqRefNo = serReqRefNo
                };
                _gdbContext.DeDupData.Add(deDupData);
                _gdbContext.SaveChanges();
            }
            return true;


        }

        public List<ServiceRequestTransectionData> GetTransactionData(string serReqRefNo)
        {
            var serReq =  _gdbContext.ServRequest.Where(x => x.SrvReqRefNo == serReqRefNo).First();
            if (serReq != null)
            {
                return _gdbContext.ServiceRequestTransectionData.Where(x => x.SrvReqID == serReq.SrvReqID).ToList();
            }
            return null;
        }
        public string GetFormDocLnks(int CallType ,int SubType ,int DocId)
        {
            var docname = GetDocName(DocId);
            return _gdbContext.ProcesDocLnk.AsNoTracking()
                .Where(x => x.CALL_TYP == CallType && x.SUB_TYP == SubType && x.DocType == docname).FirstOrDefault().Link;

        }
        public string GetDocName(int docid)
        {
            return _gdbContext.AppMasters.AsNoTracking()
               .Where(x => x.MstCategory == "FORM_NAME" && x.MstID == docid).FirstOrDefault().MstDesc;
        }

        public bool BankDeDuplicate(List<ServiceRequestTransectionData> data,string serReqRefNo)
        {
            List<PolBankDtls> PolBank = new List<PolBankDtls>();
            var dfg = GetClientidAndPolicy(serReqRefNo);
            string PolicyNo = dfg.polyceNumber;
            string CustomerID = dfg.cLientId;
            string Acc_Number_New = data?.Where(x => x.TagName == "Acc_Number_New").FirstOrDefault()?.TagValue;
            string Bank_IFSC_New = data?.Where(x => x.TagName == "Bank_IFSC_New").FirstOrDefault()?.TagValue;
            string PennyDrop = data?.Where(x => x.TagName == "PennyDrop").FirstOrDefault()?.TagValue;        
            var bankDtls = _gdbContext.PolBankDtls.Where(x=>x.Acc_Number== Acc_Number_New && x.Bank_IFSC== Bank_IFSC_New && x.LA_PolicyNo!= PolicyNo).FirstOrDefault();
        
            if (bankDtls != null)
            {
                var branchaname = _gdbContext.BankIFSC.Where(x => x.IFSC == Bank_IFSC_New).Select(x => x.BRANCH).FirstOrDefault();
                if (branchaname != null)
                    bankDtls.Bank_Name = bankDtls.Bank_Name + " - " + branchaname;
                string Customername = dfg.ServiceRequest.ProposerName;
                bankDtls.CustomerName = Customername;
                PolBank.Add(bankDtls);
                DeDupData deDupData = new()
                {
                    Type = "BANK",
                    DeDupPayload = JsonConvert.SerializeObject(PolBank),
                    CreatedDate = DateTime.Now,
                    SrvReqRefNo = serReqRefNo
                };
                _gdbContext.DeDupData.Add(deDupData);
                _gdbContext.SaveChanges();
                return true;
            }
            else if(PennyDrop == "Invalid Input")
            {
                
                DeDupData deDupData = new()
                {
                    Type = "BANK",
                    DeDupPayload = JsonConvert.SerializeObject(PolBank),
                    CreatedDate = DateTime.Now,
                    SrvReqRefNo = serReqRefNo
                };
                _gdbContext.DeDupData.Add(deDupData);
                _gdbContext.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }
        public dynamic GetClientidAndPolicy(string Id)
        {
            string polyceNumber="";
            string cLientId = "";
            string ApplicationNo = "";
            var serRequest = _gdbContext.ServRequest.Where(x => x.SrvReqRefNo == Id).FirstOrDefault();
            if (serRequest != null)
            {
                 polyceNumber = _gdbContext.Policy.Where(x => x.PolicyRef == serRequest.PolicyRef).Select(x=>x.LA_PolicyNo).FirstOrDefault();
                ApplicationNo = _gdbContext.Policy.Where(x => x.PolicyRef == serRequest.PolicyRef).Select(x => x.FG_ApplNo).FirstOrDefault();
                if (polyceNumber != null)
                {
                    cLientId = _gdbContext.Customers.Where(x => x.CustomerRef == serRequest.CustomerRef).Select(x => x.LA_CustomerID).FirstOrDefault();
                }
            }
            dynamic polclientid = new
            {
                polyceNumber,
                cLientId,
                ApplicationNo,
                ServiceRequestid = serRequest.SrvReqID,
                ServiceRequest = serRequest,
                Category= serRequest.Category
            };
            return polclientid;
        }

        public BankIFSC GetBankIFSCDetails(string IFSCCode)
        {
           return _gdbContext.BankIFSC.Where(x => x.IFSC ==  IFSCCode).FirstOrDefault();
        }
        public async Task<IActionResult> ConvertToFormData(string fileUrl)
        {
            string filePath = fileUrl;
            string fileName =System.IO.Path.GetFileName(filePath);

            using (var client = new HttpClient())
            using (var formData = new MultipartFormDataContent())
            {


                formData.Add(new StreamContent(System.IO.File.OpenRead(@"https://futuregeneralistoreage.blob.core.windows.net/filesstorage/sample.pdf")), "file", "sample.pdf");
                // Add any additional non-file data using StringContent
                formData.Add(new StringContent("This is some additional data"), "dataField");

                using (var response = await client.PostAsync(fileUrl, formData))
                {
                    response.EnsureSuccessStatusCode();
                    // Handle response
                }
                return new OkObjectResult("");
            }
        }


        private async Task<byte[]> DownloadFileAsync(string fileUrl)
        {
            using (var client = new HttpClient())
            using (var response = await client.GetAsync(fileUrl))
            {
                response.EnsureSuccessStatusCode();
                return await response.Content.ReadAsByteArrayAsync();
            }
        }
        //public async Task<Response<FormUploadResponse>> FileDataUplaod(IFormFile formDatareq,string IndexName)
        //{
        //    string url = "https://lfagentapigw-rsg.azure-api.net/POSMicroservice/Generic/api/DMS/MoveToDMSFile";
        //    FormUploadRequest requestData = new()
        //    {
        //        RequestHeader = new()
        //        {
        //            Source = "POS",
        //            PolicyNo = "00013374",
        //            ApplicationNo = "223344",
        //            Dob = "06/06/1997"
        //        },
        //        RequestBody = new()
        //        {
        //            UserId = "1139658",
        //            IndexName = IndexName,
        //            DocumentBytes = "",
        //            DocumentName = "sample.pdf",
        //        }

        //    };
        //    IFormFile formData = formDatareq;
        //    var contactResponse = await _httpService.HttpPostForFileUpload<FormUploadRequest, FormUploadResponse>(requestData, url, formData);
        //    return contactResponse;
        //}

        public async Task<Response<EmailManagementResponse>> LANLPAPI(EmailManagementRequest reqBody, string url)
        {
            var nlpResponse = await _httpService.HttpPostCall<EmailManagementRequest, EmailManagementResponse>(reqBody, url);
            return nlpResponse;
        }
        // Fund Switch Flow
        public async Task<Response<dynamic>> FundSwitchWorkFlow<TRequest>(TRequest reqBody, string url, long serReqId)
        {
            // Get Month End Date
            DateTime now = DateTime.Now;
            var startDate = new DateTime(now.Year, now.Month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);

            SurrenderRequest<TRequest> surrenderRequest = new()
            {
                requestHeader = new()
                {
                    source = "POS",
                    carrierCode = "2",
                    branch = "PRA",
                    userId = "website",
                    userRole = "10",
                    partnerId = "MSPOS",
                    processId = "POS",
                    monthendDate = "N",
                    monthendExtension = endDate.ToString("dd/MM/yyyy"),
                },
                requestBody = reqBody,
            };

            var surrenderResponse = await _httpService.HttpPostCall<SurrenderRequest<TRequest>, dynamic>(surrenderRequest, url);

            AppLogs appLogs = new()
            {
                SrvReqID = serReqId,
                CreatedByRef = "System",
                CreatedOn = DateTime.Now,
                ReqURL = url,
                JSON = JsonConvert.SerializeObject(surrenderResponse.ResponseOutput)
            };

            _gdbContext.AppLogs.Add(appLogs);
            _gdbContext.SaveChanges();
            return surrenderResponse;
        }
        // Surrender Flow
        public async Task<Response<dynamic>> SurrenderWorkFlow<TRequest>(TRequest reqBody, string url, long serReqId, string status = "", string serReqRefId = "")
        {
            try
            {
                // Get Month End Date
                DateTime now = DateTime.Now;
                var startDate = new DateTime(now.Year, now.Month, 1);
                var endDate = startDate.AddMonths(1).AddDays(-1);

                SurrenderRequest<TRequest> surrenderRequest = new()
                {
                    requestHeader = new()
                    {
                        source = "POS",
                        carrierCode = "2",
                        branch = "PRA",
                        userId = "rpandya",
                        userRole = "10",
                        partnerId = "MSPOS",
                        processId = "POS",
                        monthendDate = endDate.ToString("dd/MM/yyyy"),
                        monthendExtension = "N"
                    },
                    requestBody = reqBody,
                };

                var surrenderResponse = await _httpService.HttpPostCall<SurrenderRequest<TRequest>, dynamic>(surrenderRequest, url);

                AppLogs appLogs = new()
                {
                    SrvReqID = serReqId,
                    CreatedByRef = "System",
                    CreatedOn = DateTime.Now,
                    ReqURL = url,
                    JSON = JsonConvert.SerializeObject(surrenderResponse.ResponseOutput)
                };
                _gdbContext.AppLogs.Add(appLogs);
                _logger.LogInformation(JsonConvert.SerializeObject(surrenderRequest));
                _gdbContext.SaveChanges();
                if(status == "PayeeCodeReversal")
                {
                    ServiceRequestTransectionData data = new()
                    {
                        ServRequestDtlId = 0,
                        SrvReqID = serReqId,
                        TagName = "PayeeCode",
                        TagValue = surrenderResponse.ResponseOutput.responseBody.payeecode,
                        Status = "Create"
                    };
                    _gdbContext.ServiceRequestTransectionData.Add(data);
                }
                if (status == "PayeeCreation")
                {
                    AllocPayee payeeRecord = new()
                    {
                        AllocPayeeID = 0,
                        SrvReqID = serReqId,
                        PayeeCd = surrenderResponse.ResponseOutput.responseBody?.payeecode,
                        CreatedOn = DateTime.Now,
                        DownloadedBy = null,
                        DownloadedOn = null,
                        IsDownloaded = false
                    };
                    _gdbContext.AllocPayees.Add(payeeRecord);
                    ServiceRequestTransectionData data = new()
                    {
                        ServRequestDtlId = 0,
                        SrvReqID = serReqId,
                        TagName = "PayeeCode",
                        TagValue = surrenderResponse.ResponseOutput.responseBody.payeecode,
                        Status = "Create"
                    };
                    _gdbContext.ServiceRequestTransectionData.Add(data);
                }
                if(status == "PayeeApprove")
                {
                   var allocPaye = _gdbContext.AllocPayees.Where(x => x.SrvReqID == serReqId).FirstOrDefault();
                    if (allocPaye != null)
                    {
                        allocPaye.ZcrtdatE1 = surrenderResponse.ResponseOutput.responseBody?.zcrtdatE1;
                        allocPaye.NEFT_No = surrenderResponse.ResponseOutput.responseBody?.zneftno;
                    }
                }
                if (status == "PayeeAuth")
                {
                    var allocPaye = _gdbContext.AllocPayees.Where(x => x.SrvReqID == serReqId).FirstOrDefault();
                    if (allocPaye != null)
                    {
                        if(surrenderResponse.ResponseOutput.responseBody.errorCode == "0")
                        {
                            allocPaye.Authorized = true;
                            allocPaye.AuthorizedOn = DateTime.Now;
                            allocPaye.AuthStatus = TicketStatus.CLOSED.ToString();

                            var serviceReq = _gdbContext.ServRequest.Where(x => x.SrvReqID == serReqId).FirstOrDefault();
                            serviceReq.CurrentStatus = TicketStatus.CLOSED.ToString();
                        }
                        else
                        {
                            allocPaye.AuthStatus = TicketStatus.FAILED.ToString();
                        }
                    } 
                }
                if (status == "JVCreation")
                {
                    ServiceRequestTransectionData data = new()
                    {
                        ServRequestDtlId = 0,
                        SrvReqID = serReqId,
                        TagName = "JVDocNo",
                        TagValue = surrenderResponse.ResponseOutput.responseBody.docnum,
                        Status = "Create"
                    };
                    _gdbContext.ServiceRequestTransectionData.Add(data);
                }
                _gdbContext.SaveChanges();
                _logger.LogInformation("Saved Changes");
                return surrenderResponse;
            }
            catch (Exception ex)
            {
                //UpdateStatusInDatabase(serReqRefId);
                _logger.LogError(ex.Message);
                throw new Exception("InternalServerError");
            }
        }
        public ServicingDocumentsResponse Formdata(int serReqId, string url, string Bytes, string DocName)
        {
            try
            {

                ServicingDocumentsResponse servicingDocumentsResponse = new ServicingDocumentsResponse()
                {
                    responseHeader = new()
                    {
                        issuccess = true,
                        message = "Success",
                        errorcode = ""
                    },
                    responseBody = new()
                    {
                        dmsFilesList = new List<Dmsfileslist>()
                        {
                            new Dmsfileslist
                            {
                                filename = DocName,
                                fileBytes = Bytes
                            }
                        }
                    }
                };

                AppLogs appLogs = new()
                {
                    SrvReqID = serReqId,
                    CreatedByRef = "System",
                    CreatedOn = DateTime.Now,
                    ReqURL = url,
                    JSON = JsonConvert.SerializeObject(servicingDocumentsResponse)
                };

                _gdbContext.AppLogs.Add(appLogs);
                _gdbContext.SaveChanges();
                return servicingDocumentsResponse;
            }
            catch
            {
                return null;
            }
        }
        // Loan Flow
        public async Task<Response<dynamic>> LoanWorkFlow<TRequest>(TRequest reqBody, string url, long serReqId)
        {
            // Get Month End Date
            DateTime now = DateTime.Now;
            var startDate = new DateTime(now.Year, now.Month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);

            LoanRequest<TRequest> laonRequest = new()
            {
                RequestHeader = new()
                {
                    source = "POS",
                    carrierCode = "2",
                    branch = "PRA",
                    userId = "website",
                    userRole = "10",
                    MonthendDate = endDate.ToString("dd/MM/yyyy"),
                    monthEndExtension = "N"
                },
                RequestBody = reqBody,
            };

            var loanResponse = await _httpService.HttpPostCall<LoanRequest<TRequest>, dynamic>(laonRequest, url);

            AppLogs appLogs = new()
            {
                SrvReqID = serReqId,
                CreatedByRef = "System",
                CreatedOn = DateTime.Now,
                ReqURL = url,
                JSON = JsonConvert.SerializeObject(loanResponse.ResponseOutput)
            };

            _gdbContext.AppLogs.Add(appLogs);
            _gdbContext.SaveChanges();
            return loanResponse;
        }
        // FreeLook Flow
        public async Task<Response<dynamic>> FreeLookWorkFlow<TRequest>(TRequest reqBody, string url, long serReqId,string logType = "", string serReqRefId = "")
        {
            try
            {
                // Get Month End Date
                DateTime now = DateTime.Now;
                var startDate = new DateTime(now.Year, now.Month, 1);
                var endDate = startDate.AddMonths(1).AddDays(-1);

                SurrenderRequest<TRequest> freelookRequest = new()
                {
                    requestHeader = new()
                    {
                        source = "POS",
                        carrierCode = "2",
                        branch = "PRA",
                        userId = "website",
                        userRole = "10",
                        partnerId = "MSPOS",
                        processId = "POS",
                        monthendDate = endDate.ToString("dd/MM/yyyy"),
                        monthendExtension = "N"
                    },
                    requestBody = reqBody,
                };

                var loanResponse = await _httpService.HttpPostCall<SurrenderRequest<TRequest>, dynamic>(freelookRequest, url);

                AppLogs appLogs = new()
                {
                    SrvReqID = serReqId,
                    CreatedByRef = "System",
                    CreatedOn = DateTime.Now,
                    ReqURL = url,
                    JSON = JsonConvert.SerializeObject(loanResponse.ResponseOutput)
                };

                if (logType == "DateTimeForPW")
                {
                    ServiceRequestTransectionData data = new()
                    {
                        ServRequestDtlId = 0,
                        SrvReqID = serReqId,
                        TagName = logType,
                        TagValue = loanResponse.ResponseOutput.responseBody.datime,
                        Status = "Create"
                    };
                    _gdbContext.ServiceRequestTransectionData.Add(data);

                }

                _gdbContext.AppLogs.Add(appLogs);
                _gdbContext.SaveChanges();
                return loanResponse;
            }
            catch (Exception ex)
            {
               // UpdateStatusInDatabase(serReqRefId);
                _logger.LogError(ex.Message);
                return null;
            }
        }
        public async Task<Response<NegativeListResponse>> NegativeList(NegativeListRequest reqBody)
        {
            string url = _commonService._apiUrls.LAURLS.NegativeList;
            var surrenderResponse = await _httpService.HttpPostCall<NegativeListRequest, NegativeListResponse>(reqBody, url);
            return surrenderResponse;
        }
        public bool DeDupForSurrender(List<ServiceRequestTransectionData> data, string serReqRefNo)
        {
            try
            {
                _logger.LogInformation("DeDup API for Surrender, Loan and FreeLook Triggerd");
                // Bank DeDup //
                List<PolBankDtls> PolBank = new List<PolBankDtls>();
                var clientAndPolicyDetails = GetClientidAndPolicy(serReqRefNo);
                var serReq = clientAndPolicyDetails.ServiceRequest as ServiceRequestModel;
                string PolicyNo = clientAndPolicyDetails.polyceNumber;
                string Acc_Number_New = data?.Where(x => x.TagName == "BankAccountNumber").FirstOrDefault()?.TagValue;
                string Bank_IFSC_New = data?.Where(x => x.TagName == "BankIFSC").FirstOrDefault()?.TagValue;
                var bankDtls = _gdbContext.PolBankDtls.Where(x => x.Acc_Number == Acc_Number_New && x.Bank_IFSC == Bank_IFSC_New && x.LA_PolicyNo != PolicyNo).FirstOrDefault();
                _logger.LogInformation("DeDup API For Bank");
                _logger.LogInformation(JsonConvert.SerializeObject(PolBank));
                if (bankDtls != null)
                {
                    PolBank.Add(bankDtls);
                    DeDupData deDupData = new()
                    {
                        Type = "BANK",
                        LA_PolicyNo = PolicyNo,
                        DeDupPayload = JsonConvert.SerializeObject(PolBank),
                        CreatedDate = DateTime.Now,
                        SrvReqRefNo = serReqRefNo
                    };
                    _gdbContext.DeDupData.Add(deDupData);
                    _gdbContext.SaveChanges();
                }

                // Signature Change Request //

                var policy = _gdbContext.Policy.Where(x => x.LA_PolicyNo == PolicyNo).FirstOrDefault();

                var serviceRequestOfSignature = _gdbContext.ServRequest.Where(x => x.CallType == 6 && x.SubType == 7 && x.PolicyRef == policy.PolicyRef).ToList();

                _logger.LogInformation("DeDup API For Signature Change");
                _logger.LogInformation(JsonConvert.SerializeObject(serviceRequestOfSignature));
                if (serviceRequestOfSignature.Count != 0)
                {
                    DeDupData deDupData = new()
                    {
                        Type = "SIGNATURE",
                        LA_PolicyNo = PolicyNo,
                        DeDupPayload = JsonConvert.SerializeObject(serviceRequestOfSignature),
                        CreatedDate = DateTime.Now,
                        SrvReqRefNo = serReqRefNo
                    };
                    _gdbContext.DeDupData.Add(deDupData);
                    _gdbContext.SaveChanges();
                }

                // Nagative List API //
                // Added Nagative list to dedup
                NegativeListRequest negativeList = new()
                {
                    requestHeader = new()
                    {
                        source = "POS",
                        dob = "string",
                        policyNo = PolicyNo,
                        applicationNo = ""
                    },
                    requestBody = new()
                    {
                        searchtype = "C",
                        name = serReq.ProposerName,
                        applicationNo = policy.FG_ApplNo
                    }
                };
                var negativeResponse = NegativeList(negativeList).Result;
                if (negativeResponse.ResponseOutput.responseBody?.ofac != null && negativeResponse.ResponseOutput.responseBody.ofac.Count != 0)
                {
                    _logger.LogInformation("DeDup API For Negative List");
                    _logger.LogInformation(JsonConvert.SerializeObject(negativeResponse.ResponseOutput.responseBody.ofac));
                    DeDupData deDupData = new()
                    {
                        Type = "NEGATIVELIST",
                        LA_PolicyNo = PolicyNo,
                        DeDupPayload = JsonConvert.SerializeObject(negativeResponse.ResponseOutput.responseBody.ofac),
                        CreatedDate = DateTime.Now,
                        SrvReqRefNo = serReqRefNo
                    };
                    _gdbContext.DeDupData.Add(deDupData);
                    _gdbContext.SaveChanges();
                }

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                return true;
            }
        }

        public async Task<Response<dynamic>> PanUpdate<TRequest>(TRequest reqBody, string url, long serReqId)
        {
            SurrenderRequest<TRequest> surrenderRequest = new()
            {
                requestHeader = new()
                {
                    source = "POS",
                    carrierCode = "2",
                    branch = "PRA",
                    userId = "website",
                    userRole = "10",
                    partnerId = "MSPOS",
                    processId = "POS",
                    monthendDate = "N",
                    monthendExtension = ""
                },
                requestBody = reqBody,
            };

            var surrenderResponse = await _httpService.HttpPostCall<SurrenderRequest<TRequest>, dynamic>(surrenderRequest, url);
            AppLogs appLogs = new()
            {
                SrvReqID = serReqId,
                CreatedByRef = "System",
                CreatedOn = DateTime.Now,
                ReqURL = url,
                JSON = JsonConvert.SerializeObject(surrenderResponse.ResponseOutput)
            };

            _gdbContext.AppLogs.Add(appLogs);
            _gdbContext.SaveChanges();
            return surrenderResponse;
        }
        public async Task<Response<dynamic>> AgentCodeUpdate<TRequest>(TRequest reqBody, string url, long serReqId)
        {
            SurrenderRequest<TRequest> surrenderRequest = new()
            {
                requestHeader = new()
                {
                    source = "POS",
                    carrierCode = "2",
                    branch = "PRA",
                    userId = "website",
                    userRole = "10",
                    partnerId = "MSPOS",
                    processId = "POS",
                    monthendDate = "N",
                    monthendExtension = ""
                },
                requestBody = reqBody,
            };

            var surrenderResponse = await _httpService.HttpPostCall<SurrenderRequest<TRequest>, dynamic>(surrenderRequest, url);
            AppLogs appLogs = new()
            {
                SrvReqID = serReqId,
                CreatedByRef = "System",
                CreatedOn = DateTime.Now,
                ReqURL = url,
                JSON = JsonConvert.SerializeObject(surrenderResponse.ResponseOutput)
            };

            _gdbContext.AppLogs.Add(appLogs);
            _gdbContext.SaveChanges();
            return surrenderResponse;
        }

        public async Task<Response<dynamic>> NomineeUpdate<TRequest>(TRequest reqBody, string url, long serReqId)
        {
            SurrenderRequest<TRequest> surrenderRequest = new()
            {
                requestHeader = new()
                {
                    source = "POS",
                    carrierCode = "2",
                    branch = "PRA",
                    userId = "website",
                    userRole = "10",
                    partnerId = "MSPOS",
                    processId = "POS",
                    monthendDate = "N",
                    monthendExtension = ""
                },
                requestBody = reqBody,
            };

            var surrenderResponse = await _httpService.HttpPostCall<SurrenderRequest<TRequest>, dynamic>(surrenderRequest, url);
            AppLogs appLogs = new()
            {
                SrvReqID = serReqId,
                CreatedByRef = "System",
                CreatedOn = DateTime.Now,
                ReqURL = url,
                JSON = JsonConvert.SerializeObject(surrenderResponse.ResponseOutput)
            };

            _gdbContext.AppLogs.Add(appLogs);
            _gdbContext.SaveChanges();
            return surrenderResponse;
        }


        public async Task<Response<AddressDetailsResponse>> GSTINUpdate(dynamic reqBody, string url)
        {
            AddressUpdateDetailsRequest contactUpdateAdd = new()
            {
                RequestHeader = new()
                {
                    Source = "POS",
                    CarrierCode = "2",
                    Branch = "PRA",
                    UserId = "WEBSITE",
                    UserRole = "10",
                    PartnerId = "MSPOS",
                    ProcessId = "POS",
                    MonthEndExtension = "N",
                    MonthEndDate = "09/12/2023"
                },
                RequestBody = reqBody
            };
            var contactResponse = await _httpService.HttpPostCall<AddressUpdateDetailsRequest, AddressDetailsResponse>(contactUpdateAdd, url);
            return contactResponse;
        }
        public async Task<Response<dynamic>> AppointeChange<TRequest>(TRequest reqBody, string url, long serReqId)
        {
            SurrenderRequest<TRequest> surrenderRequest = new()
            {
                requestHeader = new()
                {
                    source = "POS",
                    carrierCode = "2",
                    branch = "PRA",
                    userId = "website",
                    userRole = "10",
                    partnerId = "MSPOS",
                    processId = "POS",
                    monthendDate = "N",
                    monthendExtension = ""
                },
                requestBody = reqBody,
            };

            var surrenderResponse = await _httpService.HttpPostCall<SurrenderRequest<TRequest>, dynamic>(surrenderRequest, url);

            AppLogs appLogs = new()
            {
                SrvReqID = serReqId,
                CreatedByRef = "System",
                CreatedOn = DateTime.Now,
                ReqURL = url,
                JSON = JsonConvert.SerializeObject(surrenderResponse.ResponseOutput)
            };

            _gdbContext.AppLogs.Add(appLogs);
            _gdbContext.SaveChanges();
            return surrenderResponse;
        }
        public async Task<dynamic> ListOfSurvicingDocuments(ServicingDocumentsRequest reqBody, string url, long serReqId, List<ServiceRequestTransectionData> data)
        {
            // Get Month End Date
            DateTime now = DateTime.Now;
            var startDate = new DateTime(now.Year, now.Month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);
            var getAllFilesList = await _httpService.HttpPostCall<ServicingDocumentsRequest, ServiceDocumentsFilesListResponse>(reqBody, url);

            string getFileURL = GetURLS().getDMSDocuments;
            string fromDate = data?.Where(x => x.TagName.Contains("FromDate")).FirstOrDefault()?.TagValue;
            string toDate = data?.Where(x => x.TagName.Contains("ToDate")).FirstOrDefault()?.TagValue;
            string isDateRange = data?.Where(x => x.TagName.Contains("IsDateRange")).FirstOrDefault()?.TagValue;

            var listOfFile = getAllFilesList.ResponseOutput.ResponseBody.FilesList;

            List<FileItem> filteredFiles = new();
            if (isDateRange.ToUpper() == "TRUE")
            {
                DateTime fromDateTime = DateTime.Parse(fromDate);
                DateTime toDateTime = DateTime.Parse(toDate);

                filteredFiles = listOfFile.Where(x => GetDateFromIndexName(x.IndexName) > fromDateTime && GetDateFromIndexName(x.IndexName) < toDateTime).ToList();
            }
            else
            {
                var record = listOfFile.OrderByDescending(d => GetDateFromIndexName(d.IndexName)).FirstOrDefault();
                if (record != null)
                {
                    filteredFiles.Add(record);
                }
            }

            // Static Method For Getting DateTime form Index
            static DateTime GetDateFromIndexName(string indexName)
            {
                List<string> dateStringList = indexName.Split('-').ToList();
                dateStringList.RemoveAt(0);
                return DateTime.Parse(string.Join(",", dateStringList.ToArray()));
            }

            foreach (var file in filteredFiles)
            {
                reqBody.requestbody.IndexName = file.IndexName;
                var response = await _httpService.HttpPostCall<ServicingDocumentsRequest, ServicingDocumentsResponse>(reqBody, getFileURL);

                AppLogs appLogs = new()
                {
                    SrvReqID = serReqId,
                    CreatedByRef = "System",
                    CreatedOn = DateTime.Now,
                    ReqURL = getFileURL,
                    JSON = JsonConvert.SerializeObject(response.ResponseOutput)
                };

                _gdbContext.AppLogs.Add(appLogs);
                _gdbContext.SaveChanges();
            }

            return filteredFiles;
        }
        public async Task<Response<dynamic>> SurvicingDocuments(ServicingDocumentsRequest reqBody, string url, long serReqId)
        {
            // Get Month End Date
            DateTime now = DateTime.Now;
            var startDate = new DateTime(now.Year, now.Month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);
            var surrenderResponse = await _httpService.HttpPostCall<ServicingDocumentsRequest, dynamic>(reqBody, url);

            AppLogs appLogs = new()
            {
                SrvReqID = serReqId,
                CreatedByRef = "System",
                CreatedOn = DateTime.Now,
                ReqURL = url,
                JSON = JsonConvert.SerializeObject(surrenderResponse.ResponseOutput)
            };

            _gdbContext.AppLogs.Add(appLogs);
            _gdbContext.SaveChanges();
            return surrenderResponse;
        }
        public async Task<Response<PaymentLinkFGResponse>> PaymentLink<TRequest>(TRequest reqBody, string url, long serReqId)
        {

            var surrenderResponse = await _httpService.HttpPostCall<TRequest, PaymentLinkFGResponse>(reqBody, url);

            ServiceRequestTransectionData data = new()
            {
                ServRequestDtlId = 0,
                SrvReqID = serReqId,
                TagName = "PaymentLink",
                TagValue = surrenderResponse.ResponseOutput.responseBody?.redirectlink,
                Status = "Create"
            };
            _gdbContext.ServiceRequestTransectionData.Add(data);
            _gdbContext.SaveChanges();
            return surrenderResponse;
        }
        public async Task<Response<dynamic>> LoanStatment<TRequest>(TRequest reqBody, string url, long serReqId)
        {
            SurrenderRequest<TRequest> surrenderRequest = new()
            {
                requestHeader = new()
                {
                    source = "POS",
                    carrierCode = "2",
                    branch = "PRA",
                    userId = "website",
                    userRole = "10",
                    partnerId = "MSPOS",
                    processId = "POS",
                    monthendDate = "N",
                    monthendExtension = ""
                },
                requestBody = reqBody,
            };

            var LoanStatment = await _httpService.HttpPostCall<SurrenderRequest<TRequest>, dynamic>(surrenderRequest, url);            
            return LoanStatment;
        }
        public async Task<Response<dynamic>> PPC(PPCRequest reqBody, string url, long serReqId)
        {
            PPCRequest PPCRequest = new()
            {
                RequestHeader = new()
                {
                    source = "POS",
                    carrierCode = "2",
                    branch = "PRA",
                    userId = "website",
                    userRole = "10",
                    monthEndExtension = "",
                    meDate = ""
                },
                RequestBody = reqBody.RequestBody
            };

            var PPC = await _httpService.HttpPostCall<PPCRequest, dynamic>(PPCRequest, url);

            AppLogs appLogs = new()
            {
                SrvReqID = serReqId,
                CreatedByRef = "System",
                CreatedOn = DateTime.Now,
                ReqURL = url,
                JSON = JsonConvert.SerializeObject(PPC.ResponseOutput)
            };

            _gdbContext.AppLogs.Add(appLogs);
            _gdbContext.SaveChanges();
            return PPC;
        }
        public async Task<Response<dynamic>> UnitStatement(UnitStatementRequest reqBody, string url, long serReqId)
        {
            UnitStatementRequest unitStatementRequest = new()
            {
                RequestHeader = new()
                {
                    source = "POS",
                    carrierCode = "2",
                    branch = "PRA",
                    userId = "website",
                    userRole = "10",
                    monthEndExtension = "",
                    meDate = ""
                },
                RequestBody = reqBody.RequestBody
            };

            var PPC = await _httpService.HttpPostCall<UnitStatementRequest, dynamic>(unitStatementRequest, url);

            AppLogs appLogs = new()
            {
                SrvReqID = serReqId,
                CreatedByRef = "System",
                CreatedOn = DateTime.Now,
                ReqURL = url,
                JSON = JsonConvert.SerializeObject(PPC.ResponseOutput)
            };

            _gdbContext.AppLogs.Add(appLogs);
            _gdbContext.SaveChanges();
            return PPC;
        }
        public ServicingDocumentsResponse PPCResponse(PPC pPC, long servicereqId,string ApplicationNo,string Year,string GeneratedPdfUrl)
        {
            var xmlDocument = Encoding.UTF8.GetString(Convert.FromBase64String(pPC.ResponseOutput.responseBody.bytes));
            XDocument doc = XDocument.Parse(xmlDocument);
            var serializer = new XmlSerializer(typeof(PremiumCertificate));
            var model =
                from xml in doc.Descendants("Premium_Certificate")
                select serializer.Deserialize(xml.CreateReader()) as PremiumCertificate;
            var jsonResult = JsonConvert.SerializeObject(model, Formatting.Indented);
            //Rootobject pPCBytesResponse = JsonConvert.DeserializeObject<Rootobject>(jsonResult);

            List<FG_STModels.Models.LifeAsia.Policy> ListPolicy = new List<FG_STModels.Models.LifeAsia.Policy>();
            BodyContent generatePPCRequest = new BodyContent();
            generatePPCRequest.HtmlFileName = "PPC-DEFAULT.html";
            generatePPCRequest.ApplicationNo = ApplicationNo;
            generatePPCRequest.blobFileName = "PPC.pdf";
            generatePPCRequest.DocumentType = "PPC";
            generatePPCRequest.policies = ListPolicy ;
            foreach (var premiumCertificate in model)
            {
                foreach (var polices in premiumCertificate.PolicyDetails)
                {
                    FG_STModels.Models.LifeAsia.Policy p = new FG_STModels.Models.LifeAsia.Policy();
                    if (polices.BenefitDetails.TaxBenefits == "80C")
                    {
                        p.BasePremReceived = Convert.ToInt64(Convert.ToDecimal(polices.BenefitDetails.CoveragePremium));
                    }
                    else
                    {
                        p.BasePremReceived = Convert.ToInt32(0.00);
                    }
                    //TaxRelief taxRelief80D = premiumCertificate.TaxReliefs.FirstOrDefault(x => x.TaxSection == "80D");
                    if (polices.BenefitDetails.TaxBenefits == "80D")
                    {
                        p.TotalRiderPremReceived = Convert.ToInt32(Convert.ToDecimal(polices.BenefitDetails.CoveragePremium));
                    }
                    else
                    {
                        p.TotalRiderPremReceived = Convert.ToInt32(0.00);
                    }


                    p.PolicyRef = 1;
                    p.LA_PolicyNo = polices.PolicyNo;
                    p.FG_ApplNo = ApplicationNo;
                    p.PlanName = polices.BenefitDetails.CoverageDescription == null ? "" : polices.BenefitDetails.CoverageDescription;
                    p.BasePremReceived = p.BasePremReceived;
                    p.TotalRiderPremReceived = p.TotalRiderPremReceived;
                    p.TotalPremReceived = Convert.ToInt64(Convert.ToDecimal(polices.BenefitDetails.CoveragePremium));
                    p.TotalTax = 0;
                    p.NextDueDate = polices.NextDueDate == "-" ? (DateTime?)null : DateTime.TryParse(polices.NextDueDate, out DateTime result) ? result : DateTime.MinValue;
                    //p.NextDueDate =DateTime.ParseExact(polices.NextDueDate, "dd/mm/yyyy", CultureInfo.InvariantCulture);
                    p.PremPaymentMode = polices.PremiumMode == null ? "" : polices.PremiumMode;
                    ListPolicy.Add(p);
                };
                generatePPCRequest.Header.TryAdd("PONAME", premiumCertificate.OwnerName == null ? "" : premiumCertificate.OwnerName);
                generatePPCRequest.Header.TryAdd("ADDR_LINE1",(premiumCertificate.Address1 + "" + premiumCertificate.Address2) == null ? "" : (premiumCertificate.Address1 + "" + premiumCertificate.Address2));
                generatePPCRequest.Header.TryAdd("ADDR_LINE2", premiumCertificate.Address3 == null ? "" : premiumCertificate.Address3);
                generatePPCRequest.Header.TryAdd("STATE", premiumCertificate.Address5 == null ? "" : premiumCertificate.Address5);
                generatePPCRequest.Header.TryAdd("FIN_YEAR", Year);
                generatePPCRequest.Header.TryAdd("PHONE_NO", premiumCertificate.OwnerMobileNo);
                generatePPCRequest.Header.TryAdd("CURR_DATE", DateTime.Now.ToString("dd/MM/yyyy"));
                generatePPCRequest.Header.TryAdd("TOT_BASE_PREM", ListPolicy.Sum(x => x.BasePremReceived).ToString());
                generatePPCRequest.Header.TryAdd("TOT_RIDER_PREM", ListPolicy.Sum(x => x.TotalRiderPremReceived).ToString());
            }
            var json= JsonConvert.SerializeObject(generatePPCRequest);
           var surrenderResponse =  _httpService.HttpPostCallLocal<BodyContent, dynamic>(generatePPCRequest, GeneratedPdfUrl);
            var jsonres = JsonConvert.SerializeObject(surrenderResponse.Result);
            GeneratePPCResponse pPCResponse =JsonConvert.DeserializeObject<GeneratePPCResponse>(jsonres);
          return Base64Format(pPCResponse.ResponseOutput.pdfBody.DocumentType, pPCResponse.ResponseOutput.pdfBody.applicationNo, pPCResponse.ResponseOutput.pdfBody.blobFileName, GeneratedPdfUrl, servicereqId);
        }
        public ServicingDocumentsResponse UnitStatementResponse(PPC pPC, long servicereqId, string ApplicationNo, string Year, string GeneratedPdfUrl,ILogger logger)
        {

            logger.LogInformation("UnitStatementResponse");
            //string Bytes = "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4NCjxVbml0X1N0YXRlbWVudD4NCjxSZXBvcnRfRGF0ZT4yMC8xMS8yMDIzPC9SZXBvcnRfRGF0ZT4NCjxQb2xpY3lfTm8+MDAwODk5NTk8L1BvbGljeV9Obz4NCjxDb250cmFjdF9UeXBlX0Rlc2NyaXB0aW9uPkZ1dHVyZSBHZW5lcmFsaSBEaGFuIFZyaWRoaTwvQ29udHJhY3RfVHlwZV9EZXNjcmlwdGlvbj4NCjxSaXNrX0NvbW1lbmNlbWVudF9EYXRlPjIyLzAyLzIwMjE8L1Jpc2tfQ29tbWVuY2VtZW50X0RhdGU+DQo8Q3VycmVuY3k+SU5SPC9DdXJyZW5jeT4NCjxOZXh0X1ByZW1pdW1fRHVlX0RhdGU+MjIvMDIvMjAyNTwvTmV4dF9QcmVtaXVtX0R1ZV9EYXRlPg0KPFBvbGljeV9TdGF0dXM+SUY8L1BvbGljeV9TdGF0dXM+DQo8TGlmZV9Bc3N1cmVkPlNpbmdoLCBBbmtpdDwvTGlmZV9Bc3N1cmVkPg0KPEFkZHJlc3MxPlJldnRpIE5hZ2FyPC9BZGRyZXNzMT4NCjxBZGRyZXNzMj4tPC9BZGRyZXNzMj4NCjxBZGRyZXNzMz4tPC9BZGRyZXNzMz4NCjxBZGRyZXNzND5UaGFuZTwvQWRkcmVzczQ+DQo8QWRkcmVzczU+TWFoYXJhc2h0cmE8L0FkZHJlc3M1Pg0KPFBvc3Rjb2RlPjQwMDYwMTwvUG9zdGNvZGU+DQo8T3duZXI+U2luZ2gsIEFua2l0PC9Pd25lcj4NCjxPd25lcl9OdW1iZXI+NTAxMzE0NTI8L093bmVyX051bWJlcj4NCjxPd25lcl9BZGRyczE+UmV2dGkgTmFnYXI8L093bmVyX0FkZHJzMT4NCjxPd25lcl9BZGRyczI+LTwvT3duZXJfQWRkcnMyPg0KPE93bmVyX0FkZHJzMz4tPC9Pd25lcl9BZGRyczM+DQo8T3duZXJfQWRkcnM0PlRoYW5lPC9Pd25lcl9BZGRyczQ+DQo8T3duZXJfQWRkcnM1Pk1haGFyYXNodHJhPC9Pd25lcl9BZGRyczU+DQo8T3duZXJfUG9zdGNvZGU+NDAwNjAxPC9Pd25lcl9Qb3N0Y29kZT4NCjxPd25lcl9FbWFpbF9JZD5LaXJ0aS5TYWxpZ2FuamV3YXJAZnV0dXJlZ2VuZXJhbGkuaW48L093bmVyX0VtYWlsX0lkPg0KPE93bmVyX01vYmlsZV9Obz45NjU3NjM3MTQ1PC9Pd25lcl9Nb2JpbGVfTm8+DQo8UHJlbWl1bV9Nb2RlPlJlZ3VsYXIgUHJlbWl1bTwvUHJlbWl1bV9Nb2RlPg0KPFN1bV9Bc3N1cmVkPjIwMCwwMDAuMDA8L1N1bV9Bc3N1cmVkPg0KPFRvdGFsX1ByZW1pdW1zX1BhaWQ+ODAsMDAwLjAwPC9Ub3RhbF9QcmVtaXVtc19QYWlkPg0KPFRvcHVwX0Ftb3VudD4wLjAwPC9Ub3B1cF9BbW91bnQ+DQo8UHJlbWl1bT4yMCwwMDAuMDA8L1ByZW1pdW0+DQo8QWxsb2NhdGlvbl9DaGFyZ2VzPjIsMjUwLjAwPC9BbGxvY2F0aW9uX0NoYXJnZXM+DQo8RnVuZF9EZXRhaWxzPg0KPEZ1bmRfQ29kZT5GQVBYPC9GdW5kX0NvZGU+DQo8RnVuZF9QcmNudD4xMDAuMDA8L0Z1bmRfUHJjbnQ+DQo8RnVuZF9EZXNjcmlwdGlvbj5GdXR1cmUgQXBleDwvRnVuZF9EZXNjcmlwdGlvbj4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MTEvMDIvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPk9wZW5pbmcgQmFsYW5jZTwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+MDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MDwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz4xLDk0My41ODk3NDwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDMvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+OC4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPk1vcnQgY2hnczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC44MjA1MS08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+MSw5NDIuNzY5MjM8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjAzLzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjE2LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+TW9ydCBjaGdzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4xLjY0MTAzLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz4xLDk0MS4xMjgyMDwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDMvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NTUuODM8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Qb2wgRmVlczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+NS43MjYxNS08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+MSw5MzUuNDAyMDU8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjAzLzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjEsOTM1LjI5OTQ5PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wMy8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz4xLDkzNS4xOTY5MzwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDMvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+MSw5MzUuMDk0Mzc8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjAzLzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjEsOTM0Ljk5MTgxPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wMy8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD45NS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6QWxsb2M8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjkuNzQzNTktPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjEsOTI1LjI0ODIyPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wMy8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD45NS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6QWxsb2M8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjkuNzQzNTktPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjEsOTE1LjUwNDYzPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wMy8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpQb2w8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuNTEyODItPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjEsOTE0Ljk5MTgxPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wMy8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpQb2w8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuNTEyODItPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjEsOTE0LjQ3ODk5PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xOSw2MDAuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5MaWZlIFByZW08L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjIsMDEwLjI1NjQxPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjMsOTI0LjczNTQwPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xOSw2MDAuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5MaWZlIFByZW08L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjIsMDEwLjI1NjQxPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsOTM0Ljk5MTgxPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD44LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+TW9ydCBjaGdzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjgyMDUxLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDkzNC4xNzEzMDwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MTIuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Nb3J0IGNoZ3M8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjEuMjMwNzctPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsOTMyLjk0MDUzPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41NS44MzwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlBvbCBGZWVzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz41LjcyNjE1LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDkyNy4yMTQzODwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw5MjcuMTExODI8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsOTI3LjAwOTI2PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpQb2w8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuNTEyODItPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsOTI2LjQ5NjQ0PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpQb2w8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuNTEyODItPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsOTI1Ljk4MzYyPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDkyNS44ODEwNjwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw5MjUuNzc4NTA8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjguMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Nb3J0IGNoZ3M8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuODIwNTEtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsOTI0Ljk1Nzk5PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xMy4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPk1vcnQgY2hnczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MS4zMzMzMy08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw5MjMuNjI0NjY8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjU1LjgzPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+UG9sIEZlZXM8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjUuNzI2MTUtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsOTE3Ljg5ODUxPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDkxNy43OTU5NTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw5MTcuNjkzMzk8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjUuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOlBvbDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC41MTI4Mi08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw5MTcuMTgwNTc8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjUuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOlBvbDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC41MTI4Mi08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw5MTYuNjY3NzU8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsOTE2LjU2NTE5PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDkxNi40NjI2MzwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+OC4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPk1vcnQgY2hnczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC44MjA1MS08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw5MTUuNjQyMTI8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEzLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+TW9ydCBjaGdzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4xLjMzMzMzLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDkxNC4zMDg3OTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NTUuODM8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Qb2wgRmVlczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+NS43MjYxNS08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw5MDguNTgyNjQ8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsOTA4LjQ4MDA4PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDkwOC4zNzc1MjwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6UG9sPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjUxMjgyLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDkwNy44NjQ3MDwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6UG9sPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjUxMjgyLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDkwNy4zNTE4ODwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw5MDcuMjQ5MzI8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsOTA3LjE0Njc2PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD44LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+TW9ydCBjaGdzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjgyMDUxLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDkwNi4zMjYyNTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MTIuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Nb3J0IGNoZ3M8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjEuMjMwNzctPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsOTA1LjA5NTQ4PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41NS44MzwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlBvbCBGZWVzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz41LjcyNjE1LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDg5OS4zNjkzMzwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4OTkuMjY2Nzc8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODk5LjE2NDIxPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpQb2w8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuNTEyODItPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODk4LjY1MTM5PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpQb2w8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuNTEyODItPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODk4LjEzODU3PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDg5OC4wMzYwMTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4OTcuOTMzNDU8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjguMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Nb3J0IGNoZ3M8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuODIwNTEtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODk3LjExMjk0PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xMy4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPk1vcnQgY2hnczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MS4zMzMzMy08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4OTUuNzc5NjE8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjU1LjgzPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+UG9sIEZlZXM8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjUuNzI2MTUtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODkwLjA1MzQ2PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDg4OS45NTA5MDwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4ODkuODQ4MzQ8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjUuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOlBvbDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC41MTI4Mi08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4ODkuMzM1NTI8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjUuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOlBvbDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC41MTI4Mi08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4ODguODIyNzA8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODg4LjcyMDE0PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDg4OC42MTc1ODwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+OC4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPk1vcnQgY2hnczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC44MjA1MS08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4ODcuNzk3MDc8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEzLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+TW9ydCBjaGdzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4xLjMzMzMzLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDg4Ni40NjM3NDwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NTUuODM8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Qb2wgRmVlczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+NS43MjYxNS08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4ODAuNzM3NTk8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODgwLjYzNTAzPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDg4MC41MzI0NzwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6UG9sPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjUxMjgyLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDg4MC4wMTk2NTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6UG9sPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjUxMjgyLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDg3OS41MDY4MzwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4NzkuNDA0Mjc8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODc5LjMwMTcxPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD44LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+TW9ydCBjaGdzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjgyMDUxLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDg3OC40ODEyMDwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MTIuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Nb3J0IGNoZ3M8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjEuMjMwNzctPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODc3LjI1MDQzPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41NS44MzwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlBvbCBGZWVzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz41LjcyNjE1LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDg3MS41MjQyODwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4NzEuNDIxNzI8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODcxLjMxOTE2PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpQb2w8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuNTEyODItPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODcwLjgwNjM0PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpQb2w8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuNTEyODItPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODcwLjI5MzUyPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDg3MC4xOTA5NjwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4NzAuMDg4NDA8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjguMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Nb3J0IGNoZ3M8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuODIwNTEtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODY5LjI2Nzg5PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xMy4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPk1vcnQgY2hnczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MS4zMzMzMy08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4NjcuOTM0NTY8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjU1LjgzPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+UG9sIEZlZXM8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjUuNzI2MTUtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODYyLjIwODQxPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDg2Mi4xMDU4NTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4NjIuMDAzMjk8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjUuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOlBvbDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC41MTI4Mi08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4NjEuNDkwNDc8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjUuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOlBvbDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC41MTI4Mi08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4NjAuOTc3NjU8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODYwLjg3NTA5PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDg2MC43NzI1MzwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+OC4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPk1vcnQgY2hnczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC44MjA1MS08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4NTkuOTUyMDI8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEzLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+TW9ydCBjaGdzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4xLjMzMzMzLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDg1OC42MTg2OTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NTUuODM8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Qb2wgRmVlczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+NS43MjYxNS08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4NTIuODkyNTQ8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODUyLjc4OTk4PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDg1Mi42ODc0MjwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6UG9sPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjUxMjgyLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDg1Mi4xNzQ2MDwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6UG9sPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjUxMjgyLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDg1MS42NjE3ODwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4NTEuNTU5MjI8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODUxLjQ1NjY2PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD44LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+TW9ydCBjaGdzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjgyMDUxLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDg1MC42MzYxNTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MTIuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Nb3J0IGNoZ3M8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjEuMjMwNzctPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODQ5LjQwNTM4PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41NS44MzwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlBvbCBGZWVzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz41LjcyNjE1LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDg0My42NzkyMzwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4NDMuNTc2Njc8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODQzLjQ3NDExPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpQb2w8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuNTEyODItPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODQyLjk2MTI5PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpQb2w8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuNTEyODItPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODQyLjQ0ODQ3PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDg0Mi4zNDU5MTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4NDIuMjQzMzU8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjguMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Nb3J0IGNoZ3M8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuODIwNTEtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODQxLjQyMjg0PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xMy4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPk1vcnQgY2hnczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MS4zMzMzMy08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4NDAuMDg5NTE8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjU1LjgzPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+UG9sIEZlZXM8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjUuNzI2MTUtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODM0LjM2MzM2PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDgzNC4yNjA4MDwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4MzQuMTU4MjQ8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjUuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOlBvbDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC41MTI4Mi08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4MzMuNjQ1NDI8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjUuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOlBvbDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC41MTI4Mi08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4MzMuMTMyNjA8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODMzLjAzMDA0PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDgzMi45Mjc0ODwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+OC4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPk1vcnQgY2hnczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC44MjA1MS08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4MzIuMTA2OTc8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEzLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+TW9ydCBjaGdzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4xLjMzMzMzLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDgzMC43NzM2NDwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NTUuODM8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Qb2wgRmVlczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+NS43MjYxNS08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4MjUuMDQ3NDk8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODI0Ljk0NDkzPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDgyNC44NDIzNzwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6UG9sPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjUxMjgyLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDgyNC4zMjk1NTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6UG9sPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjUxMjgyLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDgyMy44MTY3MzwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4MjMuNzE0MTc8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODIzLjYxMTYxPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD44LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+TW9ydCBjaGdzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjgyMDUxLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDgyMi43OTExMDwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MTMuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Nb3J0IGNoZ3M8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjEuMzMzMzMtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODIxLjQ1Nzc3PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41NS44MzwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlBvbCBGZWVzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz41LjcyNjE1LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDgxNS43MzE2MjwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4MTUuNjI5MDY8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODE1LjUyNjUwPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpQb2w8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuNTEyODItPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODE1LjAxMzY4PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpQb2w8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuNTEyODItPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODE0LjUwMDg2PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDgxNC4zOTgzMDwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4MTQuMjk1NzQ8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjguMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Nb3J0IGNoZ3M8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuODIwNTEtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODEzLjQ3NTIzPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xMy4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPk1vcnQgY2hnczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MS4zMzMzMy08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4MTIuMTQxOTA8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjU1LjgzPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+UG9sIEZlZXM8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjUuNzI2MTUtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODA2LjQxNTc1PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDgwNi4zMTMxOTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4MDYuMjEwNjM8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjUuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOlBvbDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC41MTI4Mi08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4MDUuNjk3ODE8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjUuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOlBvbDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC41MTI4Mi08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4MDUuMTg0OTk8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsODA1LjA4MjQzPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDgwNC45Nzk4NzwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+OC4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPk1vcnQgY2hnczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC44MjA1MS08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw4MDQuMTU5MzY8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEzLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+TW9ydCBjaGdzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4xLjMzMzMzLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDgwMi44MjYwMzwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NTUuODM8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Qb2wgRmVlczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+NS43MjYxNS08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3OTcuMDk5ODg8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzk2Ljk5NzMyPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDc5Ni44OTQ3NjwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6UG9sPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjUxMjgyLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDc5Ni4zODE5NDwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6UG9sPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjUxMjgyLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDc5NS44NjkxMjwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3OTUuNzY2NTY8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzk1LjY2NDAwPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD44LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+TW9ydCBjaGdzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjgyMDUxLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDc5NC44NDM0OTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MTMuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Nb3J0IGNoZ3M8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjEuMzMzMzMtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzkzLjUxMDE2PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41NS44MzwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlBvbCBGZWVzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz41LjcyNjE1LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDc4Ny43ODQwMTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3ODcuNjgxNDU8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzg3LjU3ODg5PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpQb2w8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuNTEyODItPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzg3LjA2NjA3PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpQb2w8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuNTEyODItPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzg2LjU1MzI1PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDc4Ni40NTA2OTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3ODYuMzQ4MTM8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjguMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Nb3J0IGNoZ3M8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuODIwNTEtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzg1LjUyNzYyPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xMy4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPk1vcnQgY2hnczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MS4zMzMzMy08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3ODQuMTk0Mjk8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjU1LjgzPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+UG9sIEZlZXM8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjUuNzI2MTUtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzc4LjQ2ODE0PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDc3OC4zNjU1ODwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3NzguMjYzMDI8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjUuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOlBvbDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC41MTI4Mi08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3NzcuNzUwMjA8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjUuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOlBvbDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC41MTI4Mi08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3NzcuMjM3Mzg8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzc3LjEzNDgyPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDc3Ny4wMzIyNjwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+OC4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPk1vcnQgY2hnczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC44MjA1MS08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3NzYuMjExNzU8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEzLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+TW9ydCBjaGdzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4xLjMzMzMzLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDc3NC44Nzg0MjwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NTUuODM8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Qb2wgRmVlczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+NS43MjYxNS08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3NjkuMTUyMjc8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzY5LjA0OTcxPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDc2OC45NDcxNTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6UG9sPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjUxMjgyLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDc2OC40MzQzMzwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6UG9sPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjUxMjgyLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDc2Ny45MjE1MTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3NjcuODE4OTU8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzY3LjcxNjM5PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD44LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+TW9ydCBjaGdzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjgyMDUxLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDc2Ni44OTU4ODwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MTMuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Nb3J0IGNoZ3M8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjEuMzMzMzMtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzY1LjU2MjU1PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41NS44MzwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlBvbCBGZWVzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz41LjcyNjE1LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDc1OS44MzY0MDwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3NTkuNzMzODQ8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzU5LjYzMTI4PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpQb2w8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuNTEyODItPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzU5LjExODQ2PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpQb2w8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuNTEyODItPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzU4LjYwNTY0PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDc1OC41MDMwODwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3NTguNDAwNTI8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjguMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Nb3J0IGNoZ3M8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuODIwNTEtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzU3LjU4MDAxPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xMy4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPk1vcnQgY2hnczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MS4zMzMzMy08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3NTYuMjQ2Njg8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjU1LjgzPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+UG9sIEZlZXM8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjUuNzI2MTUtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzUwLjUyMDUzPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDc1MC40MTc5NzwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3NTAuMzE1NDE8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjUuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOlBvbDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC41MTI4Mi08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3NDkuODAyNTk8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjUuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOlBvbDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC41MTI4Mi08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3NDkuMjg5Nzc8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzQ5LjE4NzIxPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDc0OS4wODQ2NTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+OC4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPk1vcnQgY2hnczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC44MjA1MS08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3NDguMjY0MTQ8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEzLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+TW9ydCBjaGdzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4xLjMzMzMzLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDc0Ni45MzA4MTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NTUuODM8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Qb2wgRmVlczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+NS43MjYxNS08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3NDEuMjA0NjY8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzQxLjEwMjEwPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDc0MC45OTk1NDwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6UG9sPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjUxMjgyLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDc0MC40ODY3MjwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6UG9sPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjUxMjgyLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDczOS45NzM5MDwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3MzkuODcxMzQ8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzM5Ljc2ODc4PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD44LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+TW9ydCBjaGdzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjgyMDUxLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDczOC45NDgyNzwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MTMuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Nb3J0IGNoZ3M8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjEuMzMzMzMtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzM3LjYxNDk0PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41NS44MzwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlBvbCBGZWVzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz41LjcyNjE1LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDczMS44ODg3OTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3MzEuNzg2MjM8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzMxLjY4MzY3PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpQb2w8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuNTEyODItPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzMxLjE3MDg1PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpQb2w8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuNTEyODItPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzMwLjY1ODAzPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDczMC41NTU0NzwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3MzAuNDUyOTE8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjguMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Nb3J0IGNoZ3M8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuODIwNTEtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzI5LjYzMjQwPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xMy4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPk1vcnQgY2hnczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MS4zMzMzMy08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3MjguMjk5MDc8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjU1LjgzPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+UG9sIEZlZXM8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjUuNzI2MTUtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzIyLjU3MjkyPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDcyMi40NzAzNjwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3MjIuMzY3ODA8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjUuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOlBvbDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC41MTI4Mi08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3MjEuODU0OTg8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjUuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOlBvbDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC41MTI4Mi08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3MjEuMzQyMTY8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzIxLjIzOTYwPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDcyMS4xMzcwNDwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+OC4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPk1vcnQgY2hnczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC44MjA1MS08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3MjAuMzE2NTM8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEzLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+TW9ydCBjaGdzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4xLjMzMzMzLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDcxOC45ODMyMDwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NTUuODM8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Qb2wgRmVlczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+NS43MjYxNS08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3MTMuMjU3MDU8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzEzLjE1NDQ5PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDcxMy4wNTE5MzwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6UG9sPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjUxMjgyLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDcxMi41MzkxMTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6UG9sPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjUxMjgyLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDcxMi4wMjYyOTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3MTEuOTIzNzM8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzExLjgyMTE3PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD44LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+TW9ydCBjaGdzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjgyMDUxLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDcxMS4wMDA2NjwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MTMuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Nb3J0IGNoZ3M8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjEuMzMzMzMtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzA5LjY2NzMzPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41NS44MzwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlBvbCBGZWVzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz41LjcyNjE1LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDcwMy45NDExODwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3MDMuODM4NjI8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzAzLjczNjA2PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpQb2w8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuNTEyODItPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzAzLjIyMzI0PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpQb2w8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuNTEyODItPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzAyLjcxMDQyPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDcwMi42MDc4NjwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3MDIuNTA1MzA8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjguMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Nb3J0IGNoZ3M8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuODIwNTEtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNzAxLjY4NDc5PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xMy4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPk1vcnQgY2hnczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MS4zMzMzMy08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw3MDAuMzUxNDY8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjU1LjgzPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+UG9sIEZlZXM8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjUuNzI2MTUtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNjk0LjYyNTMxPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDY5NC41MjI3NTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw2OTQuNDIwMTk8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjUuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOlBvbDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC41MTI4Mi08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw2OTMuOTA3Mzc8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjUuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOlBvbDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC41MTI4Mi08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw2OTMuMzk0NTU8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNjkzLjI5MTk5PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDY5My4xODk0MzwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+OC4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPk1vcnQgY2hnczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC44MjA1MS08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw2OTIuMzY4OTI8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEzLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+TW9ydCBjaGdzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4xLjMzMzMzLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDY5MS4wMzU1OTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NTUuODM8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Qb2wgRmVlczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+NS43MjYxNS08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw2ODUuMzA5NDQ8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNjg1LjIwNjg4PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDY4NS4xMDQzMjwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6UG9sPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjUxMjgyLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDY4NC41OTE1MDwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6UG9sPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjUxMjgyLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDY4NC4wNzg2ODwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw2ODMuOTc2MTI8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNjgzLjg3MzU2PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD44LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+TW9ydCBjaGdzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjgyMDUxLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDY4My4wNTMwNTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MTMuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Nb3J0IGNoZ3M8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjEuMzMzMzMtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNjgxLjcxOTcyPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41NS44MzwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlBvbCBGZWVzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz41LjcyNjE1LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDY3NS45OTM1NzwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw2NzUuODkxMDE8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNjc1Ljc4ODQ1PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpQb2w8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuNTEyODItPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNjc1LjI3NTYzPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpQb2w8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuNTEyODItPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNjc0Ljc2MjgxPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDY3NC42NjAyNTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw2NzQuNTU3Njk8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjguMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Nb3J0IGNoZ3M8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuODIwNTEtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNjczLjczNzE4PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xMy4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPk1vcnQgY2hnczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MS4zMzMzMy08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw2NzIuNDAzODU8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjU1LjgzPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+UG9sIEZlZXM8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjUuNzI2MTUtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNjY2LjY3NzcwPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDY2Ni41NzUxNDwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw2NjYuNDcyNTg8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjUuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOlBvbDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC41MTI4Mi08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw2NjUuOTU5NzY8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjUuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOlBvbDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC41MTI4Mi08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw2NjUuNDQ2OTQ8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNjY1LjM0NDM4PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDY2NS4yNDE4MjwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+OC4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPk1vcnQgY2hnczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC44MjA1MS08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw2NjQuNDIxMzE8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjExLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+TW9ydCBjaGdzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4xLjEyODIxLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDY2My4yOTMxMDwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NTUuODM8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Qb2wgRmVlczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+NS43MjYxNS08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw2NTcuNTY2OTU8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNjU3LjQ2NDM5PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDY1Ny4zNjE4MzwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6UG9sPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjUxMjgyLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDY1Ni44NDkwMTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6UG9sPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjUxMjgyLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDY1Ni4zMzYxOTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw2NTYuMjMzNjM8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNjU2LjEzMTA3PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD44LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+TW9ydCBjaGdzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjgyMDUxLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDY1NS4zMTA1NjwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MTMuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Nb3J0IGNoZ3M8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjEuMzMzMzMtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNjUzLjk3NzIzPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41NS44MzwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlBvbCBGZWVzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz41LjcyNjE1LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDY0OC4yNTEwODwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw2NDguMTQ4NTI8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNjQ4LjA0NTk2PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpQb2w8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuNTEyODItPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNjQ3LjUzMzE0PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD41LjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpQb2w8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuNTEyODItPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNjQ3LjAyMDMyPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDY0Ni45MTc3NjwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw2NDYuODE1MjA8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjguMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Nb3J0IGNoZ3M8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuODIwNTEtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNjQ1Ljk5NDY5PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xMy4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPk1vcnQgY2hnczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MS4zMzMzMy08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw2NDQuNjYxMzY8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjU1LjgzPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+UG9sIEZlZXM8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjUuNzI2MTUtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNjM4LjkzNTIxPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+U0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDYzOC44MzI2NTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw2MzguNzMwMDk8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjUuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOlBvbDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC41MTI4Mi08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw2MzguMjE3Mjc8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjUuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOlBvbDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC41MTI4Mi08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw2MzcuNzA0NDU8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA0LzExLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNjM3LjYwMTg5PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNC8xMS8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDYzNy40OTkzMzwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MzYuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOkFsbG9jPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4zLjY5MjMxLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDYzMy44MDcwMjwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MzYuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOkFsbG9jPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4zLjY5MjMxLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDYzMC4xMTQ3MTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MzYuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOkFsbG9jPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4zLjY5MjMxLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDYyNi40MjI0MDwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDQvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MzYuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOkFsbG9jPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4zLjY5MjMxLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDYyMi43MzAwOTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDUvMTIvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+OC4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPk1vcnQgY2hnczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC44MjA1MS08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw2MjEuOTA5NTg8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA1LzEyLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEzLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+TW9ydCBjaGdzPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4xLjMzMzMzLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDYyMC41NzYyNTwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDUvMTIvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NTUuODM8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5Qb2wgRmVlczwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+NS43MjYxNS08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw2MTQuODUwMTA8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA1LzEyLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNjE0Ljc0NzU0PC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNS8xMi8yMDIzPC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xLjAwPC9UcmFuc2FjdGlvbl9BbW91bnQ+DQo8VHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+Q0dTVDpNb3J0PC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjEwMjU2LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDYxNC42NDQ5ODwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDUvMTIvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6UG9sPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjUxMjgyLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDYxNC4xMzIxNjwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDUvMTIvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+NS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6UG9sPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT45Ljc1MDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4wLjUxMjgyLTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz41LDYxMy42MTkzNDwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MDUvMTIvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+MS4wMDwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPlNHU1Q6TW9ydDwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+MC4xMDI1Ni08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+NSw2MTMuNTE2Nzg8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA1LzEyLzIwMjM8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjEuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5DR1NUOk1vcnQ8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjAuMTAyNTYtPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjUsNjEzLjQxNDIyPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNS8wNS8yMDI0PC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4xOSw2MDAuMDA8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5MaWZlIFByZW08L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjkuNzUwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjIsMDEwLjI1NjQxPC9UcmFuc2FjdGlvbl9Vbml0cz4NCjxSdW5uaW5nX1RvdGFsX1VuaXRzPjcsNjIzLjY3MDYzPC9SdW5uaW5nX1RvdGFsX1VuaXRzPg0KPC9UcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fRGF0ZT4wNS8wNS8yMDI0PC9UcmFuc2FjdGlvbl9EYXRlPg0KPFRyYW5zYWN0aW9uX0Ftb3VudD4yNTkuNTg8L1RyYW5zYWN0aW9uX0Ftb3VudD4NCjxUcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj5TR1NUOkFsbG9jPC9UcmFuc2FjdGlvbl9EZXNjcmlwdGlvbj4NCjxUeG5fVW5pdF9QcmljZT44LjAwMDAwPC9UeG5fVW5pdF9QcmljZT4NCjxUcmFuc2FjdGlvbl9Vbml0cz4zMi40NDY4OC08L1RyYW5zYWN0aW9uX1VuaXRzPg0KPFJ1bm5pbmdfVG90YWxfVW5pdHM+Nyw1OTEuMjIzNzU8L1J1bm5pbmdfVG90YWxfVW5pdHM+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8VHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9EYXRlPjA1LzA1LzIwMjQ8L1RyYW5zYWN0aW9uX0RhdGU+DQo8VHJhbnNhY3Rpb25fQW1vdW50PjI1OS41ODwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNHU1Q6QWxsb2M8L1RyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPg0KPFR4bl9Vbml0X1ByaWNlPjguMDAwMDA8L1R4bl9Vbml0X1ByaWNlPg0KPFRyYW5zYWN0aW9uX1VuaXRzPjMyLjQ0Njg4LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz43LDU1OC43NzY4NzwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjwvVHJhbnNhY3Rpb25fTGluZT4NCjxUcmFuc2FjdGlvbl9MaW5lPg0KPFRyYW5zYWN0aW9uX0RhdGU+MjAvMTEvMjAyMzwvVHJhbnNhY3Rpb25fRGF0ZT4NCjxUcmFuc2FjdGlvbl9BbW91bnQ+LTwvVHJhbnNhY3Rpb25fQW1vdW50Pg0KPFRyYW5zYWN0aW9uX0Rlc2NyaXB0aW9uPkNsb3NpbmcgQmFsYW5jZTwvVHJhbnNhY3Rpb25fRGVzY3JpcHRpb24+DQo8VHhuX1VuaXRfUHJpY2U+OS43NTAwMDwvVHhuX1VuaXRfUHJpY2U+DQo8VHJhbnNhY3Rpb25fVW5pdHM+LTwvVHJhbnNhY3Rpb25fVW5pdHM+DQo8UnVubmluZ19Ub3RhbF9Vbml0cz43LDU1OC43NzY4NzwvUnVubmluZ19Ub3RhbF9Vbml0cz4NCjxUb3RhbF9Vbml0cz43LDU1OC43NzY4NzwvVG90YWxfVW5pdHM+DQo8VG90YWxfRnVuZF9WYWx1ZT43Myw2OTguMDc8L1RvdGFsX0Z1bmRfVmFsdWU+DQo8L1RyYW5zYWN0aW9uX0xpbmU+DQo8L0Z1bmRfRGV0YWlscz4NCjxDdXJyZW50X1VuaXRfVmFsdWU+NzMsNjk4LjA3PC9DdXJyZW50X1VuaXRfVmFsdWU+DQo8QWdlbnRfTmFtZT5OYWlyLCBBbmFuZDwvQWdlbnRfTmFtZT4NCjxBZ2VudF9Db250YWN0X051bWJlcj4zNDU2NDQ0NTwvQWdlbnRfQ29udGFjdF9OdW1iZXI+DQo8VW5pdF9hbmRfRnVuZF9kZXRhaWxzX2FzX29uX2RhdGU+DQo8RGF0ZT4xMS8wMi8yMDIzPC9EYXRlPg0KPEZ1bmRfY29kZT5GQVBYPC9GdW5kX2NvZGU+DQo8VG90YWxfVW5pdHNfYXNfb25fZGF0ZT4xLDk0My41ODk3NDwvVG90YWxfVW5pdHNfYXNfb25fZGF0ZT4NCjxUb3RhbF9GdW5kX1ZhbHVlX2FzX29uX2RhdGU+MC4wMDwvVG90YWxfRnVuZF9WYWx1ZV9hc19vbl9kYXRlPg0KPC9Vbml0X2FuZF9GdW5kX2RldGFpbHNfYXNfb25fZGF0ZT4NCjxVbml0X2FuZF9GdW5kX2RldGFpbHNfYXNfb25fZGF0ZT4NCjxEYXRlPjAzLzExLzIwMjM8L0RhdGU+DQo8RnVuZF9jb2RlPkZBUFg8L0Z1bmRfY29kZT4NCjxUb3RhbF9Vbml0c19hc19vbl9kYXRlPjEsOTE0LjQ3ODk3PC9Ub3RhbF9Vbml0c19hc19vbl9kYXRlPg0KPFRvdGFsX0Z1bmRfVmFsdWVfYXNfb25fZGF0ZT4xOCw2NjYuMTY8L1RvdGFsX0Z1bmRfVmFsdWVfYXNfb25fZGF0ZT4NCjwvVW5pdF9hbmRfRnVuZF9kZXRhaWxzX2FzX29uX2RhdGU+DQo8VW5pdF9hbmRfRnVuZF9kZXRhaWxzX2FzX29uX2RhdGU+DQo8RGF0ZT4wNC8xMS8yMDIzPC9EYXRlPg0KPEZ1bmRfY29kZT5GQVBYPC9GdW5kX2NvZGU+DQo8VG90YWxfVW5pdHNfYXNfb25fZGF0ZT41LDYyMi43MjkyMzwvVG90YWxfVW5pdHNfYXNfb25fZGF0ZT4NCjxUb3RhbF9GdW5kX1ZhbHVlX2FzX29uX2RhdGU+NTQsODIxLjYwPC9Ub3RhbF9GdW5kX1ZhbHVlX2FzX29uX2RhdGU+DQo8L1VuaXRfYW5kX0Z1bmRfZGV0YWlsc19hc19vbl9kYXRlPg0KPFVuaXRfYW5kX0Z1bmRfZGV0YWlsc19hc19vbl9kYXRlPg0KPERhdGU+MDUvMTIvMjAyMzwvRGF0ZT4NCjxGdW5kX2NvZGU+RkFQWDwvRnVuZF9jb2RlPg0KPFRvdGFsX1VuaXRzX2FzX29uX2RhdGU+NSw2MTMuNDEzMzM8L1RvdGFsX1VuaXRzX2FzX29uX2RhdGU+DQo8VG90YWxfRnVuZF9WYWx1ZV9hc19vbl9kYXRlPjU0LDczMC43NzwvVG90YWxfRnVuZF9WYWx1ZV9hc19vbl9kYXRlPg0KPC9Vbml0X2FuZF9GdW5kX2RldGFpbHNfYXNfb25fZGF0ZT4NCjxVbml0X2FuZF9GdW5kX2RldGFpbHNfYXNfb25fZGF0ZT4NCjxEYXRlPjA1LzA1LzIwMjQ8L0RhdGU+DQo8RnVuZF9jb2RlPkZBUFg8L0Z1bmRfY29kZT4NCjxUb3RhbF9Vbml0c19hc19vbl9kYXRlPjcsNjIzLjY2OTc0PC9Ub3RhbF9Vbml0c19hc19vbl9kYXRlPg0KPFRvdGFsX0Z1bmRfVmFsdWVfYXNfb25fZGF0ZT42MCw5ODkuMzU8L1RvdGFsX0Z1bmRfVmFsdWVfYXNfb25fZGF0ZT4NCjwvVW5pdF9hbmRfRnVuZF9kZXRhaWxzX2FzX29uX2RhdGU+DQo8RnVuZF9hbmRfcGVyY2VudGFnZV9vcHRlZD4NCjxGdW5kX2NvZGU+RlNFQzwvRnVuZF9jb2RlPg0KPEZ1bmRfUHJjbnQ+MC4wMDwvRnVuZF9QcmNudD4NCjxGdW5kX2NvZGU+RklOQzwvRnVuZF9jb2RlPg0KPEZ1bmRfUHJjbnQ+MC4wMDwvRnVuZF9QcmNudD4NCjxGdW5kX2NvZGU+RkJBTDwvRnVuZF9jb2RlPg0KPEZ1bmRfUHJjbnQ+MC4wMDwvRnVuZF9QcmNudD4NCjxGdW5kX2NvZGU+RkFQWDwvRnVuZF9jb2RlPg0KPEZ1bmRfUHJjbnQ+MTAwLjAwPC9GdW5kX1ByY250Pg0KPEZ1bmRfY29kZT5GT1BQPC9GdW5kX2NvZGU+DQo8RnVuZF9QcmNudD4wLjAwPC9GdW5kX1ByY250Pg0KPEZ1bmRfY29kZT5GTUFYPC9GdW5kX2NvZGU+DQo8RnVuZF9QcmNudD4wLjAwPC9GdW5kX1ByY250Pg0KPEZ1bmRfY29kZT5GTUlEPC9GdW5kX2NvZGU+DQo8RnVuZF9QcmNudD4wLjAwPC9GdW5kX1ByY250Pg0KPC9GdW5kX2FuZF9wZXJjZW50YWdlX29wdGVkPg0KPC9Vbml0X1N0YXRlbWVudD4NCg==";
            var xmlDocument = Encoding.UTF8.GetString(Convert.FromBase64String(pPC.ResponseOutput.responseBody.bytes));
                var serializer = new XmlSerializer(typeof(Unit_Statement));
                Unit_Statement unitStatement;

                using (var reader = new StringReader(xmlDocument))
                {
                    unitStatement = (Unit_Statement)serializer.Deserialize(reader);
                }
               logger.LogInformation("xml serializer");
                List<UnitTransaction> unitTransactions = new List<UnitTransaction>();
                List<FG_STModels.Models.LifeAsia.Policy> ListPolicy = new List<FG_STModels.Models.LifeAsia.Policy>();
                List<Fund> Funds = new List<Fund>();
                BodyContent pdfBodyContent = new BodyContent();
            logger.LogInformation("start binding");

            
            pdfBodyContent.Funds.AddRange(unitStatement.Fund_Details.
                Select(x => new Fund
                {
                    FundName = x.Fund_Description,
                    NAV_DT = DateTime.ParseExact(unitStatement.Unit_and_Fund_details_as_on_date.
                    Where(y => y.Fund_code == x.Fund_Code).
                    Select(col => col.Date).FirstOrDefault(), "dd/MM/yyyy", null),
                    TOT_FUND_VAL = decimal.Parse(unitStatement.Unit_and_Fund_details_as_on_date.
                    Where(y => x.Fund_Code == y.Fund_code).
                    Select(col => col.Total_Fund_Value_as_on_date).FirstOrDefault()),
                    unitTransaction = x.Transaction_Line.
                    Select(ut => new UnitTransaction
                    {
                        TransactionDt = DateTime.ParseExact(ut.Transaction_Date, "dd/MM/yyyy", null),
                        TransactionDesc = ut.Transaction_Description,
                        TotalUnits = ut.Transaction_Units,
                        UnitPrice = ut.Txn_Unit_Price,
                        TransactionAmt = ut.Transaction_Amount,
                        TransactedUnits = ut.Transaction_Units
                    }).ToList()
                }));
            pdfBodyContent.HtmlFileName = "UNITSTMT_DEFAULT.html";
                pdfBodyContent.ApplicationNo = ApplicationNo;
                pdfBodyContent.blobFileName = "UnitStatement.pdf";
                pdfBodyContent.DocumentType = "UnitStmt";
                pdfBodyContent.Header = new System.Collections.Concurrent.ConcurrentDictionary<string, string>();
                pdfBodyContent.Header.TryAdd("Date", unitStatement.Report_Date);
                pdfBodyContent.Header.TryAdd("LA_PolicyNo", unitStatement.Policy_No.ToString());
                pdfBodyContent.Header.TryAdd("PONAME", unitStatement.Owner);
                pdfBodyContent.Header.TryAdd("Assignee", "");
                pdfBodyContent.Header.TryAdd("LANAME", unitStatement.Life_Assured);
                pdfBodyContent.Header.TryAdd("ADDRLN1", unitStatement.Address1);
                pdfBodyContent.Header.TryAdd("ADDRLN2", unitStatement.Address2);
                pdfBodyContent.Header.TryAdd("ADDRLN3", unitStatement.Address3);
                pdfBodyContent.Header.TryAdd("STATE", unitStatement.Address5);
                pdfBodyContent.Header.TryAdd("PINCODE", unitStatement.Postcode.ToString());
                //Content.Header.TryAdd("Address", string.Concat(unitStatement.Address1, unitStatement.Address2, unitStatement.Address3, unitStatement, unitStatement.Address4, unitStatement.Address5, unitStatement.Postcode));
                pdfBodyContent.Header.TryAdd("PolicyStatus", unitStatement.Policy_Status);
                pdfBodyContent.Header.TryAdd("Mode", unitStatement.Premium_Mode);
                pdfBodyContent.Header.TryAdd("Sum_Assured", unitStatement.Sum_Assured);
                pdfBodyContent.Header.TryAdd("Premium", unitStatement.Premium);
                pdfBodyContent.Header.TryAdd("TOP_UP", unitStatement.Topup_Amount.ToString());
                pdfBodyContent.Header.TryAdd("ALLOC_CHRGS", unitStatement.Allocation_Charges);
                pdfBodyContent.Header.TryAdd("NEXT_DUE_DT", unitStatement.Next_Premium_Due_Date);
                pdfBodyContent.Header.TryAdd("TOT_PREM_PAID", unitStatement.Total_Premiums_Paid);
                pdfBodyContent.Header.TryAdd("Life_Assured", unitStatement.Life_Assured);
                pdfBodyContent.Header.TryAdd("POLICY_TYP", unitStatement.Contract_Type_Description);
                pdfBodyContent.Header.TryAdd("AGENT_NAME", unitStatement.Agent_Name);
            logger.LogInformation("pdfBodyContent");
            pdfBodyContent.Header.TryAdd("Current_Date", DateTime.Now.ToString("dd/MM/yyyy"));
            logger.LogInformation("Current_Date");

            var df = JsonConvert.SerializeObject(pdfBodyContent);
                var surrenderResponse = _httpService.HttpPostCallLocal<BodyContent, dynamic>(pdfBodyContent, GeneratedPdfUrl);
                var jsonres = JsonConvert.SerializeObject(surrenderResponse.Result);
                GeneratePPCResponse pPCResponse = JsonConvert.DeserializeObject<GeneratePPCResponse>(jsonres);
                return Base64Format(pPCResponse.ResponseOutput.pdfBody.DocumentType, pPCResponse.ResponseOutput.pdfBody.applicationNo, pPCResponse.ResponseOutput.pdfBody.blobFileName, GeneratedPdfUrl, servicereqId);
          
           
        }
        public ServicingDocumentsResponse Base64Format(string DocType ,string floder,string BlobName,string url,long serReqId)
        {

            var ConnAndContainer = GetBlobConn();
           // string connectionString = "DefaultEndpointsProtocol=https;AccountName=futuregeneralistoreage;AccountKey=5LlrTqKWPGnHT8fErvYufHelZ1Vm0D0epcdGGdnziosq4y/nAcDpGP9QtYwxZgvGSFsRgCgHLr9a+AStnUgThg==;EndpointSuffix=core.windows.net";
            //string containerName = "projectfilesstorage";
            string blobName = "/"+DocType+"/"+ floder+"/"+ BlobName + "";
            ServicingDocumentsResponse servicingDocumentsResponse = null;
            var blobServiceClient = new BlobServiceClient(ConnAndContainer.BLOB_CONN_STR);
            var blobContainerClient = blobServiceClient.GetBlobContainerClient(ConnAndContainer.BLOB_CNTNR_NM);
            var blobClient = blobContainerClient.GetBlobClient(blobName);

            try
            {
            var blobDownloadInfo =  blobClient.Download();

                using (var memoryStream = new MemoryStream())
                {
                    blobDownloadInfo.Value.Content.CopyTo(memoryStream);
                    memoryStream.Seek(0, SeekOrigin.Begin);

                    string base64String = Convert.ToBase64String(memoryStream.ToArray());
                    servicingDocumentsResponse = Formdata(Convert.ToInt32(serReqId), url, base64String, BlobName);
                }
                return servicingDocumentsResponse;
            }
            catch (RequestFailedException ex)
            {
                Console.WriteLine($"Error downloading blob: {ex.Message}");
                return servicingDocumentsResponse;
            }
        }

        public async Task<Response<dynamic>> AbsoluteAssignment<TRequest>(TRequest reqBody, string url, long serReqId)
        {
            SurrenderRequest<TRequest> surrenderRequest = new()
            {
                requestHeader = new()
                {
                    source = "POS",
                    carrierCode = "2",
                    branch = "PRA",
                    userId = "rpandya",
                    userRole = "10",
                    partnerId = "MSPOS",
                    processId = "POS",
                    monthendExtension = "N",
                    monthendDate = "29/11/2023"
                  
                },
                requestBody = reqBody,
            };

            var absoluteAssignmentResponse = await _httpService.HttpPostCall<SurrenderRequest<TRequest>, dynamic>(surrenderRequest, url);
            AppLogs appLogs = new()
            {
                SrvReqID = serReqId,
                CreatedByRef = "System",
                CreatedOn = DateTime.Now,
                ReqURL = url,
                JSON = JsonConvert.SerializeObject(absoluteAssignmentResponse.ResponseOutput)
            };

            _gdbContext.AppLogs.Add(appLogs);
            _gdbContext.SaveChanges();
            return absoluteAssignmentResponse;
        }
        public void SaveCKYCDetails(string CKYCNumber, long customerRef)
        {

            ClntAttr clnAttr = new()
            {
                CustomerRef = customerRef,
                TagName = "CKYC",
                TagValue = CKYCNumber,
                CreatedBy = "",
                CreatedOn = DateTime.Now,
            };

            _gdbContext.ClntAttr.Add(clnAttr);
            _gdbContext.SaveChanges();

        }

        public bool SaveDNDDetails(string serviceReqRefNo, List<ServiceRequestTransectionData> data)
        {
            try
            {
                var policyDetails = GetClientidAndPolicy(serviceReqRefNo);
                string PolicyNo = policyDetails.polyceNumber;
                string CustomerID = policyDetails.cLientId;
                var serviceRequest = policyDetails.ServiceRequest as ServiceRequestModel;
                if (policyDetails != null)
                {
                    string mobileNumber = data?.Where(x => x.TagName == "MobileNumber").FirstOrDefault()?.TagValue;
                    string dndStatus = data?.Where(x => x.TagName == "Action").FirstOrDefault()?.TagValue;

                    var DndDtls = _gdbContext.DnD_LIST.Where(x => x.PolicyRef == serviceRequest.PolicyRef && x.DndCntctNo == mobileNumber).FirstOrDefault();
                    if (DndDtls != null)
                    {
                        DND_LIST_HIST DndHist = new()
                        {
                            PolicyRef = serviceRequest.PolicyRef,
                            DndCntctNo = mobileNumber,
                            DndStatus = dndStatus.ToUpper() == "TRUE" ? true : false,
                            SrvReqID = serviceRequest.SrvReqID,
                            CreatedBy = serviceRequest.CreatedByRef,
                            CreatedOn = DateTime.Now,
                        };
                        _gdbContext.DNDHistory.Add(DndHist);

                        DndDtls.DndStatus = dndStatus.ToUpper() == "TRUE" ? true : false;
                        DndDtls.ModifiedOn = DateTime.Now;
                        DndDtls.ModifiedBy = serviceRequest.ModifiedByRef;
                        
                        _gdbContext.SaveChanges();
                        return true;
                    }
                    else
                    {
                        DnD_LIST DndRecorda = new()
                        {
                            PolicyRef = serviceRequest.PolicyRef,
                            DndCntctNo = mobileNumber,
                            DndStatus = dndStatus.ToUpper() == "TRUE" ? true : false,
                            CreatedBy = serviceRequest.CreatedByRef,
                            CreatedOn = DateTime.Now,
                            ModifiedBy = serviceRequest.ModifiedByRef,
                            ModifiedOn = DateTime.Now,
                        };

                        _gdbContext.DnD_LIST.Add(DndRecorda);
                        _gdbContext.SaveChanges();
                        return true;
                    }
                }
                else
                {
                    _logger.LogInformation("Invalid Policy Number");
                    return false;
                }

            }
            catch (Exception)
            {
                return false;
            }
        }

        public dynamic GetBlobConn()
        {

            string BLOB_CNTNR_NM = string.Empty;
            string BLOB_CONN_STR = string.Empty;
            foreach (Models.DB.AppMasters item in _gdbContext.AppMasters.
                       Where(x => new string[] { "BLOB_CNTNR_NM", "BLOB_CONN_STR" }.
                       Contains(x.MstCategory)))
            {
                switch (item.MstCategory)
                {
                    case "BLOB_CNTNR_NM":
                        BLOB_CNTNR_NM = item.MstDesc;
                        break;
                    case "BLOB_CONN_STR":
                        BLOB_CONN_STR = item.MstDesc;
                        break;
                    default:
                        break;
                }
            }
            return new
            {
                BLOB_CNTNR_NM,
                BLOB_CONN_STR
            };
        }

        public string UpdateStatusInDatabase(string serviceRequestId)
        {
            var serviceRequest = _gdbContext.ServRequest.FirstOrDefault(sr => sr.SrvReqRefNo == serviceRequestId);
            string newStatus = FG_STModels.Models.Shared.TicketStatus.FAILED.ToString();
            if (serviceRequest != null)
            {
                serviceRequest.CurrentStatus = newStatus;
                _gdbContext.SaveChanges();
            }
            else
            {
                Console.WriteLine($"ServiceRequestid {serviceRequestId} not found in the database.");
            }
            throw new Exception("InternalServerError");
        }
        public string LoanStatementResponse(LoanStatement loanStatement, string url, long serReqId)
        {
            try
            {
                var dynamicObject = new System.Dynamic.ExpandoObject();
                var dynamicDictionary = dynamicObject as IDictionary<string, Object>;
                for (int j = 1; j <= 8; j++)
                {
                    string DATE = $"DATE{j}";
                    string PRINC = $"PRINC{j}";
                    string Int = $"INT{j}";
                    string tot = $"TOT{j}";
                    dynamicDictionary.Add(DATE, "");
                    dynamicDictionary.Add(PRINC, "");
                    dynamicDictionary.Add(Int, "");
                    dynamicDictionary.Add(tot, "");
                }
                for (int i = 0; i < loanStatement.ResponseOutput.responseBody.listDetails.Count(); i++)
                {
                    if (loanStatement.ResponseOutput.responseBody.listDetails[i].zldate != null)
                    {
                        DateTime.TryParseExact(loanStatement.ResponseOutput.responseBody.listDetails[i].zldate, "yyyyMMdd", null, System.Globalization.DateTimeStyles.None, out DateTime result);
                        dynamicDictionary["DATE" + (i + 1) + ""] = result.ToString("dd-MM-yyyy");
                    }
                    else
                    {
                        dynamicDictionary["DATE" + (i + 1) + ""] = "";
                    }

                    dynamicDictionary["PRINC" + (i + 1) + ""] = loanStatement.ResponseOutput.responseBody.listDetails[i].zlpamt;
                    dynamicDictionary["INT" + (i + 1) + ""] = loanStatement.ResponseOutput.responseBody.listDetails[i].zlamount;
                    dynamicDictionary["TOT" + (i + 1) + ""] = loanStatement.ResponseOutput.responseBody.listDetails[i].ttpayamt;
                }

                dynamicDictionary.Add($"TOTPRINC", loanStatement.ResponseOutput.responseBody.listDetails.Sum(x => Convert.ToDecimal(x.zlpamt)));
                dynamicDictionary.Add($"TOTALINT", loanStatement.ResponseOutput.responseBody.listDetails.Sum(x => Convert.ToDecimal(x.zlamount)));
                dynamicDictionary.Add($"TOTALAMT", loanStatement.ResponseOutput.responseBody.listDetails.Sum(x => Convert.ToDecimal(x.ttpayamt)));
                dynamicDictionary.Add($"TOTALOUT", loanStatement.ResponseOutput.responseBody.listDetails.Sum(x => Convert.ToDecimal(x.zlpamt) + Convert.ToDecimal(x.zlamount)));
                dynamicDictionary.Add($"LOANPRINC", loanStatement.ResponseOutput.responseBody.hpleamt);
                dynamicDictionary.Add($"PERCENT", loanStatement.ResponseOutput.responseBody.intanny);
                dynamicDictionary.Add($"TOTINTEREST", loanStatement.ResponseOutput.responseBody.hpleint);
                dynamicDictionary.Add($"LETTERDATE", DateTime.Now.ToString("dd-MM-yyyy"));
                var json = JsonConvert.SerializeObject(dynamicDictionary);
                AppLogs appLogs = new()
                {
                    SrvReqID = serReqId,
                    CreatedByRef = "System",
                    CreatedOn = DateTime.Now,
                    ReqURL = url,
                    JSON = json
                };

                _gdbContext.AppLogs.Add(appLogs);
                _gdbContext.SaveChanges();
                return json;
            }
            catch(Exception ex)
            {
                return "internalservererror";
            }
        }

        public string LifeAsiaError(string resp,string serReqRefNo)
        {
            try
            {
                JObject jsonObject = JObject.Parse(resp);
                // Access the response body
                JObject responseBody = (JObject)jsonObject["ResponseOutput"]["responseBody"];
                if (responseBody == null || !responseBody.HasValues)
                {
                    return UpdateStatusInDatabase(serReqRefNo);
                }
                else
                {
                    return "True";
                }
            }
            catch (JsonReaderException ex)
            {
                // Handle the exception, e.g., log it or return an error message
                return "Error parsing JSON response: " + ex.Message;
            }
        }
        public async Task<Response<dynamic>> ContractAssignment<TRequest>(TRequest reqBody, string url, long serReqId)
        {
            SurrenderRequest<TRequest> surrenderRequest = new()
            {
                requestHeader = new()
                {
                    source = "POS",
                    carrierCode = "2",
                    branch = "PRA",
                    userId = "website",
                    userRole = "10",
                    partnerId = "MSPOS",
                    processId = "POS",
                    monthendExtension = "N",
                    monthendDate = "29/11/2023"        
                },
                requestBody = reqBody,
            };

            var contractAssignmentResponse = await _httpService.HttpPostCall<SurrenderRequest<TRequest>, dynamic>(surrenderRequest, url);
            AppLogs appLogs = new()
            {
                SrvReqID = serReqId,
                CreatedByRef = "System",
                CreatedOn = DateTime.Now,
                ReqURL = url,
                JSON = JsonConvert.SerializeObject(contractAssignmentResponse.ResponseOutput)
            };

            _gdbContext.AppLogs.Add(appLogs);
            _gdbContext.SaveChanges();
            return contractAssignmentResponse;
        }
        public AllocPayee GetAllocPayeeCode(long srId)
        {
           return _gdbContext.AllocPayees.Where(x => x.SrvReqID == srId).OrderByDescending(x => x.CreatedOn).FirstOrDefault();
        }

        public async Task<Response<dynamic>> MandatetagEnquiry<TRequest>(TRequest reqBody, string url, long serReqId)
        {
            SurrenderRequest<TRequest> surrenderRequest = new()
            {
                requestHeader = new()
                {
                    source = "POS",
                    carrierCode = "2",
                    branch = "PRA",
                    userId = "WEBSITE",
                    userRole = "10",
                    partnerId = "MSPOS",
                    processId = "POS",
                    monthendExtension = "N",
                    monthendDate = "18/10/2023"

                },               
                requestBody = reqBody,
            };

            var mandatetagEnquiryResponse = await _httpService.HttpPostCall<SurrenderRequest<TRequest>, dynamic>(surrenderRequest, url);
            AppLogs appLogs = new()
            {
                SrvReqID = serReqId,
                CreatedByRef = "System",
                CreatedOn = DateTime.Now,
                ReqURL = url,
                JSON = JsonConvert.SerializeObject(mandatetagEnquiryResponse.ResponseOutput)
            };

            _gdbContext.AppLogs.Add(appLogs);
            _gdbContext.SaveChanges();
            return mandatetagEnquiryResponse;
        }

        public async Task<Response<dynamic>> MandateEnquiry<TRequest>(TRequest reqBody, string url, long serReqId)
        {
            SurrenderRequest<TRequest> surrenderRequest = new()
            {
                requestHeader = new()
                {
                    source = "AAAA",
                    carrierCode = "2",
                    branch = "Baroda Branch Office",
                    userId = "F1142259",
                    userRole = "10",
                    partnerId = "1142259",
                    processId = "",
                    monthendExtension = "",
                    monthendDate = ""

                },
                requestBody = reqBody,
            };

            var mandateEnquiryResponse = await _httpService.HttpPostCallForMandate<SurrenderRequest<TRequest>, dynamic>(surrenderRequest, url);
            AppLogs appLogs = new()
            {
                SrvReqID = serReqId,
                CreatedByRef = "System",
                CreatedOn = DateTime.Now,
                ReqURL = url,
                JSON = JsonConvert.SerializeObject(mandateEnquiryResponse.ResponseOutput)
            };

            _gdbContext.AppLogs.Add(appLogs);
            _gdbContext.SaveChanges();
            return mandateEnquiryResponse;
        }
        public async Task<Response<dynamic>> MandateUpdate<TRequest>(TRequest reqBody, string url, long serReqId)
        {
            SurrenderRequest<TRequest> surrenderRequest = new()
            {
                requestHeader = new()
                {
                    source = "AAAA",
                    carrierCode = "2",
                    branch = "Baroda Branch Office",
                    userId = "F1142259",
                    userRole = "10",
                    partnerId = "1142259",
                    processId = "",
                    monthendExtension = "N",
                    monthendDate = "01/01/2022"

                },
                requestBody = reqBody,
            };
            var mandateUpdateResponse = await _httpService.HttpPostCallForMandate<SurrenderRequest<TRequest>, dynamic>(surrenderRequest, url);
            AppLogs appLogs = new()
            {
                SrvReqID = serReqId,
                CreatedByRef = "System",
                CreatedOn = DateTime.Now,
                ReqURL = url,
                JSON = JsonConvert.SerializeObject(mandateUpdateResponse.ResponseOutput)
            };

            _gdbContext.AppLogs.Add(appLogs);
            _gdbContext.SaveChanges();
            return mandateUpdateResponse;
        }
    }
}
