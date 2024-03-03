using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FG_STModels.Models.Masters
{
    [Table("APPLOGS.Logs")]
    public class AppLogs
    {
        public long LogRefID { get; set; }
        public long SrvReqID { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string? CreatedByRef { get; set; }
        public string? ReqURL { get; set; }
        public string? JSON { get; set; }
    }
}
