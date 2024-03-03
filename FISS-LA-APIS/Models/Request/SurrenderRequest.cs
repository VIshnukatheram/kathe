using FISS_LA_APIS.Models.DB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Request
{
    public class SurrenderRequest<T>
    {
        public RequestHeaderForSurrender requestHeader { get; set; }
        public T requestBody { get; set; }
    }
    public class RequestHeaderForSurrender
    {
        public string source { get; set; }
        public string carrierCode { get; set; }
        public string branch { get; set; }
        public string userId { get; set; }
        public string userRole { get; set; }
        public string partnerId { get; set; }
        public string processId { get; set; }
        public string monthendExtension { get; set; }
        public string monthendDate { get; set; }
    }

    public class RequestBodyPayeeCodeAuth
    {
        public string paymentnum { get; set; }
        public string chqdup { get; set; }
        public string passwd { get; set; }
        public string zcrtdate { get; set; }
        public string zneftno { get; set; }
    }
    public class RequestBodyForPayeeCodeApproval
    {
        public string paymentnum { get; set; }
        public string passwd { get; set; }
    }
    public class RequestBodyForPayeeCodeCreation
    {
        public string payeesel { get; set; }
        public string amount { get; set; }
        public string contractno { get; set; }
        public string subactype { get; set; }
        public string reqntype { get; set; }
    }
    public class RequestBodyForSurrenderApproval
    {
        public string policyNo { get; set; }
        public string zposT3PM1 { get; set; }
    }
    public class RequestBodyForSurrenderRegistration
    {
        public string policyNo { get; set; }
        public string effDate { get; set; }
        public string otheradjst { get; set; }
        public string reasndesc { get; set; }
        public string reasoncd { get; set; }
        public string zposT3PM1 { get; set; }
    }


}
