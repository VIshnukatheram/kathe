using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Request
{
    public class PPCRequest
    {
        public Requestheader RequestHeader { get; set; }
        public Requestbody RequestBody { get; set; }
    }

    public class Requestheader
    {
        public string source { get; set; }
        public string carrierCode { get; set; }
        public string branch { get; set; }
        public string userId { get; set; }
        public string userRole { get; set; }
        public string monthEndExtension { get; set; }
        public string meDate { get; set; }
    }

    public class Requestbody
    {
        public string policyNo { get; set; }
        public string year { get; set; }
    }

}
