using Azure;
using Azure.Storage.Blobs;
using FG_STModels.Models.LifeAsia;
using FG_STModels.Models.Masters;
using FG_STModels.Models.OmniDocs;
using Newtonsoft.Json;
using RestSharp;
using System.Data.Entity;

namespace FG_STModels.BL.OmniDoc
{
    public class OmniDocFunctions
    {
        public DMSLinks UploadFile(ref DMSLinks DMSLink, 
            Policy policyDetails,
            DbSet<AppMasters> appMasters) {
            OmniDocsReq omniDocsReq = new OmniDocsReq();
            try
            {
                string BLOB_CNTNR_NM = string.Empty;
                string BLOB_CONN_STR = string.Empty;
                string BLOB_HEADR_KEY = string.Empty;
                string BLOB_HEADR_VALUE = string.Empty;
                string DMS_URL = string.Empty;
                foreach (AppMasters blobConfig in appMasters.Where(x => x.MstCategory == "BLOB_CONN_STR" ||
                                        x.MstCategory == "BLOB_CNTNR_NM" ||
                                        x.MstCategory == "BLOB_HEADR_KEY" ||
                                        x.MstCategory == "BLOB_HEADR_VALUE" ||
                                        x.MstCategory == "DMS_URL"))
                {
                    switch (blobConfig.MstCategory.ToUpper().Trim())
                    {
                        case "BLOB_CONN_STR":
                            BLOB_CONN_STR = blobConfig.MstDesc;
                            break;
                        case "BLOB_CNTNR_NM":
                            BLOB_CNTNR_NM = blobConfig.MstDesc;
                            break;
                        case "BLOB_HEADR_KEY":
                            BLOB_HEADR_KEY = blobConfig.MstDesc;
                            break;
                        case "BLOB_HEADR_VALUE":
                            BLOB_HEADR_VALUE = blobConfig.MstDesc;
                            break;
                        case "DMS_URL":
                            DMS_URL = blobConfig.MstDesc;
                            break;
                        default:
                            break;
                    }
                }

                omniDocsReq.requestHeader = new()
                {
                    applicationNo = policyDetails.FG_ApplNo,
                    policyNo = policyDetails.LA_PolicyNo,
                    source = "POS",
                    dob = "06/06/1997" //does not have any impact
                };

                omniDocsReq.requestBody = new()
                {
                    userid = DMSLink.UserID,
                    indexName = DMSLink.IndexName,
                    documentName = DMSLink.DocumentName,
                    documentBytes = DMSLink.DocumentSize
                };

                var options = new RestClientOptions(DMS_URL)
                {
                    MaxTimeout = -1
                };
                //<_FunctionsSkipCleanOutput>true</_FunctionsSkipCleanOutput> add this to project file .csproj if you get error
                //Could not load file or assembly 'System.Text.Json, Version=7.0.0.0
                var client = new RestClient(options);
                var request = new RestRequest("/POSMicroservice/Generic/api/DMS/MoveToDMSFile", Method.Post);
                request.AddHeader(BLOB_HEADR_KEY, BLOB_HEADR_VALUE);
                request.AlwaysMultipartFormData = true;
                request.AddParameter("request", JsonConvert.SerializeObject(omniDocsReq));
                BlobClient blobClient = new BlobClient(BLOB_CONN_STR,
                    BLOB_CNTNR_NM,
                    string.Format("{0}{1}", DMSLink.FileLocation, DMSLink.BlobFileName));
                using (MemoryStream ms = new MemoryStream())
                {
                    blobClient.DownloadTo(ms);
                    request.AddFile("file", ms.ToArray(), DMSLink.BlobFileName);
                }
                RestResponse response = client.Execute(request);
                Console.WriteLine(response.Content);
                OmniDocsResp omniDocsResp = new OmniDocsResp();
                omniDocsResp = JsonConvert.DeserializeObject<OmniDocsResp>(response.Content);
                if (omniDocsResp.responseBody.documentIndex != 0)
                {
                    DMSLink.SentToDMS = omniDocsResp.responseHeader.issuccess;
                    DMSLink.SentToDMSOn = DateTime.Now;
                    try
                    {
                        //system will delete the file as it is no longer required.
                        blobClient.DeleteIfExists();
                    }
                    catch (RequestFailedException ex)
                    {
                        //Failed to delete the file.
                    }
                }
            }
            catch (RequestFailedException ex)
            {
                DMSLink.DMSRespStatus = String.Format("Blob Exception: {0}", ex.Message);
            }
            catch (Exception ex)
            {
                DMSLink.DMSRespStatus = ex.Message;
            }
            return DMSLink;
        }
    }
}
