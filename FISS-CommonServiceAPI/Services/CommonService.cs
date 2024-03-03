
using FISS_CommonServiceAPI.Models.Shared;
using Microsoft.Extensions.Options;
using System;

namespace FISS_CommonServiceAPI.Services
{
    public class CommonService
    {
        public readonly APIURLS _apiUrls;
        public CommonService(IOptions<APIURLS> config) {
            _apiUrls = config.Value;
        }
    }
}
