using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS.PremiumPaidCertificate.Models.PPCModels
{
    internal class PPCRequest
    {

        public PPCRequestHeader requestHeader { get; set; }
        public PPCRequestBody requestBody { get; set; }
      
    }
    public class PPCRequestHeader
    {
        public string source { get; set; }
        public string carrierCode { get; set; }
        public string branch { get; set; }
        public string userId { get; set; }
        public string userRole { get; set; }
        public string monthEndExtension { get; set; }
        public DateTime meDate { get; set; }
    }

    public class PPCRequestBody
    {
        public string policyNo { get; set; }
        public string year { get; set; }
    }
}
