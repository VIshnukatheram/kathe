using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FG_STModels.Models.Core
{
    [Table("MASTERS.PolClntAttr")]
    public class PolClntAttr
    {

        public int? PolClntAttrID { get; set; } = 0;
        public string? Area { get; set; } = "";
        public string? TagName { get; set; } = "";
        public string? TagDtTyp { get; set; }="";
        public string? TagDtFormat { get; set; }="";
        public string? JsonPath { get; set; }="";
    }
}
