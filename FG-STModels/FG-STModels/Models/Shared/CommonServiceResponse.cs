namespace FISS.CommonService.Models
{
    public class CommonServiceResponse
    {
        public ResponseHeader? responseHeader { get; set; }
        public ResponseBody? responseBody { get; set; }

    }
    public class ResponseHeader
    {
        public string? apiHeader { get; set; }
        public string? CommType { get; set; }
        public bool issuccess { get; set; }
        public string? message { get; set; }
        public string? errorcode { get; set; }
    }

    public class ResponseBody
    {
        public string? errorcode { get; set; }
        public string? errormessage { get; set; }
    }
}
