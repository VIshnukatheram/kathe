using FG_STModels.BL.Service;
using FG_STModels.Models.Shared;
using FGLIC_ServiceRequest;
using FISS_ServiceRequestAPI;
using FISS_ServiceRequestAPI.Models.DB;
using FISS_ServiceRequestAPI.Services;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Azure.WebJobs.Host.Bindings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Serilog;
using System;
using System.IO;

[assembly: FunctionsStartup(typeof(Startup))]
namespace FGLIC_ServiceRequest
{
    public class Startup : FunctionsStartup
    {
        string RootFolder = string.Empty;
        public override void ConfigureAppConfiguration(IFunctionsConfigurationBuilder builder)
        {
            string environment = Environment.GetEnvironmentVariable("Enviroment");
            string APIURLsPath = "APIUrls.json";
            if(environment != null && environment.Contains("UAT")) {
                APIURLsPath = "APIUrlsUAT.json";
            }

            FunctionsHostBuilderContext context = builder.GetContext();
            builder.ConfigurationBuilder
                .AddJsonFile(Path.Combine(context.ApplicationRootPath, APIURLsPath), optional: false, reloadOnChange: false)
                .AddEnvironmentVariables()
                .Build();
            RootFolder = context.ApplicationRootPath;
        }

        //Configure services
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services
            .AddOptions<APIURLS>()
            .Configure<IOptions<ExecutionContextOptions>>((settings, exeContext) =>
             builder.GetContext().Configuration.Bind(settings));

            string connectionString = Environment.GetEnvironmentVariable("SQLConnectionString");
            builder.Services.AddSingleton<FGDBContext>(provider => new FGDBContext(connectionString));

            var logPath = Environment.GetEnvironmentVariable("LogPath");
            var logger = new LoggerConfiguration()
                          //.ReadFrom(builder.Services)
                           .WriteTo.File(logPath, rollingInterval: RollingInterval.Day)
                           .WriteTo.Console()
                            //.WriteTo.AzureBlobStorage(connectionString: connectionString)
                            .CreateLogger();
            builder.Services.AddLogging(logging => logging.AddSerilog(logger, true));

            //add dependencies examples i.e. 
            builder.Services.AddSingleton<FISS_ServiceRequestAPI.Services.HttpService>();
            builder.Services.AddSingleton<CommonService>();
            builder.Services.AddSingleton<WorkFlowCalls>();
            builder.Services.AddSingleton<ExcelFileService>();
            //builder.Services.AddTransient<IMyService, MyService>();
            //builder.Services.AddScoped<IMyService, MyService>();

            //Extended Dependencies
            //part of Microsoft.Extensions.Http
            //builder.Services.AddHttpClient();


            //You can access configurations by accessing
            //var configuration = builder.GetContext().Configuration;
            //var connectionStrings = configuration.GetConnectionString("Default");

            //Don't add AddApplicationInsightsTelemetry() to the services collection,
            //which registers services that conflict with services provided by the environment.
            //Don't register your own TelemetryConfiguration or TelemetryClient if you are using
            //the built-in Application Insights functionality. If you need to configure your own TelemetryClient instance,
            //create one via the injected TelemetryConfiguration as shown in Log custom telemetry in C# functions.
            //builder.Services.AddSingleton<ILoggerProvider, MyLoggerProvider>();
        }
    }
}
