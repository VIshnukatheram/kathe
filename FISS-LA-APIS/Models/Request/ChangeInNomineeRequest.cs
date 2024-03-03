using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Request
{
    public class ChangeInNomineeRequest
    {    
        public string bnycD { get; set; }
        public string bnypC { get; set; }
        public string bnyrlN { get; set; }
        public string bnyseL { get; set; }
        public string effectiveDate { get; set; }
    }
    public class ChangeInNomineeRequests
    {
        public dynamic requestBody { get; set; }
    }
}
