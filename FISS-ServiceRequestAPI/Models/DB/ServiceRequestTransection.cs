using System.ComponentModel.DataAnnotations.Schema;


namespace FISS_ServiceRequestAPI.Models.DB
{
    [Table("FISS.ServRequestTrans")]
    public class ServiceRequestTransection
    {
        public int TransectionId { get; set; }
        public string SrvReqRefNo { get; set; }
        public string Status { get; set; }
        public string RequirementList { get; set; }
        public string RequirementComments { get; set; }
        public string Comments { get; set; }
        public string TransactionPayload { get; set; }
        [NotMapped]
        public string Message  { get; set; }
    }
}
