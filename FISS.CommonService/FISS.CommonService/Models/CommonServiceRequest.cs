using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS.CommonService.Models
{
    public enum CommType : byte
    {
        SMS = 1,
        EMAIL = 2,
        WHATSAPP = 3,
        OTP = 4
    }
    public class CommonServiceRequest
    {
        public string PolicyNo { set; get; }
        public string EmailId { get; set; }
        public string MobileNo { get; set; }
        public string TemplateId { get; set; }
        public CommType CommType { get; set; }
        public int OTP { get; set; }
        public string Body { get; set; }

    }
}
