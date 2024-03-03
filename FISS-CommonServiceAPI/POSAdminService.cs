using FG_STModels.BL.EMail;
using FG_STModels.Models.Comms;
using FG_STModels.Models.EMailMgmt;
using FISS_CommonServiceAPI.Models.DB;
using FISS_CommonServiceAPI.Models.POSAdmin;
using FISS_CommonServiceAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace FISS_CommonServiceAPI
{
    public class POSAdminService
    {
        private readonly WorkFlowCalls _workFlowCalls;
        public POSAdminService(WorkFlowCalls workFlowCalls)
        {
            _workFlowCalls = workFlowCalls;
        }
        [FunctionName(nameof(GetSerReqStatus))]
        public IActionResult GetSerReqStatus(
            [HttpTrigger(AuthorizationLevel.Function, "Get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            string Roleid = req.Query["Roleid"];
            POSAdmin PosAdmin =new POSAdmin();
            //List<SerReqStatus> serReqStatuses = new List<SerReqStatus>();
            SerReqStatus serReqStatus= new SerReqStatus();
            var status =  _workFlowCalls.GetSerReq();
            log.LogInformation("GetSerReqStatus Start");
            foreach (var SerReqstatus in status)
            {
                if (SerReqstatus.Status=="OPEN")
                {
                    serReqStatus.New_Request = SerReqstatus.Count;
                }
                else if(SerReqstatus.Status == "CLOSED")
                {
                    serReqStatus.Resloved = SerReqstatus.Count;
                }
                else if (SerReqstatus.Status == "PENDING")
                {
                    serReqStatus.Pending = SerReqstatus.Count;
                }
                else if (SerReqstatus.Status == "REJECT")
                {
                    serReqStatus.Escalated = SerReqstatus.Count;
                }
            }
            log.LogInformation("GetSerReqStatus End");
            log.LogInformation("GetPOSUsers start");
            var POSAdminRoles = _workFlowCalls.GetPOSUsers(Roleid);
            log.LogInformation("GetPOSUsers End");
            PosAdmin.serReqStatus= serReqStatus;
            PosAdmin.PosAdminRoles = POSAdminRoles;
            log.LogInformation("Assigned To user for service request is Ended");

            return new OkObjectResult(PosAdmin);
        }
        [FunctionName(nameof(GetSerReqByFilters))]
        public IActionResult GetSerReqByFilters(
            [HttpTrigger(AuthorizationLevel.Function, "Get", Route = null)] HttpRequest req,
            ILogger log)
        {
            List<dynamic> filters = new List<dynamic>();
            try
            {
                log.LogInformation("C# HTTP trigger function processed a request.");
                string Calltype = req.Query["Calltype"];
                string Subtype = req.Query["Subtype"];
                string Status = req.Query["Status"];
                string PayOutValue = req.Query["PayOutValue"];
                string ClientId = req.Query["ClientId"];
                string UserID = req.Query["UserID"];
                log.LogInformation("SerReqByFilters Started");
                if (Calltype != "0" || Subtype != "0" || Status != "0")
                {
                    var SerReqByFilters = _workFlowCalls.PosAdminSerReqFilters(Convert.ToInt32(Calltype), Convert.ToInt32(Subtype), Convert.ToInt32(Status), Convert.ToInt32(PayOutValue), Convert.ToInt32(ClientId), UserID);
                    log.LogInformation("SerReqByFilters End" + SerReqByFilters);
                    return new OkObjectResult(SerReqByFilters);
                }
                else
                {
                  return new OkObjectResult(filters);
                }
            }
            catch(Exception ex)
            {
                log.LogError(ex.Message);
                return new OkObjectResult(filters);
            }
        }
        [FunctionName(nameof(GetPOSExecRoles))]
        public IActionResult GetPOSExecRoles(
           [HttpTrigger(AuthorizationLevel.Function, "Get", Route = null)] HttpRequest req,
           ILogger log)
        {
          
            try
            {
                log.LogInformation("C# HTTP trigger function processed a request.");
                string Roleid = req.Query["Roleid"];
                var POSAdminRoles = _workFlowCalls.GetPOSUsers(Roleid);
                log.LogInformation("Assigned To user for service request is Ended");

                return new OkObjectResult(POSAdminRoles);
            }
            catch (Exception ex)
            {
                return new OkObjectResult(ex.Message);
            }
        }
        [FunctionName(nameof(GetIndividualPOSExecRole))]
        public IActionResult GetIndividualPOSExecRole(
           [HttpTrigger(AuthorizationLevel.Function, "Get", Route = null)] HttpRequest req,
           ILogger log)
        {
            try
            {
                string Usrid = req.Query["Usrid"];
                log.LogInformation("C# HTTP trigger function processed a request.");
                var POSAdminRoles = _workFlowCalls.GetIndividualPOSUser(Usrid);
                log.LogInformation("Assigned To user for service request is Ended");
                return new OkObjectResult(POSAdminRoles);
            }
            catch (Exception ex)
            {
                return new OkObjectResult(ex.Message);
            }
        }

        [FunctionName(nameof(AssignToPOS))]
        public async Task<IActionResult> AssignToPOS(
           [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
           ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            string requestBody;
            
            try
            {
                 requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                 List<AssignToPOS> pOSASSIGN = JsonConvert.DeserializeObject<List<AssignToPOS>>(requestBody);
                var AssignToPOS  =  _workFlowCalls.SaveAssignPOS(pOSASSIGN);

                return new OkObjectResult(AssignToPOS);
            }
            catch(Exception EX)
            {
                return new OkObjectResult(EX.Message);
            }
        }

        [FunctionName(nameof(GetNomineeRelation))]
        public async Task<IActionResult> GetNomineeRelation(
           [HttpTrigger(AuthorizationLevel.Function, "Get", Route = null)] HttpRequest req,
           ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            string requestBody;

            try
            {
                requestBody = await new StreamReader(req.Body).ReadToEndAsync();

                var nomineeRelations = _workFlowCalls.nomineeRelations();

                return new OkObjectResult(nomineeRelations);
            }
            catch (Exception EX)
            {
                return new OkObjectResult(EX.Message);
            }
        }

        //[FunctionName(nameof(GetEmailResponse))]
        //public async Task<IActionResult> GetEmailResponse(
        //  [HttpTrigger(AuthorizationLevel.Function, "Get", Route = null)] HttpRequest req,
        //  ILogger log)
        //{
        //    log.LogInformation("C# HTTP trigger function processed a request.");
        //    string requestBody;

        //    try
        //    {
        //        string EmailSource = req.Query["EmailSource"];
        //        string AssignTO = req.Query["AssignTO"];
        //        string nlprs = req.Query["nlprs"];
        //        string fromdate = req.Query["fromdate"];
        //        string todate = req.Query["todate"];
         //       var response = _workFlowCalls.req(Convert.ToInt32(EmailSource), Convert.ToBoolean(nlprs),Convert.ToDateTime(fromdate),Convert.ToDateTime(todate));


        //        return new OkObjectResult(response);
        //    }
        //    catch (Exception EX)
        //    {
        //        return new OkObjectResult(EX.Message);  
        //    }
        //}
        [FunctionName(nameof(GetEmailResponse))]
        public async Task<IActionResult> GetEmailResponse(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log) 
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            SearchResponse searchResponse= new SearchResponse();
            string requestBody;
            try
            {
                requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                SearchEmail _SearchEmail = JsonConvert.DeserializeObject<SearchEmail>(requestBody);
                searchResponse = _workFlowCalls.FilterMails(_SearchEmail);
                return new OkObjectResult(searchResponse);
            }
            catch (Exception EX)
            {
                return new OkObjectResult(EX.Message);
            }
        }
        [FunctionName(nameof(GetEmailResponseDtls))]
        public async Task<IActionResult> GetEmailResponseDtls(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");
            SearchResponse searchResponse = new SearchResponse();
            string requestBody;
            try
            {
                requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                SearchEmail _SearchEmail = JsonConvert.DeserializeObject<SearchEmail>(requestBody);
                searchResponse = _workFlowCalls.FilterMails(_SearchEmail);
                return new OkObjectResult(searchResponse);
            }
            catch (Exception EX)
            {
                return new OkObjectResult(EX.Message);
            }
        }
        [FunctionName(nameof(SendEmailSMTP))]
        public async Task<IActionResult> SendEmailSMTP(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            EmailBL _EmailBL = new EmailBL();
            log.LogInformation("C# HTTP trigger function processed a request.");
            string requestBody;
            try
            {
                requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                CommuConfg _CommuConfg = JsonConvert.DeserializeObject<CommuConfg>(requestBody);
                _CommuConfg.SendStatus = _EmailBL.SendEmail(_CommuConfg);
                return new OkObjectResult(_CommuConfg);
            }
            catch (Exception EX)
            {
                return new OkObjectResult(EX.Message);
            }
        }
        [FunctionName(nameof(GetCKYCDetails))]
        public async Task<IActionResult> GetCKYCDetails(
          [HttpTrigger(AuthorizationLevel.Function, "Get", Route = null)] HttpRequest req,
          ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");


            try
            {
                //requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                long customerId = long.TryParse(req.Query["customerId"], out long parsedCustomerId) ? parsedCustomerId : 0;


                var cKYCDetails = _workFlowCalls.GetCkycDetails(customerId);

                return new OkObjectResult(cKYCDetails);
            }
            catch (Exception EX)
            {
                return new OkObjectResult(EX.Message);
            }
        }
    }
}