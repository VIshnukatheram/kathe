using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS.PremiumPaidCertificate.Models.Shared
{
    public class CommonService
    {
        public readonly APIURLS _apiUrls;
        public CommonService(IOptions<APIURLS> config)
        {
            _apiUrls = config.Value;
        }


        public string GetUniqueServiceRequestId()
        {
            return "SR" + DateTime.UtcNow.ToString("yyyyMMddHHmmss") + new Random().Next(0000, 9999);
        }
    }
}
