using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_CommonServiceAPI.Models.Response
{
    public class TaxCalculationResponse
    {
        public string PayableAmount { get; set; }
        public string TDSAmount { get; set; }
        public string InterestAmount { get; set; }
        public string NetPayableAmount { get; set;}
        public string FTAmount { get; set; }
        public string TotalAmount { get; set;}


    }
}
