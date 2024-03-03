using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FGLIC_Communication.Models
{
    public class SmsData
    {
        public string POLICYNO { set; get; }
        public string PURPOSE { get; set; }
        public string SRNO { get; set; }
        public string TAT { get; set; }
        public string CustomerName { get; set; }
    }
}
