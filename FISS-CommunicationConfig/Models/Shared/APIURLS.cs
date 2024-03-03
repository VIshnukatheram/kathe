

namespace FISS_CommunicationConfig.Models.Shared
{
    public class APIURLS
    {
        public LAURLS LAURLS { get;set;}
        public CommonURLS CommonURLS { get; set; }
    }
   
    public class LAURLS
    {
       public string PaymentLink { get; set; }
       public string ContactUpdateMobileNum { get; set; }
    }
    public class CommonURLS
    {
        public string Email { get; set; }
        public string DeDup { get; set; }
    }


}
