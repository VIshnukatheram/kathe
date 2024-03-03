using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Request
{
    public class AbsoluteAssignment
    {
        public string chdrsel {  get; set; }
        public string clntwin { get; set; }
        public string reasoncd { get; set; } = "ABS";
    }
}
