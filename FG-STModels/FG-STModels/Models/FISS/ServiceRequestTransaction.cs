using System.ComponentModel.DataAnnotations.Schema;


namespace FG_STModels.Models.FISS
{
    [Table("FISS.ServRequestTrans")]
    public class ServiceRequestTransaction
    {
        public int TransectionId { get; set; }
        public string? SrvReqRefNo { get; set; }
        public string? Status { get; set; }
        public string? RequirementList { get; set; }
        public string? RequirementComments { get; set; }
        public string? Comments { get; set; }
        public string? TransactionPayload { get; set; }
        [NotMapped]
        public string? Message { get; set; }
    }
}
