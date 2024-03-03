

using FISS_LA_APIS.Models.Response;

namespace FISS_ServiceRequest.Models.Response
{
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
