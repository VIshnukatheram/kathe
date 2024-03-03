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
    public class PaymentLinkFGRequest
    {
        public RequestHeader requestHeader { get; set; }
        public PaymentLinkRequestBody requestBody { get; set; }
    }
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
}
