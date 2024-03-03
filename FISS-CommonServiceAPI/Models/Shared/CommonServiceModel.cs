

using System;

namespace FISS_CommonServiceAPI.Models.Shared
{
    internal class CommonServiceModel
    {
        public string[] MasterRequest {  get; set; }
    }

    public class POSList
    {
        public DateTime Date { get; set; }
        public string PolicyNo {  get; set; }
        public string ServiceNo { get; set; }
        public int CallType { get; set; }
        public string CallTypeName { get; set; }
        public int SubType { get; set; }
        public string SubTypeName { get; set; }
        public string Status { get; set; }
        public string PolicyStatus { get; set; }
        public string Plan { get; set; }
        public string ProposerName { get; set; }
        public string AssignedToRole { get; set;}
        public string AssignedToUser { get;set; }
        public string DOB {  get; set; }
    }
}
