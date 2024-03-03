using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FGLIC_Communication.Models
{
    [Table("LifeAsiaObj.LA_Policy")]
    public class LAPolicy
    {
        [Key]
         public long PolicyRef { get; set; }

         public string LA_PolicyNo { get;set; }

         public string FG_ApplNo { get; set; }
        
    }
}
