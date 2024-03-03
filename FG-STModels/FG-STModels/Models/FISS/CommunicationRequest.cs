using FG_STModels.Models.Shared;

namespace FG_STModels.Models.FISS
{
    public class ServiceCommunication
    {
        public string SrvReqRefNo { get; set; }
        public string TemplateID { get; set; }
        public CommunicationType CommType { get; set; }
        public string ReceipientTo { get; set; }
        public string ReceipientCC { get; set; }
        public string MobileNos { get; set; }
        public string MobileNo { get; set; }
        public DateTime ScheduledTime { get; set; }
        public string CommBody { get; set; }
        public string Body { get; set; }
        public List<Attachment> Attachments { get; set; }
        public string PolicyNumber { get; set; }
        public string PolicyNo { get; set; }
        public int OTP { get; set; }
        public string EmailId { get; set; }

    }
    public class Attachment
    {
        public string FileName { get; set; }
        public string FileContent { get; set; }
    }
}