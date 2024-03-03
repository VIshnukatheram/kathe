using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_CommonServiceAPI.Models.Request
{
    public class POSPayload
    {
        public string SrvReqRefNo { get; set; }
        public string Status { get; set;}
        public List<int> RequirementList { get; set; }
        public string RequirementComments { get; set; }
        public string Comments { get; set; }
        public string TransactionPayload { get; set; }

    }
}
