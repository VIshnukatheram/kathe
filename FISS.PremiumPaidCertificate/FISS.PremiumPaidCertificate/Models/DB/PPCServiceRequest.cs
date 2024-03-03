using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS.PremiumPaidCertificate.Models.DB
{
    [Table("FISS.ServRequest")]
    public class PPCServiceRequest
    {
        public long SrvReqID { get; set; }
        public string SrvReqRefNo { get; set; }
        public short Category { get; set; }
        public int CallType { get; set; }
        public int SubType { get; set; }
        public int ReqSource { get; set; }
        public int ReqMode { get; set; }
        public int PolicyRef { get; set; }
        public int CustomerRef { get; set; }
        public int CustRole { get; set; }
        public int BranchRef { get; set; }
        public string CurrentStatus { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedByRef { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string ModifiedByRef { get; set; }
        public string Source { get; set; }
        public string PrtSerReqID { get;set; }
        public string TransactionPayload { get; set; }
        //public string AssignedTo { get; set; }
        //public string AssignedBy { get; set; }

    }
}
