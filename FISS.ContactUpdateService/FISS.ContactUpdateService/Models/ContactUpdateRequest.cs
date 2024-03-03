using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS.ContactUpdateService.Models
{
    public class ContactUpdateRequest
    {
        public string SerReqID { get; set; }
        public List<ServReqValue> ServReqValues { get; set; }
    }

    public class ServReqValue
    {
        public string Status { get; set; }
        public string TagName { get; set; }
        public dynamic TagValue { get; set; }
    }
}
