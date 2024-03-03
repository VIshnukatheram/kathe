using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Response
{

    public class ResponseBodyForFormUpload
    {
        public bool AadharMaskingStatus { get; set; }
        public string Status { get; set; }
        public string DocumentIndex { get; set; }
    }

    public class FormUploadResponse
    {
        public ResponseHeader ResponseHeader { get; set; }
        public ResponseBodyForFormUpload ResponseBody { get; set; }
    }
}
