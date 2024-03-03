using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS.PremiumPaidCertificate.Models.PPCModels
{
    public class NameAddress
    {
        public string Salutation { get; set; } = "";
        public string CustomerName { get; set; } = "";
        public string Address { get; set; } = "";
        public string State { get; set; } = "";
        public string Contact { get; set; } = "";
        public string Financial_Year { get; set; } = "";
    }
    public class Policy
    {
        public double PolicyNumber { get; set; } = 0;
        public string PlanName { get; set; } = "";
        public double PremiumRecd { get; set; }= 0.00;
        public double PremiumRider { get; set; } = 0.00;
        public double TotalPrem { get; set; } = 0.00;
        public string Mode { get; set; } = "";
        public DateTime NextDueDate { get; set; } 

    }
}
