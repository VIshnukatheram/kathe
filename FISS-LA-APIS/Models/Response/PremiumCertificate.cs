using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace FISS_LA_APIS.Models.Response
{
    [XmlRoot("Premium_Certificate")]
    public class PremiumCertificate
    {
        [XmlElement("From_Date")]
        public string FromDate { get; set; }

        [XmlElement("To_Date")]
        public string ToDate { get; set; }

        [XmlElement("Report_Date")]
        public string ReportDate { get; set; }

        [XmlElement("Owner_Number")]
        public string OwnerNumber { get; set; }

        [XmlElement("Owner_Name")]
        public string OwnerName { get; set; }

        [XmlElement("Address1")]
        public string Address1 { get; set; }

        [XmlElement("Address2")]
        public string Address2 { get; set; }

        [XmlElement("Address3")]
        public string Address3 { get; set; }

        [XmlElement("Address4")]
        public string Address4 { get; set; }

        [XmlElement("Address5")]
        public string Address5 { get; set; }

        [XmlElement("Postcode")]
        public string Postcode { get; set; }

        [XmlElement("Owner_Mobile_No")]
        public string OwnerMobileNo { get; set; }

        [XmlElement("Policy_Details")]
        public List<PolicyDetails> PolicyDetails { get; set; }

        [XmlElement("Tax_Relief")]
        public List<TaxRelief> TaxReliefs { get; set; }
    }

    public class PolicyDetails
    {
        [XmlElement("Policy_No")]
        public string PolicyNo { get; set; }

        [XmlElement("Currency")]
        public string Currency { get; set; }

        [XmlElement("Contract_Type")]
        public string ContractType { get; set; }

        [XmlElement("Premium_Mode")]
        public string PremiumMode { get; set; }

        [XmlElement("Contract_Status")]
        public string ContractStatus { get; set; }

        [XmlElement("Payment_Type")]
        public string PaymentType { get; set; }

        [XmlElement("Life_Assured")]
        public string LifeAssured { get; set; }

        [XmlElement("Benefit_Details")]
        public BenefitDetails BenefitDetails { get; set; }

        [XmlElement("Service_Tax")]
        public string ServiceTax { get; set; }

        [XmlElement("Educ_Cess")]
        public string EducCess { get; set; }

        [XmlElement("Total_Policy_Tax")]
        public string TotalPolicyTax { get; set; }

        [XmlElement("Total_Paid")]
        public string TotalPaid { get; set; }

        [XmlElement("Suspense_Amount")]
        public string SuspenseAmount { get; set; }

        [XmlElement("Payble_in_Fin_Year")]
        public string PaybleInFinYear { get; set; }

        [XmlElement("Due_Date")]
        public string DueDate { get; set; }

        [XmlElement("Next_due_Date")]
        public string NextDueDate { get; set; }
    }

    public class BenefitDetails
    {
        [XmlElement("Coverage_Code")]
        public string CoverageCode { get; set; }

        [XmlElement("Coverage_Description")]
        public string CoverageDescription { get; set; }

        [XmlElement("Coverage_Premium")]
        public string CoveragePremium { get; set; }

        [XmlElement("Coverage_Topup")]
        public string CoverageTopup { get; set; }

        [XmlElement("Tax_Benefits")]
        public string TaxBenefits { get; set; }

        [XmlElement("Covr_Prem_without_St")]
        public string CovrPremWithoutSt { get; set; }
    }

    public class TaxRelief
    {
        [XmlElement("Tax_Section")]
        public string TaxSection { get; set; }

        [XmlElement("Tax_Amount")]
        public string TaxAmount { get; set; }
    }
}
