using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FG_STModels.Models.Masters
{
    [Table("MASTERS.AppMasters")]
    public class AppMasters
    {
        [Key, Column(Order = 0)]
        public string MstCategory { get; set; }
        [Key, Column(Order =1)]
        public long MstID { get; set; }
        [Key, Column(Order = 2)]
        public string MstDesc { get; set; }
        public long? MstParentID { get; set; }
        [NotMapped]
        public long? SomeOtherColumn { get; set; }
    }
}
