using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Request
{
    public class DissectionDetail
    {
        public string bankCode { get; set; }
        public string amount { get; set; }
        public string entity { get; set; }
        public string origccy { get; set; }
        public string sacscode { get; set; }
        public string sacstypw { get; set; }
        public string scrate { get; set; }
        public string trandesc { get; set; }
    }

    public class RequestBodyForJVCreation
    {
        public string policyNo { get; set; }
        public string chdrtype { get; set; }
        public string register { get; set; }
        public string rfcode { get; set; }
        public string rfnum { get; set; }
        public string srcebus { get; set; }
        public List<DissectionDetail> dissectionDetails { get; set; }
        public string zrsndesc { get; set; }
    }

}
