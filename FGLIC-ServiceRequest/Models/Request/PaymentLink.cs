using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FGLIC_ServiceRequest.Models.Request
{
    public class RequestHeader
    {
        public string source { get; set; }
        public string policyNo { get; set; }
        public string applicationNo { get; set; }
        public string dob { get; set; }
    }

    public class PaymentLinkRequestBody
    {
        public string paymentmode { get; set; }
    }

    public class PaymentLinkFGRequest
    {
        public RequestHeader requestHeader { get; set; }
        public PaymentLinkRequestBody requestBody { get; set; }
    }

}
