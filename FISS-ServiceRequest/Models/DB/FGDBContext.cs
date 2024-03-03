using System.Data.Entity;

namespace FISS_ServiceRequest.Models.DB
{
    public class FGDBContext : DbContext
    {
        public FGDBContext(string ConnectionString) : base(ConnectionString)
        {
        }
        public DbSet<ServiceRequestModel> ServRequest { get; set; }
        public DbSet<AppMasters> AppMasters { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Policy> Policy { get; set; }
        public DbSet<ServCommTemplate> ServCommTemplates { get; set; }
        public DbSet<ServiceRequestTransection> ServiceRequestTransections { get; set; }
        public DbSet<RaiseRequirement> RaiseRequirements { get; set; }
        public DbSet<ServiceRequestTransectionData> ServiceRequestTransectionData { get; set; }

        protected override void OnModelCreating(DbModelBuilder ModelBuilder)
        {
            ModelBuilder.Entity<ServiceRequestModel>().HasKey(x => x.SrvReqID);

            ModelBuilder.Entity<AppMasters>().HasKey(x => x.MstDesc);

            ModelBuilder.Entity<Customer>().HasKey(x => x.CustomerRef);

            ModelBuilder.Entity<Policy>().HasKey(x => x.PolicyRef);

            ModelBuilder.Entity<ServCommTemplate>().HasKey(x => x.TemplateID);

            ModelBuilder.Entity<ServiceRequestTransection>().HasKey(x => x.TransectionId);

            ModelBuilder.Entity<RaiseRequirement>().HasKey(x => x.RaiseReqId);

            ModelBuilder.Entity<ServiceRequestTransectionData>().HasKey(x => x.ServRequestDtlId);

            base.OnModelCreating(ModelBuilder);
        }
    }

}
