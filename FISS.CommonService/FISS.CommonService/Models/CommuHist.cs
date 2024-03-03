using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS.CommonService.Models
{
    [Table("CommuHist")]
    public class CommuHist
    {
        [Key]
        public long CommID { get; set; }
        //public long? SrvReqID { get; set; } = null;
        public string TemplateID { get; set; }
        public byte CommType { get; set; }
        public string ReceipientTo { get; set; }
        public string ReceipientCC { get; set; }
        public string MobileNos { get; set; }
        public DateTime ScheduledTime { get; set; } = DateTime.Now;
        public DateTime TriggeredTime { get; set; }= DateTime.Now;
        public DateTime DeliveryDate { get; set; } = DateTime.Now;
        public byte DeliveryStatus { get; set; }
        public short Retries { get; set; }
        public string FailureReason { get; set; }
        //public string ApiHeader { get; set; } = "";
        //public string Tasgs { get; set; } = "";
        
    }
}
