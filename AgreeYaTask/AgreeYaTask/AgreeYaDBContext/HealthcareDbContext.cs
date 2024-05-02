using AgreeYaTask.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace AgreeYaTask.AgreeYaDBContext
{
    public class HealthcareDbContext:DbContext
    {
        public HealthcareDbContext(DbContextOptions<HealthcareDbContext> options) :base(options)
        {

        }
        public DbSet<Customer> customers { get; set; }
        protected override void OnModelCreating(ModelBuilder ModelBuilder)
        {
            ModelBuilder.Entity<Customer>().HasKey(x=>x.Id);
            base.OnModelCreating(ModelBuilder);
        }
    }
}
