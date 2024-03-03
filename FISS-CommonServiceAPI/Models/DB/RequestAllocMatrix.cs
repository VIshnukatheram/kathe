using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_CommonServiceAPI.Models.DB
{
    [Table("MASTERS.RequestAllocMatrix")]
    public class RequestAllocMatrix
    {
        public int CallType { get; set; }
        public int SubType { get; set; }
        public decimal Band_LLimit { get; set; }
        public decimal Band_ULimit { get; set; }
        public string AppAction { get; set; }
        public string AllocateUsrID { get; set; }
        public byte? SrOrder { get; set; }
    }
}
