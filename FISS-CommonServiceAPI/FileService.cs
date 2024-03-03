using System;
using System.IO;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace FISS_CommonServiceAPI
{
    public class FileService
    {
        //#region Blob Trigger
        //[FunctionName(nameof(BlobTriggerFunc))]
        //public void BlobTriggerFunc([BlobTrigger("projectfilesstorage/{name}", Connection = "AzureBlobConnectionString")] Stream myBlob, string name, ILogger log)
        //{
        //    log.LogInformation($"C# Blob trigger function Processed blob\n Name:{name} \n Size: {myBlob.Length} Bytes");
        //}
        //#endregion

        #region Upload Blob
        [FunctionName(nameof(InsertBlob))]
        public static async Task<IActionResult> InsertBlob(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req, ILogger log)
        {
            try
            {
                string Connection = Environment.GetEnvironmentVariable("AzureBlobConnectionString");
                string containerName = "projectfilesstorage";
                Stream myBlob = new MemoryStream();
                var file = req.Form.Files["File"];
                myBlob = file.OpenReadStream();
                var blobClient = new BlobContainerClient(Connection, containerName);
                var blob = blobClient.GetBlobClient(file.FileName);
                await blob.UploadAsync(myBlob, overwrite: true);
                var url = blob.Uri;
                return new OkObjectResult(url);
            }
            catch (Exception ex)
            {
                return new OkObjectResult(ex.Message);
            }
        }
        #endregion
    }
}
