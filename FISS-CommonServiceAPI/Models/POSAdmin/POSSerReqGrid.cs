using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_CommonServiceAPI.Models.POSAdmin
{
    public class POSSerReqGrid
    {
        public long SrvReqID { get; set; }
        public string SrvReqRefNo { get; set; }
        public string CallType { get; set; }
        public string SubType { get; set; }
        public string policyNo { get; set; }
        public string CurrentStatus { get; set; }
        public string LA_Name { get; set; }
        public string payout_value { get; set; }
        public string Client_ID_Type { get; set; }
        public string PO_Name { get; set; }
        public dynamic UserId { get; set; }
        public DateTime? CreatedOn { get; set; }
    }
}
