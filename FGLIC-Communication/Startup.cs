using FGLIC_Communication.Data;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace FGLIC_Communication
{
    internal class Startup: FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
    //        var basePath = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
    //        var configuration = new ConfigurationBuilder()
    //.SetBasePath(basePath)
    //.AddJsonFile("AppSettings.json", optional: true, reloadOnChange: true)
    //.AddEnvironmentVariables()
    //.Build();
          
        }
    }
}
