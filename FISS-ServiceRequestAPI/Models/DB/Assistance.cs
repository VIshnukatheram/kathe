using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_ServiceRequestAPI.Models.DB
{
    [Table("MASTERS.Assistance")]
    public class Assistance
    {
        public int AssistanceId { get; set; }
        public int CallType { get; set; }
        public int SubType { get; set; }
        public string Status { get; set; }
    }
}
