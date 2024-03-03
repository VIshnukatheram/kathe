using FG_STModels.Misc;

namespace FG_STModels.Models.LifeAsia
{
    public class Fund
    {
        public string FundName { get; set; }
        public decimal Units { get; set; }
        public decimal NAV { get; set; }
        [HtmlDisplayFormat(DisplayFormat = "dd-MM-yyyy")]
        public DateTime NAV_DT { get; set; }
        public List<UnitTransaction> unitTransaction {get; set; }
        public string FUND_TYPE { get; set; }
        public Decimal TOT_FUND_VAL { get; set; }
    }
    public class UnitTransaction
    {
        [HtmlDisplayFormat(DisplayFormat = "dd-MM-yyyy")]
        public DateTime? TransactionDt { get; set; }
        public string? TransactionDesc { get; set; } = "";
        public string? TransactionAmt { get; set; } = "";
        public decimal UnitPrice { get; set; } = 0;
        public string? TransactedUnits { get; set; } = "";
        public string? TotalUnits { get; set; } = "";
    }
}
