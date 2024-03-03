using FG_STModels.Models.Masters;
using System.Data.Entity;

namespace FISS_GeneratePDF
{
    public class FGDBContext : DbContext
    {
        public FGDBContext(string connString) : base(connString){
        }
        public DbSet<AppMasters> CommuHist { get; set; }
        protected override void OnModelCreating(DbModelBuilder ModelBuilder)
        {
            ModelBuilder.Entity<AppMasters>().HasKey(x => new { x.MstCategory, x.MstID });
            base.OnModelCreating(ModelBuilder);
        }
    }
}