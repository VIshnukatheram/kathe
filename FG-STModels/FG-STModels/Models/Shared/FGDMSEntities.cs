using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FG_STModels.Models.Shared
{


    public class DMSResponse
    {
        public DMSheader responseHeader { get; set; }
        public DMSbody responseBody { get; set; }
    }

    public class DMSheader
    {
        public bool issuccess { get; set; }
        public string message { get; set; }
        public string errorcode { get; set; }
    }

    public class DMSbody
    {
        public bool aadharmaskingstatus { get; set; }
        public string status { get; set; }
        public string documentIndex { get; set; }
    }

}
