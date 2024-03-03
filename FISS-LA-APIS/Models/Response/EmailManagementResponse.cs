using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Response
{
    public class OtherClass
    {
        public double EscalationMechanismGrievanceRedressalProcedure { get; set; }
        public double SurrenderProcessEnquiry { get; set; }
    }

    public class Ctst
    {
        public double ConfidenceScore { get; set; }
        public string ErrorMessage { get; set; }
        public OtherClass OtherClass { get; set; }
        public string PredictedClass { get; set; }
        public int PredictedLabel { get; set; }
        public bool PredictionStatus { get; set; }
    }

    public class Life
    {
        public string ConfidenceScore { get; set; }
        public string ErrorMessage { get; set; }
        public string PredictedClass { get; set; }
        public string PredictedLabel { get; set; }
        public bool PredictionStatus { get; set; }
    }

    public class Nar
    {
        public string ConfidenceScore { get; set; }
        public string ErrorMessage { get; set; }
        public string PredictedClass { get; set; }
        public string PredictedLabel { get; set; }
        public bool PredictionStatus { get; set; }
    }

    public class Models
    {
        public List<Ctst> Ctst { get; set; }
        public List<Life> Life { get; set; }
        public List<Nar> Nar { get; set; }
    }

    public class EmailManagementResponse
    {
        public string Email { get; set; }
        public List<string> Entities { get; set; }
        public bool ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
        public string ExecutionTime { get; set; }
        public double Keywords { get; set; }
        public Models Models { get; set; }
        public string PreprocessedEmail { get; set; }
        public string Uid { get; set; }
    }
}
