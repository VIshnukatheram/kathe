using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_ServiceRequestAPI.Models.Response
{
    public class FinanceDownlaodResponse
    {
        public string TransactionType { get; set; }
        public string BeneficiaryAccountNumber { get; set; }
        public string IFSCCode { get; set; }
        public string InstrumentAmount { get; set; }
        public string BeneficiaryName { get; set; }
        public string DraweeLocation { get; set; }
        public string PrintLocation { get; set; }
        public string BlankForNEFT1 { get; set; }
        public string BeneAddress2 { get; set; }
        public string BlankForNEFT2 { get; set; }
        public string BeneAddress4 { get; set; }
        public string BeneAddress5 { get; set; }
        public string InstructionReferenceNumber { get; set; }
        public string CustomerReferenceNumber { get; set; }
        public string PaymentDetails1 { get; set; }
        public string PaymentDetails2 { get; set; }
        public string PaymentDetails3 { get; set; }
        public string PaymentDetails4 { get; set; }
        public string PaymentDetails5 { get; set; }
        public string PaymentDetails6 { get; set; }
        public string PaymentDetails7 { get; set; }
        public string ChequeNo { get; set; }
        public string ChqTrnDate { get; set; }
        public string MICRNumber { get; set; }
        public string BeneBankName { get; set; }
        public string BeneBankBranchName { get; set; }
        public string BeneficiaryEmailId { get; set; }
        public string BankReference { get; set; }
        public string PayeeCode { get; set; }
        public string PolicyNo { get; set; }
        public string UserName { get; set; }
        public string DOAL1 { get; set; }
        public string DOAL2 { get; set; }
        public string DOAL3 { get; set; }
        public string CFO { get; set; }
        public string CEO { get; set; }
        public string SentToBankFlagging { get; set; }
    }
}
