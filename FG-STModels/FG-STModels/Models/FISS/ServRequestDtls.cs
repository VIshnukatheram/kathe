using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FG_STModels.Models.FISS
{
    [Table("FISS.ServRequestDtls")]
    public class ServRequestDtls
    {
        [Key,Column(Order = 0)]
        public int ServRequestDtlId { get; set; }
        [Key, Column(Order = 1)]
        public long SrvReqID { get; set; }
        public string TagName { get; set; }
        public string TagValue { get; set; }
        public string Status { get; set; }
    }
}
