﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS.ContactUpdateService.Models
{
    [Table("FISS.ServRequest")]
    public class ServRequest
    {
        [Key]
        public long SrvReqID { get; set; }
        public string SrvReqRefNo { get; set; }
        public short Category { get; set; }
        public int CallType { get; set; }
        public int SubType { get; set; }
        public int ReqSource { get; set; }
        public int ReqMode { get; set; }
        public int PolicyRef { get; set; }
        public int CustomerRef { get; set; }
        public int CustRole { get; set; }
        public int BranchRef { get; set; }
        public string CurrentStatus { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedByRef { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string ModifiedByRef { get; set; }
        public string Source { get; set; }

    }
}
