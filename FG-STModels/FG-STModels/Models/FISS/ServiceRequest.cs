using FG_STModels.Models.OmniDocs;
using FG_STModels.Models.Shared;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FG_STModels.Models.FISS
{

    [Table("FISS.ServRequest")]
    public class ServiceRequest
    {
        [Key]
        public long SrvReqID { get; set; }
        public string SrvReqRefNo { get; set; }
        public short Category { get; set; }
        public int CallType { get; set; }
        public int SubType { get; set; }
        public int ReqSource { get; set; }
        public int ReqMode { get; set; }
        public int PolicyRef { get; set; }
        public int CustomerRef { get; set; }
        public int CustRole { get; set; }
        public int BranchRef { get; set; }
        public string CurrentStatus { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedByRef { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string ModifiedByRef { get; set; }
        public string Source { get; set; }
        public long? PrtSerReqID { get; set; }
        public string TransactionPayload { get; set; }
        [NotMapped]
        public dynamic DeDupPayload { get; set; }
        public string AssignedToRole { get; set; }
        public int? AssignedToUser { get; set; }
        public string ReasonForChange { get; set; }
        public DateTime? RequestDateTime { get; set; }
        public string ReasonDelayed { get; set; }
        public DateTime? CustSignDateTime { get; set; }
        public string PolicyStatus { get; set; }
        public string ProposerName { get; set; }
        public string PlanName { get; set; }
        public string CommunicationPayload { get; set; }
        public string DOB { get; set; }
        [NotMapped]
        public string PolicyNo { get; set; }
        [NotMapped]
        public string CustomerId { get; set; }
        public List<ServRequestDtls> ServiceRequestTransectionData { get; set; }
        [NotMapped]
        public int RequestSource { get; set; }
        [NotMapped]
        public int RequestChannel { get; set; }
        [NotMapped]
        public int BranchId { get; set; }
        [NotMapped] 
        public string Plan { get; set; }
        [NotMapped] 
        public string CommunicationRequest { get; set; }

        public List<DMSLinks> DMSLink { get; set; }
        [NotMapped]
        public string PersonalChange { get; set; }
        [NotMapped]
        public string PolicyLogged { get; set; }
        [NotMapped]
        public int TAT { get; set; }
    }
}