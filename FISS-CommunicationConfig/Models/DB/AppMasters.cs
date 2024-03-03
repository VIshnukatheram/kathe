using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.Design;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_ServiceRequest.Models.DB
{
    [Table("MASTERS.AppMasters")]
    public class AppMasters
    {
        public string MstCategory {  get; set; }
        public Int64 MstID { get; set; }
        public string MstDesc { get; set; }
        public Int64? MstParentID { get; set; }
    }
}
