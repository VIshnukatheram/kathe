namespace FG_STModels.Models.FISS
{
    public class ContactUpdateRequest
    {
        public string SerReqID { get; set; }
        public List<ServReqValue> ServReqValues { get; set; }
    }

    public class ServReqValue
    {
        public string Status { get; set; }
        public string TagName { get; set; }
        public string TagValue { get; set; }
    }
}