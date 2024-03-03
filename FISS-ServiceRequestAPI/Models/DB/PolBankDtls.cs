using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.AccessControl;
using System.Text;
using System.Threading.Tasks;

namespace FISS_ServiceRequestAPI.Models.DB
{
    [Table("Core.PolBankDtls")]
    public class PolBankDtls
    {
        [Key]
        public long PolBankDtlsID { get; set; }
        public string  LA_PolicyNo { get; set; }
        public string LA_CustomerID { get; set; }
        public string Bank_Name { get; set; }
        public string Bank_IFSC { get; set; }
        public string Acc_HldrName { get; set; }
        public string Acc_Number { get; set; }
        public long Acc_Type { get; set; }
        public DateTime RegistredOn { get; set; }
        public long SrvReqID { get; set; }
        [NotMapped]
        public string SrvReqRefNo { get; set; }
        [NotMapped]
        public string PennyDrop { get; set; }
    }
}
