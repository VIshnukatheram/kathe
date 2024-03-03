using FG_STModels.Models.LifeAsia;
using FISS_ServiceRequest.Models.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Request
{ 
    public class GeneratePPCRequest
    {
        public string HtmlFileName { get; set; }
        public string ApplicationNo { get; set; }
        public string blobFileName { get; set; }
        public Header Header { get; set; }
        public List<Policy> policies { get; set; }
    }

    public class Header
    {
        public string PONAME { get; set; }
        public string ADDR_LINE1 { get;set; }
        public string ADDR_LINE2 { get; set; }
        public string STATE { get; set; }
        public string FIN_YEAR { get; set; }
        public string PHONE_NO { get; set; }
        public string CURR_DATE { get; set; }
        public long? TOT_BASE_PREM { get; set; }
        public long? TOT_RIDER_PREM { get; set; }
    }

    public class PolicyD
    {
        public int PolicyRef { get; set; }
        public string LA_PolicyNo { get; set; }
        public string FG_ApplNo { get; set; }
        public string PlanName { get; set; }
        public int BasePremReceived { get; set; }
        public int TotalRiderPremReceived { get; set; }
        public int TotalPremReceived { get; set; }
        public int TotalTax { get; set; }
        public DateTime NextDueDate { get; set; }
        public string PremPaymentMode { get; set; }
    }

}
