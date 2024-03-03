using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_ServiceRequestAPI.Models.Response
{
    public class TransectionPayouts
    {
        public string TypeOfPayOut { get; set; }
        public DateTime RequestDate { get; set; }
        public DateTime ValueDate { get; set; }
        public string FundTransfer { get; set; }
        public string FundTransferAmount { get; set; }
        public string FundTransderTo { get; set; }
        public string Amount { get; set; }
        public string SplitsOfAmount { get; set; }
        public DateTime PaymentDate { get; set; }
        public string PayoutStatus { get; set; }
    }
}
