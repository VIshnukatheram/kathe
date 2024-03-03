using System.ComponentModel.DataAnnotations.Schema;

namespace FG_STModels.Models.Masters
{
    [Table("MASTERS.CtStStrucMst")]
    public class TransactionDataMaster
    {
        public int CtStStrucId { get; set; }
        public int CallType { get; set; }
        public int SubType { get; set; }
        public string? TagName { get; set; }
        public string? TagDtTyp { get; set; }
        public string? TagDtFormat { get; set; }
        public string? JsonPath { get; set; }
    }
}
