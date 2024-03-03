using FG_STModels.Models.Shared;
using System.ComponentModel.DataAnnotations.Schema;

namespace FG_STModels.Models.Comms
{
    [Table("COMMS.CommuConfg")]
    public class CommuConfg
    {
        public long TemplateID { get; set; }
        public string TemplateDesc { get; set; }
        public CommunicationType CommType { get; set; }
        public string ReceipientTo { get; set; }
        public string ReceipientCC { get; set; }
        public string Subject { get; set; }
        public string TemplateLocation { get; set; }
        public string SenderName { get; set; }
        public string SenderEMail { get; set; }
        public string ReplyToMailID { get; set; }
        public string ReceipientBCC { get; set; }
        public string MailContent { get; set; }
        public long? FalconideTempID { get; set; }
        public int CallType { get; set; }
        public int SubType { get; set; }
        public int TAT { get; set; }
        public string Comment { get; set; }
        public bool SendStatus { get; set; } = false;
        public string SMTPResponse { get; set; }
    }
}