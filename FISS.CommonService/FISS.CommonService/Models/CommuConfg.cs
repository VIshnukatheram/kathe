using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS.CommonService.Models
{
    [Table("COMMS.CommuConfg")]
    public class CommuConfg
    {
        [Key]
        public Int64 TemplateID { get; set; }
        public string TemplateDesc { get; set; }
        public byte CommType { get; set; }
        public string ReceipientTo { get; set; }
        public string ReceipientCC { get; set; }
        public string Subject { get; set; }
        public string TemplateLocation { get; set; }
        public string SenderName { get; set; }
        public string SenderEMail { get; set; }
        public string ReplyToMailID { get; set; }
        public string ReceipientBCC { get; set; }
        public string MailContent { get; set; }
        public Int64 FalconideTempID { get; set; }

    }
}
