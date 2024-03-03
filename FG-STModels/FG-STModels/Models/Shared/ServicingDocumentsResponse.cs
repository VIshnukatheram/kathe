using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FG_STModels.Models.Shared
{
 
    public class ServicingDocumentsResponse
    {
        public Responseheader? responseHeader { get; set; }
        public Responsebody? responseBody { get; set; }
    }

    public class Responseheader
    {
        public bool issuccess { get; set; }
        public string? message { get; set; }
        public string? errorcode { get; set; }
    }

    public class Responsebody
    {
        [NotMapped]
        public List<Dmsfileslist> dmsFilesList { get; set; }= new List<Dmsfileslist>() {};
    }

    public class Dmsfileslist
    {
        public string? filename { get; set; }
        public string? fileBytes { get; set; }
    }

}
