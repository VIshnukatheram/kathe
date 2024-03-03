using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Request
{
    public class ServicingDocumentsRequest
    {
        public Requestheader requestheader { get; set; }
        public Requestbody requestbody { get; set; }
    }

    public class Requestheader
    {
        public string source { get; set; }
        public string policyno { get; set; }
        public string ApplicationNo { get; set; }
        public string dob { get; set; }
    }

    public class Requestbody
    {
        public string IndexName { get; set; }
    }

}
