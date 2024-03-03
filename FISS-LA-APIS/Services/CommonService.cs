﻿
using FISS_ServiceRequest.Models.Shared;
using Microsoft.Extensions.Options;
using System;

namespace FISS_ServiceRequest.Services
{
    public class CommonService
    {
        public readonly APIURLS _apiUrls;
        public CommonService(IOptions<APIURLS> config) {
            _apiUrls = config.Value;
        }

        public string GetUniqueServiceRequestId()
        {
            return "SR" + DateTime.UtcNow.ToString("yyyyMMddHHmmss") + new Random().Next(0000, 9999);
        }
    }
}
