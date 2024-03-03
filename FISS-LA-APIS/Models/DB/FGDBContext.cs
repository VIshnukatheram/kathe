using FG_STModels.Models.Core;
using FG_STModels.Models.FISS;
using FG_STModels.Models.LifeAsia;
using FG_STModels.Models.Masters;
using FISS_LA_APIS.Models.DB;
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
        public DbSet<DeDupData> DeDupData { get; set; }
        public DbSet<PolBankDtls> PolBankDtls { get; set; }
        public DbSet<PolBankDtlsHist> PolBankDtlsHist { get; set; }
        public DbSet<AppLogs> AppLogs { get; set; }
        public DbSet<BankIFSC> BankIFSC { get; set; }
        public DbSet<ProdDocLnk> ProcesDocLnk { get; set; }
        public DbSet<AllocPayee> AllocPayees { get; set; }
        public DbSet<DND_LIST_HIST> DNDHistory { get; set; }
        public DbSet<DnD_LIST> DnD_LIST { get; set; }

        public DbSet<ClntAttr> ClntAttr { get; set; }

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
            ModelBuilder.Entity<PolBankDtls>().HasKey(x => x.PolBankDtlsID);
            ModelBuilder.Entity<PolBankDtlsHist>().HasKey(x => x.PolBankDtlsHistID);

            ModelBuilder.Entity<DeDupData>().HasKey(x => x.ID);
            ModelBuilder.Entity<AppLogs>().HasKey(x => x.LogRefID);
            ModelBuilder.Entity<BankIFSC>().HasKey(x => x.IFSC);
            ModelBuilder.Entity<ProdDocLnk>().HasKey(x => x.CALL_TYP);
            ModelBuilder.Entity<AllocPayee>().HasKey(x => x.AllocPayeeID);
            ModelBuilder.Entity<DND_LIST_HIST>().HasKey(x => x.DndHistID);
            ModelBuilder.Entity<DnD_LIST>().HasKey(x => x.DndID);


            base.OnModelCreating(ModelBuilder);
        }
    }

}
