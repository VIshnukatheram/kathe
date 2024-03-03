using System.ComponentModel.DataAnnotations.Schema;

namespace FG_STModels.Models.Comms
{
    [Table("COMMS.Interest_Communication")]
    public class InterestCommunication
    {
        public int Id { get; set; }
        public string PolicyNo { get; set; } = null!;
        public string PolicyStatus { get; set; } = null!;
        public string PlanName { get; set; } = null!;
        public string InterestRate { get; set; } = null!;
        public string Period { get; set; } = null!;
        public string? ContactInfo { get; set; }
        public int CommType { get; set; }
        public DateTime? Date { get; set; }
        public bool Status { get; set; } = false;
    }
}
