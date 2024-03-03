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
    public class UsersAPI
    {
        private readonly WorkFlowCalls _workFlowCalls;
        public UsersAPI(WorkFlowCalls workFlowCalls)
        {
            _workFlowCalls = workFlowCalls;
        }
        [FunctionName(nameof(GetRolesOfUser))]
        public async Task<IActionResult> GetRolesOfUser(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string userId = req.Query["userId"];
            string userName = req.Query["userName"];

            var roles = _workFlowCalls.GetListOfRolesByUSerId(userId, userName);

            return new OkObjectResult(roles);
        }
    }
}
