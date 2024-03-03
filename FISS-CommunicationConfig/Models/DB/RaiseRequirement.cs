using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_ServiceRequest.Models.DB
{
    [Table("MASTERS.RaiseRequirement")]
    public class RaiseRequirement
    {
        public int RaiseReqId { get; set; }
        public int CallType { get; set; }
        public int SubType { get; set; }
        public string Status { get; set; }
    }
}
