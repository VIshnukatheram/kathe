using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Response
{
    public class Mandate
    {
        public object Error { get; set; }
        public MandateResponseoutput ResponseOutput { get; set; }
    }

    public class MandateResponseoutput
    {
        public MandateResponseheader responseHeader { get; set; }
        public MandateResponsebody responseBody { get; set; }
    }

    public class MandateResponseheader
    {
        public bool issuccess { get; set; }
        public string message { get; set; }
        public string errorcode { get; set; }
    }
    public class MandateResponsebody
    {
        public string chdrsel { get; set; }
        public string clntnum { get; set; }
        public Bankdetailslist[] bankDetailsList { get; set; }
        public string errorCode { get; set; }
        public string errorMessage { get; set; }
    }
   public class Bankdetailslist
    {
        public string bankacckey { get; set; }
        public string bankkey { get; set; }
        public string effdate { get; set; }
        public string mandref { get; set; }
        public string mandstat { get; set; }
        public string zmandtag { get; set; }
    }

}
