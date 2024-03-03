using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FG_STModels.Models.UsrRoles
{
    //[Table("UsrRoles.AppUsr")]
    //public class AppUsr
    //{
    //    [Key]
    //    public string UsrID { get; set; }
    //    public string RoleID { get; set; }
    //    public string UserName { get; set; }
    //    public string UsrStatus { get; set; }
    //    public DateTime LastLoggedIn { get; set; }
    //    [RegularExpression(@"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", ErrorMessage = "Invalid email format")]
    //    [EmailAddress(ErrorMessage = "Invalid email address")]
    //    public string EmailID { get; set; }
    //}

    [Table("UsrRoles.AppUsr")]
    public class AppUser
    {
        public string? UsrID { get; set; }
        public string? UserName { get; set; }
        public byte? UsrStatus { get; set; }
        public DateTime? LastLoggedIn { get; set; }

    }
}
