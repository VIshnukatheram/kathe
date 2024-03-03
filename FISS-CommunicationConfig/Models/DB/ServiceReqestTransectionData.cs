using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_CommunicationConfig.Models.DB
{
    [Table("FISS.ServRequestDtls")]
    public class ServiceReqestTransectionData
    {
        public int ServRequestDtlId { get; set; }
        public long SrvReqID { get; set; }
        public string TagName { get; set; }
        public string TagValue { get; set; }
        public string Status { get; set; }
    }
}
