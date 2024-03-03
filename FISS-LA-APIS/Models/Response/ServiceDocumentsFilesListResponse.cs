using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_LA_APIS.Models.Response
{

    public class FileItem
    {
        [JsonProperty("documentName")]
        public string DocumentName { get; set; }

        [JsonProperty("indexName")]
        public string IndexName { get; set; }
    }

    public class ResponseBodyForFIlesList
    {
        [JsonProperty("filesList")]
        public List<FileItem> FilesList { get; set; }
    }

    public class ServiceDocumentsFilesListResponse
    {
        [JsonProperty("responseHeader")]
        public ResponseHeader ResponseHeader { get; set; }

        [JsonProperty("responseBody")]
        public ResponseBodyForFIlesList ResponseBody { get; set; }
    }
}
