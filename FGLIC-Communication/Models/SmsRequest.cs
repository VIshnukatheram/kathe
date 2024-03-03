using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FGLIC_Communication.Models
{
    public class SmsRequestHeader
    {
        public string source { get; set; } = "";
        public string policyNo { get; set; } = "";
        public string applicationNo { get; set; } = "";
        public string dob { get; set; } = "";
    }
    public class SmsRequestBody
    {
        public string messageText { get; set; } = "";
        public string mobileNumber { get; set; } = "";
        public string SMS_Resource { get; set; } = "";
        public string DataKey { get; set; } = "";
        public string DataValue { get; set; } = "";
        public string Dltid { get; set; } = "";
    }
    internal class SmsRequest
    {
        public SmsRequestHeader RequestHeader { get; set; }
        public SmsRequestBody RequestBody { get; set; }

    }
}
