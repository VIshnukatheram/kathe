using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS.ContactUpdateService.Models
{
    [Table("FISS.ServRequestDtls")]
    public class ContactUpdate
    {
        public int ServRequestDtlId { get; set; }
        public long SrvReqID { get; set; }
        public string TagName { get; set; }
        public string TagValue { get; set; }
        public string Status { get; set; }
       // public TimeOnly ReqDtTm { get; set; } = TimeOnly.MaxValue;

    }
}
