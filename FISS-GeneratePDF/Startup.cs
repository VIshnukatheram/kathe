using FG_STModels.Data;
using FISS_GeneratePDF;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.IO;

[assembly: FunctionsStartup(typeof(Startup))]
namespace FISS_GeneratePDF
{
    public class Startup : FunctionsStartup
    {
        private IConfiguration configuration;
        public override void ConfigureAppConfiguration(IFunctionsConfigurationBuilder builder)
        {
            FunctionsHostBuilderContext context = builder.GetContext();
            builder.ConfigurationBuilder
                .AddJsonFile(Path.Combine(context.ApplicationRootPath, "AppSettings.json"), optional: false, reloadOnChange: false)
                .AddEnvironmentVariables()
                .Build();
        }
        public override void Configure(IFunctionsHostBuilder builder)
        {
            //builder.Services
            //.AddOptions<APIURLS>()
            //.Configure<IOptions<ExecutionContextOptions>>((settings, exeContext) =>
            // builder.GetContext().Configuration.Bind(settings));

            configuration = new ConfigurationBuilder().
                SetBasePath(Directory.GetCurrentDirectory()).
                AddJsonFile("AppSettings.json", optional: true, reloadOnChange: true).
                AddEnvironmentVariables().Build();
            builder.Services.AddSingleton<GeneratePDF>(x => new GeneratePDF(configuration));
        }
    }
}
