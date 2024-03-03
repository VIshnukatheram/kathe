using FG_STModels.Models.FISS;
using FISS_ServiceRequestAPI.Models.DB;
using System.Collections.Generic;

namespace FISS_ServiceRequestAPI.Models.Request
{
    public class POSPayload
    {
        public string SrvReqRefNo { get; set; }
        public string Status { get; set;}
        public List<int> RequirementList { get; set; }
        public string RequirementComments { get; set; }
        public string Comments { get; set; }
        public List<ServRequestDtls> TransactionPayload { get; set; }

    }
    public class POSWorkFlowPayload
    {
        public ServiceRequestTransection POSActions { get; set; }
        public string CommunicationRequest { get; set; }
        public string RequestType { get; set; }
    }
}
