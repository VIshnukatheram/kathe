using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FG_STModels.Models.FISS
{
    [Table("FISS.ComplaintAction")]
    public  class ComplaintAction
    {


        [Key]
        public int Id { get; set; }

        public string ServicereqId { get; set; }

        public int? CallType { get; set; }

        public int? SubType { get; set; }

        public int? ComplaintCallType { get; set; }

        public int? ComplaintSubType { get; set; }

        public string ComplaintFrom { get; set; }

         public string SenderTo { get; set; }  

        public string Subject { get; set; }

        public string CC { get; set; }

        //public byte? Attachment { get; set; }
        public string content { get; set; }
        public int? Policynumber {get; set; }

    }
}
