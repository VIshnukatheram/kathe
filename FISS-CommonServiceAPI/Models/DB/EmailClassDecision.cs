using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FG_STModels.Models.FISS
{


    public class SearchApiRequest
    {
        public Requestheader requestheader { get; set; }
        public Requestbody requestBody { get; set; }
    }

    public class Requestheader
    {
        public string source { get; set; }
        public string policyNo { get; set; }
        public string applicationNo { get; set; }
        public string dob { get; set; }
    }

    public class Requestbody
    {
        public string mobileNo { get; set; }
        public string emailID { get; set; }
        public string pan { get; set; }
        public string customerID { get; set; }
        public string firstName { get; set; }
        public string middleName { get; set; }
        public string lastName { get; set; }
    }

}
