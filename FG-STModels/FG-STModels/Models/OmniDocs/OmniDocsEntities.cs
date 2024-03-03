using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FG_STModels.Models.OmniDocs
{
    public class OmniDocsResp
    {
        public OmniDocsRespHdr responseHeader { get; set; }
        public OmniDocsRespBody responseBody { get; set; }
    }
    public class OmniDocsRespHdr
    {
        public bool issuccess { get; set; }
        public string message { get; set; }
        public string errorcode { get; set; }
    }
    public class OmniDocsRespBody
    {
        public bool aadharmaskingstatus { get; set; }
        public string status { get; set; }
        public long documentIndex { get; set; }
    }
    public class OmniDocsReq
    {
        public OmniDocsReqheader requestHeader { get; set; }
        public OmniDocsReqbody requestBody { get; set; }
    }
    public class OmniDocsReqheader
    {
        public string source { get; set; }
        public string policyNo { get; set; }
        public string applicationNo { get; set; }
        public string dob { get; set; }
    }
    public class OmniDocsReqbody
    {
        public string userid { get; set; }
        public string indexName { get; set; }
        public string documentName { get; set; }
        public long documentBytes { get; set; }
    }
    [Table("FISS.DMSLinks")]
    public class DMSLinks
    {
        [Key]
        public long DocIndexID { get; set; }
        public long SrvReqID { get; set; }
        public DateTime UploadedOn { get; set; }
        public string? UploadedBy { get; set; }
        public string? UserID { get; set; }
        public string? IndexName { get; set; }
        public string? DocumentName { get; set; }
        public long DocumentSize { get; set; }
        //sample "FileLocation": "/2610202301/",
        //folder under container
        public string? FileLocation { get; set; }
        public bool? SentToDMS { get; set; }
        public DateTime? SentToDMSOn { get; set; }
        //"BlobFileName": "vishnu.pdf"
        //file name as saved in blob storage
        public string? BlobFileName { get; set; }
        public string? FileExtnMime { get; set; }
        public bool? AadharMaskStatus { get; set; }
        public string? DMSRespStatus { get; set; }
        public long? DMSIndex { get; set; }
    }
}
