using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Request
{
    public class RequestBodyForFundSwitchEnquiry
    {
        public string Policyno { get; set; }
        public string EffectiveDate { get; set; }
        public string PCAMTIND { get; set; }
        public string ZPOST3PM { get; set; }
        public PerCentAmount PerCentAmount { get; set; }
        public string orswchfe { get; set; }
        public TargetPercent TargetPercent { get; set; }
        public FundFrom FundFrom { get; set; }
        public FundTo FundTo { get; set; }
    }

    public class PerCentAmount
    {
        public string perCentAmount1 { get; set; }
        public string perCentAmount2 { get; set; }
        public string perCentAmount3 { get; set; }
        public string perCentAmount4 { get; set; }
        public string perCentAmount5 { get; set; }
        public string perCentAmount6 { get; set; }
        public string perCentAmount7 { get; set; }
        public string perCentAmount8 { get; set; }
        public string perCentAmount9 { get; set; }
        public string perCentAmount10 { get; set; }
    }

    public class TargetPercent
    {
        public string targetPercent1 { get; set; }
        public string targetPercent2 { get; set; }
        public string targetPercent3 { get; set; }
        public string targetPercent4 { get; set; }
        public string targetPercent5 { get; set; }
        public string targetPercent6 { get; set; }
        public string targetPercent7 { get; set; }
        public string targetPercent8 { get; set; }
        public string targetPercent9 { get; set; }
        public string targetPercent10 { get; set; }
    }

    public class FundFrom
    {
        public string fundFrom1 { get; set; }
        public string fundFrom2 { get; set; }
        public string fundFrom3 { get; set; }
        public string fundFrom4 { get; set; }
        public string fundFrom5 { get; set; }
        public string fundFrom6 { get; set; }
        public string fundFrom7 { get; set; }
        public string fundFrom8 { get; set; }
        public string fundFrom9 { get; set; }
        public string fundFrom10 { get; set; }
    }

    public class FundTo
    {
        public string fundTo1 { get; set; }
        public string fundTo2 { get; set; }
        public string fundTo3 { get; set; }
        public string fundTo4 { get; set; }
        public string fundTo5 { get; set; }
        public string fundTo6 { get; set; }
        public string fundTo7 { get; set; }
        public string fundTo8 { get; set; }
        public string fundTo9 { get; set; }
        public string fundTo10 { get; set; }
    }

}
