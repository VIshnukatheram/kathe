using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FG_STModels.Models.FISS
{
    [Table("FISS.AllocPayee")]
    public class AllocPayee
    {
        [Key] 
        public long AllocPayeeID { get; set; }

        //unique index on SrvReqID + PayeeCd
        [Required]
        public long SrvReqID { get; set; }

        [Required, MaxLength(50)]
        public string PayeeCd { get; set; }
        public DateTime CreatedOn { get; set; }

        public bool IsDownloaded { get; set; } = false;

        public DateTime? DownloadedOn { get; set; }

        public string? DownloadedBy { get; set; }
        public string? ZcrtdatE1 { get; set; }
        public string? NEFT_No { get; set; }
        public DateTime? AuthorizedOn { get; set; }
        public bool Authorized { get; set; } = false;
        public string? AuthStatus { get; set; }
    }
}
