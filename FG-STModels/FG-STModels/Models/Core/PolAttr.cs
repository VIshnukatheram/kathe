using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FG_STModels.Models.Core
{
    public class PolAttr
    {
        public long CustomerRef { get; set; }
        public string? TagName { get; set; }
        public string? TagValue { get; set; }
        public DateTime CreatedOn { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string? ModifiedBy { get; set; }
    }
}
