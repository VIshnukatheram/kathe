using FISS.ContactUpdateService.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace FISS.ContactUpdateService.Data
{
    public class ContactUpdateDbContext:DbContext
    {
        public ContactUpdateDbContext(string ConnectionString) : base(ConnectionString)
        {

        }
        public DbSet<ContactUpdate> ContactUpdate { get; set; }
        public DbSet<ContactAndUpdateStructure> ContactAndUpdateStructure { get; set; }
        public DbSet<ServRequest> ServRequest { get; set; }

        protected override void OnModelCreating(DbModelBuilder ModelBuilder)
        {
            ModelBuilder.Entity<ContactUpdate>().HasKey(x => x.ServRequestDtlId);
            ModelBuilder.Entity<ContactAndUpdateStructure>().HasKey(x => x.CtStStrucId);
            ModelBuilder.Entity<ServRequest>().HasKey(X => X.SrvReqID);

            base.OnModelCreating(ModelBuilder);
        }
    }
}
