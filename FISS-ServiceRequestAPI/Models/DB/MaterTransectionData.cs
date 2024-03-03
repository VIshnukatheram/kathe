﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_ServiceRequestAPI.Models.DB
{
    [Table("MASTERS.CtStStrucMst")]
    public class MaterTransectionData
    {
        public int CtStStrucId { get; set; }
        public int CallType { get; set; }
        public int SubType { get; set; }
        public string TagName { get; set; }
        public string TagDtTyp { get; set; }
        public string TagDtFormat { get; set; }
        public string JsonPath { get; set; }
    }
}
