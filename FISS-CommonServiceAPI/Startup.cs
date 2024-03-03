using FISS_CommonServiceAPI;
using FISS_CommonServiceAPI.Models.DB;
using FISS_CommonServiceAPI.Services;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Azure.WebJobs.Host.Bindings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Serilog;
using System;
using System.IO;

[assembly: FunctionsStartup(typeof(Startup))]
namespace FISS_CommonServiceAPI
{
    public class Startup : FunctionsStartup
    {
        public override void ConfigureAppConfiguration(IFunctionsConfigurationBuilder builder)
        {
        }

        //Configure services
        public override void Configure(IFunctionsHostBuilder builder)
        {
            string connectionString = Environment.GetEnvironmentVariable("SQLConnectionString");
            builder.Services.AddSingleton<FGDBContext>(provider => new FGDBContext(connectionString));

            var logPath = Environment.GetEnvironmentVariable("LogPath");
            var logger = new LoggerConfiguration()
                          //.ReadFrom(builder.Services)
                            .WriteTo.File(logPath, rollingInterval: RollingInterval.Day)
                            .WriteTo.Console()
                            //.WriteTo.AzureBlobStorage(connectionString, restrictedToMinimumLevel: Serilog.Events.LogEventLevel.Fatal)
                            .CreateLogger();
            builder.Services.AddLogging(logging => logging.AddSerilog(logger, true));

            //add dependencies examples i.e. 
            builder.Services.AddSingleton<HttpService>();
            builder.Services.AddSingleton<CommonService>();
            builder.Services.AddSingleton<WorkFlowCalls>();
            builder.Services.AddSingleton<EmailManagementNlp>();
            builder.Services.AddSingleton<ComplaintActions>();
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
