using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS.PremiumPaidCertificate.Models.DB
{
    [Table("LifeAsiaObj.LA_Policy")]
    public class LA_Policy
    {
        public int PolicyRef { get; set; }
        public string LA_PolicyNo { get; set; }
        public string FG_ApplNo { get; set; }
    }
}
