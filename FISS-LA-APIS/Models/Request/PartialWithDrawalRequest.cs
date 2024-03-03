using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Request
{
    internal class PartialWithDrawalRequest
    {
    }
    public class RequestBodyForPartialWithDrawal
    {
        public string policyNumber { get; set; }
        public string effectiveDate { get; set; }
        public string prcnt { get; set; }
        public string totalamt { get; set; }
        public string zposT3PM { get; set; }
        public List<int> actvalue { get; set; }
        public List<int> percreqd { get; set; }
        public List<string> virtfund { get; set; }
        public string datime { get; set; }
    }
}
