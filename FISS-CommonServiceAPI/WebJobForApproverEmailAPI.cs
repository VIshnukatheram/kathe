using System;
using System.Threading.Tasks;
using FISS_CommonServiceAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace FISS_CommonServiceAPI
{
    public class WebJobForApproverEmailAPI
    {
        private readonly WorkFlowCalls _workFlowCalls;
        public WebJobForApproverEmailAPI(WorkFlowCalls workFlowCalls)
        {
            _workFlowCalls = workFlowCalls;
        }
        [FunctionName(nameof(TriggerEmailForApprover))]
        public async Task TriggerEmailForApprover([TimerTrigger("0 0 11 * * *")] TimerInfo myTimer, ILogger log)
        {
            // Get All Pending Records for DMS

            var communicationResponse = await _workFlowCalls.sendApproverEmail();

            string response = JsonConvert.SerializeObject(communicationResponse);
            log.LogInformation(response);
            
        }
    }
}
