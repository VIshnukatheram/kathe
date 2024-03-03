using FG_STModels.Models.Core;
using FG_STModels.Models.FISS;
using FG_STModels.Models.LifeAsia;
using FG_STModels.Models.Masters;
using FG_STModels.Models.OmniDocs;
using System.Data.Entity;

namespace FG_STModels.Data
{
    public class FGDBContext : DbContext
    {
        public FGDBContext(string ConnectionString) : base(ConnectionString)
        {
        }
        public DbSet<PostalCode> PostalCodes { get; set; }
        public DbSet<Village> Villages { get; set; }
        public DbSet<City> Cities { get; set; }
        public DbSet<District> Districts { get; set; }
        public DbSet<State> States { get; set; }
        public DbSet<AppMasters> AppMasters { get; set; }
        public DbSet<EmailClassify> emailClassify { get; set; }
        protected override void OnModelCreating(DbModelBuilder ModelBuilder)
        {
            base.OnModelCreating(ModelBuilder);
        }
    }
}