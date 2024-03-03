using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.DB
{
    [Table("APPLOGS.Logs")]
    public class AppLogs
    {
        public int LogRefID { get; set; }
        public long SrvReqID { get; set; }
        public DateTime? CreatedOn { get; set; }
        public string CreatedByRef { get; set; }
        public string ReqURL { get; set; }
        public string JSON { get; set; }
    }
}
