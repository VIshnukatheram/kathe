namespace FG_STModels.Models.LifeAsia
{
    public class LifeAsiaResponse
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
        public List<Searchdetail> searchDetails { get; set; }

        public string errorcode { get; set; }
        public string btdate { get; set; }
        public string chdrnum { get; set; }
        public string chdrstatus { get; set; }
        public string cntcurr { get; set; }
        public string cnttype { get; set; }
        public string cownnum { get; set; }
        public string ctypedes { get; set; }
        public string currfrom { get; set; }
        public string hpropdte { get; set; }
        public string hprrcvdt { get; set; }
        public string huwdcdte { get; set; }
        public string jlifename { get; set; }
        public string jowner { get; set; }
        public string jownername { get; set; }
        public string lifename { get; set; }
        public string mop { get; set; }
        public string nextinsamt { get; set; }
        public string nextinsdte { get; set; }
        public string ownername { get; set; }
        public string payer { get; set; }
        public string payername { get; set; }
        public string payfreq { get; set; }
        public string premstatus { get; set; }
        public string ptdate { get; set; }
        public string servagnam { get; set; }
        public string statcode { get; set; }
        public string pstatcode { get; set; }
        public string flexind { get; set; }
        public string polinc { get; set; }
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
