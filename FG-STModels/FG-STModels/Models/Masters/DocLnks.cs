using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FG_STModels.Models.Masters
{
    [Table("MASTERS.ProdDocLnk")]
    public class ProdDocLnk
    {
        [Key]
        [Column(Order = 0)]
        public string ProdType { get; set; }
        [Key]
        [Column(Order = 1)]
        public string ProdCode { get; set; }
        [Key]
        [Column(Order = 4)]
        public string DocType { get; set; }
        public string ProdName { get; set; }
        public string ProdUIN { get; set; }
        public string Link { get; set; }
        [Key]
        [Column(Order = 2)]
        public long ?CALL_TYP { get; set; } 
        [Key]
        [Column(Order = 3)]
        public long ?SUB_TYP { get; set; } 
    }
    [Table("MASTERS.ProcesDocLnk")]
    public class ProcesDocLnk
    {
        [Key]
        [Column(Order = 0)]
        public long CALL_TYP { get; set; }
        [Key]
        [Column(Order = 1)]
        public long SUB_TYP { get; set; }
        [Required]
        [MaxLength(200)]
        [Column(Order = 2)]
        public string DocType { get; set; }
        [MaxLength(500)]
        public string Link { get; set; }
        [MaxLength(50)]
        public string Source { get; set; } = "URL"; // Default value
    }
    public class ReqDocList {
        public long Call_Typ { get; set; }
        public long Sub_Typ { get; set; }
        public string ProdType { get; set; }
        public string ProdCode { get; set; }
    }
}