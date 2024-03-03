using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_ServiceRequestAPI.Models.Response
{
    public class AssistanceResponse
    {

        public int AssistanceId { get; set; }
        public string AssistanceDesc { get; set; }
        public int CallType { get; set; }
        public int SubType { get; set; }
        public string Status { get; set; }
    }
}
