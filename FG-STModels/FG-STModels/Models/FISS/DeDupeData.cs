using System.ComponentModel.DataAnnotations.Schema;

namespace FISS_ServiceRequestAPI.Models.DB
{
    [Table("FISS.DeDup")]
    public class DeDupeData
    {
        public string LA_PolicyNo { get; set; }
        public string SrvReqRefNo { get; set; }
        public string DeDupPayload { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
