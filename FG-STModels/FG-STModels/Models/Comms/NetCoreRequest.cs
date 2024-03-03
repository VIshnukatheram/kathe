namespace FG_STModels.Models.Comms
{
    public class NetCoreHeader
    {
        public string source { get; set; } = "";
        public string policyNo { get; set; } = "";
        public string applicationNo { get; set; } = "";
        public string dob { get; set; } = "";
    }
    public class NetCoreBody
    {
        public string messageText { get; set; } = "";
        public string mobileNumber { get; set; } = "";
        public string SMS_Resource { get; set; } = "";
        public string DataKey { get; set; } = "";
        public string DataValue { get; set; } = "";
        public string Dltid { get; set; } = "";
        public string Message { get; set; } = "";
        public string MobileNo { get; set; } = "";
    }
    public class NetCoreRequest
    {
        public NetCoreHeader RequestHeader { get; set; }
        public NetCoreBody RequestBody { get; set; }
    }
}