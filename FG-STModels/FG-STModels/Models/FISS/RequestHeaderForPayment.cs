namespace FG_STModels.Models.FISS
{
    public class RequestHeaderForPayment1
    {
        public string source { get; set; }
        public string policyNo { get; set; }
        public string applicationNo { get; set; }
        public string dob { get; set; }
    }

    public class RequestBodyForPaymentLink1
    {
        public string paymentmode { get; set; }
    }

    public class PaymentLinkFGRequest1
    {
        public RequestHeaderForPayment1 requestHeader { get; set; }
        public RequestBodyForPaymentLink1 requestBody { get; set; }
    }

}
