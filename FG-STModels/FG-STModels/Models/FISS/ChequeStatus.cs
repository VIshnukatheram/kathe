using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FG_STModels.Models.FISS
{
    [Table("FISS.Cheque_Status")]
    public class ChequeStatus
    {
        public string PayeeCd { get; set; } = null!;
        public string Cheque_No { get; set; } = null!;
        public string Status { get; set; } = null!;
        public DateTime StatusDate { get; set; }
    }
}
