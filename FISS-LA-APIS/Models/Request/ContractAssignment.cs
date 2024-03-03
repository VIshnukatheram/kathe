using Serilog.Parsing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Request
{
    public class ContractAssignment
    {
        public string assignee { get; set; }
        public string commission_From_date { get; set; }
        public string commission_To_date { get; set; }
        public string incomeProof { get; set; }
        public string incomeProofIsRequired { get; set; }
        public string reasonCode { get; set; }
    }

    public class ContractAssignmentRequest
    {

        public string policyNumber { get; set; }
        public List<ContractAssignment> listAssignments { get; set; }


    }
}
