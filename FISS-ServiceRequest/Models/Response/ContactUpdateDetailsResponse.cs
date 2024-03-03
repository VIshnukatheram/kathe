using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_ServiceRequest.Models.Response
{
    public class ResponseHeaderForContact
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public string ErrorCode { get; set; }
    }

    public class ResponseBodyForContact
    {
        public string ErrorMessage { get; set; }
    }

    public class ContactUpdateDetailsResponse
    {
        public ResponseHeaderForContact ResponseHeader { get; set; }
        public ResponseBodyForContact ResponseBody { get; set; }
    }
}
