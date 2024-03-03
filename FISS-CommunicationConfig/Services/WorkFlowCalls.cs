using FG_STModels.Models.Comms;
using FG_STModels.Models.Shared;
using FISS_CommunicationConfig.Models.Request;
using FISS_CommunicationConfig.Models.Shared;
using FISS_ServiceRequest.Models.DB;
using FISS_ServiceRequest.Models.Shared;
using Microsoft.Extensions.Logging;
using Microsoft.VisualBasic;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net.Http;

namespace FISS_CommunicationConfig.Services
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
        
        public GenericTemplate GetServiceRequest(string serviceRequestId)
        {
            var servicereq = _gdbContext.ServRequest.Where(x => x.SrvReqRefNo == serviceRequestId)
                                .Join(_gdbContext.Policy, x => x.PolicyRef, y => y.PolicyRef, (x, y) => new { ServReq = x, Policy = y })
                                .Select(x => new GenericTemplate
                                {
                                    ServiceRequest = x.ServReq,
                                    Policy = x.Policy
                                })
                            .FirstOrDefault();

            servicereq.ServiceRequest.ServiceRequestTransectionData = _gdbContext.ServiceReqestTransectionData.Where(x => x.SrvReqID == servicereq.ServiceRequest.SrvReqID).ToList();
            return servicereq;
        }

        public ServCommTemplate GetTemplateId(int callType, int subType, int commType, string status)
        {
            return _gdbContext.ServCommTemplates.Where(x => x.CallType == callType && x.SubType == subType && x.CommType == commType && x.TemplateDesc == status).FirstOrDefault();
        }

        public string GetReqestName(int callType, int subType)
        {
            var masterRecord = _gdbContext.AppMasters.Where(x => x.MstParentID == callType && x.MstID == subType && x.MstCategory=="SUB_TYP").FirstOrDefault();
            if(masterRecord != null)
            {
                return masterRecord.MstDesc;
            }
            return string.Empty;
        }
        public int GetTATValue(int callType, int subType)
        {
            var tatInfo = _gdbContext.TATInfo.Where(x => x.CallType == callType && x.SubType== subType).FirstOrDefault();
            if(tatInfo != null)
            {
                return tatInfo.TAT;
            }
            return 0;
        }
        public List<CommunicationRequest> UpdateCommunicationTemplate(List<CommunicationRequest> commRequest, string serviceRequestNo, string status)
        {
            string shortUrlForPPCSms = "";
            string SrvReqID = _gdbContext.ServRequest.Where(x => x.SrvReqRefNo == serviceRequestNo).FirstOrDefault().SrvReqID.ToString();
            var genericTemplate = GetServiceRequest(serviceRequestNo);

            int callType = genericTemplate.ServiceRequest.CallType;
            int subType = genericTemplate.ServiceRequest.SubType;

            _logger.LogInformation("Service Request Fetched Successfully");
            genericTemplate.RequestCategoryName = GetReqestName(genericTemplate.ServiceRequest.CallType, genericTemplate.ServiceRequest.SubType);
            genericTemplate.TAT = GetTATValue(callType, subType);
            foreach (var comm in commRequest)
            {
                string[] genericStatus = { "OPEN", "CLOSED", "REJECT", "PROCESSEMAILER", "REQCLOSURE", "PROCESSENQUIRY" };
                if(callType == 9 &&  subType == 2)
                {
                    subType = 3;
                }
                if (callType == 2 || callType ==19 && comm.CommType==2)                   
                {
                    subType = 999;
                    var details = _gdbContext.AppLogs.Where(x => x.SrvReqID.ToString() == SrvReqID).OrderByDescending(r => r.CreatedOn).ToList();
                    comm.Attachments = new();
                    foreach(var appLog in details)
                    {
                        ServicingDocumentsResponse fg = JsonConvert.DeserializeObject<ServicingDocumentsResponse>(appLog.JSON);
                        if (fg.responseBody.dmsFilesList != null)
                        {
                             var listOfAttachments= fg.responseBody.dmsFilesList
                             .Select(file => new Attachment
                             {
                                 FileName = file.filename,
                                 FileContent = file.fileBytes
                             })
                             .ToList();
                            comm.Attachments.AddRange(listOfAttachments);
                        }
                    }
                }
               
                if (genericStatus.Contains(status.ToUpper())) 
                {
                    if(status.ToUpper().Contains("CLOSED"))
                    {
                        if (callType == 21 || callType == 23 || (callType == 6 && (subType == 7 || subType == 12 || subType == 15)) || callType==26)
                        {
                            status = "REQCLOSURE";
                        }
                       
                    }
                        // Call Types assignments should be in always last
                    callType = 999;
                    subType = 999;
                }    
                if(genericTemplate.ServiceRequest.CallType == 20 || genericTemplate.ServiceRequest.CallType == 6 || genericTemplate.ServiceRequest.CallType == 1)
                {
                    var tagvalue=genericTemplate.ServiceRequest.ServiceRequestTransectionData?.Where(x => x.TagName.Contains("FileType")).FirstOrDefault()?.TagValue;
                    if (tagvalue == "PROCESSENQUIRY")
                        {

                        var doclist = GetDocList(genericTemplate.ServiceRequest.CallType, genericTemplate.ServiceRequest.SubType);
                        genericTemplate.RejectedReason = doclist.value;
                        if (doclist.Link != null)
                        {
                            var processdocLink = _httpService.HttpPostForShoter(doclist.Link);
                            shortUrlForPPCSms = processdocLink;
                        }
                        subType = 999;
                    }
                    
                }
                if(genericTemplate.ServiceRequest.CallType==2 && comm.CommType==1)
                {
                    status = "PPC";
                    subType = 2;

                    var ConnAndContainer = GetBlobConn();
                    CloudStorageAccount storageAccount = CloudStorageAccount.Parse(ConnAndContainer.Connection);
                    CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
                    CloudBlobContainer container = blobClient.GetContainerReference(ConnAndContainer.Container);
                    Uri containerUri = container.Uri;
                    var ppclink = containerUri + "/PPC/" + genericTemplate.Policy.FG_ApplNo + "/PPC.pdf";
                    shortUrlForPPCSms = _httpService.HttpPostForShoter(ppclink);
                }
                var template = GetTemplateId(callType, subType, comm.CommType, status.ToUpper());

                _logger.LogInformation("Template Fetched Successfully");
                if (status.ToUpper() == "REJECT")
                {
                    string rejectedList = null;
                  
                    if (SrvReqID != null)
                    {
                        var result = _gdbContext.ServiceReqestTransectionData.Where(x => x.SrvReqID.ToString() == SrvReqID.ToString() && x.TagName == "ReasonList_Key").Select(x => x.TagValue).FirstOrDefault();
                        if (result != null)
                            rejectedList = result;
                        else
                            rejectedList = _gdbContext.ServiceRequestTransections.Where(x => x.SrvReqRefNo == serviceRequestNo).FirstOrDefault().RequirementList;
                    }
                    //string rejectedList = _gdbContext.ServiceRequestTransections.Where(x => x.SrvReqRefNo == serviceRequestNo).FirstOrDefault().RequirementList;
                    genericTemplate.RejectedReason = GetReasonsList(JsonConvert.DeserializeObject<List<int>>(rejectedList));
                }              
                object tempContent = JsonConvert.DeserializeObject(template?.MailContent ?? "") ?? "";

                string templateUpdated = _commonService.GenerateTemplate(template, tempContent.ToString(), genericTemplate , shortUrlForPPCSms);

                _logger.LogInformation("Template Binded Successfully " + template?.TemplateID.ToString());
                comm.SrvReqRefNo = genericTemplate.ServiceRequest.SrvReqRefNo;
                comm.CommBody = templateUpdated;                
                if (callType == 11 && subType == 2)
                {
                        var details = _gdbContext.AppLogs.Where(x => x.SrvReqID.ToString() == SrvReqID).OrderByDescending(r => r.CreatedOn).FirstOrDefault();
                        comm.CommBody = details.JSON.Trim('{', '}') ?? "";
                }
               
                comm.TemplateID = template?.TemplateID.ToString(); 
            }
            var newValue2 = genericTemplate.ServiceRequest.ServiceRequestTransectionData?.Where(x => x.TagName.Contains("NACH")).Select(x => x.TagValue).FirstOrDefault();
            if (newValue2 != "No")
            {
                if (genericTemplate.ServiceRequest.CallType == 1 && genericTemplate.ServiceRequest.SubType == 1 && status.ToUpper() == "OPEN")
                {
                    status = "MANDATEREGISTRATIONMAILER";
                    CommunicationRequest communication = new CommunicationRequest { SrvReqRefNo = serviceRequestNo, CommType = 2 };
                    var templates = GetTemplateId(genericTemplate.ServiceRequest.CallType, 3, communication.CommType, status.ToUpper());
                    object tempContents = JsonConvert.DeserializeObject(templates?.MailContent ?? "") ?? "";
                    string templateUpdated = _commonService.GenerateTemplate(templates, tempContents.ToString(), genericTemplate,"");
                    communication.CommBody = templateUpdated;
                    communication.TemplateID = templates?.TemplateID.ToString();
                    communication.ScheduledTime = DateTime.Now;
                    commRequest.Add(communication);
                }
            }
            
            return commRequest;
        }

        public string GetReasonsList(List<int> req)
        {
            string value = "";

            Dictionary<int, string> documents = new Dictionary<int, string>();
            int i = 0;
            foreach (var fg in req)
            {
                var result = _gdbContext.AppMasters
                    .Where(events => events.MstID == fg && events.MstCategory == "RAISE_REQMNT")
                    .Select(events => new { events.MstID, events.MstDesc })  // Adjust the property name accordingly
                    .FirstOrDefault();

                if (result != null)
                {
                    i += 1;
                    documents.Add(Convert.ToInt32(result.MstID), result.MstDesc);
                    value += "" + i + ". " + result.MstDesc + ".<br>";
                }

            }
            return value;
        }
        public List<CommunicationRequest> GetListOfCommunicationPayloadForInterest(int commType, string status)
        {
            var listOfInterestRates = _gdbContext.InterestCommunication.Where(x => x.Status == false).Take(10).ToList();
            var template = GetTemplateId(999, 999, commType, status.ToUpper());
            
            object tempContent = JsonConvert.DeserializeObject(template?.MailContent ?? "") ?? "";
            List<CommunicationRequest> listOfCommunicationReq = new();
            
            foreach (var record in listOfInterestRates)
            {
                CommunicationRequest commReq = new()
                {
                    SrvReqRefNo = "1234",
                    TemplateID = template.TemplateID.ToString(),
                    CommType = commType,
                    ReceipientTo = commType == 2 ? record.ContactInfo : "",
                    ReceipientCC = "",
                    MobileNos = commType == 1 ? record.ContactInfo : "",
                    ScheduledTime = DateTime.Now,
                    CommBody = string.Format(tempContent.ToString(), record.InterestRate,record.PlanName, record.Period),
                    Attachments = null
                };
                listOfCommunicationReq.Add(commReq);
                record.Status = true;
            }
            _gdbContext.SaveChanges();

            return listOfCommunicationReq;
        }
        public BlobConnectionInfo GetBlobConn()
        {

            string BLOB_CNTNR_NM = string.Empty;
            string BLOB_CONN_STR = string.Empty;
            foreach (AppMasters item in _gdbContext.AppMasters.
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
            return new BlobConnectionInfo
            {
                Container = BLOB_CNTNR_NM,
                Connection = BLOB_CONN_STR
            };
        }
        public class BlobConnectionInfo
        {
            public string Container { get; set; }
            public string Connection { get; set; }
        }
        public dynamic GetDocList(int callType ,int SubType)
        {
            string value = "";
            string Link = "";
            var req = _gdbContext.ProcEnqDocList.Where(x => x.CallType == callType && x.SubType == SubType).ToList();
            Link = req.Select(x => x.FormLink).FirstOrDefault();
            int i = 0;
            if (callType == 20 && (SubType == 3 || SubType==14 ||SubType==9))
            {
               var fgg = (from std in req
                               select new {
                                   Ind = std.DocListForInd,
                                   Nri = std.DocListForNri
                               }).ToList();
                for (int k=0;k<fgg.Count();k++)
                {
                    if(fgg[k].Ind!="")
                        value += Get(fgg[k].Ind.ToString(),i++);
                }
                i = 0;
                for (int k = 0; k < fgg.Count(); k++)
                {
                    if (fgg[k].Nri != "")
                        value += Get(fgg[k].Nri.ToString(),i++);
                }
                   
                }
            else
            {
                foreach (var fg in req)
                {
                    i++;
                    if (fg.DocListForInd != "")
                        value += "<p style='margin:1% 0% 0% 10%'> 3." + i + ". " + fg.DocListForInd + ".<br></p>";
                }

            }
            return new
            {
                value,
                Link
            };   
        }
        public string Get(string fg ,int i)
        {
            string value = "";
            if (fg.ToString() != "")
            {
                if (i == 0)
                {
                    value += "<p style='margin:1% 0% 0% 8%'>" + fg + "<br></p>";
                }
                else
                {
                    value += "<p style='margin:1% 0% 0% 10%'> 3." +i+ ". " + fg + ".<br></p>";
                }
            }
            return value;

        }
    }
}