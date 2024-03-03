namespace FG_STModels.Models.Comms
{
    public class CommsResponse
    {
        public CommsHeader? responseHeader { get; set; }
        public CommsBody? responseBody { get; set; }
    }
    public class CommsHeader
    {
        public int CommID { get; set; }
        public string? apiHeader { get; set; }
        public string? CommType { get; set; }
        public bool issuccess { get; set; }
        public string? message { get; set; }
        public string? errorcode { get; set; }
    }
    public class CommsBody
    {
        public string? errorcode { get; set; }
        public string? errormessage { get; set; }
    }
    public class ErrorResponse
    {
        public string? errormessage { get; set; }
    }
}