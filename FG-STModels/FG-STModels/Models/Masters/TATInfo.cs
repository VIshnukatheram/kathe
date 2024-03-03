using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FG_STModels.Models.Masters
{
    [Table("MASTERS.TAT_INFO")]
    public class TATInfo
    {
        [Key]
        public int CallType { get; set; }
        [Key]
        public int SubType { get; set; }
        public int TAT {  get; set; }
        [Key]
        public String Category { get; set; }
        public string? UserRole { get; set; }
    }
}
