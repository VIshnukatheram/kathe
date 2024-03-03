namespace FG_STModels.Models.FISS
{
    public class SearchApiRequest
    {
        public Requestheader requestheader { get; set; } = new Requestheader();
        public Requestbody requestBody { get; set; } = new Requestbody();
    }

    public class Requestheader
    {
        public string source { get; set; } = string.Empty;
        public string policyNo { get; set; } = string.Empty;
        public string applicationNo { get; set; } = string.Empty;
        public string dob { get; set; } = string.Empty;
        public string carrierCode { get; set; } = string.Empty;
        public string Branch { get; set; } = string.Empty;
        public string userId { get; set; } = string.Empty;
        public string userRole { get; set; } = string.Empty;
        public string partnerId { get; set; } = string.Empty;
        public string processId { get; set; } = string.Empty;
        public string monthendExtension { get; set; } = string.Empty;
        public string monthendDate { get; set; } = string.Empty;
    }
    public class Requestbody
    {
        public string mobileNo { get; set; } = string.Empty;
        public string emailID { get; set; } = string.Empty;
        public string pan { get; set; } = string.Empty;
        public string customerID { get; set; } = string.Empty;
        public string firstName { get; set; } = string.Empty;
        public string middleName { get; set; } = string.Empty;
        public string lastName { get; set; } = string.Empty;
        public string PolicyNumber { get; set; }
    }


    public class SearchApiResponse
    {
        public object Error { get; set; }
        public Responseoutput ResponseOutput { get; set; }
    }

    public class Responseoutput
    {
        public Responseheader responseHeader { get; set; }
        public Responsebody responseBody { get; set; }
    }

    public class Responseheader
    {
        public bool issuccess { get; set; }
        public string message { get; set; }
        public string errorcode { get; set; }
    }

    public class Responsebody
    {
        public Searchdetail[] searchDetails { get; set; }
    }

    public class Searchdetail
    {
        public string policyNo { get; set; }
        public string dob { get; set; }
        public string applicationNo { get; set; }
        public string poName { get; set; }
        public string laName { get; set; }
        public string policyStatus { get; set; }
        public string sumAssured { get; set; }
        public string premiumAmt { get; set; }
        public string agentName { get; set; }
        public string pinCode { get; set; }
        public string pan { get; set; }
        public string mobileNo { get; set; }
        public string role { get; set; }
        public string caseType { get; set; }
        public string poClientID { get; set; }
        public string laClientID { get; set; }
        public string emailID { get; set; }
    }

}