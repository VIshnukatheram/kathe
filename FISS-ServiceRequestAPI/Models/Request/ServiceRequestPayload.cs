using FG_STModels.Models.OmniDocs;
using FG_STModels.Models.Shared;
using System;
using System.Collections.Generic;
namespace FISS_ServiceRequestAPI.Models.Request
{
    public class ServiceRequestPayload
    {
        public int SrvReqID { get; set; }
        public string SrvReqRefNo { get; set; }
        public int CallType { get; set; }
        public int SubType { get; set; }
        public RequestCategory Category { get; set; }
        public int RequestSource { get; set; }
        public int RequestChannel { get; set; }
        public string ApplicationNo { get; set; }
        public string DOB { get; set; }
        public string PolicyNo { get; set; }
        public string CustomerId { get; set; }
        public string PolicyStatus { get; set; }
        public string Plan { get; set; }
        public string ProposerName { get; set; }
        public int CustRole { get; set; }
        public int BranchId { get; set; }
        public string CurrentStatus { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedByRef { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string ModifiedByRef { get; set; }
        public string AssignedTo { get; set; }
        public string ReasonForChange { get; set; }
        public DateTime RequestDateTime { get; set; }
        public string ReasonDelayed { get; set; }
        public DateTime CustSignDateTime { get; set; }
        public List<TransactionData> TransactionData { get; set; }
        public List<DMSLinks> Uploads { get; set; }
        public List<CommunicationRequest> CommunicationRequest { get; set; }
    }
    public class TransactionData
    {
        public string Status { get; set; }
        public string TagName { get; set; }
        public string TagValue { get; set; }
    }
}