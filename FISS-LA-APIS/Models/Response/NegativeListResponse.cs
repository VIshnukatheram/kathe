using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Response
{

    public class Ofac
    {
        public string name { get; set; }
        public string address { get; set; }
        public string type { get; set; }
        public string program { get; set; }
    }

    public class ResponseBodyForNegativeList
    {
        public int errorCode { get; set; }
        public List<Ofac> ofac { get; set; }
    }

    public class NegativeListResponse
    {
        public ResponseHeader responseHeader { get; set; }
        public ResponseBodyForNegativeList responseBody { get; set; }
    }
}
