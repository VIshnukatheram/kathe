using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FG_STModels.Models.Shared
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
