using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Response
{


    public class Rootobject
    {
        public Class1[] Property1 { get; set; }
    }

    public class Class1
    {
        public string FromDate { get; set; }
        public string ToDate { get; set; }
        public string ReportDate { get; set; }
        public string OwnerNumber { get; set; }
        public string OwnerName { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string Address3 { get; set; }
        public object Address4 { get; set; }
        public object Address5 { get; set; }
        public string Postcode { get; set; }
        public string OwnerMobileNo { get; set; }
        public Policydetails PolicyDetails { get; set; }
        public Taxrelief[] TaxReliefs { get; set; }
    }

    public class Policydetails
    {
        public string PolicyNo { get; set; }
        public string Currency { get; set; }
        public string ContractType { get; set; }
        public string PremiumMode { get; set; }
        public string ContractStatus { get; set; }
        public string PaymentType { get; set; }
        public string LifeAssured { get; set; }
        public Benefitdetails BenefitDetails { get; set; }
        public string ServiceTax { get; set; }
        public string EducCess { get; set; }
        public string TotalPolicyTax { get; set; }
        public string TotalPaid { get; set; }
        public string SuspenseAmount { get; set; }
        public string PaybleInFinYear { get; set; }
        public string DueDate { get; set; }
        public string NextDueDate { get; set; }
    }

    public class Benefitdetails
    {
        public string CoverageCode { get; set; }
        public string CoverageDescription { get; set; }
        public string CoveragePremium { get; set; }
        public string CoverageTopup { get; set; }
        public string TaxBenefits { get; set; }
        public string CovrPremWithoutSt { get; set; }
    }

    public class Taxrelief
    {
        public string TaxSection { get; set; }
        public string TaxAmount { get; set; }
    }



}
