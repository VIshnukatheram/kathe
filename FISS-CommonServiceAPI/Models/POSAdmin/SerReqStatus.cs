using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_CommonServiceAPI.Models.POSAdmin
{
    public enum EnumSerReqStatus
    {      
      CLOSED=1,
      REJECT=2,
      PENDING=3,
      OPEN=4
    }
    public class SerReqStatus
    {
        public int Resloved { get; set; }
        public int Escalated { get;set; }
        public int Pending { get; set; }
        public int New_Request { get; set; }
    }
    public class POSAdmin
    {
        public SerReqStatus serReqStatus { get; set; }
        public dynamic PosAdminRoles { get; set; }

    }
}
