using System;
using System.Collections.Generic;

namespace FISS_ServiceRequestAPI.Models.Request
{
    public class CommunicationRequest
    {
        public string SrvReqRefNo { get; set; }
        public string TemplateID { get; set; }
        public int CommType { get; set; }
        public string ReceipientTo { get; set; }
        public string ReceipientCC { get; set; }
        public string MobileNos { get; set; }
        public DateTime ScheduledTime { get; set; }
        public string CommBody { get; set; }
        public List<Attachment> Attachments { get; set; }
    }

    public class Attachment
    {
        public string FileName { get; set; }
        public string FileContent { get; set; }
    }

    public enum CommunicationType
    {
        SMS = 1,
        EMAIL = 2,
        WHATSAPP = 3
    }

}
