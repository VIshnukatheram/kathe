using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FG_STModels.Models.Core
{
    [Table("Core.PolBankDtls")]
    public class PolBankDtls
    {
        //[Key]
        public long PolBankDtlsID { get; set; }
        //[Key]
        //[Column(Order =0)]
        public string? LA_PolicyNo { get; set; }
        //[Key]
        //[Column(Order =1)]
        public string? LA_CustomerID { get; set; }
        public string? Bank_Name { get; set; }
        //[Key]
        //[Column(Order = 2)]
        public string? Bank_IFSC { get; set; }
        public string? Acc_HldrName { get; set; }
        //[Key]
        //[Column(Order = 3)]
        public string? Acc_Number { get; set; }
        public long Acc_Type { get; set; }
        public DateTime RegistredOn { get; set; }
        public long SrvReqID { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string? CreatedBy { get; set; }
        public bool? Acc_Active { get; set; }

       public string?  ModifiedOn { get; set; }

        public string? ModifiedBy { get; set; }
        [NotMapped]
        public string? CustomerName { get; set; } = "";


    }
}
