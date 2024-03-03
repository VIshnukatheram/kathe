using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FG_STModels.Models.Comms
{
    [Table("COMMS.CommuHist")]
    public class CommuHist
    {
        [Key]
        public long CommID { get; set; }
        public long SrvReqID { get; set; }
        public string TemplateID { get; set; }
        public byte CommType { get; set; }
        public string ReceipientTo { get; set; }
        public string ReceipientCC { get; set; }
        public string MobileNos { get; set; }
        public DateTime ScheduledTime { get; set; }
        public DateTime TriggeredTime { get; set; }
        public DateTime DeliveryDate { get; set; } = DateTime.Now;
        public byte DeliveryStatus { get; set; }
        public short Retries { get; set; }
        public string FailureReason { get; set; }
        public string ApiHeader { get; set; }
        public string Tasgs { get; set; }
        public int PolicyRef { get; set; }
        //List<CommuHistFiles> commuHistFile { get; set; }
    }
    public class CommuHistFiles
    {
        public int CommID { get; set; }
        public string ResultFileLoc { get; set; }
    }
}
