using FG_STModels.Models.Comms;
using FG_STModels.Models.Core;
using FG_STModels.Models.FISS;
using FG_STModels.Models.LifeAsia;
using FG_STModels.Models.Masters;
using FG_STModels.Models.OmniDocs;
using System.Data.Entity;

namespace FISS_ServiceRequestAPI.Models.DB
{
    public class FGDBContext : DbContext
    {
        public FGDBContext(string ConnectionString) : base(ConnectionString)
        {
        }
        public DbSet<ServiceRequest> ServRequest { get; set; }
        public DbSet<AppMasters> AppMasters { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Policy> Policy { get; set; }
        public DbSet<ServCommTemplate> ServCommTemplates { get; set; }
        public DbSet<ServiceRequestTransection> ServiceRequestTransections { get; set; }
        public DbSet<RaiseRequirement> RaiseRequirements { get; set; }
        public DbSet<ServRequestDtls> ServiceRequestTransectionData { get; set; }
        public DbSet<MaterTransectionData> MaterTransectionData { get; set; }
        public DbSet<PolBankDtls> PolBankDtl { get; set; }
        public DbSet<BankIFSC> BankIFSC { get; set; }
        public DbSet<DeDupData> DeDupData { get; set; }
        public DbSet<UserIndex> UserIndex { get; set; }
        public DbSet<DMSLinks> DMSLink { get; set; }
        public DbSet<ProdDocLnk> ProdDocLnk { get; set; }
        public DbSet<ProcesDocLnk> ProcesDocLnk { get; set; }
        public DbSet<EmailClassify> EmailClassify { get; set; }
        public DbSet<EmailClassCTST> EmailClassCTST { get; set; }
        public DbSet<EmailClassAttmnts> EmailClassAttmnts { get; set; }
        public DbSet<AllocPayee> AllocPayees { get; set; }
        public DbSet<DND_LIST_HIST> DNDHistory { get; set; }
        public DbSet<DnD_LIST> DnD_LIST { get; set; }
        public DbSet<PlanFundMst> PlanFundMst { get; set; }
        public DbSet<PayeeTransaction> PayeeTransaction { get; set; }
        public DbSet<ChequeStatus> ChequeStatus { get; set; }
        public DbSet<TATInfo> TATInfo { get; set; }
        public DbSet<InterestCommunication> InterestCommunications { get; set; }
        public DbSet<Assistance> Assistance { get; set; }
        protected override void OnModelCreating(DbModelBuilder ModelBuilder)
        {
            ModelBuilder.Entity<ServiceRequest>().HasKey(x => x.SrvReqID);

            ModelBuilder.Entity<AppMasters>().HasKey(x => new{x.MstCategory, x.MstID, x.MstDesc});

            ModelBuilder.Entity<Customer>().HasKey(x => x.CustomerRef);

            ModelBuilder.Entity<Policy>().HasKey(x => x.PolicyRef);

            ModelBuilder.Entity<ServCommTemplate>().HasKey(x => x.TemplateID);

            ModelBuilder.Entity<ServiceRequestTransection>().HasKey(x => x.TransectionId);

            ModelBuilder.Entity<RaiseRequirement>().HasKey(x => x.RaiseReqId);

            ModelBuilder.Entity<ServRequestDtls>().HasKey(x => x.ServRequestDtlId);

            ModelBuilder.Entity<MaterTransectionData>().HasKey(x => x.CtStStrucId);

            ModelBuilder.Entity<DeDupData>().HasKey(x => x.ID);

            ModelBuilder.Entity<PolBankDtls>().HasKey(x => x.PolBankDtlsID);

            ModelBuilder.Entity<BankIFSC>().HasKey(x => x.IFSC);

            ModelBuilder.Entity<UserIndex>().HasKey(x => x.UserIndexID);

            ModelBuilder.Entity<DMSLinks>().HasKey(x =>x.DocIndexID);

            ModelBuilder.Entity<ProcesDocLnk>().HasKey(x => new { x.CALL_TYP, x.SUB_TYP, x.DocType } );

            ModelBuilder.Entity<ProdDocLnk>().HasKey(x => new { x.ProdType, x.ProdCode, x.DocType });

            ModelBuilder.Entity<AllocPayee>().HasKey(x => x.AllocPayeeID);
            ModelBuilder.Entity<DND_LIST_HIST>().HasKey(x => x.DndHistID);
            ModelBuilder.Entity<DnD_LIST>().HasKey(x => x.DndID);
            ModelBuilder.Entity<PlanFundMst>().HasKey(x => new { x.Plan_Code, x.Fund_Code });

            ModelBuilder.Entity<PayeeTransaction>().HasKey(x => x.PayeeCd);
            ModelBuilder.Entity<ChequeStatus>().HasKey(x => x.PayeeCd);
            ModelBuilder.Entity<TATInfo>().HasKey(x => new { x.CallType, x.SubType });
            ModelBuilder.Entity<InterestCommunication>().HasKey(x => x.Id);

            base.OnModelCreating(ModelBuilder);
        }
    }
}