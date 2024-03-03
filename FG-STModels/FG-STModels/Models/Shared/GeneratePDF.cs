using Azure.Storage.Blobs;
using FG_STModels.Data;
using FG_STModels.Misc;
using FG_STModels.Models.LifeAsia;
using FG_STModels.Models.Masters;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using SelectPdf;
using System.Collections.Concurrent;
using System.Data.Entity;
using System.Reflection;
using System.Text;

namespace FG_STModels.Models.Shared
{
    public class BodyContent
    {
        public string HtmlFileName { get; set; }
        public string ApplicationNo { get; set; }
        public ConcurrentDictionary<string, string> Header = new ConcurrentDictionary<string, string>();
        public List<Policy> policies = new List<Policy>();
        public List<Fund> Funds = new List<Fund>();
        public string Width;
        public string Height;
        //public MarginSettings Margins;
        public int? DPI = 180;
        public string blobFileName = string.Empty;
        public string DocumentType { get; set; }
    }
    public class PDFResponse
    {
        public BodyContent PdfBody { get; }
        public string PdfURL { get; }
        public bool PdfGenerationStatus { get; } = false;
        public PDFResponse(BodyContent _BodyContent, string _PDFUrl, bool _pdfGenerationStatus)
        {
            PdfBody = _BodyContent;
            PdfURL = _PDFUrl;
            PdfGenerationStatus = _pdfGenerationStatus;
        }
    }
    public class GenerateContent
    {
        ILogger _log;
        // Read more about converter on: https://github.com/rdvojmoc/DinkToPdf
        // For our purposes we are going to use SynchronizedConverter
        //IPdfConverter pdfConverter = new SynchronizedConverter(new PdfTools());
        private readonly string RootFolder = Path.GetDirectoryName(Assembly.GetCallingAssembly().Location);
        private readonly FGDBContext _gdbContext;
        private string BLOB_CNTNR_NM = string.Empty;
        private string BLOB_CONN_STR = string.Empty;
        private string ConnectionString;
        public GenerateContent(ILogger log, IConfiguration _configuration, HttpRequest request)
        {
            _log = log;
            ConnectionString = _configuration.GetConnectionString("DefaultConnection");
        }
        public string HTMLContent(BodyContent pdfBody)
        {
            string strGenerateHTMLContent = string.Empty;
            string strTemplateContent = string.Empty;
            string _HtmlDisplayFormat  = string.Empty;
            StringBuilder strNodeBuilder = new StringBuilder();
            StringBuilder strUnitTransBuilder = new StringBuilder();
            try
            {
                HtmlDocument doc = new HtmlDocument();
                doc.LoadHtml(File.ReadAllText(Path.Combine(RootFolder.Remove(RootFolder.Length - 4), "Template/HTML/", pdfBody.HtmlFileName).Replace("\\", "/")));
                #region PopulateTables
                try
                {
                    foreach (HtmlNode hncNodes in doc.DocumentNode.SelectNodes("//tbody"))
                    {
                        if (new string[] { "POLICY", "FUND" }.Contains(hncNodes.GetAttributeValue("level", "Not Available")))
                        {
                            try
                            {
                                strNodeBuilder.Clear();
                                switch (hncNodes.GetAttributeValue("level", "Not Available"))
                                {
                                    case "POLICY":
                                        HtmlNode PolicyNode = HtmlNode.CreateNode("<body></body>");
                                        foreach (var policy in pdfBody.policies)
                                        {
                                            PolicyNode.CopyFrom(hncNodes, true);
                                            foreach (var policyProp in policy.GetType().GetRuntimeProperties())
                                            {
                                                try
                                                {
                                                    //get datatype of the property
                                                    _HtmlDisplayFormat = string.Empty;
                                                    try
                                                    {
                                                        if (policy.GetType().GetProperty(policyProp.Name).
                                                            GetCustomAttribute(typeof(HtmlDisplayFormat)) != null)
                                                        {
                                                            _HtmlDisplayFormat = ((HtmlDisplayFormat)policy.GetType().GetProperty(policyProp.Name).
                                                                GetCustomAttribute(typeof(HtmlDisplayFormat))).DisplayFormat;
                                                        }
                                                    }
                                                    catch (ArgumentException argx)
                                                    {
                                                    }
                                                    if (_HtmlDisplayFormat.Equals(string.Empty))
                                                    {
                                                        try
                                                        {
                                                            PolicyNode.InnerHtml = PolicyNode.InnerHtml.Replace(string.Format("[{0}]", policyProp.Name),
                                                            policy.GetType().GetProperty(policyProp.Name).GetValue(policy).ToString());
                                                        }
                                                        catch (NullReferenceException nre) { }
                                                    }
                                                    else
                                                    {
                                                        try
                                                        {
                                                            if (policy.GetType().GetProperty(policyProp.Name).GetValue(policy) is DateTime)
                                                            {
                                                                if (policy.GetType().GetProperty(policyProp.Name).GetValue(policy).Equals(DateTime.Parse("01-01-0001 00:00:00")))
                                                                {
                                                                    PolicyNode.InnerHtml = PolicyNode.InnerHtml.Replace(string.Format("[{0}]", policyProp.Name), "NA");
                                                                }
                                                                else {
                                                                    PolicyNode.InnerHtml = PolicyNode.InnerHtml.Replace(string.Format("[{0}]", policyProp.Name),
                                                                        DateTime.Parse(policy.GetType().GetProperty(policyProp.Name).GetValue(policy).ToString())
                                                                        .ToString(_HtmlDisplayFormat));
                                                                }
                                                            }
                                                        }
                                                        catch (FormatException fe) { }
                                                        catch (NullReferenceException nre) { }
                                                        catch (ArgumentNullException ane) { }
                                                        catch (Exception) { }
                                                    }
                                                }
                                                catch (NullReferenceException nre)
                                                {
                                                    //property not available
                                                }
                                                catch (ArgumentException argx)
                                                {
                                                    //could not replace value
                                                }
                                            }
                                            strNodeBuilder.AppendLine(PolicyNode.InnerHtml);
                                        }
                                        break;
                                    case "FUND":
                                        foreach (Fund fund in pdfBody.Funds)
                                        {
                                            HtmlNode FundNode = HtmlNode.CreateNode("<body></body>");
                                            FundNode.CopyFrom(hncNodes, true);
                                            foreach (var fundProp in fund.GetType().GetRuntimeProperties())
                                            {
                                                try
                                                {
                                                    if (fund.GetType().GetProperty(fundProp.Name).GetValue(fund) != null)
                                                    {
                                                        _HtmlDisplayFormat = string.Empty;
                                                        try
                                                        {
                                                            if (fund.GetType().GetProperty(fundProp.Name).
                                                                GetCustomAttribute(typeof(HtmlDisplayFormat)) != null)
                                                            {
                                                                _HtmlDisplayFormat = ((HtmlDisplayFormat)fund.GetType().GetProperty(fundProp.Name).
                                                                    GetCustomAttribute(typeof(HtmlDisplayFormat))).DisplayFormat;
                                                            }
                                                        }
                                                        catch (ArgumentException argx)
                                                        {
                                                            //Custom Attribute not applicable
                                                        }

                                                        if (_HtmlDisplayFormat.Equals(string.Empty))
                                                        {
                                                            try
                                                            {
                                                                FundNode.InnerHtml = FundNode.InnerHtml.Replace(string.Format("[{0}]", fundProp.Name),
                                                                fund.GetType().GetProperty(fundProp.Name).GetValue(fund).ToString());
                                                            }
                                                            catch (NullReferenceException nre) { }
                                                        }
                                                        else
                                                        {
                                                            try
                                                            {
                                                                FundNode.InnerHtml = FundNode.InnerHtml.Replace(string.Format("[{0}]", fundProp.Name),
                                                                DateTime.Parse(fund.GetType().GetProperty(fundProp.Name).GetValue(fund).ToString())
                                                                    .ToString(_HtmlDisplayFormat));
                                                            }
                                                            catch (FormatException fe) { }
                                                            catch (NullReferenceException nre) { }
                                                            catch (ArgumentNullException ane) { }
                                                            catch (Exception) { }
                                                        }
                                                    }
                                                }
                                                catch (NullReferenceException nre)
                                                {
                                                    //property not available
                                                }
                                                catch (ArgumentException argx)
                                                {
                                                    //could not replace value
                                                }
                                            }
                                            foreach (HtmlNode untrnsNode in FundNode.SelectNodes("//tbody"))
                                            {
                                                if (new string[] { "UNIT_TRANS" }.Contains(untrnsNode.GetAttributeValue("level", "Not Available")))
                                                {
                                                    strUnitTransBuilder.Clear();
                                                    foreach (UnitTransaction unitTransaction in fund.unitTransaction)
                                                    {
                                                        HtmlNode tempUnitTrnsNode = HtmlNode.CreateNode("<body></body>");
                                                        tempUnitTrnsNode.CopyFrom(untrnsNode, true);
                                                        foreach (var unitTransactionProp in unitTransaction.GetType().GetRuntimeProperties())
                                                        {
                                                            try
                                                            {
                                                                if (unitTransaction.GetType().GetProperty(unitTransactionProp.Name).GetValue(unitTransaction) != null)
                                                                {
                                                                    _HtmlDisplayFormat = string.Empty;
                                                                    try
                                                                    {
                                                                        if (unitTransaction.GetType().GetProperty(unitTransactionProp.Name).
                                                                            GetCustomAttribute(typeof(HtmlDisplayFormat)) != null)
                                                                        {
                                                                            _HtmlDisplayFormat = ((HtmlDisplayFormat)unitTransaction.GetType().GetProperty(unitTransactionProp.Name).
                                                                                GetCustomAttribute(typeof(HtmlDisplayFormat))).DisplayFormat;
                                                                        }
                                                                    }
                                                                    catch (ArgumentException argx)
                                                                    {
                                                                        //Custom Attribute not applicable
                                                                    }
                                                                    if (_HtmlDisplayFormat.Equals(string.Empty))
                                                                    {
                                                                        tempUnitTrnsNode.InnerHtml = tempUnitTrnsNode.InnerHtml.Replace(string.Format("[{0}]", unitTransactionProp.Name),
                                                                            unitTransaction.GetType().GetProperty(unitTransactionProp.Name).GetValue(unitTransaction).ToString());
                                                                    }
                                                                    else
                                                                    {
                                                                        try
                                                                        {
                                                                            tempUnitTrnsNode.InnerHtml = tempUnitTrnsNode.InnerHtml.Replace(string.Format("[{0}]", unitTransactionProp.Name),
                                                                            DateTime.Parse(unitTransaction.GetType().GetProperty(unitTransactionProp.Name).GetValue(unitTransaction).ToString())
                                                                                .ToString(_HtmlDisplayFormat));
                                                                        }
                                                                        catch (FormatException fe) { }
                                                                        catch (ArgumentNullException ane) { }
                                                                        catch (Exception) { }
                                                                    }
                                                                }
                                                            }
                                                            catch (NullReferenceException nre)
                                                            {
                                                                //property not available
                                                            }
                                                            catch (ArgumentException argx)
                                                            {
                                                                //could not replace value
                                                            }
                                                        }
                                                        strUnitTransBuilder.AppendLine(tempUnitTrnsNode.InnerHtml);
                                                    }
                                                    untrnsNode.InnerHtml = strUnitTransBuilder.ToString();
                                                }
                                            }
                                            strNodeBuilder.AppendLine(FundNode.InnerHtml);
                                        }
                                        break;
                                    default:
                                        break;
                                }
                                hncNodes.InnerHtml = strNodeBuilder.ToString();
                            }
                            catch (ArgumentNullException)
                            {
                                throw;
                            }
                        }
                    }

                }
                catch (Exception)
                {

                    
                }
                
              
                #endregion
                #region PopulateHeaderTags
                foreach (var item in pdfBody.Header)
                {
                    try
                    {
                        doc.DocumentNode.InnerHtml = doc.DocumentNode.InnerHtml.Replace(string.Format("[{0}]", item.Key), item.Value.Trim().Equals(string.Empty) ? string.Empty : item.Value);
                    }
                    catch (ArgumentException ex)
                    {
                        doc.DocumentNode.InnerHtml = doc.DocumentNode.InnerHtml.Replace(string.Format("[{0}]", item.Key), string.Format("Key {0} Not Found", item.Key));
                    }
                }
                #endregion
                #region applicationProperties
                //RootFolder.Remove(RootFolder.Length - 4)
                doc.DocumentNode.InnerHtml = doc.DocumentNode.InnerHtml.Replace("[ROOT_APP_PATH]", RootFolder.Remove(RootFolder.Length - 4));
                #endregion
                strGenerateHTMLContent = doc.DocumentNode.InnerHtml;
            }
            #region Exceptionhandling

            catch (ArgumentException ex)
            {
                strGenerateHTMLContent = ex.GetType().ToString();
            }
            catch (PathTooLongException ex)
            {
                strGenerateHTMLContent = ex.GetType().ToString();
            }
            catch (DirectoryNotFoundException ex)
            {
                strGenerateHTMLContent = ex.GetType().ToString();
            }
            catch (IOException ex)
            {
                strGenerateHTMLContent = ex.GetType().ToString();
            }
            catch (UnauthorizedAccessException ex)
            {
                strGenerateHTMLContent = ex.GetType().ToString();
            }
            catch (NotSupportedException ex)
            {
                strGenerateHTMLContent = ex.GetType().ToString();
            }
            catch (System.Security.SecurityException ex)
            {
                strGenerateHTMLContent = ex.GetType().ToString();
            }
            #endregion
            return strGenerateHTMLContent;
        }
        public PDFResponse PDFContent(BodyContent pdfBody)
        {
            string strMessage = string.Empty;
            bool pdfGenerationStatus = false;
            try
            {
                //_log.LogInformation(string.Format("Start Function PDFContent {0}", ConnectionString));

                HtmlToPdf converter = new HtmlToPdf();
                FGDBContext fGDBContext = new FGDBContext(ConnectionString);
                foreach (AppMasters item in fGDBContext.AppMasters.
                        Where(x => new string[] { "BLOB_CNTNR_NM", "BLOB_CONN_STR" }.
                        Contains(x.MstCategory)))
                {
                    switch (item.MstCategory)
                    {
                        case "BLOB_CNTNR_NM":
                            BLOB_CNTNR_NM = item.MstDesc;
                            break;
                        case "BLOB_CONN_STR":
                            BLOB_CONN_STR = item.MstDesc;
                            break;
                        default:
                            break;
                    }
                }
                //_log.LogInformation(string.Format("BLOB_CNTNR_NM {0} BLOB_CONN_STR{1}", BLOB_CNTNR_NM, BLOB_CONN_STR));

                using (MemoryStream pdfStream = new MemoryStream())
                {
                    //, _baseURL + "/Template/HTML"
                    converter.Options.MarginBottom = 40;
                    converter.Options.MarginTop = 40;
                    converter.Options.MarginLeft = 40;
                    converter.Options.MarginRight = 40;
                    converter.ConvertHtmlString(HTMLContent(pdfBody)).Save(pdfStream);
                    #region SaveToBlob
                    BlobContainerClient blobClient = new BlobContainerClient(BLOB_CONN_STR, BLOB_CNTNR_NM);
                    BlobClient blob = blobClient.GetBlobClient(string.Format("/{0}/{1}/{2}", pdfBody.DocumentType, pdfBody.ApplicationNo, pdfBody.blobFileName));
                    pdfStream.Position = 0;
                    blob.Upload(pdfStream, overwrite: true);
                    #endregion
                    #region SaveToFile
                    //using (FileStream fileStream = new FileStream("C:\\Users\\Navin K\\Desktop\\Delete Me\\sample.pdf", FileMode.Create))
                    //{
                    //    pdfStream.WriteTo(fileStream);
                    //}
                    #endregion
                    #region ReturnAsByteStream
                    //not implemented
                    #endregion
                    strMessage = string.Format("File {0} generated Successfully", pdfBody.blobFileName);
                    pdfGenerationStatus = true;
                }
            }
            catch (Azure.RequestFailedException rfe)
            {
                strMessage = string.Format("File {0} Could not be uploaded. Exception {1}", pdfBody.blobFileName, rfe.Message);
            }
            catch (Exception ex)
            {
                strMessage = string.Format("File {0} Could not be generated. Exception {1}", pdfBody.blobFileName, ex.Message);
            }
            return new PDFResponse(pdfBody, strMessage, pdfGenerationStatus);
        }
        
    }
  public class BlobConnection
    {
        private string ConnectionString;
        public BlobConnection(IConfiguration _configuration) {
            ConnectionString= _configuration.GetConnectionString("SQLConnectionString");

        }
        public BlobConnectionInfo GetBlobConn()
        {

            string BLOB_CNTNR_NM = string.Empty;
            string BLOB_CONN_STR = string.Empty;
            FGDBContext fGDBContext = new FGDBContext(Environment.GetEnvironmentVariable("SQLConnectionString"));
            foreach (AppMasters item in fGDBContext.AppMasters.
                    Where(x => new string[] { "BLOB_CNTNR_NM", "BLOB_CONN_STR" }.
                    Contains(x.MstCategory)))
            {
                switch (item.MstCategory)
                {
                    case "BLOB_CNTNR_NM":
                        BLOB_CNTNR_NM = item.MstDesc;
                        break;
                    case "BLOB_CONN_STR":
                        BLOB_CONN_STR = item.MstDesc;
                        break;
                    default:
                        break;
                }
            }
            return new BlobConnectionInfo
            {
                Container = BLOB_CNTNR_NM,
                Connection = BLOB_CONN_STR
            };
        }
        public class BlobConnectionInfo
        {
            public string Container { get; set; }
            public string Connection { get; set; }
        }
    }
}