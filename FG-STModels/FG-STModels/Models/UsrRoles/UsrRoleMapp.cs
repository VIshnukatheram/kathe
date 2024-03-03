using System.ComponentModel.DataAnnotations.Schema;

namespace FG_STModels.Models.UsrRoles
{
    [Table("UsrRoles.UsrRoleMapp")]
    public class UsrRoleMapp
    {
        public long UsrRoleID { get; set; }
        public string UsrID { get; set; } = null!;
        public int RoleID { get; set; }

    }
}
