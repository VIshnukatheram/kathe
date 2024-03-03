using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Response
{

    public class MandateUpdateResponse
    {
        public object Error { get; set; }
        public MandateUpdateResponseoutput ResponseOutput { get; set; }
    }

    public class MandateUpdateResponseoutput
    {
        public MandateUpdateResponseheader responseHeader { get; set; }
        public MandateUpdateResponsebody responseBody { get; set; }
    }

    public class MandateUpdateResponseheader
    {
        public bool issuccess { get; set; }
        public string message { get; set; }
        public string errorcode { get; set; }
    }

    public class MandateUpdateResponsebody
    {
        public string errorcode { get; set; }
        public string bankaccdsc { get; set; }
        public string bankacckey { get; set; }
        public string bankkey { get; set; }
        public string currcode { get; set; }
        public string detlsumm { get; set; }
        public string effdate { get; set; }
        public string facthous { get; set; }
        public string mandamt { get; set; }
        public string mandamttyp { get; set; }
        public string mandref { get; set; }
        public string mandstat { get; set; }
        public string statdets { get; set; }
        public string timesuse { get; set; }
        public string zddday { get; set; }
        public string bkcardnum { get; set; }

    }


}
