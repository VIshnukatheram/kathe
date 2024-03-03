using FISS.PremiumPaidCertificate.Models.DB;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FISS.PremiumPaidCertificate.Models.Shared;
using FISS.PremiumPaidCertificate.Models.PPCModels;
using System.Data;
using System.Dynamic;
using System.Xml.Linq;
using System.Reflection;
using Microsoft.Reporting.NETCore;

using Azure.Storage.Blobs;
using System.Collections;
using System.Xml.Serialization;
using System.Data.Entity.Migrations;
using System.Globalization;

namespace FISS.PremiumPaidCertificate
{
    public class ServiceRequest
    {
        private readonly HttpService _httpService;
        private readonly PPCDBContext _gdbContext;
        private readonly CommonService _commonService;
        public string uniquServiceRequest;
        public ServiceRequest(PPCDBContext fGDBContext
            , CommonService commonService
           , HttpService httpService
            )
        {
            _httpService = httpService;
            _gdbContext = fGDBContext;
            _commonService = commonService;
      
        }
        public LA_Policy GetPolicy(string policyName)
        {
            return _gdbContext.LA_Policy.Where(x => x.LA_PolicyNo == policyName).FirstOrDefault();
        }
        public async Task<IActionResult> CreateServiceRequest(PPCService reqBody)
          {
            try
            {
                uniquServiceRequest = _commonService.GetUniqueServiceRequestId();
                var policy = GetPolicy(reqBody.PolicyNo.ToString());
                LA_Policy policyDetails = new()
                {
                    LA_PolicyNo = reqBody.PolicyNo.ToString(),
                    FG_ApplNo = reqBody.ApplicationNo,
                };
                if (policy == null)
                {
                    _gdbContext.LA_Policy.Add(policyDetails);
                    _gdbContext.SaveChanges();

                }
                PPCServiceRequest PPCREQUEST = new()
                {
                    SrvReqID = 0,
                    SrvReqRefNo = uniquServiceRequest,
                    Category = 1,
                    CallType = reqBody.CallType,
                    SubType = reqBody.SubType,
                    ReqSource = reqBody.RequestSource,
                    ReqMode = reqBody.RequestMode,
                    PolicyRef = policy == null ? policyDetails.PolicyRef : policy.PolicyRef,
                    CustomerRef = reqBody.CustomerId,
                    CustRole = reqBody.CustRole,
                    BranchRef = reqBody.BranchId,
                    CurrentStatus = TicketStatus.OPEN.ToString(),
                    CreatedOn = DateTime.Now,
                    CreatedByRef = reqBody.CreatedByRef,
                    ModifiedOn = DateTime.Now,
                    ModifiedByRef = reqBody.ModifiedByRef
                };

                _gdbContext.ServRequest.Add(PPCREQUEST);
                _gdbContext.SaveChanges();
                var comm =  CommunicationResponses(reqBody, "OPEN", reqBody.CallType, reqBody.SubType,"");
                return new OkObjectResult(uniquServiceRequest);

            }
            catch (Exception ex)
            {             
                return new OkObjectResult(ex.Message);
            }

        }

        public async Task<IActionResult> GetPPCData(PPCService data,ILogger logger)
        {
            try
            {
                string PPCApiUrl = _commonService._apiUrls.LAURLS.PPCApi;

                var ServiceRequestDetails = _gdbContext.ServRequest.Where(x => x.SrvReqRefNo.ToString() == uniquServiceRequest).SingleOrDefault();
                PPCRequest pPCRequest = new PPCRequest()
                {
                    requestHeader = new PPCRequestHeader()
                    {
                        source = ServiceRequestDetails.Source,
                        carrierCode = "2",
                        branch = data.BranchId.ToString(),
                        userId = "website",
                        userRole = data.CustRole.ToString(),
                        monthEndExtension = "N",
                        meDate = DateTime.Now,
                    },
                    requestBody = new PPCRequestBody()
                    {
                        policyNo = "00013374",
                        year = data.Year,
                    }
                };
                var PPCResponse = await _httpService.HttpPostCall<PPCRequest, List<FGPPCApiResponse>>(pPCRequest, PPCApiUrl);

                if (PPCResponse.responseHeader.issuccess == true)
                {
                    var PPCcomm = CommunicationResponses(data, "PPC", data.CallType, data.SubType, "");
                    if (PPCcomm != null)
                    {
                        ServiceRequestDetails.CurrentStatus = TicketStatus.CLOSED.ToString();
                        _gdbContext.ServRequest.AddOrUpdate(ServiceRequestDetails);
                        _gdbContext.SaveChanges();
                        var communication = CommunicationResponses(data, "CLOSED", data.CallType, data.SubType, "");
                        if (communication != null)
                        {
                            return new OkObjectResult(uniquServiceRequest);
                        }
                    }
                    else
                    {
                        return new OkObjectResult(uniquServiceRequest);
                    }
                    ////var comm = CommunicationResponses(data, "CLOSED", data.CallType, data.SubType, "");
                    //var xmlDocument = Encoding.UTF8.GetString(Convert.FromBase64String(PPCResponse.responseBody.bytes));
                    //XDocument doc = XDocument.Parse(xmlDocument);
                    //var serializer = new XmlSerializer(typeof(PremiumCertificate));
                    //var model =
                    //    from xml in doc.Descendants("Premium_Certificate")
                    //    select serializer.Deserialize(xml.CreateReader()) as PremiumCertificate;

                    //List<Policy> policy = new List<Policy>();
                    //List<NameAddress> name = new List<NameAddress>();
                    //NameAddress nameAddress = new NameAddress();
                    //Policy p = new Policy();
                    //foreach (var premiumCertificate in model)
                    //{

                    //    nameAddress.Salutation = "MR";
                    //    nameAddress.CustomerName = premiumCertificate.OwnerNumber;
                    //    nameAddress.Address = premiumCertificate.Address1 + "" + premiumCertificate.Address2 + "" + premiumCertificate.Address3;
                    //    nameAddress.State = premiumCertificate.Address5;
                    //    nameAddress.Contact = premiumCertificate.OwnerMobileNo;
                    //    nameAddress.Financial_Year= data.Year.ToString();
                    //    name.Add(nameAddress);

                    //    p.PolicyNumber = Convert.ToDouble(premiumCertificate.PolicyDetails.PolicyNo);
                    //    p.PlanName = premiumCertificate.PolicyDetails.BenefitDetails.CoverageDescription;
                    //    TaxRelief taxRelief80C = premiumCertificate.TaxReliefs.FirstOrDefault(x => x.TaxSection == "80C");
                    //    if (taxRelief80C != null)
                    //    {
                    //        p.PremiumRecd = Convert.ToDouble(premiumCertificate.TaxReliefs.FirstOrDefault(X => X.TaxSection == "80C").TaxAmount.ToString());
                    //    }
                    //    else
                    //    {
                    //        p.PremiumRecd = 0.00;
                    //    }
                    //    TaxRelief taxRelief80D = premiumCertificate.TaxReliefs.FirstOrDefault(x => x.TaxSection == "80D");
                    //    if (taxRelief80D != null)
                    //    {
                    //        p.PremiumRider = Convert.ToDouble(premiumCertificate.TaxReliefs.FirstOrDefault(X => X.TaxSection == "80D").TaxAmount.ToString());
                    //    }
                    //    else
                    //    {
                    //        p.PremiumRider = 0.00;
                    //    }
                    //    p.TotalPrem = Convert.ToDouble(premiumCertificate.PolicyDetails.BenefitDetails.CoveragePremium);
                    //    p.Mode = premiumCertificate.PolicyDetails.PremiumMode;
                    //    p.NextDueDate = DateTime.ParseExact(premiumCertificate.PolicyDetails.NextDueDate, "dd/mm/yyyy", CultureInfo.InvariantCulture);
                    //    //Convert.ToDateTime(premiumCertificate.PolicyDetails.NextDueDate);
                    //    policy.Add(p);
                    //}

                    //var CustomerDetails = ConvertToDataTable(name);
                    //var PolicyDetails = ConvertToDataTable(policy);

                    //string rdlCoIFile1 = String.Format("{0}{1}", Path.GetDirectoryName(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location)), "\\RDL\\PPC1.rdl");
                    //logger.LogInformation("File :" + rdlCoIFile1);
                    //Stream reportDefinition;
                    //string reportName = data.PolicyNo.ToString();
                    //using (var fs = new FileStream(rdlCoIFile1, FileMode.Open))
                    //{
                    //    reportDefinition = fs;
                    //    LocalReport report1 = new LocalReport();
                    //    report1.LoadReportDefinition(reportDefinition);
                    //    report1.DataSources.Add(new ReportDataSource("CustomerDetails", CustomerDetails));
                    //    report1.DataSources.Add(new ReportDataSource("PolicyDetails", PolicyDetails));
                    //    logger.LogInformation("started pdf generation");
                    //    byte[] pdf = report1.Render("PDF");
                    //    logger.LogInformation("end pdf generation");
                    //    string Connection = _commonService._apiUrls.CommonURLS.BlobConnectionString;
                    //    logger.LogInformation("conncetion :"+ Connection);
                    //    //"DefaultEndpointsProtocol=https;AccountName=futuregeneralistoreage;AccountKey=5LlrTqKWPGnHT8fErvYufHelZ1Vm0D0epcdGGdnziosq4y/nAcDpGP9QtYwxZgvGSFsRgCgHLr9a+AStnUgThg==;EndpointSuffix=core.windows.net";
                    //    string containerName = _commonService._apiUrls.CommonURLS.containerName;
                    //    logger.LogInformation("containerName :"+ containerName);
                    //    //"filesstorage";
                    //    Stream stream = new MemoryStream(pdf);
                    //    var blobClient = new BlobContainerClient(Connection, containerName);
                    //    var blob = blobClient.GetBlobClient("" + reportName.ToString() + "-" + uniquServiceRequest + ".pdf");
                    //    await blob.UploadAsync(stream, overwrite: true);
                    //    string url = blob.Uri.ToString();
                    //    if (url != null)
                    //    {

                    //    }

                    //}

                }
                return new OkObjectResult(uniquServiceRequest);
            }
            catch (Exception ex)
            {
                return new OkObjectResult("Internal server Error");
            }
        }

        public async Task<IActionResult> CommunicationResponses(PPCService data,string TemplateDesc,int CallType,int SubType,string CommBody)
        {
            List<CommunicationResponse> communicationResponse = null;


                    
                    for (int i = 0; i<data.CommunicationRequest.Count; i++)
                    {
                        int commtype = data.CommunicationRequest[i].CommType;
                        var TemplateDetails = _gdbContext.commuConfigs.SingleOrDefault(x => x.CommType == commtype && x.TemplateDesc == TemplateDesc);
                        if (data.CommunicationRequest[i].CommType == 2)
                        {
                     
                         if (TemplateDesc == "PPC" && commtype==2)
                         {
                       
                        object tempContent = JsonConvert.DeserializeObject(TemplateDetails.MailContent) ?? "";
                        data.CommunicationRequest[i].CommBody = string.Format(tempContent.ToString(), CommBody, data.PolicyNo, data.Year,data.CustomerName);
                         }
                         
                         else if(TemplateDesc=="OPEN" && commtype == 2)
                         {
                          object tempContent = JsonConvert.DeserializeObject(TemplateDetails.MailContent) ?? "";
                        data.CommunicationRequest[i].CommBody =string.Format(tempContent.ToString(),"Premium Paid Certificate", uniquServiceRequest, TemplateDetails.TAT, data.CreatedOn.ToString("dd/mm/yyyy"));
                          }
                   
                    else if (TemplateDesc == "CLOSED" && commtype == 2)
                    {
                        object tempContent = JsonConvert.DeserializeObject(TemplateDetails.MailContent) ?? "";
                        data.CommunicationRequest[i].CommBody = string.Format(tempContent.ToString(), TemplateDesc,"1256","5863");
                    }
                   
                    data.CommunicationRequest[i].SrvReqRefNo = uniquServiceRequest;

                            data.CommunicationRequest[i].TemplateID = TemplateDetails.TemplateID.ToString();
                     }
                     else if (data.CommunicationRequest[i].CommType == 1)
                    {
                     if (TemplateDesc == "PPC" && commtype == 1)
                    {
                        object tempContent = JsonConvert.DeserializeObject(TemplateDetails.MailContent) ?? "";
                        data.CommunicationRequest[i].CommBody = string.Format(tempContent.ToString(), "", uniquServiceRequest, "Premium Paid Certificate", data.PolicyNo, CommBody);
                    }
                    else if (TemplateDesc == "OPEN" && commtype == 1)
                    {
                        object tempContent = JsonConvert.DeserializeObject(TemplateDetails.MailContent) ?? "";
                        data.CommunicationRequest[i].CommBody = string.Format(tempContent.ToString(), uniquServiceRequest, "Premium Paid Certificate", data.PolicyNo, TemplateDetails.TAT);
                    }
                    else if (TemplateDesc == "CLOSED" && commtype == 1)
                    {
                        object tempContent = JsonConvert.DeserializeObject(TemplateDetails.MailContent) ?? "";
                        data.CommunicationRequest[i].CommBody = string.Format(tempContent.ToString(), "", uniquServiceRequest, data.PolicyNo);
                    }
                       data.CommunicationRequest[i].SrvReqRefNo = uniquServiceRequest;

                       data.CommunicationRequest[i].TemplateID = TemplateDetails.TemplateID.ToString();
                     }

                    }
                    string communicationURL = _commonService._apiUrls.CommonURLS.Email;
                    communicationResponse = await _httpService.HttpCommPostCall<List<CommunicationRequest>, List<CommunicationResponse>>(data.CommunicationRequest, communicationURL);
                    if (communicationResponse != null)
                     {
                       return new OkObjectResult(communicationResponse);
                     }
                     else
                     {
                      return new OkObjectResult(communicationResponse);
                     }

        }
        public static DataTable ConvertToDataTable<T>(IEnumerable<T> data)
        {
            DataTable dataTable = new DataTable();

            // Get the properties of the model class
            PropertyInfo[] properties = typeof(T).GetProperties();

            // Create columns in the DataTable for each property of the model
            foreach (PropertyInfo property in properties)
            {
                dataTable.Columns.Add(property.Name, Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType);
            }

            // Add rows to the DataTable with values from the model
            foreach (T item in data)
            {
                DataRow row = dataTable.NewRow();

                foreach (PropertyInfo property in properties)
                {
                    row[property.Name] = property.GetValue(item) ?? DBNull.Value;
                }

                dataTable.Rows.Add(row);
            }

            return dataTable;
        }
    }  
}
