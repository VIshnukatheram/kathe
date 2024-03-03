using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS.CommonService.Models
{
    public class OTPRequest
    {
        public OTPRequestHeader RequestHeader { get; set; }
        public OTPRequestBody RequestBody { get; set; }
    }
    public class OTPRequestHeader
    {
        public string source { get; set; } = "";
        public string policyNo { get; set; } = "";
        public string applicationNo { get; set; } = "";
        public string dob { get; set; } = "";
    }
    public class OTPRequestBody
    {
        public string Message { get; set; } = "";
        public string MobileNo { get; set; } = "";
    }
}
