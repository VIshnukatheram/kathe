using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_CommonServiceAPI.Models.DB
{
    [Table("FISS.ServRequestTrans")]
    public class ServiceRequestTransection
    {
        public int TransectionId { get; set; }
        public string SrvReqRefNo { get; set; }
        public string Status { get; set; }
        public string RequirementList { get; set; }
        public string RequirementComments { get; set; }
        public string Comments { get; set; }
        public string TransactionPayload { get; set; }
    }
}
