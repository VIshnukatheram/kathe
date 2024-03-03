using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Response
{

    public class NomineeEnquiry
    {
        public object Error { get; set; }
        public Responseoutput ResponseOutput { get; set; }
    }

    public class Responseoutput
    {
        public Responseheader ResponseHeader { get; set; }
        public Responsebody ResponseBody { get; set; }
    }

    public class Responseheader
    {
        public bool Issuccess { get; set; }
        public string Message { get; set; }
        public string Errorcode { get; set; }
    }

    public class Responsebody
    {
        public string errorcode { get; set; }
        public Nomineeenquiry[] nomineeEnquiry { get; set; }
    }

    public class Nomineeenquiry
    {
        public string bnycd { get; set; }
        public string bnypc { get; set; }
        public string bnyrln { get; set; }
        public string bnysel { get; set; }
        public string clientName { get; set; }
        public string effectiveDate { get; set; }
    }


}
