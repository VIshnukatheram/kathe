using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_ServiceRequestAPI.Models.Response
{
    public class BOELatestRequestList
    {
        public DateTime Date { get; set; }
        public string ServiceNo { get; set; }
        public int CallType { get; set; }
        public string CallTypeName { get; set; }
        public int SubType { get; set; }
        public string SubTypeName { get; set; }
        public string Status { get; set; }
        public string Category { get; set; }
        public string CreatedBy { get; set; }
        public string Source { get; set; }
        public DateTime ClosedDate { get; set; }
        public int CurrentTAT { get; set; }
        public int TAT { get; set; }
    }
}
