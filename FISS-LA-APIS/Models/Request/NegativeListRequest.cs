using FISS_LA_APIS.Models.DB;
using FISS_ServiceRequest.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Request
{
    public class NegativeListRequest
    {
        public RequestHeaderForPayment requestHeader { get; set; }
        public RequestBodyForNegativeList requestBody { get; set; }
    }
    public class RequestBodyForNegativeList
    {
        public string searchtype { get; set; }
        public string lastName { get; set; }
        public int percentage { get; set; }
        public int percentageCIP { get; set; }
        public string type { get; set; }
        public string country { get; set; }
        public string dob { get; set; }
        public string name { get; set; }
        public string applicationNo { get; set; }
        public string createdby { get; set; }
        public string source { get; set; }
        public string panNo { get; set; }
        public string passportNo { get; set; }
        public string employercheck { get; set; }
    }
}
