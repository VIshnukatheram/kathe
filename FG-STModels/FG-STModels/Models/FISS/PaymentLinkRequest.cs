using FG_STModels.Models.FISS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FGLIC_ServiceRequest.Models.Request
{
    public class PaymentLinkRequest
    {
        public long SrvReqID { get; set; }
        public string SrvReqRefNo { get; set; }
        public short Category { get; set; }
        public int CallType { get; set; }
        public int SubType { get; set; }
        public int RequestSource { get; set; }
        public int RequestMode { get; set; }
        public string ApplicationNo { get; set; }
        public string DOB { get; set; }
        public string PolicyNo { get; set; }
        public int CustomerId { get; set; }
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
        public List<ServiceCommunication> ServiceCommunications { get; set; }  
    }
}
