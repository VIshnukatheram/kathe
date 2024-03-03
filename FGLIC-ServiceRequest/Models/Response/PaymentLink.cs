using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FGLIC_ServiceRequest.Models.Response
{
    public class ResponseHeader
    {
        public bool issuccess { get; set; }
        public string message { get; set; }
        public string errorcode { get; set; }
    }

    public class PaymentLinkResponseBody
    {
        public string redirectlink { get; set; }
    }

    public class PaymentLinkFGResponse
    {
        public ResponseHeader responseHeader { get; set; }
        public PaymentLinkResponseBody responseBody { get; set; }
    }

}
