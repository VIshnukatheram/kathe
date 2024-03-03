using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using FISS_CommonServiceAPI.Services;

namespace FISS_CommonServiceAPI
{
    public class AssignToUser
    {
        private readonly WorkFlowCalls _workFlowCalls;
        public AssignToUser(WorkFlowCalls workFlowCalls)
        {
            _workFlowCalls = workFlowCalls;
        }
        [FunctionName(nameof(AssignToSelectedUser))]
        public IActionResult AssignToSelectedUser(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            string serviceRequestId = req.Query["srid"];
            dynamic response = serviceRequestId;

            log.LogInformation("Service Request Id " + serviceRequestId);
            if (req.Query["reqtype"] == "Check_Role")
            {
                response = _workFlowCalls.CheckSeniorUserRole(serviceRequestId);
            }
            else if (req.Query["reqtype"] == "Assign_Role")
            {
                int role;
                Int32.TryParse(req.Query["role"], out role);
                if(role != 0) { 
                    _workFlowCalls.AssignServiceRequestToSenior(serviceRequestId,role);
                }
            } 
            else
            {
                _workFlowCalls.AssignToUser(serviceRequestId);
            }

            log.LogInformation("Assigned To user for service request is Ended");

            return new OkObjectResult(response);
        }

        [FunctionName(nameof(AssignToSelectedUserForSurrender))]
        public IActionResult AssignToSelectedUserForSurrender(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            string serviceRequestId = req.Query["srid"];

            log.LogInformation("Service Request Id " + serviceRequestId);

            _workFlowCalls.AssignToUserForSurrenderApprover(serviceRequestId);

            log.LogInformation("Assigned To user Surrender for service request is Ended");

            return new OkObjectResult(serviceRequestId);
        }
    }
}
