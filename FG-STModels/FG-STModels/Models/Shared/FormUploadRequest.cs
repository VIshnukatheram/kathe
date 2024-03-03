namespace FG_STModels.Models.Shared
{
    public class RequestHeaderForUpload
    {
        public string Source { get; set; }
        public string PolicyNo { get; set; }
        public string ApplicationNo { get; set; }
        public string Dob { get; set; }
    }

    public class RequestBodyForUpload
    {
        public string UserId { get; set; }
        public string IndexName { get; set; }
        public string DocumentName { get; set; }
        public string DocumentBytes { get; set; }
    }

    public class FormUploadRequest
    {
        public RequestHeaderForUpload RequestHeader { get; set; }
        public RequestBodyForUpload RequestBody { get; set; }
    }
}
