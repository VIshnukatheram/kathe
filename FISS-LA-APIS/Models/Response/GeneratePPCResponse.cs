using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Response
{

    public class GeneratePPCResponse
    {
        public object Error { get; set; }
        public GeneratePPCResponseoutput ResponseOutput { get; set; }
    }

    public class GeneratePPCResponseoutput
    {
        public Pdfbody pdfBody { get; set; }
        public string pdfURL { get; set; }
        public bool? pdfGenerationStatus { get; set; }
    }

    public class Pdfbody
    {
        public Header header { get; set; }
        public Policy[] policies { get; set; }
        public object width { get; set; }
        public object height { get; set; }
        public int dpi { get; set; }
        public string blobFileName { get; set; }
        public string htmlFileName { get; set; }
        public string applicationNo { get; set; }
       public string DocumentType { get; set; }
    }

    public class Header
    {
        public string ADDR_LINE1 { get; set; }
        public string PONAME { get; set; }
        public string FIN_YEAR { get; set; }
        public string STATE { get; set; }
        public string ADDR_LINE2 { get; set; }
    }

    public class Policy
    {
        public int? policyRef { get; set; }
        public string lA_PolicyNo { get; set; }
        public string fG_ApplNo { get; set; }
        public string planName { get; set; }
        public int? basePremReceived { get; set; }
        public int? totalRiderPremReceived { get; set; }
        public int? totalPremReceived { get; set; }
        public int? totalTax { get; set; }
        public string premPaymentMode { get; set; }
        public DateTime? nextDueDate { get; set; }
    }

}
