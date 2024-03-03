using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Response
{
   
    public class ClientResponse
    {
        public ClientErrorResponse Error { get; set; }
        public ClientResponseOutput ResponseOutput { get; set; }
    }

    public class ClientErrorResponse
    {
        public string Error { get; set; }
    }

    public class ClientResponseOutput
    {
        public ClientResponseHeader ResponseHeader { get; set; }
        public ClientResponseBody ResponseBody { get; set; }
    }

    public class ClientResponseHeader
    {
        public bool Issuccess { get; set; }
        public string Message { get; set; }
        public string Errorcode { get; set; }
    }

    public class ClientResponseBody
    {
        public string PolicyNumber { get; set; }
        public string Errorcode { get; set; }
    }
}
