namespace FG_STModels.Models.Shared
{
    public class APIURLS
    {
        public LAURLS LAURLS { get; set; }
        public CommonURLS CommonURLS { get; set; }
        public WorkFlowURLS WorkFlowURLS { get; set; }
    }
    public class LAURLS
    {
        public string PaymentLink { get; set; }
        public string ContactUpdateMobileNum { get; set; }
        public string BASE_URL { get; set; }
    }
    public class CommonURLS
    {
        public string Email { get; set; }
        public string DeDup { get; set; }
    }
    public class WorkFlowURLS
    {
        public string ContactNumberUpdate { get; set; }
        public string ContactNumberUpdateForPOS { get; set; }
        public string SurrenderQuery { get; set; }
        public string SurrenderRequest { get; set; }
        public string RaiseCloseFlow { get; set; }
        public string GenericSerReqQuery { get; set; }
        public string PaymentReprocessing { get; set; }
    }
}