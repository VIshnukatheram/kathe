using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_ServiceRequest.Models.Request
{
    public class RequestHeaderForContact
    {
        public string Source { get; set; }
        public string CarrierCode { get; set; }
        public string Branch { get; set; }
        public string UserId { get; set; }
        public string UserRole { get; set; }
        public string PartnerId { get; set; }
    }

    public class RequestBodyForContact
    {
        public string ClientNo { get; set; }
        public string MobileNo { get; set; }
    }

    public class ContactUpdateDetailsRequest
    {
        public RequestHeaderForContact RequestHeader { get; set; }
        public RequestBodyForContact RequestBody { get; set; }
    }
}
