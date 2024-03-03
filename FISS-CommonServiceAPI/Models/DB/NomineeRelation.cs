using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_CommonServiceAPI.Models.DB
{
    [Table("MASTERS.NomineeRelations")]
    public class NomineeRelation
    {
        [Key]
        public int NomRelID { get; set; }
        public string DESCITEM { get; set; }
        public string SHORTDESC { get; set; }
        public string LONGDESC { get; set; }
    }
}
