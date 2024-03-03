using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using FISS_ServiceRequestAPI.Services;
using Newtonsoft.Json;

namespace FISS_ServiceRequestAPI
{
    public class GetServiceReqeusts
    {
        private readonly WorkFlowCalls _workFlowCalls;
        public GetServiceReqeusts(WorkFlowCalls workFlowCalls)
        {
            _workFlowCalls = workFlowCalls;
        }
        [FunctionName(nameof(GetPOSListServiceRequests))]
        public IActionResult GetPOSListServiceRequests(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            string role = req.Query["role"];
            string userId = req.Query["userId"];
            log.LogInformation("Get List of Services API is triggerd");
            try
            {
                var listOfservice = _workFlowCalls.GetPOSListServiceRequests(role, userId);

                return new OkObjectResult(listOfservice);

            }
            catch (Exception ex)
            {
                log.LogError(ex.Message);
                return new OkObjectResult(ex.Message);
            }
        }

        [FunctionName(nameof(GetServiceRequestBySID))]
        public IActionResult GetServiceRequestBySID(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            string serReqId = req.Query["srId"];
            log.LogInformation("Get Service Request for selected Id API is triggerd");
            try
            {
                var listOfservice = _workFlowCalls.GetServiceRequest(serReqId);
                var deDupPayload = _workFlowCalls.GetDeDupPayload(serReqId);

                List<dynamic> list = new();
                foreach (var type in deDupPayload)
                {
                    dynamic depay = new
                    {
                        type.Type,
                        DeDupPayload = JsonConvert.DeserializeObject<object>(type.DeDupPayload ?? "")
                    };
                    list.Add(depay);
                }
                listOfservice.DeDupPayload = list;
                listOfservice.PersonalChange = _workFlowCalls.GetRecentPersonalDetailsModificationOnPolicy(listOfservice.PolicyRef);
                listOfservice.PolicyNo = _workFlowCalls.GetPolicyNo(listOfservice.PolicyRef);

                listOfservice.PolicyLogged = _workFlowCalls.GetRecentModificationOnPolicy(listOfservice.PolicyRef);
                return new OkObjectResult(listOfservice);

            }
            catch (Exception ex)
            {
                log.LogError(ex.Message);
                return new OkObjectResult(ex.Message);
            }
        }

        [FunctionName(nameof(GetBOELatestServiceRequests))]
        public async Task<IActionResult> GetBOELatestServiceRequests(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            string policyNo = req.Query["policyNo"];
            log.LogInformation("Get BOE Latest Service API is triggerd with Policy" + policyNo);
            try
            {
                var policy = _workFlowCalls.GetPolicy(policyNo);
                if (policy == null)
                {
                    return new OkObjectResult(new List<object>());
                }
                return await _workFlowCalls.GetBOEListServiceRequests(policy.PolicyRef);
            }
            catch (Exception ex)
            {
                log.LogError(ex.Message);
                return new OkObjectResult(ex.Message);
            }
        }
       
    }
}
