using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Request
{
    public class MandateUpdateRequest
    {
        public string clntnum { get; set; }
        public string mandreff { get; set; }
        public string dteaprov { get; set; }
        public string bankacckey { get; set; }
        public string bankkey { get; set; }
        public string detlsumm { get; set; }
        public string effdate { get; set; }
        public string facthous { get; set; }
        public string mandamt { get; set; }
        public string mandstat { get; set; }
        public string timesuse { get; set; }
        public string zddday { get; set; }
        public string bkcardnum { get; set; }
        public string dtefrej { get; set; }
        public string dtefsbm { get; set; }
        public string dtesrej { get; set; }
        public string dtessbm { get; set; }
        public string freason { get; set; }
        public string sreason { get; set; }
        public string applicationNo { get; set; }
    }
}
