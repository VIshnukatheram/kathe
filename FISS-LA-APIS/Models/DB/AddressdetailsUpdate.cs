using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.DB
{

    public class ResponseHeader
    {
        public bool Issuccess { get; set; }
        public string Message { get; set; }
        public string Errorcode { get; set; }
    }
    public class RequestBodyP
    {
        public string Clttwo { get; set; } = "";
        public string Addrtype { get; set; } = "";
        public string Birthp { get; set; } = "";
        public string CltaddR01 { get; set; } = "";
        public string CltaddR02 { get; set; } = "";
        public string CltaddR03 { get; set; } = "";
        public string CltaddR04 { get; set; } = "";
        public string CltaddR05 { get; set; } = "";
        public string Cltdobx { get; set; } = "";
        public string Cltdodx { get; set; } = "";
        public string Cltpcode { get; set; } = "";
        public string CltphonE01 { get; set; } = "";
        public string CltphonE02 { get; set; } = "";
        public string Cltsex { get; set; } = "";
        public string Cltstat { get; set; } = "";
        public string Ctrycode { get; set; } = "";
        public string Dirmail { get; set; } = "";
        public string Docno { get; set; } = "";
        public string Language { get; set; } = "";
        public string Lgivname { get; set; } = "";
        public string Lsurname { get; set; } = "";
        public string Mailing { get; set; } = "";
        public string Marryd { get; set; } = "";
        public string Natlty { get; set; } = "";
        public string Nmfmt { get; set; } = "";
        public string Occpcode { get; set; } = "";
        public string Salutl { get; set; } = "";
        public string Secuityno { get; set; } = "";
        public string Servbrh { get; set; } = "";
        public string Soe { get; set; } = "";
        public string Srdate { get; set; } = "";
        public string Statcode { get; set; } = "";
        public string Taxflag { get; set; } = "";
        public string Vip { get; set; } = "";
        public string Zdoctind { get; set; } = "";
        public string Faxno { get; set; } = "";
        public string Oldidno { get; set; } = "";
        public string Rdidtelno { get; set; } = "";
        public string Rinternet { get; set; } = "";
        public string Rmblphone { get; set; } = "";
        public string Rpager { get; set; } = "";
        public string Rstaflag { get; set; } = "";
        public string Rtaxidnum { get; set; } = "";
        public string Zspecind { get; set; } = "";
        public string Decgrsal { get; set; } = "";
        public string Emprtaxr { get; set; } = "";
        public string Eviddate { get; set; } = "";
        public string Incdesc { get; set; } = "";
        public string Payrollno { get; set; } = "";
        public string Pensind { get; set; } = "";
        public string Prasind { get; set; } = "";
        public string Salcurr { get; set; } = "";
        public string Taxyr { get; set; } = "";
    }
    public class RequestBodyC
    {
        public string Clttwo { get; set; }
        public string Addrtype { get; set; }
        public string Birthp { get; set; }
        public string CltaddR01 { get; set; }
        public string CltaddR02 { get; set; }
        public string CltaddR03 { get; set; }
        public string CltaddR04 { get; set; }
        public string CltaddR05 { get; set; }
        public string Cltdobx { get; set; }
        public string Cltdodx { get; set; }
        public string Cltpcode { get; set; }
        public string CltphonE01 { get; set; }
        public string CltphonE02 { get; set; }
        public string Cltsex { get; set; }
        public string Cltstat { get; set; }
        public string Ctrycode { get; set; }
        public string Dirmail { get; set; }
        public string Docno { get; set; }
        public string Language { get; set; }
        public string Lgivname { get; set; }
        public string Lsurname { get; set; }
        public string Mailing { get; set; }
        public string Marryd { get; set; }
        public string Natlty { get; set; }
        public string Nmfmt { get; set; }
        public string Occpcode { get; set; }
        public string Salutl { get; set; }
        public string Secuityno { get; set; }
        public string Servbrh { get; set; }
        public string Soe { get; set; }
        public string Srdate { get; set; }
        public string Statcode { get; set; }
        public string Taxflag { get; set; }
        public string Vip { get; set; }
        public string Zdoctind { get; set; }
        public string Faxno { get; set; }
        public string Oldidno { get; set; }
        public string Rdidtelno { get; set; }
        public string Rinternet { get; set; }
        public string Rmblphone { get; set; }
        public string Rpager { get; set; }
        public string Rstaflag { get; set; }
        public string Rtaxidnum { get; set; }
        public string Zspecind { get; set; }
        public string Decgrsal { get; set; }
        public string Emprtaxr { get; set; }
        public string Eviddate { get; set; }
        public string Incdesc { get; set; }
        public string Payrollno { get; set; }
        public string Pensind { get; set; }
        public string Prasind { get; set; }
        public string Salcurr { get; set; }
        public string Taxyr { get; set; }
        public string securityno { get; set; }
        
    }
    public class ResponseBody
    {
        public string errorcode { get; set; } = "";
        public string errormessage { get; set; } = "";
        public string clntpfx { get; set; } = "";
        public string clntcoy { get; set; } = "";
        public string clntnum { get; set; } = "";
        public string validflag { get; set; } = "";
        public string clttype { get; set; } = "";
        public string secuityno { get; set; } = "";
        public string payrollno { get; set; } = "";
        public string lsurname { get; set; } = "";
        public string lgivname { get; set; } = "";
        public string initials { get; set; } = "";
        public string cltsex { get; set; } = "";
        public string cltaddR01 { get; set; } = "";
        public string cltaddR02 { get; set; } = "";
        public string cltaddR03 { get; set; } = "";
        public string cltaddR04 { get; set; } = "";
        public string cltaddR05 { get; set; } = "";
        public string cltpcode { get; set; } = "";
        public string ctrycode { get; set; } = "";
        public string mailing { get; set; } = "";
        public string dirmail { get; set; } = "";
        public string addrtype { get; set; } = "";
        public string cltphonE01 { get; set; } = "";
        public string cltphonE02 { get; set; } = "";
        public string vip { get; set; } = "";
        public string occpcode { get; set; } = "";
        public string servbrh { get; set; } = "";
        public string statcode { get; set; } = "";
        public string clTdob { get; set; } = "";
        public string soe { get; set; } = "";
        public string docno { get; set; } = "";
        public string cltdod { get; set; } = "";
        public string cltstat { get; set; } = "";
        public string cltmchg { get; set; } = "";
        public string salutl { get; set; } = "";
        public string marryd { get; set; } = "";
        public string tlxno { get; set; } = "";
        public string faxno { get; set; } = "";
        public string tgram { get; set; } = "";
        public string birthp { get; set; } = "";
        public string natlty { get; set; } = "";
        public string fao { get; set; } = "";
        public string cltind { get; set; } = "";
        public string state { get; set; } = "";
        public string roleflaG01 { get; set; } = "";
        public string roleflaG02 { get; set; } = "";
        public string roleflaG03 { get; set; } = "";
        public string roleflaG04 { get; set; } = "";
        public string roleflaG05 { get; set; } = "";
        public string roleflaG06 { get; set; } = "";
        public string roleflaG07 { get; set; } = "";
        public string roleflaG08 { get; set; } = "";
        public string roleflaG09 { get; set; } = "";
        public string roleflaG10 { get; set; } = "";
        public string roleflaG11 { get; set; } = "";
        public string roleflaG12 { get; set; } = "";
        public string roleflaG13 { get; set; } = "";
        public string roleflaG14 { get; set; } = "";
        public string roleflaG15 { get; set; } = "";
        public string roleflaG16 { get; set; } = "";
        public string roleflaG17 { get; set; } = "";
        public string roleflaG18 { get; set; } = "";
        public string roleflaG19 { get; set; } = "";
        public string roleflaG20 { get; set; } = "";
        public string roleflaG21 { get; set; } = "";
        public string roleflaG22 { get; set; } = "";
        public string roleflaG23 { get; set; } = "";
        public string roleflaG24 { get; set; } = "";
        public string roleflaG25 { get; set; } = "";
        public string roleflaG26 { get; set; } = "";
        public string roleflaG27 { get; set; } = "";
        public string roleflaG28 { get; set; } = "";
        public string roleflaG29 { get; set; } = "";
        public string roleflaG30 { get; set; } = "";
        public string roleflaG31 { get; set; } = "";
        public string roleflaG32 { get; set; } = "";
        public string roleflaG33 { get; set; } = "";
        public string roleflaG34 { get; set; } = "";
        public string roleflaG35 { get; set; } = "";
        public string startdate { get; set; } = "";
        public string ecact { get; set; } = "";
        public string staffno { get; set; } = "";
        public string capital { get; set; } = "";
        public string ctryorig { get; set; } = "";
        public string language { get; set; } = "";
        public string chdrstcda { get; set; } = "";
        public string chdrstcdb { get; set; } = "";
        public string chdrstcdc { get; set; } = "";
        public string chdrstcdd { get; set; } = "";
        public string chdrstcde { get; set; } = "";
        public string sndxcde { get; set; } = "";
        public string soin { get; set; } = "";
        public string racr { get; set; } = "";
        public string catgry { get; set; } = "";
        public string oldidno { get; set; } = "";
        public string rdidtelno { get; set; } = "";
        public string rinternet { get; set; } = "";
        public string rmblphone { get; set; } = "";
        public string rpager { get; set; } = "";
        public string rstaflag { get; set; } = "";
        public string rtaxidnum { get; set; } = "";
        public string zspecind { get; set; } = "";
        public string values { get; set; } = "";

        public string clttwo { get; set; } = "";



        public string cltdodx { get; set; } = "";



        public string cltdobx { get; set; } = "";
        public string nmfmt { get; set; } = "";

        public string srdate { get; set; } = "";

        public string taxflag { get; set; } = "";

        public string zdoctind { get; set; } = "";


        public string decgrsal { get; set; } = "";
        public string emprtaxr { get; set; } = "";
        public string eviddate { get; set; } = "";
        public string incdesc { get; set; } = "";

        public string pensind { get; set; } = "";
        public string prasind { get; set; } = "";
        public string salcurr { get; set; } = "";
        public string taxyr { get; set; } = "";
    }

    public class ResponseOutput
    {
        public ResponseHeader ResponseHeader { get; set; }
        public ResponseBody ResponseBody { get; set; }
    }

    public class AddressdetailsUpdate
    {
        public object Error { get; set; }
        public ResponseOutput ResponseOutput { get; set; }
    }

    public class ClientP
    {
        public ResponseHeader ResponseHeader { get; set; }
        public RequestBodyP ResponseBody { get; set; }
    }

    public class DispatchResponse
    {
      public  string policyNo { get; set; }

      public  string ClientNo { get; set; }
    }

    public class DisptachAddress
    {
        public ResponseHeader ResponseHeader { get; set; }
        public DispatchResponse ResponseBody { get; set; }
    }
}
