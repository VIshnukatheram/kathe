using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using FISS_ServiceRequestAPI.Services;
using FG_STModels.BL.Service;
using FG_STModels.Models.FISS;
using FG_STModels.Models.Comms;

namespace FISS_ServiceRequestAPI
{
    public class ExcelFileUploadAPI
    {
        private readonly WorkFlowCalls _workFlowCalls;
        private readonly ExcelFileService _excelFileService;
        public ExcelFileUploadAPI(WorkFlowCalls workFlowCalls,ExcelFileService excelFileService)
        {
            _workFlowCalls = workFlowCalls;
            _excelFileService = excelFileService;
        }
        [FunctionName(nameof(UploadExcelFileAPI))]
        public IActionResult UploadExcelFileAPI(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            try
            {
                var excelFile = req.Form.Files[0];
                string requestType = req.Query["reqtype"];

                // For Finance File Upload Transection PayeeCode
                if (requestType == "PayeeCodeTransection")
                {
                    var allRecords = _excelFileService.GetListOfExcelRecords<PayeeTransaction>(excelFile);
                    _workFlowCalls.InsertListOfPayeeCodeAuthorization(allRecords);
                }
                // For Finance File Upload Cheque Status
                else if (requestType == "ChequeStatus")
                {
                    var allRecords = _excelFileService.GetListOfExcelRecords<ChequeStatus>(excelFile);
                    _workFlowCalls.InsertListOfCheckStatus(allRecords);
                } else if(requestType == "T-10" || requestType == "T-15" || requestType == "T-30" || requestType == "T-60" || requestType == "T-90")
                {
                    var allRecords = _excelFileService.GetListOfExcelRecords<InterestCommunication>(excelFile);
                    _workFlowCalls.InsertListOfInterestCommunication(allRecords);
                }

                return new OkObjectResult("Upload and processing successful");
            }
            catch (Exception ex)
            {
                log.LogError($"Error processing Excel data: {ex.Message}");
                return new BadRequestObjectResult("Error processing Excel data");
            }
        }
    }
}