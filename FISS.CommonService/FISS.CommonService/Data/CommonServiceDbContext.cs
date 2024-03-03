using FISS.CommonService.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS.CommonService.Data
{
    public class CommonServiceDbContext:DbContext
    {
        public CommonServiceDbContext(string ConnectionString):base(ConnectionString)
        {

        }
        public DbSet<OTPService> CommService { get; set; }
        public DbSet<CommuConfg> CommuConfg { get; set; }
        //public DbSet<CommuHist> CommuHist { get; set; }

        protected override void OnModelCreating(DbModelBuilder ModelBuilder)
        {
            ModelBuilder.Entity<OTPService>().HasKey(X => X.OTPServiceId);
            ModelBuilder.Entity<CommuConfg>().HasKey(X => X.TemplateID);
           // ModelBuilder.Entity<CommuHist>().HasKey(X => X.CommID);

            base.OnModelCreating(ModelBuilder);
        }
    }
}
