using FISS.PremiumPaidCertificate;
using FISS.PremiumPaidCertificate.Models.DB;
using FISS.PremiumPaidCertificate.Models.PPCModels;
using FISS.PremiumPaidCertificate.Models.Shared;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Azure.WebJobs.Host.Bindings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
[assembly: FunctionsStartup(typeof(Startup))]
namespace FISS.PremiumPaidCertificate
{
    internal class Startup: FunctionsStartup
    {
        public override void ConfigureAppConfiguration(IFunctionsConfigurationBuilder builder)
        {
            //Overrideden behavior read from, appsettings.json
            FunctionsHostBuilderContext context = builder.GetContext();
            builder.ConfigurationBuilder
                .AddJsonFile(Path.Combine(context.ApplicationRootPath, "APIUrls.json"), optional: false, reloadOnChange: false)
                .AddEnvironmentVariables()
                .Build();
        }

        //Configure services
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services
            .AddOptions<APIURLS>()
            .Configure<IOptions<ExecutionContextOptions>>((settings, exeContext) =>
             builder.GetContext().Configuration.Bind(settings));


            string connectionString = Environment.GetEnvironmentVariable("SQLConnectionString");
            builder.Services.AddSingleton<PPCDBContext>(provider => new PPCDBContext(connectionString));

            var logPath = Environment.GetEnvironmentVariable("LogPath");
            builder.Services.AddSingleton<CommonService>();
            builder.Services.AddSingleton<HttpService>();
            builder.Services.AddSingleton<ServiceRequest>();
        }
    }
}
