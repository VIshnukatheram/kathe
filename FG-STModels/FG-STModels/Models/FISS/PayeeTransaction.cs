using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FG_STModels.Models.FISS
{
    [Table("FISS.PayeeTransection")]
    public class PayeeTransaction
    {
        public string PayeeCd { get; set; } = null!;
        public string UTR_No { get; set; } = string.Empty;
        public string Cheque_No { get; set; } = string.Empty;
        public DateTime Date { get; set; }
    }
}
