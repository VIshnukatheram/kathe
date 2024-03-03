



using System.Data.Entity;

namespace FGLIC_ServiceRequest.Models.DB
{
    public class FGDBContext : DbContext
    {
        public FGDBContext(string ConnectionString) : base(ConnectionString)
        {
        }
        public DbSet<ServiceRequestModel> ServRequest { get; set; }
        public DbSet<AppMasters> AppMasters { get; set; }
        public DbSet<Policy> Policy { get; set; }

        protected override void OnModelCreating(DbModelBuilder ModelBuilder)
        {
            ModelBuilder.Entity<ServiceRequestModel>().HasKey(x => x.SrvReqID);

            ModelBuilder.Entity<AppMasters>().HasKey(x => x.MstDesc);

            ModelBuilder.Entity<Policy>().HasKey(x => x.PolicyRef);

            base.OnModelCreating(ModelBuilder);
        }
    }

}
