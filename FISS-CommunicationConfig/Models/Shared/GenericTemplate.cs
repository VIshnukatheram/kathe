using FISS_ServiceRequest.Models.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_CommunicationConfig.Models.Shared
{
    public class GenericTemplate
    {
        public ServiceRequestModel ServiceRequest { get; set; }
        public Policy Policy { get; set; }
        public string RequestCategoryName { get; set; }
        public string RejectedReason { get; set; }
        public int TAT {  get; set; }
    }
}
