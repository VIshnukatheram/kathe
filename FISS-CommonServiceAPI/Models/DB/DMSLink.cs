using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_CommonServiceAPI.Models.DB
{
    [Table("FISS.DMSLinks")]
    public class DMSLink
    {
        public long SrvReqID { get; set; }
        public DateTime UploadedOn { get; set; }
        public string UploadedBy { get; set; } = null!;
        public string UserID { get; set; } = null!;
        public string IndexName { get; set; } = null!;
        public string DocumentName { get; set; } = null!;
        public int DocumentSize { get; set; }
        public string FileLocation { get; set; } = null!;
        public bool SentToDMS { get; set; }
        public DateTime? SentToDMSOn { get; set; }
        public string? BlobFileName { get; set; }
        public string? FileExtnMime { get; set; }
    }
}
