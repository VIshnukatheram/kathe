﻿using FISS_CommonServiceAPI.Models.Shared;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_CommonServiceAPI.Models.DB
{
    [Table("FISS.UserInbox")]
    public class AssignToPOS
    {
        public int UserIndexID { get; set; } = 0;
        public long SrvReqID { get; set; }= 0;
        public string UsrID { get; set; } = "";
        public short RoleID { get; set; } = 0;
        public DateTime AllocatedOn { get; set; }= DateTime.Now;
        public DateTime? ClosedOn { get; set; }
        public string? BranchID { get; set; }
        public DateTime? ReqSignedOn { get; set; }
    }
}
