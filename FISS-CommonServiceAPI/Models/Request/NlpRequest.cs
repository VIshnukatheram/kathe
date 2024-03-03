using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_CommonServiceAPI.Models.Request
{
    public class NlpRequest
    {
        public string source { get; set; }

        public string email { get; set; }

        public string emailid { get; set; }

        public List<string> contractnos { get; set; }
    }
}
