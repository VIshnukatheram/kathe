

namespace FISS_ServiceRequest.Models.Response
{
    public class CommunicationResponse
    {
        public ResponseHeaderForCommunication responseHeader { get; set; }
        public ResponseBodyForCommunication responseBody { get; set; }
    }

    public class ResponseHeaderForCommunication
    {
        public int commID { get; set; }
        public string apiHeader { get; set; }
        public string commType { get; set; }
        public bool issuccess { get; set; }
        public string message { get; set; }
        public string errorcode { get; set; }
    }

    public class ResponseBodyForCommunication
    {
        public string errorcode { get; set; }
        public string errormessage { get; set; }
    }

}
