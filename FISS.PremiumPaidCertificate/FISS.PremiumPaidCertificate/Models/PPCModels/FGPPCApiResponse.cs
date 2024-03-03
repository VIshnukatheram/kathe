using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS.PremiumPaidCertificate.Models.PPCModels
{
    public class FGPPCApiResponse
    {
        public ResponseHeaderForPPC responseHeader { get; set; }
        public ResponseBodyForPPC responseBody { get; set; }
    }
    public class ResponseHeaderForPPC
    {
        public bool issuccess { get; set; }
        public string message { get; set; }
        public string errorcode { get; set; }
    }

    public class ResponseBodyForPPC
    {
        public string bytes { get; set; }
        public string fileName { get; set; }
    }
}
