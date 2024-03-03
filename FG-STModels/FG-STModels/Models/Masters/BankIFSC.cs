using System.ComponentModel.DataAnnotations.Schema;

namespace FISS_ServiceRequestAPI.Models.DB
{
    [Table("MASTERS.BankIFSC")]
    public class BankIFSC
    {
    public string BANK { get; set; }
    public string IFSC { get; set; }
    public string BRANCH { get; set; }
    public string BRANCH_ADDR { get; set; }
    public string CITY1 { get; set; }
    public string CITY2 { get; set; }
    public string BRANCH_STATE { get; set; }
    public string BRANCH_STDCODE { get; set; }
    public string BRANCH_PHONE { get; set; }
    public string BANK_KEY { get; set; }
    }
}
