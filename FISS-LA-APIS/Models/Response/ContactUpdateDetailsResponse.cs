using FISS_LA_APIS.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_ServiceRequest.Models.Response
{
    public class ResponseBodyForContact
    {
        public string ErrorMessage { get; set; }
    }

    public class ContactUpdateDetailsResponse
    {
        public ResponseHeader ResponseHeader { get; set; }
        public ResponseBodyForContact ResponseBody { get; set; }
    }

    public class AddressDetailsResponse
    {
        public ResponseHeader ResponseHeader { get; set; }
        public dynamic ResponseBody { get; set; }
    }
}
