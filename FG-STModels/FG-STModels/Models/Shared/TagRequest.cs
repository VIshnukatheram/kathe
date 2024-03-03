using FG_STModels.Models.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FG_STModels.Models.Shared
{
    public class TagRequest
    {
        public string? ClientNo { get; set; }
        public List<TagValues>? TagValue { get; set; }
    }

    public class TagValues
    {
        public string? TagName { get; set; }
        public dynamic? TagValue { get; set; }
    }
}
