using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Azure.Core.HttpHeader;

namespace FG_STModels.Models.Masters
{
    [Table("MASTERS.ProcEnqDocList")]
    public class ProcEnqDocList
    {
        public int ProcEnqDocId { get; set; }
        public int CallType  { get; set; }
        public int SubType { get; set; }
        public string? DocListForNri { get; set; }
        public string? DocListForInd { get; set; }
        public string? FormLink { get; set; }

    }
}
