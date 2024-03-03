using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.DB
{
    [Table("Core.PolBankDtlsHist")]
    public class PolBankDtlsHist
    {
        [Key]
        public long PolBankDtlsHistID { get; set; }
        public string LA_PolicyNo { get; set; } = "";
        public string LA_CustomerID { get; set; }= "";
        public string Bank_Name { get; set; } = "";
        public string Bank_IFSC { get; set; } = "";
        public string Acc_HldrName { get; set; } = "";
        public string Acc_Number { get; set; } = "";
        public long Acc_Type { get; set; }
        public DateTime RegistredOn { get; set; }
        public long SrvReqID { get; set; }
        public bool? Acc_Active { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedOn { get; set; }
        public string ModifiedBy { get; set; }
    }
}
