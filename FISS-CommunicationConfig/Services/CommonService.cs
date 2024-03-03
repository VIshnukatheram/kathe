
using FG_STModels.Models.Shared;
using FISS_CommunicationConfig.Models.Request;
using FISS_CommunicationConfig.Models.Shared;
using FISS_ServiceRequest.Models.DB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.VisualBasic;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace FISS_CommunicationConfig.Services
{
    public class CommonService
    {
        public readonly APIURLS _apiUrls;
        public IConfiguration _configuration;
        public HttpService _HtppService;

        public CommonService(IOptions<APIURLS> config,IConfiguration configuration,HttpService httpService) {
            _apiUrls = config.Value;
            _configuration= configuration;
            _HtppService = httpService;           
        }

        public string GenerateTemplate(ServCommTemplate template,string tempBody, GenericTemplate templateValues ,string? link)
        {
           

            switch (template?.TemplateID)
            {

                case 5:
                    { // PPC SMS
                        return string.Format(tempBody, templateValues.ServiceRequest.SrvReqRefNo, templateValues.Policy.LA_PolicyNo, link);
                    }
                case 7: // Open EMail
                    return string.Format(tempBody, templateValues.RequestCategoryName, templateValues.ServiceRequest.SrvReqRefNo, templateValues.TAT + " days", templateValues.ServiceRequest.CreatedOn.ToString("dddd, dd MMMM yyyy"), templateValues.Policy.LA_PolicyNo);
                case 8:  // Approved EMail 
                    {
                        string newValue = "";
                        string oldValue = "";
                        if (templateValues.ServiceRequest.CallType == 5)
                        {
                            newValue = templateValues.ServiceRequest.ServiceRequestTransectionData?.Where(x => x.TagName.Contains("New")).First().TagValue;
                            oldValue = templateValues.ServiceRequest.ServiceRequestTransectionData?.Where(x => x.TagName.Contains("Old")).First().TagValue;
                        }
                        if (templateValues.ServiceRequest.CallType == 5 && templateValues.ServiceRequest.SubType == 5)
                        {
                            var Landmark = templateValues.ServiceRequest.ServiceRequestTransectionData?
                           .Where(x => x.TagName.Contains("Request_for"))
                           .Select(x => x.TagValue).FirstOrDefault();
                            if (Convert.ToInt32(Landmark) == (int)AddrChange.LandMark)
                            {
                                var newValue1 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                               .Where(x => x.TagName == "New_LandMark")
                               .Select(x => x.TagValue).FirstOrDefault();
                              

                                // Concatenate the TagValues using a delimiter (comma in this case)
                                newValue = string.Join(", ", newValue1);

                                var oldValue1 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                               .Where(x => x.TagName == "LandMark")
                               .Select(x => x.TagValue).FirstOrDefault();
                            

                                // Concatenate the TagValues using a delimiter (comma in this case)
                                oldValue = string.Join(", ", oldValue1);
                            }
                            else
                            {
                                var newValue1 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                           .Where(x => x.TagName.Contains("New"))
                           .Select(x => x.TagValue)
                           .ToList();

                                // Concatenate the TagValues using a delimiter (comma in this case)
                                newValue = string.Join(", ", newValue1);

                                var oldValue1 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                               .Where(x => x.TagName.Contains("Old"))
                               .Select(x => x.TagValue)
                               .ToList();

                                // Concatenate the TagValues using a delimiter (comma in this case)
                                oldValue = string.Join(", ", oldValue1);
                            }
                            
                        }
                        //Pan
                        if (templateValues.ServiceRequest.CallType == 6 && templateValues.ServiceRequest.SubType == 1)
                        {
                            var newValue1 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                           .Where(x => x.TagName == "ReEnterPanNo_New")
                           .Select(x => x.TagValue)
                           .ToList();
                            if(newValue1.Count==0)
                            {
                                newValue1 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                           .Where(x => x.TagName == "NewPanNo")
                           .Select(x => x.TagValue)
                           .ToList();
                            }

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            newValue = string.Join(", ", newValue1);

                            var oldValue1 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                           .Where(x => x.TagName == "ExistingPanNo")
                           .Select(x => x.TagValue)
                           .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            oldValue = string.Join(", ", oldValue1);
                        }
                        if (templateValues.ServiceRequest.CallType == 6 && templateValues.ServiceRequest.SubType == 8)
                        {
                            
                           var newValue1 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                          .Where(x => x.TagName == "AgentCode_New" && x.Status == "Update")
                          .Select(x => x.TagValue) 
                          .ToList();
                            if (newValue1.Count == 0)
                            {
                             newValue1 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                           .Where(x => x.TagName == "AgentCode_New" && x.Status == "Create")
                           .Select(x => x.TagValue)
                           .ToList();
                            }

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            newValue = string.Join(", ", newValue1);

                            var oldValue1 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                           .Where(x => x.TagName== "AgentCode_Old")
                           .Select(x => x.TagValue)
                           .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            oldValue = string.Join(", ", oldValue1);
                        }

                        if (templateValues.ServiceRequest.CallType == 3 && templateValues.ServiceRequest.SubType == 1)
                        {
                            var newValue2 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                            .Where(x => x.TagName=="Acc_Number_New")
                            .Select(x => x.TagValue)
                            .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            newValue = string.Join(", ", newValue2);

                            var oldValue2 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                           .Where(x => x.TagName == "Acc_Number_Old")
                           .Select(x => x.TagValue)
                           .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            oldValue = string.Join(", ", oldValue2);
                            

                        }
                        // change in plan
                        if (templateValues.ServiceRequest.CallType == 6 && templateValues.ServiceRequest.SubType == 10)
                        {
                            var newValue2 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                            .Where(x => x.TagName == "NewPlan_New")
                            .Select(x => x.TagValue)
                            .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            newValue = string.Join(", ", newValue2);

                            var oldValue2 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                           .Where(x => x.TagName == "PlanName_Old")
                           .Select(x => x.TagValue)
                           .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            oldValue = string.Join(", ", oldValue2);

                        }

                        // change in Term
                        if (templateValues.ServiceRequest.CallType == 6 && templateValues.ServiceRequest.SubType == 9)
                        {
                            var newValue2 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                            .Where(x => x.TagName == "NewTerm_New")
                            .Select(x => x.TagValue)
                            .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            newValue = string.Join(", ", newValue2);

                            var oldValue2 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                           .Where(x => x.TagName == "PolicyTerm_Old")
                           .Select(x => x.TagValue)
                           .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            oldValue = string.Join(", ", oldValue2);


                        }
                        //Chnage in Nominee
                        if (templateValues.ServiceRequest.CallType == 10 && templateValues.ServiceRequest.SubType == 1)
                        {
                            var newValue2 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                            .Where(x => x.TagName.Contains("NomineeName_New"))
                            .Select(x => x.TagValue)
                            .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            newValue = string.Join(", ", newValue2);

                            var oldValue2 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                           .Where(x => x.TagName.Contains("NomineeName_Old"))
                           .Select(x => x.TagValue)
                           .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            oldValue = string.Join(", ", oldValue2);


                        }
                        //Chnage in Appointee
                        if (templateValues.ServiceRequest.CallType == 10 && templateValues.ServiceRequest.SubType == 2)
                        {
                            var newValue2 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                            .Where(x => x.TagName.Contains("AppointeName_New"))
                            .Select(x => x.TagValue)
                            .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            newValue = string.Join(", ", newValue2);

                            var oldValue2 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                           .Where(x => x.TagName.Contains("AppointeName_Old"))
                           .Select(x => x.TagValue)
                           .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            oldValue = string.Join(", ", oldValue2);


                        }
                        // Chanege In Premium
                        if (templateValues.ServiceRequest.CallType == 6 && templateValues.ServiceRequest.SubType == 14)
                        {
                            var newValue2 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                            .Where(x => x.TagName.Contains("NewPremium_New"))
                            .Select(x => x.TagValue)
                            .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            newValue = string.Join(", ", newValue2);

                            var oldValue2 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                           .Where(x => x.TagName.Contains("CurrentPremium_Old"))
                           .Select(x => x.TagValue)
                           .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            oldValue = string.Join(", ", oldValue2);


                        }
                        //gst number 
                        if (templateValues.ServiceRequest.CallType == 6 && templateValues.ServiceRequest.SubType == 6)
                        {
                            var newValue1 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                           .Where(x => x.TagName.Contains("NewGSTINNumber") && x.Status == "Update")
                           .Select(x => x.TagValue)
                           .ToList();
                            if (newValue1.Count == 0)
                            {
                                newValue1 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                              .Where(x => x.TagName == "NewGSTINNumber" && x.Status == "Create")
                              .Select(x => x.TagValue)
                              .ToList();
                            }
                            // Concatenate the TagValues using a delimiter (comma in this case)
                            newValue = string.Join(", ", newValue1);

                            var oldValue1 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                           .Where(x => x.TagName.Contains("ExistingGSTINNumber") && x.Status == "Create")
                           .Select(x => x.TagValue)
                           .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            oldValue = string.Join(", ", oldValue1);
                        }
                        // Change in Name
                        if (templateValues.ServiceRequest.CallType == 6 && templateValues.ServiceRequest.SubType == 3)
                        {
                            var newValue2 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                            .Where(x => x.TagName.Contains("New") && x.Status== "Update")
                            .Select(x => x.TagValue)
                            .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            newValue = string.Join(" ", newValue2);

                            var oldValue2 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                           .Where(x => x.TagName.Contains("Old") && x.Status == "Create")
                           .Select(x => x.TagValue)
                           .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            oldValue = string.Join(", ", oldValue2);


                        }
                        // Change in Mode
                        if (templateValues.ServiceRequest.CallType == 1 && templateValues.ServiceRequest.SubType == 1)
                        {
                            var newValue2 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                            .Where(x => x.TagName.Contains("Mode_New"))
                            .Select(x => x.TagValue)
                            .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            newValue = string.Join(" ", newValue2);

                            var oldValue2 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                           .Where(x => x.TagName.Contains("Mode_Old"))
                           .Select(x => x.TagValue)
                           .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            oldValue = string.Join(", ", oldValue2);


                        }
                        //Change in Ownership
                        if (templateValues.ServiceRequest.CallType == 6 && templateValues.ServiceRequest.SubType == 5)
                        {
                            var newValue2 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                            .Where(x => x.TagName =="ProposerName_New")
                            .Select(x => x.TagValue)
                            .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            newValue = string.Join(" ", newValue2);

                            var oldValue2 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                           .Where(x => x.TagName == "ProposerName_Old")
                           .Select(x => x.TagValue)
                           .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            oldValue = string.Join(", ", oldValue2);


                        }
                        //Assiginment
                        if (templateValues.ServiceRequest.CallType == 22 && templateValues.ServiceRequest.SubType == 1)
                        {
                            var newValue2 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                            .Where(x => x.TagName == "PolicyOwnerName_New")
                            .Select(x => x.TagValue)
                            .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            newValue = string.Join(" ", newValue2);

                            var oldValue2 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                           .Where(x => x.TagName == "PolicyOwnerName_Old")
                           .Select(x => x.TagValue)
                           .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            oldValue = string.Join(", ", oldValue2);


                        }
                        //do not call
                        if (templateValues.ServiceRequest.CallType == 14 && templateValues.ServiceRequest.SubType == 1)
                        {
                            var newValue2 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                            .Where(x => x.TagName.Contains("Action"))
                            .Select(x => x.TagValue).SingleOrDefault();
                          
                                int intValue = newValue2.Equals("false") ? 1 : 0;

                                if (intValue == (int)Donotcall.InActive)
                                {

                                    oldValue = string.Join(" ", Enum.GetName(typeof(Donotcall), intValue));
                                    newValue = string.Join(", ", Enum.GetName(typeof(Donotcall), 1));
                                }

                                else
                                {
                                    oldValue = string.Join(" ", Enum.GetName(typeof(Donotcall), intValue));
                                    newValue = string.Join(", ", Enum.GetName(typeof(Donotcall),0));
                                }                                                
                        }
                        //Change in Sum Assured
                        if (templateValues.ServiceRequest.CallType == 6 && templateValues.ServiceRequest.SubType == 11)
                        {
                            var newValue2 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                            .Where(x => x.TagName== "SumAssured_New")
                            .Select(x => x.TagValue)
                            .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            newValue = string.Join(" ", newValue2);

                            var oldValue2 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                           .Where(x => x.TagName== "SumAssured_Old")
                           .Select(x => x.TagValue)
                           .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            oldValue = string.Join(", ", oldValue2);


                        }
                        //Change in DOB
                        if (templateValues.ServiceRequest.CallType == 6 && templateValues.ServiceRequest.SubType == 4)
                        {
                            var newValue2 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                            .Where(x => x.TagName == "NewDateofBirth")
                            .Select(x => x.TagValue)
                            .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            newValue = string.Join(" ", newValue2);

                            var oldValue2 = templateValues.ServiceRequest.ServiceRequestTransectionData?
                           .Where(x => x.TagName == "ExistingDateofBirth_Existing")
                           .Select(x => x.TagValue)
                           .ToList();

                            // Concatenate the TagValues using a delimiter (comma in this case)
                            oldValue = string.Join(", ", oldValue2);


                        }

                        return string.Format(tempBody, templateValues.RequestCategoryName, oldValue, newValue, templateValues.ServiceRequest.SrvReqRefNo, templateValues.Policy.LA_PolicyNo);
                    }
                case 9: // Reject EMail
                    return string.Format(tempBody, templateValues.ServiceRequest.SrvReqRefNo, templateValues.Policy.LA_PolicyNo, templateValues.RequestCategoryName,  templateValues.RejectedReason);
                case 10: // Open SMS
                    return string.Format(tempBody, templateValues.ServiceRequest.SrvReqRefNo, templateValues.RequestCategoryName, templateValues.Policy.LA_PolicyNo, templateValues.TAT + " days");
                case 6:  // Approved SMS
                        return string.Format(tempBody, templateValues.ServiceRequest.SrvReqRefNo, templateValues.Policy.LA_PolicyNo, templateValues.RequestCategoryName);
                case 12: // Reject SMS --"srnno":"{0}","POLICYNO":"{1}","srntype":"{2}","reasonlist":"{3}"
                    return string.Format(tempBody, templateValues.ServiceRequest.SrvReqRefNo, templateValues.Policy.LA_PolicyNo, templateValues.Policy.LA_PolicyNo, templateValues.RequestCategoryName, templateValues.RejectedReason);
                case 13: // PaymentLink SMS
                    {
                        var paymentLink = templateValues.ServiceRequest.ServiceRequestTransectionData?.Where(x => x.TagName.Contains("PaymentLink")).FirstOrDefault()?.TagValue;
                        return string.Format(tempBody, templateValues.Policy.LA_PolicyNo, paymentLink);
                    }
                case 14: // PaymentLink Email
                    {
                        var paymentLink = templateValues.ServiceRequest.ServiceRequestTransectionData?.Where(x => x.TagName.Contains("PaymentLink")).FirstOrDefault()?.TagValue;
                        return string.Format(tempBody, paymentLink);
                    }
                case 15: // Email For Surrender Process,Email For FreeLook Process, Email For Loan Process
                case 18:
                case 20:
                    {
                        var processLink = templateValues.ServiceRequest.ServiceRequestTransectionData?.Where(x => x.TagName.Contains("ProcessLink")).FirstOrDefault()?.TagValue ?? "";
                        //var docLink = templateValues.ServiceRequest.ServiceRequestTransectionData?.Where(x => x.TagName.Contains("DocLink")).FirstOrDefault()?.TagValue ?? "";

                        return string.Format(tempBody, templateValues.RequestCategoryName, templateValues.Policy.LA_PolicyNo, processLink);
                    }
                case 16: // Email For Surrender Value
                    {
                        var surrenderValue = templateValues.ServiceRequest.ServiceRequestTransectionData?.Where(x => x.TagName.Contains("PayableAmount")).FirstOrDefault()?.TagValue;
                        var surrenderDate = templateValues.ServiceRequest.ServiceRequestTransectionData?.Where(x => x.TagName.Contains("SurrenderDate")).FirstOrDefault()?.TagValue;
                        
                        DateTime surrenderDateTime = DateTime.Parse(surrenderDate);

                        return string.Format(tempBody, templateValues.ServiceRequest.ProposerName, templateValues.ServiceRequest.ProposerName, templateValues.Policy.LA_PolicyNo, surrenderDateTime.ToString("dddd, dd MMMM yyyy"), surrenderValue, "0", surrenderValue);
                    }
                case 17: // Email For Surrender Statement
                    return string.Format(tempBody, templateValues.ServiceRequest.ProposerName);
                //case 18: // Email For Loan Process
                   // return string.Format(tempBody, templateValues.ServiceRequest.ProposerName, templateValues.RequestCategoryName, "https://fissab8a.blob.core.windows.net/loan/Future%20Generali%20Care_133N002V01.pdf", "https://fissab8a.blob.core.windows.net/loan/Future%20Generali%20Care_133N002V01.pdf");
                case 19: // Email For Loan Statement
                    return string.Format(tempBody, templateValues.ServiceRequest.ProposerName);
                case 21: // Email For Loan Statement
                    return string.Format(tempBody, templateValues.ServiceRequest.ProposerName,"","","","","");
                //case 20: // Email For FreeLook Process
                //return string.Format(tempBody, templateValues.ServiceRequest.ProposerName, templateValues.RequestCategoryName, "https://fissab8a.blob.core.windows.net/loan/Future%20Generali%20Care_133N002V01.pdf", "https://fissab8a.blob.core.windows.net/loan/Future%20Generali%20Care_133N002V01.pdf");
                case 22: // Email For Process Enquiry Process
                    {
                        var processLink = templateValues.ServiceRequest.ServiceRequestTransectionData?.Where(x => x.TagName.Contains("ProcessLink")).FirstOrDefault()?.TagValue ?? "";
                        var docLink = templateValues.ServiceRequest.ServiceRequestTransectionData?.Where(x => x.TagName.Contains("DocLink")).FirstOrDefault()?.TagValue ?? "";
                        var processName = templateValues.ServiceRequest.ServiceRequestTransectionData?.Where(x => x.TagName.Contains("ProcessName")).FirstOrDefault()?.TagValue ?? "";
                        var processLinkshoter = _HtppService.HttpPostForShoter(processLink);
                        var docLinkshoter = _HtppService.HttpPostForShoter(processLink);
                        var processNameshoter = _HtppService.HttpPostForShoter(processLink);

                        return string.Format(tempBody, templateValues.ServiceRequest.ProposerName, templateValues.RequestCategoryName, processLinkshoter, docLinkshoter);
                    }
                case 23:
                    {
                        return string.Format(tempBody, templateValues.RequestCategoryName, templateValues.Policy.LA_PolicyNo, templateValues.RequestCategoryName, templateValues.ServiceRequest.ProposerName);
                    }
                case 24:
                    {
                        return string.Format(tempBody, templateValues.ServiceRequest.SrvReqRefNo, templateValues.Policy.LA_PolicyNo, templateValues.RequestCategoryName);
                    }
                case 27:
                    {
                        var mandateLink = templateValues.ServiceRequest.ServiceRequestTransectionData?.Where(x => x.TagName.Contains("ProcessLink")).FirstOrDefault()?.TagValue ?? "";
                        var mandateLinkhoter = _HtppService.HttpPostForShoter(mandateLink);
                        return string.Format(tempBody, templateValues.Policy.LA_PolicyNo, mandateLinkhoter);
                    }
                case 28:
                    {
                        var prospectName = templateValues.ServiceRequest.ServiceRequestTransectionData?.Where(x => x.TagName.Contains("ProspectName")).FirstOrDefault()?.TagValue ?? "";
                        var ContactNumber = templateValues.ServiceRequest.ServiceRequestTransectionData?.Where(x => x.TagName.Contains("ContactNumber")).FirstOrDefault()?.TagValue ?? "";
                        var selfLead = templateValues.ServiceRequest.ServiceRequestTransectionData?.Where(x => x.TagName.Contains("SelfLead")).FirstOrDefault()?.TagValue ?? "";
                        var NBMobileNumber = templateValues.ServiceRequest.ServiceRequestTransectionData?.Where(x => x.TagName.Contains("NBMobileNumber")).FirstOrDefault()?.TagValue ?? "";

                        if (selfLead == "no")
                        {
                            return string.Format(tempBody, prospectName, ContactNumber);
                        }
                        
                        else
                           return string.Format(tempBody, templateValues.ServiceRequest.ProposerName, NBMobileNumber);

                    }
                case 29:
                    {

                        return string.Format(tempBody, templateValues.Policy.LA_PolicyNo);
                    }
                case 30:
                    {
                        var MobileNumber = templateValues.ServiceRequest.ServiceRequestTransectionData?.Where(x => x.TagName.Contains("MobileNumber")).FirstOrDefault()?.TagValue ?? "";
                        var EmailID = templateValues.ServiceRequest.ServiceRequestTransectionData?.Where(x => x.TagName.Contains("EmailID")).FirstOrDefault()?.TagValue ?? "";
                        var Comments = templateValues.ServiceRequest.ServiceRequestTransectionData?.Where(x => x.TagName.Contains("Comments")).FirstOrDefault()?.TagValue ?? "";
                        return string.Format(tempBody, templateValues.ServiceRequest.ProposerName, EmailID, MobileNumber, Comments);
                    }
                case 32:
                    {
                        return string.Format(tempBody, templateValues.ServiceRequest.ProposerName, templateValues.RequestCategoryName,link, templateValues.RejectedReason, templateValues.TAT + " days");
                    }
                case 33:
                    {
                        string url = "https://life.futuregenerali.in/DocumentStore/FormsAndDownloads/16.pdf";
                        var processNameshoter = _HtppService.HttpPostForShoter(url);
                        return string.Format(tempBody, templateValues.RequestCategoryName, templateValues.Policy.LA_PolicyNo, processNameshoter, templateValues.ServiceRequest.ProposerName);
                    }
                case 34:
                    {
                        string url = "https://life.futuregenerali.in/DocumentStore/FormsAndDownloads/16.pdf";
                        var processNameshoter = _HtppService.HttpPostForShoter(url);
                        return string.Format(tempBody, templateValues.Policy.LA_PolicyNo, templateValues.RequestCategoryName, processNameshoter, templateValues.ServiceRequest.ProposerName);
                    }
                case 53:
                    {
                        return string.Format(tempBody, templateValues.ServiceRequest.ProposerName, templateValues.RequestCategoryName,templateValues.Policy.LA_PolicyNo);
                    }
                case 54:
                    {
                        return string.Format(tempBody, templateValues.RequestCategoryName, templateValues.Policy.LA_PolicyNo, templateValues.RequestCategoryName, templateValues.ServiceRequest.ProposerName);
                    }
                default:
                    //will be used where all binding values are coming in as request in CommunicationPayload 
                    return string.Empty;
                 
                    
            }
          
        }

    
    }
}
