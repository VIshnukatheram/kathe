using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Request
{
    public class RequestHeaderForLoan
    {
        public string source { get; set; }
        public string carrierCode { get; set; }
        public string branch { get; set; }
        public string userId { get; set; }
        public string userRole { get; set; }
        public string monthEndExtension { get; set; }
        public string MonthendDate { get; set; }
    }

    public class RequestBodyForLoanRegistration
    {
        public string policyNo { get; set; }
        public string EffectiveDate { get; set; }
        public string PRTFLAG { get; set; }
        public string LoanAmount { get; set; } // Assuming LoanAmount is an integer, you can change the type accordingly
        public string PReasonCode { get; set; }
        public string DOCRCVD { get; set; }
        public string DReasonCode { get; set; }
    }
    public class RequestBodyForApproval
    {
        public string policyNo { get; set; }
        public string EffectiveDate { get; set; }
        public int otherAdjustments { get; set; }
        public string methodOfPayment { get; set; }
        public string bankAccountNumber { get; set; }
        public string bankKey { get; set; }
    }

    public class LoanRequest<T>
    {
        public RequestHeaderForLoan RequestHeader { get; set; }
        public T RequestBody { get; set; }
    }

    public class LoanStatement
    {
        public object Error { get; set; }
        public Responseoutput ResponseOutput { get; set; }
    }

    public class Responseoutput
    {
        public Responseheader responseHeader { get; set; }
        public Responsebody responseBody { get; set; }
    }

    public class Responseheader
    {
        public bool issuccess { get; set; }
        public string message { get; set; }
        public string errorcode { get; set; }
    }

    public class Responsebody
    {
        public string chdrnum { get; set; }
        public string hpleamt { get; set; }
        public string hpleint { get; set; }
        public string hpletot { get; set; }
        public string intanny { get; set; }
        public string errorCode { get; set; }
        public string errormessage { get; set; }
        public Listdetail[] listDetails { get; set; }
    }

    public class Listdetail
    {
        public string loannumber { get; set; }
        public string hprincipal { get; set; }
        public string hpltot { get; set; }
        public string zldate { get; set; }
        public string zlpamt { get; set; }
        public string zlamount { get; set; }
        public string ttpayamt { get; set; }
    }

}
