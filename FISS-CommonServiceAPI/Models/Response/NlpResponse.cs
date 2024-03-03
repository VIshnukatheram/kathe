using System;
using System.Collections.Generic;

namespace FISS_CommonServiceAPI.Models.Response
{
    public class NlpResponse
    {
        public string email {  get; set; }

        public string entities {  get; set; }

        public bool errorcode { get; set; }

        public string errormessage { get; set; }

        public TimeOnly executiontime { get; set; }

        public List<string> keywords { get; set; }

        public List<string> models { get; set; }

        public List<string> policynumber { get; set; }

        public string preprocessedemail { get; set; }

        public string subject { get; set; }

        public string Uid { get; set; }

    }

    public class models
    {
        public List<string> CTST {  get; set; }

        public List<string> LIFE {  get; set; }
        
        public List<string> NAR {  get; set; }
    }
}
