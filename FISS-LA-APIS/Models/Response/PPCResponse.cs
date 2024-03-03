using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Response
{
    public class PPC
    {
        public string Error { get; set; }
        public ResponseOutput ResponseOutput { get; set; }
    }
    public class ResponseOutput
    {
        public PPCResponseheader responseHeader { get; set; }
        public PPCResponsebody responseBody { get; set; }
    }

    public class PPCResponseheader
    {
        public bool issuccess { get; set; }
        public string message { get; set; }
        public string errorcode { get; set; }
    }

    public class PPCResponsebody
    {
        public string bytes { get; set; }
        public string fileName { get; set; }
    }


}
