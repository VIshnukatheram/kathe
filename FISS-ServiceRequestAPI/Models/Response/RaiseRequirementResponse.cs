

namespace FISS_ServiceRequestAPI.Models.Response
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
