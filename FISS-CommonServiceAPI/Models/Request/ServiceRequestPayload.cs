using Microsoft.AspNetCore.Http;
using Microsoft.SqlServer.Server;
using System;
using System.Collections.Generic;

namespace FISS_CommonServiceAPI.Models.Request
{
    public class ServiceRequestPayload
    {
        public int SrvReqID { get; set; }
        public string SrvReqRefNo { get; set; }
        public int CallType { get; set; }
        public int SubType { get; set; }
        public short Category { get; set; }
        public int RequestSource { get; set; }
        public int RequestChannel { get; set; }
        public string ApplicationNo { get; set; }
        public string DOB { get; set; }
        public string PolicyNo { get; set; }
        public int CustomerId { get; set; }
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
        public TransactionData TransactionData { get; set; }
        public List<UploadFile> Uploads { get; set; }
        public List<CommunicationRequest> CommunicationRequest { get; set; }
    }

    public class TransactionData
    {
        public string ValidatedBy { get; set; }
        public long? ExistingMobileNo { get; set; }
        public long? NewMobileNo { get; set; }
        public string CustRole { get; set; }
        public string ClientId { get; set; }
    }

    public class UploadFile
    {
        public string IndexName { get; set; }
        public string DocumentName { get; set; }
        public IFormFile fileData { get; set; } // Assuming FormData is a type you have defined
    }

}
