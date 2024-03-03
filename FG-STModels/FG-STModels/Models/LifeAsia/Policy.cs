using FG_STModels.Misc;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FG_STModels.Models.LifeAsia
{
    [Table("LifeAsiaObj.LA_Policy")]
    public class Policy
    {
        [Key]
        public long PolicyRef { get; set; }
        public string? LA_PolicyNo { get; set; }
        public string? FG_ApplNo { get; set; }
        [NotMapped]
        public string PlanName { get; set; }
        [NotMapped]
        public string PolicyType { get; set; }
        [NotMapped]
        public string AGENT_NAME { get; set; }
        //Total Premium Amount Received(Excluding of CI and Goods and Services Tax) Exemption Under section 80C/80CCC(1)
        [NotMapped]
        public long? BasePremReceived{ get; set; }
        //Premium for CI Rider*/Health(if any) (Exclusive of Goods and Services Tax) Exemption Under section 80D
        [NotMapped]
        public long? TotalRiderPremReceived { get; set; }
        //Total Premium Payable in the current Financial Year(Exclusive of Goods and
        [NotMapped]
        public long? TotalPremReceived { get; set; }

        //Services Tax
        [NotMapped]
        public long? TotalTax { get; set; }
        //Premium Payment Mode
        [NotMapped]
        public string PremPaymentMode { get; set; }
        //Next Due Date
        [NotMapped]
        [HtmlDisplayFormat(DisplayFormat = "dd-MMM-yyyy")]
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "dd-MMM-yyyy")]
        public DateTime? NextDueDate { get; set; } 
    }
}
