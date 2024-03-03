using FG_STModels.Models.Comms;
using FG_STModels.Models.Masters;
using FISS_CommunicationConfig.Models.DB;
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
        public DbSet<ServiceReqestTransectionData> ServiceReqestTransectionData { get; set; }
        public DbSet<AppLogs> AppLogs { get; set; }
        public DbSet<TATInfo> TATInfo { get; set; }
        public DbSet<InterestCommunication> InterestCommunication { get; set; }
        public DbSet<ProcEnqDocList> ProcEnqDocList { get; set; }

        protected override void OnModelCreating(DbModelBuilder ModelBuilder)
        {
            ModelBuilder.Entity<ServiceRequestModel>().HasKey(x => x.SrvReqID);

            ModelBuilder.Entity<AppMasters>().HasKey(x => x.MstDesc);

            ModelBuilder.Entity<Customer>().HasKey(x => x.CustomerRef);

            ModelBuilder.Entity<Policy>().HasKey(x => x.PolicyRef);

            ModelBuilder.Entity<ServCommTemplate>().HasKey(x => x.TemplateID);

            ModelBuilder.Entity<ServiceRequestTransection>().HasKey(x => x.TransectionId);

            ModelBuilder.Entity<RaiseRequirement>().HasKey(x => x.RaiseReqId);

            ModelBuilder.Entity<ServiceReqestTransectionData>().HasKey(x => x.ServRequestDtlId);
            ModelBuilder.Entity<AppLogs>().HasKey(x => x.LogRefID);
            ModelBuilder.Entity<TATInfo>().HasKey(x => new {x.CallType,x.SubType});
            ModelBuilder.Entity<InterestCommunication>().HasKey(x => x.Id);
            ModelBuilder.Entity< ProcEnqDocList>().HasKey(x =>x.ProcEnqDocId);
            base.OnModelCreating(ModelBuilder);
        }
    }

}
