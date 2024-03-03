namespace FG_STModels.Misc
{
    [AttributeUsage(AttributeTargets.Property, Inherited = false)]
    public class HtmlDisplayFormat: Attribute
    {
        public string DisplayFormat{ get; set; }
    }
}
