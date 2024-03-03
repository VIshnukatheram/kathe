using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS.CommonService.Models
{
    internal class GenerateOTP
    {
        public string EmailId{ get; set; }
        public string MobileNo { get; set; }
        public string PolicyNo { get; set; }
        public int OTP { get; set; }
    }
}
