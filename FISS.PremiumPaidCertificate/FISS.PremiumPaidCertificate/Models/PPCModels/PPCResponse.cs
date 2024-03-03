using FISS.PremiumPaidCertificate.Models.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS.PremiumPaidCertificate.Models.PPCModels
{
    public class PPCResponse
    {
        public ResponseHeader responseHeader { get; set; }
        public ResponseBody responseBody { get; set; }
    }
    public class ResponseHeader
    {
        public int commID { get; set; } = 0;
        public string apiHeader { get; set; } = "";
        public string commType { get; set; } = "";
        public bool issuccess { get; set; }=false;
        public string message { get; set; } = "";
        public string errorcode { get; set; } = "";
    }

    public class ResponseBody
    {
        public string errorcode { get; set; } = "";
        public string errormessage { get; set; } = "";
    }
}
