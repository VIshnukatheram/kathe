using FG_STModels.Models.FISS;

namespace FISS_LA_APIS.Models.Response
{
    public class EmailServiceResponse
    {
        public ResponseHeader ResponseHeader { get; set; }
        public dynamic ResponseBody { get; set; }
    }

    public class EmailServiceRequest
    {
        public EmailClassify RequestHeader { get; set; }

        public dynamic ResponseBody { get; set; }
    }
}
