using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS.PremiumPaidCertificate.Models.DB
{
    public class PPCDBContext:DbContext
    {
        public PPCDBContext(string ConnectionString) : base(ConnectionString)
        {
        }
        public DbSet<PPCServiceRequest> ServRequest { get; set; }
        public DbSet<CommuConfig> commuConfigs { get; set; }
        public DbSet<LA_Policy> LA_Policy { get; set; }

        protected override void OnModelCreating(DbModelBuilder ModelBuilder)
        {
            ModelBuilder.Entity<PPCServiceRequest>().HasKey(x => x.SrvReqID);
            ModelBuilder.Entity<CommuConfig>().HasKey(x => x.TemplateID);
            ModelBuilder.Entity<LA_Policy>().HasKey(x=>x.PolicyRef);


            base.OnModelCreating(ModelBuilder);
        }
    }
}
