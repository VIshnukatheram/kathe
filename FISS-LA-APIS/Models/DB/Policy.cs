
using System.ComponentModel.DataAnnotations.Schema;

namespace FISS_ServiceRequest.Models.DB
{
    [Table("LifeAsiaObj.LA_Policy")]
    public class Policy
    {
        public long PolicyRef { get; set; }
        public string LA_PolicyNo { get; set; }
        public string FG_ApplNo { get; set; }
    }
}
