

namespace FISS_ServiceRequest.Models.Shared
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
        public string ContactUpdateEmailNum { get; set; }
        public string ContactUpdateAlternateNum { get; set; }
        public string ContactUpdateOfficeNum { get; set; }
        public string GetClientEnquiry {  get; set; }
        public string ClientUpdateP {  get; set; }
        public string GetDispatchAddressUpdate { get; set; }
        public string DeDupCheckForEmail { get; set; }
        public string DeDupCheckForPhone { get; set; }
        public string NLPAPI { get; set; }

        public string SearchEmail { get; set; }

        public string PayeeCodeApproval { get; set; }
        public string PayeeCodeCreation { get; set; }
        public string SurrenderApproval { get; set; }
        public string SurrenderRegistration { get; set; }
        public string FundSwitchEnquiry { get; set; }
        public string PayeeCodeAuthorization { get; set; }
        public string NegativeList { get; set; }
        public string LoanRegistration { get; set; }
        public string LoanApproval {  get; set; }
        public string PANUpdate { get; set; }
        public string ClientUpdateC { get; set; }
        public string AgentCodeCorrection { get; set; }
        public string FreeLookRegistration { get; set; }
        public string FreeLookApproval { get; set; }
        public string ClientCreateP { get; set; }
        public string GetNomineeCreation { get; set; }
        public string GetNomineeEnquiry { get; set; }
        public string GSTINUpdate { get; set; }
        public string getDMSDocuments { get; set; }
        public string PartialWithDrawalEnquiry { get; set; }
        public string PartialWithDrawalCreation { get; set; }
        public string PremiumRedirection { get; set; }
        public string GetPPC { get; set; }
        public string UnitStatement { get; set; }
        public string AbsoluteAssignment { get; set; }
        public string GeneratedPdf { get; set; }
        public string GetDMSDocumentsList { get; set; }
        public string LoanStatement { get; set; }
        public string ContractAssignment { get; set; }
        public string JVCreation {  get; set; }
        public string JVApproval { get; set; }
        public string GetPayeeCodeReversal { get; set; }
        public string GetMandatetagEnquiry { get; set; }

        public string MandateEnquiry { get; set; }
        public string MandateUpdate { get; set; }
    }
    public class CommonURLS
    {
        public string Email { get; set; }
        public string DeDup { get; set; }
    }


}
