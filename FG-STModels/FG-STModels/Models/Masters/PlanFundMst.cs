using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FG_STModels.Models.Masters
{
    [Table("MASTERS.PLAN_FUND_MST")]
    //make your key on 
    public class PlanFundMst
    {
        [Key,Column(Order = 0)]
        public string Plan_Code { get; set; }
        public string Plan_Name { get; set; }
        [Key, Column(Order = 1)]
        public string Fund_Code { get; set; }
        public string Fund_Name { get; set; }
        public DateTime? Available_Till { get; set; }
    }
}