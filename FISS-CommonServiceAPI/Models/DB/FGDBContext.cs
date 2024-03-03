using FG_STModels.Models.Core;
using FG_STModels.Models.FISS;
using FG_STModels.Models.LifeAsia;
using FG_STModels.Models.Masters;
using FG_STModels.Models.OmniDocs;
using FG_STModels.Models.UsrRoles;
using FISS_ServiceRequestAPI.Models.DB;
using System.Data.Entity;

namespace FISS_CommonServiceAPI.Models.DB
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

        public DbSet<ComplaintAction> ComplaintActions { get; set; }
        public DbSet<ServCommTemplate> ServCommTemplates { get; set; }
        public DbSet<ServiceRequestTransection> ServiceRequestTransections { get; set; }
        public DbSet<RaiseRequirement> RaiseRequirements { get; set; }
        public DbSet<UsrRoles> UsrRoles { get; set; }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<UsrRoleMapp> UsrRoleMapps { get; set; }
        public DbSet<EmailService> EmailServices { get; set; }
        public DbSet<AssignToPOS> AssignToPOS { get; set; }
        public DbSet<RequestAllocMatrix> RequestAllocMatrices { get; set; }
        public DbSet<ServRequestDtls> ServiceRequestTransectionData { get; set; }
        public DbSet<DeDupData> DeDupData { get; set; }

        public DbSet<ClntAttr> ClntAttr { get; set; }
        //public DbSet<PolAttr> PolAttr { get; set; }
        public DbSet<PolClntAttr> PolClntAttr { get; set; }
        public DbSet<NomineeRelation> nomineeRelations { get; set; }
        public DbSet<EmailClassify> emailResponses { get; set; }
        public DbSet<EmailClassCTST> emailClassCTSTs { get; set; }
        public DbSet<EmailClassAttmnts> emailClassAttmnts { get; set; }
        public DbSet<SpamEmailList> SpamEmailLists { get; set; }

        public DbSet<DMSLinks> DMSLinks { get; set; }
        public DbSet<ProdDocLnk> ProdDocLink { get; set; }
        public DbSet<OTPService> CommService { get; set; }
        public DbSet<ChequeStatus> chequeStatuses { get; set; }
        public DbSet<PayeeTransaction> payeeTransactions { get; set; }
        public DbSet<AllocPayee> allocPayees { get; set; }
        public DbSet<TATInfo> TATInfo { get; set; }
        protected override void OnModelCreating(DbModelBuilder ModelBuilder)
        {
            ModelBuilder.Entity<EmailClassify>().HasKey(x => x.EmailResponseId);
            ModelBuilder.Entity<SpamEmailList>().HasKey(x => x.Id);
            ModelBuilder.Entity<ServiceRequest>().HasKey(x => x.SrvReqID);
            ModelBuilder.Entity<Customer>().HasKey(x => x.CustomerRef);
            ModelBuilder.Entity<Policy>().HasKey(x => x.PolicyRef);
            ModelBuilder.Entity<ServCommTemplate>().HasKey(x => x.TemplateID);
            ModelBuilder.Entity<ServiceRequestTransection>().HasKey(x => x.TransectionId);
            ModelBuilder.Entity<RaiseRequirement>().HasKey(x => x.RaiseReqId);
            ModelBuilder.Entity<EmailService>().HasKey(x => x.EmailUniqRefNo);
            ModelBuilder.Entity<UsrRoles>().HasKey(x => x.RoleID);
            ModelBuilder.Entity<UsrRoleMapp>().HasKey(x => x.UsrRoleID);
            ModelBuilder.Entity<AppUser>().HasKey(x => x.UsrID);
            ModelBuilder.Entity<AssignToPOS>().HasKey(x => x.UserIndexID);
            ModelBuilder.Entity<RequestAllocMatrix>().HasKey(x => x.SrOrder);
            ModelBuilder.Entity<ServRequestDtls>().HasKey(x => x.ServRequestDtlId);
            ModelBuilder.Entity<DeDupData>().HasKey(x => x.ID);
            ModelBuilder.Entity<DMSLinks>().HasKey(x => new { x.SrvReqID, x.IndexName });
            ModelBuilder.Entity<ClntAttr>().HasKey(x => x.ClntAttrID);
            //ModelBuilder.Entity<PolAttr>().HasKey(x => x.PolicyRef);
            ModelBuilder.Entity<PolClntAttr>().HasKey(x => x.PolClntAttrID);
            ModelBuilder.Entity<NomineeRelation>().HasKey(x => x.NomRelID);
            ModelBuilder.Entity<OTPService>().HasKey(X => X.OTPServiceId);
            ModelBuilder.Entity<EmailClassCTST>().HasKey(x => new { x.EmailResponseId, x.CallType, x.SubType });
            ModelBuilder.Entity<EmailClassAttmnts>().HasKey(x => new { x.EmailResponseId, x.FileName });
            ModelBuilder.Entity<ComplaintAction>().HasKey(x => x.Id);
            ModelBuilder.Entity<ChequeStatus>().HasKey(x => x.PayeeCd);
            ModelBuilder.Entity<PayeeTransaction>().HasKey(x => x.PayeeCd);
            ModelBuilder.Entity<AllocPayee>().HasKey(x => x.AllocPayeeID);
            ModelBuilder.Entity<TATInfo>().HasKey(x => new { x.CallType, x.SubType });
            base.OnModelCreating(ModelBuilder);
        }
    }

}
