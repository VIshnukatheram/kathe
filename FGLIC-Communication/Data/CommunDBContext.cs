using FGLIC_Communication.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace FGLIC_Communication.Data
{
    public class CommunDBContext: DbContext
    {
        public CommunDBContext(string connString) :base(connString)  {          
                
        }

        public DbSet<CommuHist> CommuHist { get; set; }
        public DbSet<CommuConfg> CommuConfg { get; set; }
        public DbSet<ServRequest> ServRequest { get; set; }
        public DbSet<LAPolicy> LA_Policy { get; set; }
        protected override void OnModelCreating(DbModelBuilder ModelBuilder)
        {
            ModelBuilder.Entity<CommuHist>().HasKey(x=>x.CommID);
            ModelBuilder.Entity<CommuConfg>().HasKey(x => x.TemplateID);
            ModelBuilder.Entity<ServRequest>().HasKey(x => x.SrvReqID);
            ModelBuilder.Entity<LAPolicy>().HasKey(x => x.PolicyRef);
            base.OnModelCreating(ModelBuilder);
        }
    }
}
