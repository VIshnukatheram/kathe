using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_ServiceRequest.Models.Response
{
    public class RaiseRequirementResponse
    {
        public int RaiseReqId { get; set; }
        public string RaiseReqDesc { get; set; }
        public int CallType { get; set; }
        public int SubType { get; set; }
        public string Status { get; set; }
    }
}
