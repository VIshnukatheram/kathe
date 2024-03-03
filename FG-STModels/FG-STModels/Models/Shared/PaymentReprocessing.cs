using FG_STModels.Models.FISS;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FG_STModels.Models.Shared
{
    public class PaymentReprocessing
    {
        public int policyRef { get; set; }
        public int srvReqID { get; set; }
        public string? Payment_Mode { get; set; }
        public string? Payment_Date { get; set; }
        public string? Payment_Status { get; set; }
        public string? Cheque_Status { get; set; }
        public string? Cheque_POD_No { get; set; }
        public string? TotalAmount { get; set; }
        public string? PayableAmount { get; set; }
        public string? FundTransferAmount { get; set; }
        public string? RCD { get;set; }
        public string? APE { get; set; }
        public string? FundTransferTo { get; set;}
        public string? OldSerReq { get; set; }
        public string? PayeeCode { get; set; }
    }
}
