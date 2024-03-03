using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net.Mail;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace FGLIC_Communication.Models
{
    public enum CommType: byte
    {
        SMS=1,
        EMAIL=2,
        WHATSAPP=3,
    }

    public class CommunicationRequest
    {
        //[FISS].[ServRequest].SrvReqRefNo
        public string SrvReqRefNo { get; set; }

        //[FISS].[ServCommTemplate].TemplateID beased on ct/st
        public string TemplateID { get; set; }

        //come from Ui
        public CommType CommType { get; set; }
        //separate with camma
        //come from Ui
        public string ReceipientTo { get; set; }
        //separate with camma
        //come from Ui
        public string ReceipientCC { get; set; }
        //separate with camma
        //come from Ui
        public string MobileNos { get; set; }
        // current datetime
        public DateTime ScheduledTime { get; set; }   
        // json input
        public string CommBody { get; set; }
        public string PolicyNumber { get; set; }
        //
        public List<Attachment> Attachments { get; set; }
    }
    public class Attachment
    {
        public string FileName { get; set; }
        public string FileContent { get; set; }

    }

}

