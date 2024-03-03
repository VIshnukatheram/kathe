using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_ServiceRequestAPI.Models.DB
{
    [Table("FISS.DeDup")]
    public class DeDupData
    {
        public int ID { get; set; }
        public string Type { get; set; }
        public string LA_PolicyNo { get; set; }
        public string SrvReqRefNo { get; set; }
        public string DeDupPayload { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
