using FG_STModels.Models.FISS;
using FG_STModels.Models.Shared;

namespace FG_STModels.Models.EMailMgmt
{
    public class SearchEmail
    {
        public int? EmailResponseId { get; set; }
        public List<EmailSource> emailSource { get; set; }
        public DateTime? ReceivedFromDt { get; set; }
        public DateTime? ReceivedToDt { get; set; }
        public bool? IsNLPRespGen { get; set; }
        public List<RequestCategory>? Category { get; set; }
        public string Status { get; set; }
        public bool AddressedToMultipleIDs { get; set; }
        public int? CallType { get; set; }
        public int? SubType { get; set; }
        public string UserID { get; set; }
    }
    public class SearchResponse
    {
        public SearchEmail? searchEmail { get; set; }
        public List<EmailClassify>? EmailClassify { get; set; }
        public List<EmailSummary>? EmailSummary { get; set; }
        public List<GraphDataSet>? graphDataSets { get; set; }  
    }
    public class EmailSummary
    {
        public string SummaryDesc { get; set; } = string.Empty;
        public Int32 CountOfMails { get; set; }
    }

    public class GraphDataSet 
    {
        public string label { get; set; } = string.Empty;
        public int[] data { get; set; } 
        public string backgroundColor { get; set; } = string.Empty;
        public string borderColor { get; set; } = string.Empty;
        public int borderWidth { get; set; } = 1;
    }

}