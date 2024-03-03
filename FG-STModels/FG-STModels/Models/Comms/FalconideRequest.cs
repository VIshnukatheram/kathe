namespace FG_STModels.Models.Comms
{
    public class FalconideRequest
    {
        public FalconideHeader requestHeader { get; set; }
        public FalconideBody requestBody { get; set; }
    }
    public class FalconideBody
    {
        public string fromname { get; set; }
        public string subject { get; set; } = "";
        public string from { get; set; } = "";
        public string replytoid { get; set; } = "";
        public List<string> recipients { get; set; } = new List<string>() { };
        public List<string> recipientsCC { get; set; } = new List<string>() { };
        public string bcc { get; set; } = "";
        public string content { get; set; } = "";
        public List<string> filename { get; set; } = new List<string>() { };
        public List<string> filecontent { get; set; } = new List<string>() { };
        public List<string> attributes { get; set; } = new List<string>() { };
        public List<string> apiHeader { get; set; } = new List<string>() { };
        public string tasgs { get; set; } = "";
        public int template { get; set; }
        public string otherAttributes { get; set; }
    }
    public class FalconideHeader
    {
        public string source { get; set; } = "";
        public string policyNo { get; set; } = "";
        public string appNo { get; set; } = "";
        public string dob { get; set; } = "";
    }
}