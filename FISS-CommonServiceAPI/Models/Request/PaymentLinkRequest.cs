

namespace FISS_CommonServiceAPI.Models.Request
{
    public class RequestHeaderForPayment
    {
        public string source { get; set; }
        public string policyNo { get; set; }
        public string applicationNo { get; set; }
        public string dob { get; set; }
    }

    public class RequestBodyForPaymentLink
    {
        public string paymentmode { get; set; }
    }

    public class PaymentLinkFGRequest
    {
        public RequestHeaderForPayment requestHeader { get; set; }
        public RequestBodyForPaymentLink requestBody { get; set; }
    }

}
