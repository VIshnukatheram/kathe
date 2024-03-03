using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Request
{
    public class RequestBodyForFreeLookRegistration
    {
        public string policyNumber { get; set; }
        public string effectiveDate { get; set; }
        public string sduty { get; set; }
        public string zmedcost { get; set; }
        public string zothcost { get; set; }
        public string zposT3PM { get; set; }
        public string zuprcadj { get; set; }
    }

    public class RequestBodyForFreeLookApproval
    {
        public string action { get; set; }
        public string policyNumber { get; set; }
    }
}
