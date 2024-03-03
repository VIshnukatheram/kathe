using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_ServiceRequest.Models.DB
{
    [Table("FISS.ServRequestDtls")]
    public class ServiceRequestTransectionData
    {
        public int ServRequestDtlId { get; set; }
        public long SrvReqID { get; set; }
        public string TagName { get; set; }
        public string TagValue { get; set; }
        public string Status { get; set; }
    }
}
