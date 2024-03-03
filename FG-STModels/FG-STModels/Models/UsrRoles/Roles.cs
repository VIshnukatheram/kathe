using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FG_STModels.Models.UsrRoles
{
    [Table("UsrRoles.Roles")]
    public class UsrRoles
    {
        public int RoleID { get; set; }
        public string RoleName { get; set; } = null!;

    }
}
