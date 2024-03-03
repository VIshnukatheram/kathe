

namespace FISS_ServiceRequest.Models.Response
{
    public class ResponseHeaderForPayment
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
        public ResponseHeaderForPayment responseHeader { get; set; }
        public PaymentLinkResponseBody responseBody { get; set; }
    }

}
