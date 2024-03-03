using Microsoft.AspNetCore.Http.Headers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FGLIC_Communication.Models
{
    internal class EmailRequest
    {
        public RequestHeader requestHeader { get; set; }
        public RequestBody requestBody { get; set; }
    }
    public class RequestBody
    {
        public string fromname { get; set; }
        public string subject { get; set; } = "";
        public string from { get; set; } = "";
        public string replytoid { get; set; } = "";
        public List<string> recipients { get; set; } = new List<string>() { };
        public List<string> recipientsCC { get; set; } = new List<string>() { };
        public string bcc { get; set; } = "";
        public string content { get; set; } = "";
        public string[] filename { get; set; }
        public string[] filecontent { get; set; }
        public List<string> attributes { get; set; } = new List<string>() { };
        public List<string> apiHeader { get; set; } = new List<string>() { };
        public string tasgs { get; set; } = "";
        public int template { get; set; }
        public string otherAttributes { get; set; } 
    }

    public class RequestHeader
    {
        public string source { get; set; } = "";
        public string policyNo { get; set; } = "";
        public string appNo { get; set; } = "";
        public string dob { get; set; } = "";
    }

}
