using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Response
{
    public class ResponseHeader
    {
        public bool Issuccess { get; set; }
        public string Message { get; set; }
        public string Errorcode { get; set; }
    }

    public class ClientDetail
    {
        public string PolicyNumber { get; set; }
        public string ClientID { get; set; }
        public string ClientName { get; set; }
        public string Role { get; set; }
        public string EntityType { get; set; }
    }

    public class AgentDetail
    {
        public string ClientID { get; set; }
        public string AgentID { get; set; }
        public string AgentName { get; set; }
        public string EntityType { get; set; }
    }

    public class ResponseBody
    {
        public List<ClientDetail> ClientDetails { get; set; }
        public List<AgentDetail> AgentDetails { get; set; }
    }

    public class DeDupResponse
    {
        public ResponseHeader ResponseHeader { get; set; }
        public ResponseBody ResponseBody { get; set; }
    }
}
