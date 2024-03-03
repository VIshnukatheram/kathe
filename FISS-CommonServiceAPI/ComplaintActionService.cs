using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Runtime.InteropServices;
using FISS_CommonServiceAPI.Services;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using FISS_CommonServiceAPI.Models.DB;
using System.Data.Entity;
using System.Linq;
using FG_STModels.Models.FISS;
using System.Net.Http;
using System.Text;
using Microsoft.IdentityModel.Protocols;
using FG_STModels.Models.Comms;
using FG_STModels.BL.EMail;

namespace FISS_CommonServiceAPI
{
    public class ComplaintActionService
    {
        private readonly WorkFlowCalls _workFlowCalls;

        private readonly FGDBContext _fgdbcontext;

        private readonly HttpClient _httpClient;

       private readonly ComplaintActions _compalintActions;

        public ComplaintActionService(WorkFlowCalls workFlowCalls, FGDBContext fgdbcontext,
            HttpClient httpClient, ComplaintActions complaintactions)
        {
            _workFlowCalls = workFlowCalls;
            _fgdbcontext = fgdbcontext;
            _httpClient = httpClient;
            _compalintActions = complaintactions;
        }
        [FunctionName("ComplaintAction")]
        public async Task<IActionResult> ComplaintAction(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                ComplaintAction complaint = Newtonsoft.Json.JsonConvert.DeserializeObject<ComplaintAction>(requestBody);
                SearchApiResponse desres = _workFlowCalls.SearchApiResponse(complaint.ServicereqId);
                _compalintActions.complaintaction(complaint, desres.ResponseOutput.responseBody.searchDetails.Select(x => x.emailID).FirstOrDefault());

                return new OkObjectResult(complaint);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult($"Error: {ex.Message}");
            }
        }

        [FunctionName("SendAction")]
        public async Task<IActionResult> SendAction(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                ComplaintAction complaint = Newtonsoft.Json.JsonConvert.DeserializeObject<ComplaintAction>(requestBody);
                SearchApiResponse desres = _workFlowCalls.SearchApiResponse(complaint.ServicereqId);
                EmailBL _EmailBL = new EmailBL();
                CommuConfg commuConfg=new CommuConfg();
                commuConfg.ReceipientTo = desres.ResponseOutput.responseBody.searchDetails.Select(x=>x.emailID).FirstOrDefault();
                commuConfg.ReceipientCC = complaint.CC;
                commuConfg.SenderEMail = complaint.ComplaintFrom;
                commuConfg.Subject =complaint.Subject;
                commuConfg.MailContent = complaint.content;
                _EmailBL.SendEmail(commuConfg);

                return new OkObjectResult(complaint);
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult($"Error: {ex.Message}");
            }
        }

    }
}
