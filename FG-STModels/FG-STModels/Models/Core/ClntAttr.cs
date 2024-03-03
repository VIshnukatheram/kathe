using System.ComponentModel.DataAnnotations.Schema;

namespace FG_STModels.Models.Core
{
    [Table("Core.ClntAttr")]
    public class ClntAttr
    { 

        public int ClntAttrID { get; set; } = 0;
        public long CustomerRef { get; set; } = 0;
        public string? TagName { get; set; } = "";
        public string? TagValue { get; set; } = "";
        public DateTime CreatedOn { get; set; } 
        public string? CreatedBy { get; set; } = "";
        public DateTime? ModifiedOn { get; set; } 
        public string? ModifiedBy { get; set; } = "";

    }
}