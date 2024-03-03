using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Request
{
   
    public class UnitStatementRequest
    {
        public UnitRequestheader RequestHeader { get; set; }
        public UnitRequestbody RequestBody { get; set; }
    }

    public class UnitRequestheader
    {
        public string source { get; set; }
        public string carrierCode { get; set; }
        public string branch { get; set; }
        public string userId { get; set; }
        public string userRole { get; set; }
        public string monthEndExtension { get; set; }
        public string meDate { get; set; }
    }

    public class UnitRequestbody
    {
        public string policyNo { get; set; }
        public string DateFrom { get; set; }
    }
}
