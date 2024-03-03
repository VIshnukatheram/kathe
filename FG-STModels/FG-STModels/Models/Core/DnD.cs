using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FG_STModels.Models.Core
{
    [Table("Core.DND_LIST")]
    public class DnD_LIST
    {
        public int DndID {  get; set; }
        public int PolicyRef { get; set; }
        public string DndCntctNo { get; set; }
        public bool DndStatus { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
    }

    [Table("Core.DND_LIST_HIST")]
    public class DND_LIST_HIST
    {
        [Key]
        public int DndHistID { get; set; }
        public int PolicyRef { get; set; }
        [Key]
        [MaxLength(15)]
        public string DndCntctNo { get; set; } = null!;
        public bool DndStatus { get; set; }
        public long SrvReqID { get; set; }
        public string CreatedBy { get; set; } = null!;
        [Key]
        public DateTime? CreatedOn { get; set; }
    }
}