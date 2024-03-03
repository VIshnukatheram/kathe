using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using FISS_ServiceRequest.Services;
using System.Collections.Generic;
using FISS_LA_APIS.Models.DB;
using System.Linq;
using FISS_ServiceRequest.Models.DB;
using FISS_LA_APIS.Models.Request;
using FISS_LA_APIS.Models.Response;
using FISS_ServiceRequest.Models.Request;
using System.Reflection;
using FG_STModels.Models.Shared;
using System.Net;
using FG_STModels.Models.LifeAsia;
using System.Globalization;
using FG_STModels.Models.FISS;

namespace FISS_LA_APIS
{
    public class GenericLAApis
    {
        private readonly WorkFlowCalls _workFlowCalls;
        public GenericLAApis(WorkFlowCalls workFlowCalls)
        {
            _workFlowCalls = workFlowCalls;
        }
        [FunctionName(nameof(CallLifeAsia))]
        public async Task<IActionResult> CallLifeAsia(
            [HttpTrigger(AuthorizationLevel.Function, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            string serReqRefNo = "";
            try
            {
                log.LogInformation("Life Asia API Request Started");

                var response = null as object;

                // Required Query Params srid, reqtype


                log.LogInformation("Log Request Query Parameters");
                log.LogInformation(JsonConvert.SerializeObject(req.Query));

                 serReqRefNo = req.Query["srid"];

                log.LogInformation("Fetching All Transection Data for SerReqID " + serReqRefNo);

                List<ServiceRequestTransectionData> data = _workFlowCalls.GetTransactionData(serReqRefNo);

                log.LogInformation("All Availabel Transection Data " + JsonConvert.SerializeObject(data));

                #region Type DEDUP
                if (req.Query["reqtype"] == "5_1_deDup" || req.Query["reqtype"] == "5_3_deDup" || req.Query["reqtype"] == "5_4_deDup")
                {
                    string mobileNo = data?.Where(x => x.TagName.Contains("New")).FirstOrDefault()?.TagValue;
                    string url = _workFlowCalls.GetURLS().DeDupCheckForPhone;
                    response = await _workFlowCalls.DeDuplicate(mobileNo, url, "PHONE", serReqRefNo);
                }
                if (req.Query["reqtype"] == "5_2_deDup")
                {
                    string email = data?.Where(x => x.TagName.Contains("New")).FirstOrDefault()?.TagValue;
                    string url = _workFlowCalls.GetURLS().DeDupCheckForEmail;
                    response = await _workFlowCalls.DeDuplicate(email, url, "EMAIL", serReqRefNo);
                }
                if (req.Query["reqtype"] == "3_1_deDup")
                {
                    response = _workFlowCalls.BankDeDuplicate(data, serReqRefNo);
                }
               
                if (req.Query["reqtype"] == "9_1_deDup" || req.Query["reqtype"] == "11_1_deDup" || req.Query["reqtype"] == "12_1_deDup")
                {
                    response = _workFlowCalls.DeDupForSurrender(data, serReqRefNo);
                }
                if (req.Query["reqtype"] == "5_5_deDup")
                {
                    string requestfor = data?.Where(x => x.TagName == "Request_for").FirstOrDefault()?.TagValue ?? "0";
                    if (requestfor == "1")
                    {
                        response = true;
                    }
                    else if (requestfor == "2")
                    {
                        response = false;
                    }
                    else
                    {
                        response = false;
                    }
                }
                if (req.Query["reqtype"] == "6_1_deDup")
                {
                    string Name = data?.Where(x => x.TagName == "Name").FirstOrDefault()?.TagValue;

                    string clientNo = data?.Where(x => x.TagName == "Client_Id").FirstOrDefault()?.TagValue;

                    dynamic body = new
                    {
                        clientNumber = clientNo,
                    };
                    string url = _workFlowCalls.GetURLS().GetClientEnquiry;

                    response = await _workFlowCalls.LAContactAddressUpdates(body, url);
                    string jsonResponse = JsonConvert.SerializeObject(response);
                    AddressdetailsUpdate fg = JsonConvert.DeserializeObject<AddressdetailsUpdate>(jsonResponse);
                    if (Name != string.Concat(fg.ResponseOutput.ResponseBody.lsurname, fg.ResponseOutput.ResponseBody.lgivname))
                    {
                        response = true;
                    }
                    else
                    {
                        response = false;
                    }

                }
                
                // Checking For Fund Switch and Premium Redirection Communication
                if (req.Query["reqtype"] == "23_1_deDup" || req.Query["reqtype"] == "23_2_deDup" || req.Query["reqtype"] == "14_1_deDup")
                {
                    response = false;
                }
                // Loan KYC Number insert
                if (req.Query["reqtype"] == "11_1_deDup")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    var CKYCNumber = data?.Where(x => x.TagName.Contains("CKYCNumber")).FirstOrDefault()?.TagValue ?? "";

                    if(!string.IsNullOrWhiteSpace(CKYCNumber))
                    {
                        _workFlowCalls.SaveCKYCDetails(CKYCNumber, values.ServiceRequest.CustomerRef);
                    }
                    response = true;
                }
                #endregion

                #region Type LA UPDATE
                if (req.Query["reqtype"] == "3_1_Update") // Bank Details Update
                {
                    response = _workFlowCalls.BankUpdate(data, serReqRefNo);
                }
                if (req.Query["reqtype"] == "5_1_Update") // Mobile No Update
                {
                    string clientNo = data?.Where(x => x.TagName == "Client_Id").FirstOrDefault()?.TagValue;
                    string mobileNo = data?.Where(x => x.TagName == "Mobile_New").FirstOrDefault()?.TagValue;

                    dynamic body = new
                    {
                        ClientNo = clientNo,
                        MobileNo = mobileNo
                    };
                    string url = _workFlowCalls.GetURLS().ContactUpdateMobileNum;
                    response = await _workFlowCalls.LAContactUpdate(body, url);
                }
                if (req.Query["reqtype"] == "5_2_Update") // Email Update
                {
                    string clientNo = data?.Where(x => x.TagName == "Client_Id").FirstOrDefault()?.TagValue;
                    string mobileNo = data?.Where(x => x.TagName == "Email_New").FirstOrDefault()?.TagValue;
                    dynamic body = new
                    {
                        ClientNo = clientNo,
                        EmailId = mobileNo
                    };
                    string url = _workFlowCalls.GetURLS().ContactUpdateEmailNum;
                    response = await _workFlowCalls.LAContactUpdate(body, url);
                }
                if (req.Query["reqtype"] == "5_3_Update") // Home or Alternative no Update
                {
                    string clientNo = data?.Where(x => x.TagName == "Client_Id").FirstOrDefault()?.TagValue;
                    string mobileNo = data?.Where(x => x.TagName == "AlternateNo_New").FirstOrDefault()?.TagValue;
                    dynamic body = new
                    {
                        ClientNo = clientNo,
                        HomeNo = mobileNo
                    };
                    string url = _workFlowCalls.GetURLS().ContactUpdateAlternateNum;
                    response = await _workFlowCalls.LAContactUpdate(body, url);
                }
                if (req.Query["reqtype"] == "5_4_Update") // Work No update
                {
                    string clientNo = data?.Where(x => x.TagName == "Client_Id").FirstOrDefault()?.TagValue;
                    string mobileNo = data?.Where(x => x.TagName == "WorkNo_New").FirstOrDefault()?.TagValue;
                    dynamic body = new
                    {
                        ClientNo = clientNo,
                        OfficeNo = mobileNo
                    };
                    string url = _workFlowCalls.GetURLS().ContactUpdateOfficeNum;
                    response = await _workFlowCalls.LAContactUpdate(body, url);
                }
                if (req.Query["reqtype"] == "5_5_Update") // Address Update
                {

                    string requestfor = data?.Where(x => x.TagName == "REQUEST_FOR").FirstOrDefault()?.TagValue ?? "0";
                    if (requestfor == "0")
                    {
                        requestfor = data?.Where(x => x.TagName == "Request_for").FirstOrDefault()?.TagValue ?? "0";
                    }

                    string clientNo = data?.Where(x => x.TagName == "Client_Id").FirstOrDefault()?.TagValue;
                    string currentAddress = data?.Where(x => x.TagName == "Current_Address").FirstOrDefault()?.TagValue;
                    string newline1 = data?.Where(x => x.TagName == "New_Line1").FirstOrDefault()?.TagValue;
                    string newline2 = data?.Where(x => x.TagName == "New_Line2").FirstOrDefault()?.TagValue;
                    string newlandmark = data?.Where(x => x.TagName == "New_LandMark").FirstOrDefault()?.TagValue;
                    string newpincode = data?.Where(x => x.TagName == "New_Pincode").FirstOrDefault()?.TagValue;
                    string newcity = data?.Where(x => x.TagName == "New_City").FirstOrDefault()?.TagValue;
                    string newstate = data?.Where(x => x.TagName == "New_State").FirstOrDefault()?.TagValue;
                    string branchsigingdate = data?.Where(x => x.TagName == "Branch_Signing_Date").FirstOrDefault()?.TagValue;

                    dynamic body = new
                    {
                        clientNumber = clientNo,
                    };
                    string url = _workFlowCalls.GetURLS().GetClientEnquiry;

                    response = await _workFlowCalls.LAContactAddressUpdates(body, url);
                    string jsonResponse = JsonConvert.SerializeObject(response);
                    AddressdetailsUpdate fg = JsonConvert.DeserializeObject<AddressdetailsUpdate>(jsonResponse);
                    if (requestfor == "1")
                    {
                        fg.ResponseOutput.ResponseBody.cltaddR01 = newline1.ToString();
                        fg.ResponseOutput.ResponseBody.cltaddR02 = newline2.ToString();
                        fg.ResponseOutput.ResponseBody.cltaddR03 = newlandmark.ToString();
                        fg.ResponseOutput.ResponseBody.cltaddR04 = newcity.ToString();
                        fg.ResponseOutput.ResponseBody.cltaddR05 = newstate.ToString();
                        fg.ResponseOutput.ResponseBody.cltpcode = newpincode.ToString();
                    }
                    if (requestfor == "2")
                    {
                        fg.ResponseOutput.ResponseBody.cltaddR03 = newlandmark.ToString();
                    }
                    fg.ResponseOutput.ResponseBody.nmfmt = "2";
                    fg.ResponseOutput.ResponseBody.clttwo = clientNo;
                    //fg.ResponseOutput.ResponseBody.srdate = "20220831";
                    //fg.ResponseOutput.ResponseBody.cltdobx = "01/02/1981";
                    //fg.ResponseOutput.ResponseBody.cltstat = "AC";

                    ///addded
                    string url1 = _workFlowCalls.GetURLS().ClientUpdateP;
                    RequestBodyP RequestBody = JsonConvert.DeserializeObject<RequestBodyP>(JsonConvert.SerializeObject(fg.ResponseOutput.ResponseBody));

                    response = await _workFlowCalls.LAContactAddressUpdates(RequestBody, url1);
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    dynamic newbody = new
                    {
                        ClientNo = clientNo,
                        policyNo = values.polyceNumber,
                    };

                    string url2 = _workFlowCalls.GetURLS().GetDispatchAddressUpdate;


                    response = await _workFlowCalls.LAContactAddressUpdates(newbody, url2);


                }
                if (req.Query["reqtype"] == "6_1_Update")
                {
                    string clientNo = data?.Where(x => x.TagName == "Client_Id").FirstOrDefault()?.TagValue;
                    string NewPanNo = data?.Where(x => x.TagName == "ReEnterPanNo").FirstOrDefault()?.TagValue ?? "0";
                    if (NewPanNo == "0")
                    {
                        NewPanNo = data?.Where(x => x.TagName == "NewPanNo").FirstOrDefault()?.TagValue ?? "0";
                    }
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    PanRequest requestBody = new()
                    {
                        ClientId = clientNo,
                        panNumber = NewPanNo
                    };

                    string url = _workFlowCalls.GetURLS().PANUpdate;
                    response = await _workFlowCalls.SurrenderWorkFlow(requestBody, url, values.ServiceRequestid);


                }
                if (req.Query["reqtype"] == "6_8_Update")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    string AgentCode_New = data?.Where(x => x.TagName == "AgentCode_New").FirstOrDefault()?.TagValue;
                    dynamic requestBody = new
                    {
                        chdrsel = values.polyceNumber,
                        comind = "Y",
                        inalcom = "Y",
                        newagt = AgentCode_New,
                        rnwlcom = "Y",
                        servcom = "Y",
                        zcmrecov = "Y",
                        zrorcomm = "Y"
                    };
                    string url = _workFlowCalls.GetURLS().AgentCodeCorrection;
                    response = await _workFlowCalls.SurrenderWorkFlow(requestBody, url, values.ServiceRequestid);
                }
                if (req.Query["reqtype"] == "10_1_Update")   //Chnage In nominee
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    var NomineeName_New = data?.Where(x => x.TagName.Contains("NomineeName_New")).ToList();
                    var NomineeDOB_New = data?.Where(x => x.TagName.Contains("NomineeDOB_New")).ToList();
                    var Nomineeshare_New = data?.Where(x => x.TagName.Contains("Share_New")).ToList();
                    var Relationship_New = data?.Where(x => x.TagName.Contains("RealtionshipWithPolicyowner_New")).ToList();
                    DateTime parsedDate1 = DateTime.ParseExact(DateTime.Now.ToString("dd/mm/yyyy"), "dd/mm/yyyy", null);
                    string DateString = parsedDate1.ToString("yyyyMMdd");
                    int Flag = 0;
                    var dynamicObject = new System.Dynamic.ExpandoObject();
                    var dynamicDictionary = dynamicObject as IDictionary<string, Object>;
                    for (int j = 1; j <= 10; j++)
                    {
                        string bnycD = $"bnycD{j}";
                        string bnypC = $"bnypC{j}";
                        string bnyrlN = $"bnyrlN{j}";
                        string bnyseL = $"bnyseL{j}";
                        string effectiveDate = $"effectiveDate{j}";
                        dynamicDictionary.Add(bnycD, "");
                        dynamicDictionary.Add(bnypC, "");
                        dynamicDictionary.Add(bnyrlN, "");
                        dynamicDictionary.Add(bnyseL, "");
                        dynamicDictionary.Add(effectiveDate, "");
                    }
                    ChangeInNomineeRequests changeInNomineeRequests = new ChangeInNomineeRequests();
                    for (int i = 1; i <= NomineeName_New.Count; i++)
                    {
                        RequestBodyP requestBodyP = new RequestBodyP();
                        Flag = 0;
                        foreach (var DOB in NomineeDOB_New)
                        {
                            if (Flag != 1)
                            {

                                DateTime parsedDate = DateTime.ParseExact(DOB.TagValue, "dd/mm/yyyy", null);
                                string resultDateString = parsedDate.ToString("yyyyMMdd");
                                requestBodyP.Addrtype = "R";
                                requestBodyP.Cltdobx = resultDateString;
                                requestBodyP.Cltpcode = "400065";
                                requestBodyP.CltphonE01 = "";
                                requestBodyP.CltphonE02 = "";
                                requestBodyP.Cltsex = "M";
                                requestBodyP.Cltstat = "AC";
                                requestBodyP.Ctrycode = "IND";
                                requestBodyP.Language = "E";
                                requestBodyP.Lgivname = NomineeName_New[i - 1].TagValue.ToString();
                                requestBodyP.Lsurname = NomineeName_New[i - 1].TagValue.ToString();
                                requestBodyP.Marryd = "S";
                                requestBodyP.Natlty = "IND";
                                requestBodyP.Nmfmt = "2";
                                requestBodyP.Occpcode = "BUSS";
                                requestBodyP.Salutl = "MR";
                                requestBodyP.Srdate = DateString;
                                requestBodyP.Rinternet = "";
                                requestBodyP.Rmblphone = "";
                                requestBodyP.Decgrsal = "0";
                                requestBodyP.Soe = "0";


                            }
                            Flag = 1;

                        }
                        string url = _workFlowCalls.GetURLS().ClientCreateP;
                        var js = JsonConvert.SerializeObject(requestBodyP);
                        log.LogInformation("Trigger The ClientCreateP");
                        response = await _workFlowCalls.SurrenderWorkFlow(requestBodyP, url, values.ServiceRequestid);
                        var responseObject = JsonConvert.SerializeObject(response);
                        log.LogInformation(responseObject);
                        ClientResponse clientResponse = JsonConvert.DeserializeObject<ClientResponse>(responseObject);
                        dynamicDictionary["bnycD" + i + ""] = "";
                        dynamicDictionary["bnypC" + i + ""] = Nomineeshare_New[i - 1].TagValue;
                        dynamicDictionary["bnyrlN" + i + ""] = Relationship_New[i - 1].TagValue;
                        dynamicDictionary["bnyseL" + i + ""] = clientResponse.ResponseOutput.ResponseBody.PolicyNumber;
                        dynamicDictionary["effectiveDate" + i + ""] = DateString;
                    }
                    dynamicDictionary["policyNumber"] = values.polyceNumber;
                    string jsonResult = JsonConvert.SerializeObject(dynamicObject, Formatting.Indented);

                    log.LogInformation(jsonResult);
                    object fg = JsonConvert.DeserializeObject<object>(jsonResult);
                    string url1 = _workFlowCalls.GetURLS().GetNomineeCreation;
                    response = await _workFlowCalls.NomineeUpdate(fg, url1, values.ServiceRequestid);
                }
                

                if (req.Query["reqtype"] == "10_2_Update")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    var AppointeName_New = data?.Where(x => x.TagName.Contains("AppointeName_New")).ToList();
                    var AppointeDOB_New = data?.Where(x => x.TagName.Contains("AppointeDOB_New")).ToList();
                    var AppointeShare_New = data?.Where(x => x.TagName.Contains("AppointeShare_New")).ToList();
                    var Relationship_New = data?.Where(x => x.TagName.Contains("AppointeRealtionshipWithPolicyowner_New")).ToList();
                    var AP = Relationship_New.Where(x => x.TagValue.Contains("AP")).FirstOrDefault();
                    DateTime parsedDate1 = DateTime.ParseExact(DateTime.Now.ToString("dd/mm/yyyy"), "dd/mm/yyyy", null);
                    string DateString = parsedDate1.ToString("yyyyMMdd");
                    if (AP != null)
                    {
                        int Flag = 0;
                        var dynamicObject = new System.Dynamic.ExpandoObject();
                        var dynamicDictionary = dynamicObject as IDictionary<string, Object>;
                        for (int j = 1; j <= 10; j++)
                        {
                            string bnycD = $"bnycD{j}";
                            string bnypC = $"bnypC{j}";
                            string bnyrlN = $"bnyrlN{j}";
                            string bnyseL = $"bnyseL{j}";
                            string effectiveDate = $"effectiveDate{j}";
                            dynamicDictionary.Add(bnycD, "");
                            dynamicDictionary.Add(bnypC, "");
                            dynamicDictionary.Add(bnyrlN, "");
                            dynamicDictionary.Add(bnyseL, "");
                            dynamicDictionary.Add(effectiveDate, "");
                        }
                        ChangeInNomineeRequests changeInNomineeRequests = new ChangeInNomineeRequests();
                        for (int i = 1; i <= AppointeName_New.Count; i++)
                        {
                            RequestBodyP requestBodyP = new RequestBodyP();
                            Flag = 0;
                            foreach (var DOB in AppointeDOB_New)
                            {

                                DateTime parsedDate = DateTime.ParseExact(DOB.TagValue, "dd/mm/yyyy", null);
                                string resultDateString = parsedDate.ToString("yyyyMMdd");
                                if (Flag != 1)
                                {
                                    requestBodyP.Addrtype = "R";
                                    requestBodyP.Cltdobx = resultDateString;
                                    requestBodyP.Cltpcode = "400065";
                                    requestBodyP.CltphonE01 = "";
                                    requestBodyP.CltphonE02 = "";
                                    requestBodyP.Cltsex = "M";
                                    requestBodyP.Cltstat = "AC";
                                    requestBodyP.Ctrycode = "IND";
                                    requestBodyP.Language = "E";
                                    requestBodyP.Lgivname = AppointeName_New[i - 1].TagValue;
                                    requestBodyP.Lsurname = AppointeName_New[i - 1].TagValue;
                                    requestBodyP.Marryd = "S";
                                    requestBodyP.Natlty = "IND";
                                    requestBodyP.Nmfmt = "2";
                                    requestBodyP.Occpcode = "BUSS";
                                    requestBodyP.Salutl = "MR";
                                    requestBodyP.Srdate = DateString;
                                    requestBodyP.Rinternet = "";
                                    requestBodyP.Rmblphone = "";
                                    requestBodyP.Decgrsal = "0";
                                    requestBodyP.Soe = "0";
                                }
                                Flag = 1;

                            }
                            string url = _workFlowCalls.GetURLS().ClientCreateP;
                            response = await _workFlowCalls.SurrenderWorkFlow(requestBodyP, url, values.ServiceRequestid);
                            var responseObject = JsonConvert.SerializeObject(response);
                            ClientResponse clientResponse = JsonConvert.DeserializeObject<ClientResponse>(responseObject);

                            dynamicDictionary["bnycD1"] = "N";
                            dynamicDictionary["bnypC1"] = "0";
                            dynamicDictionary["bnyrlN1"] = Relationship_New[i - 1].TagValue;
                            dynamicDictionary["bnyseL1"] = clientResponse.ResponseOutput.ResponseBody.PolicyNumber;
                            dynamicDictionary["effectiveDate1"] = DateString;

                        }
                        dynamic body = new
                        {
                            policyNumber = values.polyceNumber,

                        };
                        string Client = _workFlowCalls.GetURLS().GetNomineeEnquiry;
                        response = await _workFlowCalls.LAContactAddressUpdates(body, Client);
                        var res = JsonConvert.SerializeObject(response);
                        NomineeEnquiry nomineeEnquiry = JsonConvert.DeserializeObject<NomineeEnquiry>(res);
                        foreach (var Nomine in nomineeEnquiry.ResponseOutput.ResponseBody.nomineeEnquiry)
                        {

                            if (Nomine.bnyrln != "AP")
                            {
                                int j = 2;
                                dynamicDictionary["bnycD" + j + ""] = "";
                                dynamicDictionary["bnypC" + j + ""] = Nomine.bnypc;
                                dynamicDictionary["bnyrlN" + j + ""] = Nomine.bnyrln;
                                dynamicDictionary["bnyseL" + j + ""] = Nomine.bnysel;
                                dynamicDictionary["effectiveDate" + j + ""] = Nomine.effectiveDate;
                            }

                        }
                        dynamicDictionary["policyNumber"] = values.polyceNumber;
                        string jsonResult = JsonConvert.SerializeObject(dynamicObject, Formatting.Indented);
                        object fg = JsonConvert.DeserializeObject<object>(jsonResult);
                        string url1 = _workFlowCalls.GetURLS().GetNomineeCreation;
                        response = await _workFlowCalls.AppointeChange(fg, url1, values.ServiceRequestid);
                    }
                }
                if (req.Query["reqtype"] == "6_3_Update")
                {
                    string clientNo = data?.Where(x => x.TagName == "Client_Id").FirstOrDefault()?.TagValue;
                    string Salutation = data?.Where(x => x.TagName == "Salutation_New").FirstOrDefault()?.TagValue;
                    string FirstName = data?.Where(x => x.TagName == "FirstName_New").FirstOrDefault()?.TagValue;
                    string MiddleName = data?.Where(x => x.TagName == "MiddleName_New").FirstOrDefault()?.TagValue;
                    string LastName = data?.Where(x => x.TagName == "LastName_New").FirstOrDefault()?.TagValue;

                    dynamic body = new
                    {

                        clientNumber = clientNo,

                    };
                    string url = _workFlowCalls.GetURLS().GetClientEnquiry;

                    response = await _workFlowCalls.LAContactAddressUpdates(body, url);
                    string jsonResponse = JsonConvert.SerializeObject(response);
                    AddressdetailsUpdate fg = JsonConvert.DeserializeObject<AddressdetailsUpdate>(jsonResponse);
                    fg.ResponseOutput.ResponseBody.salutl= Salutation.ToUpper();
                    fg.ResponseOutput.ResponseBody.lsurname = LastName.ToString();
                    fg.ResponseOutput.ResponseBody.lgivname = FirstName.ToString();
                    fg.ResponseOutput.ResponseBody.initials = MiddleName.ToString();
                    string clttype = data?.Where(x => x.TagName == "clttype").FirstOrDefault()?.TagValue ?? "0";

                    if (clttype == "C")
                    {
                        string url2 = _workFlowCalls.GetURLS().ClientUpdateC;
                        RequestBodyC RequestBody = JsonConvert.DeserializeObject<RequestBodyC>(JsonConvert.SerializeObject(fg.ResponseOutput.ResponseBody));
                        RequestBody.Cltpcode = "411039";
                        RequestBody.Clttwo = clientNo;
                        RequestBody.Nmfmt = "2";
                        //RequestBody.Secuityno = "95";
                        response = await _workFlowCalls.LAContactAddressUpdates(fg.ResponseOutput.ResponseBody, url2);
                    }
                    else
                    {

                        string url1 = _workFlowCalls.GetURLS().ClientUpdateP;

                        //Object FG = JsonConvert.DeserializeObject<Object>(fg.ResponseOutput.ResponseBody.ToString());
                        RequestBodyP RequestBody = JsonConvert.DeserializeObject<RequestBodyP>(JsonConvert.SerializeObject(fg.ResponseOutput.ResponseBody));
                        RequestBody.Cltdobx = fg.ResponseOutput.ResponseBody.clTdob;
                        RequestBody.Cltpcode = "411039";
                        RequestBody.Clttwo = clientNo;
                        RequestBody.Nmfmt = "2";
                        var JSON = JsonConvert.SerializeObject(RequestBody);
                        response = await _workFlowCalls.LAContactAddressUpdates(RequestBody, url1);
                       
                    }
                }

                //if (req.Query["reqtype"] == "6_4_Update")
                //{
                //    string clientNo = data?.Where(x => x.TagName == "Client_Id").FirstOrDefault()?.TagValue;
                //    string ClientRole = data?.Where(x => x.TagName == "ClientRole").FirstOrDefault()?.TagValue;
                //    string DOBOld = data?.Where(x => x.TagName == "DOB_Old").FirstOrDefault()?.TagValue;
                //    string AgeOld = data?.Where(x => x.TagName == "Age_Old").FirstOrDefault()?.TagValue;
                //    string DOBNew = data?.Where(x => x.TagName == "DOB_New").FirstOrDefault()?.TagValue;
                //    string AgeNew = data?.Where(x => x.TagName == "Age_New").FirstOrDefault()?.TagValue;
                //    DateTime parsedDate1 = DateTime.ParseExact(DOBNew, "dd/mm/yyyy", null);
                //    string DateString = parsedDate1.ToString("yyyyMMdd");
                //    dynamic body = new
                //    {

                //        clientNumber = clientNo,

                //    };
                //    string url = _workFlowCalls.GetURLS().GetClientEnquiry;
                //    response = await _workFlowCalls.LAContactAddressUpdates(body, url);
                //    string jsonResponse = JsonConvert.SerializeObject(response);
                //    AddressdetailsUpdate fg = JsonConvert.DeserializeObject<AddressdetailsUpdate>(jsonResponse);
                //    //string clttype = data?.Where(x => x.TagName == "clttype").FirstOrDefault()?.TagValue ?? "0";

                //    if (fg.ResponseOutput.ResponseBody.clttype == "P")
                //    {
                //        string url1 = _workFlowCalls.GetURLS().ClientUpdateP;

                //        //Object FG = JsonConvert.DeserializeObject<Object>(fg.ResponseOutput.ResponseBody.ToString());
                //        RequestBodyP RequestBody = JsonConvert.DeserializeObject<RequestBodyP>(JsonConvert.SerializeObject(fg.ResponseOutput.ResponseBody));
                //        //RequestBody.Cltpcode = "411039";
                //        RequestBody.Clttwo = clientNo;
                //        RequestBody.Cltdobx = DateString;
                //        RequestBody.Nmfmt = "2";
                //        response = await _workFlowCalls.LAContactAddressUpdates(RequestBody, url1);
                //    }
                //    else if(fg.ResponseOutput.ResponseBody.clttype=="C")
                //    {
                //        string url2 = _workFlowCalls.GetURLS().ClientUpdateC;
                //        RequestBodyC RequestBody = JsonConvert.DeserializeObject<RequestBodyC>(JsonConvert.SerializeObject(fg.ResponseOutput.ResponseBody));
                //        //RequestBody.Cltpcode = "411039";
                //        RequestBody.Clttwo = clientNo;
                //        RequestBody.Nmfmt = "2";
                //        //RequestBody.Secuityno = "95";
                //        response = await _workFlowCalls.LAContactAddressUpdates(fg.ResponseOutput.ResponseBody, url2);
                //    }
                //}

                if (req.Query["reqtype"] == "6_6_Update") // Home or Alternative no Update
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    string clientNo = data?.Where(x => x.TagName == "Client_Id").FirstOrDefault()?.TagValue;
                    string gstinNo = data?.Where(x => x.TagName == "NewGSTINNumber").FirstOrDefault()?.TagValue;
                    dynamic body = new
                    {
                        policyNumber = clientNo,
                        zgstidno = gstinNo

                    };
                    string url = _workFlowCalls.GetURLS().GSTINUpdate;
                    response = await _workFlowCalls.GSTINUpdate(body, url);
                }
                if (req.Query["reqtype"] == "14_1_Update")
                {
                    response = _workFlowCalls.SaveDNDDetails(serReqRefNo, data);
                }
                if (req.Query["reqtype"] == "23_1_Update")
                {   // Fund Switch
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    var serviceRequest = values.ServiceRequest as ServiceRequestModel;

                    // Get DateTime at 3PM
                    DateTime targetTime = new DateTime(serviceRequest.CreatedOn.Year, serviceRequest.CreatedOn.Month, serviceRequest.CreatedOn.Day, 15, 0, 0);

                    FundFrom FundFrom = new();
                    FundTo FundTo = new();
                    PerCentAmount perCentAmount = new();
                    TargetPercent targetPercent = new();

                    RequestBodyForFundSwitchEnquiry requestBody = new()
                    {
                        Policyno = values.polyceNumber,
                        EffectiveDate = DateTime.Now.ToString("yyyyMMdd"),
                        PCAMTIND = "P",
                        ZPOST3PM = serviceRequest.CreatedOn > targetTime ? "Y" : "N",
                        orswchfe = "N",
                        FundFrom = FundFrom,
                        FundTo = FundTo,
                        PerCentAmount = perCentAmount,
                        TargetPercent = targetPercent
                    };

                    for (int i = 1; i <= 10; i++)
                    {
                        // Percentage Form
                        PropertyInfo percentageFrom = typeof(PerCentAmount).GetProperty("perCentAmount" + i);

                        string percentFrom = data?.Where(x => x.TagName.Contains("PercentFrom_" + i)).FirstOrDefault()?.TagValue ?? "0";

                        percentageFrom.SetValue(perCentAmount, percentFrom);

                        // Percentage To
                        PropertyInfo percentageTo = typeof(TargetPercent).GetProperty("targetPercent" + i);

                        string percentTo = data?.Where(x => x.TagName.Contains("PercentTo_" + i)).FirstOrDefault()?.TagValue ?? "0";

                        percentageTo.SetValue(targetPercent, percentTo);

                        // Fund From
                        PropertyInfo fundFrom = typeof(FundFrom).GetProperty("fundFrom" + i);

                        string fudFrom = data?.Where(x => x.TagName.Contains("FundFrom_" + i)).FirstOrDefault()?.TagValue ?? "";

                        fundFrom.SetValue(FundFrom, fudFrom);

                        // Fund To
                        PropertyInfo fundTo = typeof(FundTo).GetProperty("fundTo" + i);

                        string fudTo = data?.Where(x => x.TagName.Contains("FundTo_" + i)).FirstOrDefault()?.TagValue ?? "";

                        fundTo.SetValue(FundTo, fudTo);
                    }

                    string url = _workFlowCalls.GetURLS().FundSwitchEnquiry;
                    response = await _workFlowCalls.FundSwitchWorkFlow(requestBody, url, values.ServiceRequestid);
                }
                if (req.Query["reqtype"] == "23_2_Update")
                {   // Premium Redirection
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    var serviceRequest = values.ServiceRequest as ServiceRequestModel;
                    RequestBodyForPremiumRedirection requestBody = new()
                    {
                        chdrsel = values.polyceNumber,
                        prcamtind = "P",
                    };

                    for (int i = 1; i <= 10; i++)
                    {
                        PropertyInfo propertiesOfPercentage = typeof(RequestBodyForPremiumRedirection).GetProperty("ualprC" + i.ToString("D2"));

                        string percentage = data?.Where(x => x.TagName.Contains("FundPercentage_" + i)).FirstOrDefault()?.TagValue ?? "0";

                        propertiesOfPercentage.SetValue(requestBody, percentage);

                        PropertyInfo propertiesFundName = typeof(RequestBodyForPremiumRedirection).GetProperty("vrtfnD" + i.ToString("D2"));

                        string fundName = data?.Where(x => x.TagName.Contains("FundName_" + i)).FirstOrDefault()?.TagValue ?? "";

                        propertiesFundName.SetValue(requestBody, fundName);
                    }

                    string url = _workFlowCalls.GetURLS().PremiumRedirection;
                    response = await _workFlowCalls.FundSwitchWorkFlow(requestBody, url, values.ServiceRequestid);
                }

                if (req.Query["reqtype"] == "22_1_Update")
                {

                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    var policyOwnr_Name_New = data?.Where(x => x.TagName.Contains("PolicyOwnerName_New")).FirstOrDefault()?.TagValue ?? "";
                    var CKYCNumber = data?.Where(x => x.TagName.Contains("AssigneeCKYCNumber")).FirstOrDefault()?.TagValue ?? "";
                    var existing_Client = data?.Where(x => x.TagName.Contains("ExistingClient")).FirstOrDefault()?.TagValue ?? "";
                    string clientNo = data?.Where(x => x.TagName == "PolicyOwnerClientID_New").FirstOrDefault()?.TagValue;
                    string ClientDOB = data?.Where(x => x.TagName == "AssigneeDOB").FirstOrDefault()?.TagValue;
                    string assignmentCondition = data?.Where(x => x.TagName == "AssignmentCondition_New").FirstOrDefault()?.TagValue;
                    string addressLine1 = data?.Where(x => x.TagName == "AddressLine1").FirstOrDefault()?.TagValue;
                    string addressLine2 = data?.Where(x => x.TagName == "AddressLine2").FirstOrDefault()?.TagValue;
                    string addressLine3 = data?.Where(x => x.TagName == "AddressLine3").FirstOrDefault()?.TagValue;
                    string city = data?.Where(x => x.TagName == "City_Old").FirstOrDefault()?.TagValue;
                    string state = data?.Where(x => x.TagName == "State_Old").FirstOrDefault()?.TagValue;
                   
                    string url = "";
                    ChangeInNomineeRequests changeInNomineeRequests = new ChangeInNomineeRequests();

                    RequestBodyP requestBodyP = new RequestBodyP();
                    if (existing_Client == "no")
                    {

                        DateTime parsedDate = DateTime.ParseExact(ClientDOB, "dd/mm/yyyy", null);
                        string resultDateString = parsedDate.ToString("yyyyMMdd");
                        requestBodyP.Addrtype = "R";
                        requestBodyP.Cltdobx = resultDateString;
                        requestBodyP.Cltpcode = "400065";
                        requestBodyP.CltphonE01 = "";
                        requestBodyP.CltphonE02 = "";
                        requestBodyP.Cltsex = "M";
                        requestBodyP.Cltstat = "AC";
                        requestBodyP.Ctrycode = "IND";
                        requestBodyP.Language = "E";
                        requestBodyP.Lgivname = policyOwnr_Name_New;
                        requestBodyP.Lsurname = policyOwnr_Name_New;
                        requestBodyP.Marryd = "S";
                        requestBodyP.Natlty = "IND";
                        requestBodyP.Nmfmt = "2";
                        requestBodyP.Occpcode = "BUSS";
                        requestBodyP.Salutl = "MR";
                        requestBodyP.Srdate = "";
                        requestBodyP.Rinternet = "";
                        requestBodyP.Rmblphone = "";
                        requestBodyP.Decgrsal = "0";
                        requestBodyP.Soe = "0";
                        requestBodyP.CltaddR01 = addressLine1;
                        requestBodyP.CltaddR02 = addressLine2;
                        requestBodyP.CltaddR03 = addressLine3;
                        requestBodyP.CltaddR04 = city;
                        requestBodyP.CltaddR05 = state;


                        url = _workFlowCalls.GetURLS().ClientCreateP;
                        var js = JsonConvert.SerializeObject(requestBodyP);
                        log.LogInformation("Trigger The ClientCreateP");
                    }
                    else
                    {
                        dynamic body = new
                        {
                            clientNumber = clientNo,
                        };
                        url = _workFlowCalls.GetURLS().GetClientEnquiry;

                        response = await _workFlowCalls.LAContactAddressUpdates(body, url);
                        string jsonResponse = JsonConvert.SerializeObject(response);
                        AddressdetailsUpdate fg = JsonConvert.DeserializeObject<AddressdetailsUpdate>(jsonResponse);
                        fg.ResponseOutput.ResponseBody.lgivname = policyOwnr_Name_New;
                        fg.ResponseOutput.ResponseBody.lsurname = policyOwnr_Name_New;
                        url = _workFlowCalls.GetURLS().ClientUpdateP;
                        RequestBodyP RequestBody = JsonConvert.DeserializeObject<RequestBodyP>(JsonConvert.SerializeObject(fg.ResponseOutput.ResponseBody));
                    }
                    response = await _workFlowCalls.SurrenderWorkFlow(requestBodyP, url, values.ServiceRequestid);
                    var responseObject = JsonConvert.SerializeObject(response);
                    log.LogInformation(responseObject);
                    ClientResponse clientResponse = JsonConvert.DeserializeObject<ClientResponse>(responseObject);
                    _workFlowCalls.SaveCKYCDetails(CKYCNumber, values.ServiceRequest.CustomerRef);

                    ContractAssignmentRequest requestBody = new()
                    {
                        policyNumber = values.polyceNumber,
                       
                            listAssignments = new List<ContractAssignment>
                            {
                                 new ContractAssignment
                                    {
                                    assignee = (clientNo == "" || clientNo == null) ? clientResponse.ResponseOutput.ResponseBody.PolicyNumber: clientNo,
                                    commission_From_date = "20231120",
                                    commission_To_date = "20251120",
                                    incomeProof = "FORM16",
                                    incomeProofIsRequired = "N",
                                    reasonCode = assignmentCondition.ToUpper()
                                    }
                                }
                    };

                    string url1 = _workFlowCalls.GetURLS().ContractAssignment;
                    response = await _workFlowCalls.ContractAssignment(requestBody, url1, values.ServiceRequestid);


                }


                if (req.Query["reqtype"] == "6_5_Update")   //Chnage In OwnerShip
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    var proposerName_New = data?.Where(x => x.TagName.Contains("ProposerName_New")).FirstOrDefault()?.TagValue ?? "";
                    var proposerDOB_New = data?.Where(x => x.TagName.Contains("ProposerDOB_New")).FirstOrDefault()?.TagValue ?? "";
                    var addressLine1 = data?.Where(x => x.TagName.Contains("AddressLine1_New")).FirstOrDefault()?.TagValue ?? "";
                    var addressLine2 = data?.Where(x => x.TagName.Contains("AddressLine2_New")).FirstOrDefault()?.TagValue ?? "";
                    var adressLine3 = data?.Where(x => x.TagName.Contains("AddressLine3_New")).FirstOrDefault()?.TagValue ?? "";
                    var city = data?.Where(x => x.TagName.Contains("City_New")).FirstOrDefault()?.TagValue ?? "";
                    var state = data?.Where(x => x.TagName.Contains("State_New")).FirstOrDefault()?.TagValue ?? "";
                    var proposerMobileNumber_New = data?.Where(x => x.TagName.Contains("ProposerMobileNumber_New")).FirstOrDefault()?.TagValue ?? "";
                    var CKYCNumber = data?.Where(x => x.TagName.Contains("CKYCNumber")).FirstOrDefault()?.TagValue ?? "";
                    DateTime parsedDate1 = DateTime.ParseExact(DateTime.Now.ToString("dd/mm/yyyy"), "dd/mm/yyyy", null);
                    string DateString = parsedDate1.ToString("yyyyMMdd");
              

                    ChangeInNomineeRequests changeInNomineeRequests = new ChangeInNomineeRequests();

                    RequestBodyP requestBodyP = new RequestBodyP();
                        DateTime parsedDate = DateTime.ParseExact(proposerDOB_New, "dd/mm/yyyy", null);
                        string resultDateString = parsedDate.ToString("yyyyMMdd");
                        requestBodyP.Addrtype = "R";
                        requestBodyP.Cltdobx = resultDateString;
                        requestBodyP.Cltpcode = "400065";
                        requestBodyP.CltphonE01 = "";
                        requestBodyP.CltphonE02 = "";
                        requestBodyP.Cltsex = "M";
                        requestBodyP.Cltstat = "AC";
                        requestBodyP.Ctrycode = "IND";
                        requestBodyP.Language = "E";
                        requestBodyP.Lgivname = proposerName_New;
                        requestBodyP.Lsurname = proposerName_New;
                        requestBodyP.Marryd = "S";
                        requestBodyP.Natlty = "IND";
                        requestBodyP.Nmfmt = "2";
                        requestBodyP.Occpcode = "BUSS";
                        requestBodyP.Salutl = "MR";
                        requestBodyP.Srdate = DateString;
                        requestBodyP.Rinternet = "";
                        requestBodyP.Rmblphone = "";
                        requestBodyP.Decgrsal = "0";
                        requestBodyP.Soe = "0";
                        requestBodyP.CltaddR01 = addressLine1;
                        requestBodyP.CltaddR02 = addressLine2;
                        requestBodyP.CltaddR03 = adressLine3;
                        requestBodyP.CltaddR04 = city;
                        requestBodyP.CltaddR05 = state;
                        requestBodyP.CltphonE01 = proposerMobileNumber_New;
                        string url = _workFlowCalls.GetURLS().ClientCreateP;
                        var js = JsonConvert.SerializeObject(requestBodyP);
                        log.LogInformation("Trigger The ClientCreateP");
                        response = await _workFlowCalls.SurrenderWorkFlow(requestBodyP, url, values.ServiceRequestid);
                        var responseObject = JsonConvert.SerializeObject(response);
                        log.LogInformation(responseObject);
                        ClientResponse clientResponse = JsonConvert.DeserializeObject<ClientResponse>(responseObject);

                        response = _workFlowCalls.BankUpdate(data, serReqRefNo);

                        _workFlowCalls.SaveCKYCDetails(CKYCNumber, values.ServiceRequest.CustomerRef);
                        string clientNo = data?.Where(x => x.TagName == "Client_Id").FirstOrDefault()?.TagValue;

                        AbsoluteAssignment requestBody = new()
                        {
                            chdrsel = values.polyceNumber,
                            clntwin = clientResponse.ResponseOutput.ResponseBody.PolicyNumber,
                            reasoncd = "DEAD"
                        };

                        string url1 = _workFlowCalls.GetURLS().AbsoluteAssignment;
                        response = await _workFlowCalls.AbsoluteAssignment(requestBody, url1, values.ServiceRequestid);
                    }
                if (req.Query["reqtype"] == "25_1_Update" || req.Query["reqtype"] == "25_2_Update"|| req.Query["reqtype"] == "25_3_Update"|| req.Query["reqtype"] == "25_4_Update" || req.Query["reqtype"] == "25_5_Update" || req.Query["reqtype"] == "25_6_Update"
                    || req.Query["reqtype"] == "25_7_Update" || req.Query["reqtype"] == "25_8_Update" || req.Query["reqtype"] == "25_9_Update" || req.Query["reqtype"] == "25_10_Update" || req.Query["reqtype"] == "25_11_Update")
                {
                    var Initiate_Reprocessing = data?.Where(x => x.TagName.Contains("InitiateReprocessingBy")).FirstOrDefault()?.TagValue ?? "";
                    if(Initiate_Reprocessing=="NEFT")
                    {
                        response = _workFlowCalls.BankUpdate(data, serReqRefNo);
                    }
                    else
                    {
                        response = "Cheque";
                    }
                }
                if (req.Query["reqtype"] == "1_4_Update" || req.Query["reqtype"] == "1_9_Update" || req.Query["reqtype"] == "1_5_Update")//Hold ECS Debit
                {

                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);

                    MandatetagEnquiryRequest requestBody = new()
                    {
                        chdrsel = values.polyceNumber,
                       
                    };

                    string url1 = _workFlowCalls.GetURLS().GetMandatetagEnquiry;
                    response = await _workFlowCalls.MandatetagEnquiry(requestBody, url1, values.ServiceRequestid);
                    string jsonResponse = JsonConvert.SerializeObject(response);

                    Mandate re = JsonConvert.DeserializeObject<Mandate>(jsonResponse);
                    MandateRequest mandaterequestBody = new()
                    {
                        clntnum = /*re?.ResponseOutput?.responseBody?.clntnum*/"50161487",
                        mandreff = /*"00002"*/re.ResponseOutput?.responseBody?.bankDetailsList?.FirstOrDefault
                        (bankDetail => !string.IsNullOrEmpty(bankDetail?.mandref))?.mandref,
                        applicationNo = ""
                    };
                   
                    //foreach (var bankDetail in re.ResponseOutput?.responseBody?.bankDetailsList ?? Enumerable.Empty<Bankdetailslist>())
                    //{
                    //    mandaterequestBody.mandreff = bankDetail?.mandref;


                    //}

                    string url = _workFlowCalls.GetURLS().MandateEnquiry;
                    response = await _workFlowCalls.MandateEnquiry(mandaterequestBody, url, values.ServiceRequestid);
                    string jsonResponse1 = JsonConvert.SerializeObject(response);
                    MandateUpdateResponse mandate = JsonConvert.DeserializeObject<MandateUpdateResponse>(jsonResponse1);
                    string mandstat;
                    if (values.ServiceRequest.CallType == 1 && values.ServiceRequest.SubType == 4)
                    {
                        mandstat = "97";
                    }
                    else if (values.ServiceRequest.CallType == 1 && values.ServiceRequest.SubType == 5)
                    {
                        mandstat = "97";
                    }
                    else
                    {
                        mandstat = "10";
                    }
                    
                    MandateUpdateRequest updateRequest = new()
                    {
                        clntnum = /*re?.ResponseOutput?.responseBody?.clntnum*/"50161487",
                        mandreff = "00002",                     
                        dteaprov = "",
                        bankacckey =mandate?.ResponseOutput.responseBody?.bankacckey,
                        bankkey = mandate?.ResponseOutput.responseBody?.bankkey,
                        detlsumm = mandate?.ResponseOutput.responseBody?.detlsumm,
                        effdate = mandate?.ResponseOutput.responseBody?.effdate,
                        facthous = mandate?.ResponseOutput.responseBody?.facthous,
                        mandamt = mandate?.ResponseOutput.responseBody?.mandamt,
                        mandstat = mandstat,
                        timesuse = mandate?.ResponseOutput.responseBody?.timesuse,
                        zddday = mandate?.ResponseOutput.responseBody?.zddday,
                        bkcardnum = /*mandate?.ResponseOutput.responseBody?.bkcardnum*/"",
                        dtefrej = "01/01/2024",
                        dtefsbm = "01/01/2024",
                        dtesrej = "01/01/2024",
                        dtessbm = "01/01/2024",
                        freason = "",
                        sreason = "",
                        applicationNo = "",
                    };
                    string url2 = _workFlowCalls.GetURLS().MandateUpdate;
                    response = await _workFlowCalls.MandateUpdate(updateRequest, url2, values.ServiceRequestid);
                }

                #endregion

                #region Type LA FETCH
                if (req.Query["reqtype"] == "11_2_Fetch")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    dynamic body = new
                    {
                        policyNo = values.polyceNumber,
                    };
                    string url = _workFlowCalls.GetURLS().LoanStatement;
                    response = await _workFlowCalls.LoanStatment(body, url, values.ServiceRequestid);
                    if (response != null)
                    {
                        var jsonpath = JsonConvert.SerializeObject(response);
                        LoanStatement loanStatement = JsonConvert.DeserializeObject<LoanStatement>(jsonpath);
                        var loanStatementResponse = "";
                        if (loanStatement != null || loanStatement.ResponseOutput.responseBody!=null)
                        {
                            loanStatementResponse = _workFlowCalls.LoanStatementResponse(loanStatement, url, values.ServiceRequestid);
                        }
                    }
                    else
                    {
                        _workFlowCalls.UpdateStatusInDatabase(serReqRefNo);
                    }

                }
                if (req.Query["reqtype"] == "1_2_Fetch")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    var serviceRequest = values.ServiceRequest as ServiceRequestModel;
                    PaymentLinkFGRequest reqBodyPayment = new()
                    {
                        requestHeader = new()
                        {
                            applicationNo = values.ApplicationNo,
                            source = "POS", // Need to change
                            dob = serviceRequest.DOB,
                            policyNo = values.polyceNumber
                        },
                        requestBody = new()
                        {
                            paymentmode = "SI"
                        }
                    };
                    string url = _workFlowCalls.GetURLS().PaymentLink;
                    response = await _workFlowCalls.PaymentLink<PaymentLinkFGRequest>(reqBodyPayment, url, values.ServiceRequestid);
                    var resp = JsonConvert.SerializeObject(response);
                    _workFlowCalls.LifeAsiaError(resp, serReqRefNo);
                }
                // Renewal Premium Recipt 
                if (req.Query["reqtype"] == "2_1_Fetch")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    var serviceRequest = values.ServiceRequest as ServiceRequestModel;
                    ServicingDocumentsRequest ServicingDocumentsRequest = new()
                    {
                        requestheader = new()
                        {
                            source = "POS",
                            policyno = values.polyceNumber,
                            ApplicationNo = values.ApplicationNo,
                            dob = serviceRequest.DOB,
                        },
                        requestbody = new()
                        {
                            IndexName = "Renewal Premium Receipt"
                        },
                    };

                    string urlList = _workFlowCalls.GetURLS().GetDMSDocumentsList;
                    response = await _workFlowCalls.ListOfSurvicingDocuments(ServicingDocumentsRequest, urlList, values.ServiceRequestid, data);
                    List<FileItem> responses = (List<FileItem>)response;
                    if (responses.Count == 0)
                    {
                        //long serviceRequestid = values.ServiceRequestid;
                        _workFlowCalls.UpdateStatusInDatabase(serReqRefNo);
                    }
                }
                if (req.Query["reqtype"] == "2_4_Fetch")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    var serviceRequest = values.ServiceRequest as ServiceRequestModel;
                    ServicingDocumentsRequest ServicingDocumentsRequest = new()
                    {
                        requestheader = new()
                        {
                            source = "POS",
                            policyno = values.polyceNumber,
                            ApplicationNo = values.ApplicationNo,
                            dob = serviceRequest.DOB,
                        },
                        requestbody = new()
                        {
                            IndexName = "SIS"
                        },
                    };

                    string url = _workFlowCalls.GetURLS().getDMSDocuments;
                    response = await _workFlowCalls.SurvicingDocuments(ServicingDocumentsRequest, url, values.ServiceRequestid);
                    var resp = JsonConvert.SerializeObject(response);
                    _workFlowCalls.LifeAsiaError(resp,serReqRefNo);
                }

                if (req.Query["reqtype"] == "2_6_Fetch")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    string DocNo = data?.Where(x => x.TagName == "sisDocumentType").FirstOrDefault()?.TagValue;
                    string link = _workFlowCalls.GetFormDocLnks(2,6,Convert.ToInt32(DocNo));
                    string GetDocName = _workFlowCalls.GetDocName(Convert.ToInt32(DocNo));

                    string base64String = null;
                    using (WebClient client = new WebClient())
                    {
                        var bytes = client.DownloadData(link);
                         base64String = Convert.ToBase64String(bytes);
                    }
                    if (base64String != null)
                    {
                        response = _workFlowCalls.Formdata(Convert.ToInt32(values.ServiceRequestid), null, base64String, GetDocName);
                       if (response == null)
                        {
                            var resp = JsonConvert.SerializeObject(response);
                            _workFlowCalls.LifeAsiaError(resp, serReqRefNo);
                        }
                    }
                    else
                    {
                        _workFlowCalls.UpdateStatusInDatabase(serReqRefNo);
                    }
                }
                if (req.Query["reqtype"] == "2_7_Fetch")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    var serviceRequest = values.ServiceRequest as ServiceRequestModel;
                    ServicingDocumentsRequest ServicingDocumentsRequest = new()
                    {
                        requestheader = new()
                        {
                            source = "POS",
                            policyno = values.polyceNumber,
                            ApplicationNo = values.ApplicationNo,
                            dob = serviceRequest.DOB
                        },
                        requestbody = new()
                        {
                            IndexName = "First Premium Receipt"
                        },
                    };

                    string url = _workFlowCalls.GetURLS().getDMSDocuments;
                    response = await _workFlowCalls.SurvicingDocuments(ServicingDocumentsRequest, url, values.ServiceRequestid);
                    var resp = JsonConvert.SerializeObject(response);
                    _workFlowCalls.LifeAsiaError(resp, serReqRefNo);

                }
                if (req.Query["reqtype"] == "2_2_Fetch")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    string Year = data?.Where(x => x.TagName == "Year").FirstOrDefault()?.TagValue;

                    PPCRequest PPCRequest = new()
                    {
                        RequestBody = new()
                        {
                            policyNo = values.polyceNumber,
                            year = Year
                        }
                    };
                    string ppcUrl = _workFlowCalls.GetURLS().GetPPC;
                    response = await _workFlowCalls.PPC(PPCRequest, ppcUrl, values.ServiceRequestid);
                    var jsonpath=JsonConvert.SerializeObject(response);
                    PPC pPC=JsonConvert.DeserializeObject<PPC>(jsonpath);
                    if (pPC.ResponseOutput.responseBody.bytes != null)
                    {
                        string GeneratedPdfUrl = _workFlowCalls.GetURLS().GeneratedPdf;
                        response = _workFlowCalls.PPCResponse(pPC, values.ServiceRequestid, values.ApplicationNo, Year, GeneratedPdfUrl);
                        ServicingDocumentsResponse servicingDocumentsResponse = (ServicingDocumentsResponse)response;
                        if(response==null)
                        {
                            _workFlowCalls.UpdateStatusInDatabase(serReqRefNo);
                        }
                        else if(servicingDocumentsResponse.responseBody.dmsFilesList.Count == 0)
                        {
                            _workFlowCalls.UpdateStatusInDatabase(serReqRefNo);
                        }
                    }
                    else
                    {
                        //long serviceRequestid = values.ServiceRequestid;
                        _workFlowCalls.UpdateStatusInDatabase(serReqRefNo);
                    }
                    log.LogInformation("Log Response");
                    log.LogInformation(JsonConvert.SerializeObject(response));
                }
                if (req.Query["reqtype"] == "2_8_Fetch")
                {

                 
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    // response = _workFlowCalls.UnitStatementResponse(values.ServiceRequestid, values.ApplicationNo, "12/01/2013");
                    string DateFrom = data?.Where(x => x.TagName == "FromDate").FirstOrDefault()?.TagValue;
                    var dateformat = DateTime.ParseExact(DateFrom, "dd/MM/yyyy", CultureInfo.InvariantCulture).ToString("MM/dd/yyyy");
                    UnitStatementRequest UnitStatementRequest = new()
                    {
                        RequestBody = new()
                        {
                            policyNo = values.polyceNumber,
                            DateFrom = dateformat
                        }
                    };
                    
                    string UnitStatement = _workFlowCalls.GetURLS().UnitStatement;
                    response = await _workFlowCalls.UnitStatement(UnitStatementRequest, UnitStatement, values.ServiceRequestid);
                    log.LogInformation("response");
                    var jsonpath = JsonConvert.SerializeObject(response);
                    log.LogInformation("jsonpath");
                    PPC pPC = JsonConvert.DeserializeObject<PPC>(jsonpath);
                    log.LogInformation("Unit statement");
                    if (pPC.ResponseOutput.responseBody != null)
                    {
                        log.LogInformation("responseBody");
                        string GeneratedPdfUrl = _workFlowCalls.GetURLS().GeneratedPdf;
                        response = _workFlowCalls.UnitStatementResponse(pPC, values.ServiceRequestid, values.ApplicationNo, DateFrom, GeneratedPdfUrl,log);
                        log.LogInformation("Completed");
                    }
                    else
                    {
                        //long serviceRequestid = values.ServiceRequestid;
                        _workFlowCalls.UpdateStatusInDatabase(serReqRefNo);
                    }
                }
                if (req.Query["reqtype"] == "19_2_Fetch")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    var serviceRequest = values.ServiceRequest as ServiceRequestModel;
                    ServicingDocumentsRequest ServicingDocumentsRequest = new()
                    {
                        requestheader = new()
                        {
                            source = "POS",
                            policyno = values.polyceNumber,
                            ApplicationNo = values.ApplicationNo,
                            dob = serviceRequest.DOB
                        },
                        requestbody = new()
                        {
                            IndexName = "Policy Bond Request"
                        },
                    };

                    string url = _workFlowCalls.GetURLS().getDMSDocuments;
                    response = await _workFlowCalls.SurvicingDocuments(ServicingDocumentsRequest, url, values.ServiceRequestid);
                    var resp = JsonConvert.SerializeObject(response);
                    _workFlowCalls.LifeAsiaError(resp, serReqRefNo);
                }
                if (req.Query["reqtype"] == "21_1_Fetch")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    var serviceRequest = values.ServiceRequest as ServiceRequestModel;
                    ServicingDocumentsRequest ServicingDocumentsRequest = new()
                    {
                        requestheader = new()
                        {
                            source = "POS",
                            policyno = values.polyceNumber,
                            ApplicationNo = values.ApplicationNo,
                            dob = serviceRequest.DOB
                        },
                        requestbody = new()
                        {
                            IndexName = "Medical Report"
                        },
                    };

                    string url = _workFlowCalls.GetURLS().getDMSDocuments;
                    response = await _workFlowCalls.SurvicingDocuments(ServicingDocumentsRequest, url, values.ServiceRequestid);

                }
                if (req.Query["reqtype"] == "2_3_Fetch")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    var serviceRequest = values.ServiceRequest as ServiceRequestModel;
                    ServicingDocumentsRequest ServicingDocumentsRequest = new()
                    {
                        requestheader = new()
                        {
                            source = "POS",
                            policyno = values.polyceNumber,
                            ApplicationNo = values.ApplicationNo,
                            dob = serviceRequest.DOB,
                        },
                        requestbody = new()
                        {
                            IndexName = "DISC"
                        },
                    };

                    string url = _workFlowCalls.GetURLS().getDMSDocuments;
                    response = await _workFlowCalls.SurvicingDocuments(ServicingDocumentsRequest, url, values.ServiceRequestid);
                    var resp = JsonConvert.SerializeObject(response);
                    _workFlowCalls.LifeAsiaError(resp, serReqRefNo);
                }
                if (req.Query["reqtype"] == "19_2_Fetch")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    var serviceRequest = values.ServiceRequest as ServiceRequestModel;
                    ServicingDocumentsRequest ServicingDocumentsRequest = new()
                    {
                        requestheader = new()
                        {
                            source = "POS",
                            policyno = values.polyceNumber,
                            ApplicationNo = values.ApplicationNo,
                            dob = serviceRequest.DOB,
                        },
                        requestbody = new()
                        {
                            IndexName = "Policy Bond Request"
                        },
                    };

                    string url = _workFlowCalls.GetURLS().getDMSDocuments;
                    response = await _workFlowCalls.SurvicingDocuments(ServicingDocumentsRequest, url, values.ServiceRequestid);
                    var resp = JsonConvert.SerializeObject(response);
                    _workFlowCalls.LifeAsiaError(resp, serReqRefNo);
                }
                #endregion

                #region NLP For Email Management
                if (req.Query["reqtype"] == "LANLPAPI")
                {
                    EmailManagementRequest body = new()
                    {
                        Source = "aiteam",
                        Email = req.Query["body"]
                    };
                    string url = _workFlowCalls.GetURLS().NLPAPI;
                    response = await _workFlowCalls.LANLPAPI(body, url);
                }
                #endregion

                if (req.Query["reqtype"] == "998_998_EMS")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);


                    dynamic body = new
                    {
                        mobileNo = "",
                        pan = "",
                        customerID = "",
                        firstname = "",
                        middlename = "",
                        lastname = "",
                        EmailId = req.Query["body"]
                    };
                    string url = _workFlowCalls.GetURLS().SearchEmail;
                    response = await _workFlowCalls.EmsService(body, url);
                }

                #region Payee Code
                if (req.Query["reqtype"] == "PayeeCodeCreation")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    RequestBodyForPayeeCodeCreation requestBody = new()
                    {
                        contractno = values.polyceNumber,
                        payeesel = values.cLientId,
                        subactype = "PS"
                    };

                    var serviceRequest = values.ServiceRequest as ServiceRequestModel;
                    requestBody.amount = data?.Where(x => x.TagName.Contains("PayableAmount")).FirstOrDefault()?.TagValue;
                    if (serviceRequest.CallType == 8)
                    {   // Partial Withdrawal
                        requestBody.reqntype = "PARTWTDL";
                    }
                    if (serviceRequest.CallType == 9 || (serviceRequest.CallType == 25 && serviceRequest.SubType == 7))
                    {   // Surrender
                        requestBody.reqntype = "SURENDER";
                    }
                    if (serviceRequest.CallType == 11)
                    {   // Loan
                        requestBody.reqntype = "LOANPAYT";
                    }
                    if (serviceRequest.CallType == 12)
                    {   // FreeLook
                        requestBody.reqntype = "FRLKCNCL";
                        requestBody.subactype = "S";
                    }
                    string url = _workFlowCalls.GetURLS().PayeeCodeCreation;
                    response = await _workFlowCalls.SurrenderWorkFlow(requestBody, url, values.ServiceRequestid, "PayeeCreation", serReqRefNo);
                }
                if (req.Query["reqtype"] == "PayeeCodeApproval")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);

                    string approverPassword = data?.Where(x => x.TagName.Contains("ApproverPassword")).FirstOrDefault()?.TagValue;
                    string payeecode = data?.Where(x => x.TagName.Contains("PayeeCode")).LastOrDefault()?.TagValue ?? "";
                    RequestBodyForPayeeCodeApproval requestBody = new()
                    {
                        paymentnum = payeecode,
                        passwd = approverPassword
                    };
                    string url = _workFlowCalls.GetURLS().PayeeCodeApproval;
                    response = await _workFlowCalls.SurrenderWorkFlow(requestBody, url, values.ServiceRequestid, "PayeeApprove",serReqRefNo);
                }
                if (req.Query["reqtype"] == "PayeeCodeAuth")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);

                    string financePassword = data?.Where(x => x.TagName.Contains("FinancePassword")).FirstOrDefault()?.TagValue;
                    AllocPayee allocPayee = _workFlowCalls.GetAllocPayeeCode(values.ServiceRequestid);
                    RequestBodyPayeeCodeAuth requestBody = new()
                    {
                        paymentnum = allocPayee?.PayeeCd ?? "",
                        passwd = "Welcome#",//financePassword,
                        chqdup = allocPayee?.ZcrtdatE1 ?? "",
                        zcrtdate = allocPayee?.CreatedOn.ToString("MM/dd/yyyy") ?? "",  //"02/15/2024",
                        zneftno = allocPayee?.NEFT_No ?? ""
                    };
                    string url = _workFlowCalls.GetURLS().PayeeCodeAuthorization;
                    response = await _workFlowCalls.SurrenderWorkFlow(requestBody, url, values.ServiceRequestid, "PayeeAuth");
                }
                if (req.Query["reqtype"] == "PayeeCodeReversal")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);

                    string financePassword = data?.Where(x => x.TagName.Contains("FinancePassword")).FirstOrDefault()?.TagValue;
                    string payeecode = data?.Where(x => x.TagName.Contains("PayeeCode")).LastOrDefault()?.TagValue;
                    dynamic requestBody = new
                    {
                        paymentnum= payeecode
                    };
                    string url = _workFlowCalls.GetURLS().GetPayeeCodeReversal;
                    response = await _workFlowCalls.SurrenderWorkFlow(requestBody, url, values.ServiceRequestid, "PayeeCodeReversal");
                }
                #endregion

                #region JV for Fund Transfer
                if (req.Query["reqtype"] == "JVCheck")
                {
                    var fundTransferValue = data?.Where(x => x.TagName == "FundTransfer").FirstOrDefault()?.TagValue;
                    if(fundTransferValue != null)
                    {
                        response = fundTransferValue.ToUpper() == "YES" ? true : false;
                    }
                    else
                    {
                        response = false;
                    }
                }
                if (req.Query["reqtype"] == "JVCreation")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    var serviceRequest = values.ServiceRequest as ServiceRequestModel;
                    var clientId = values.cLientId;
                    string fundTransferAmount = data?.Where(x => x.TagName == "FundTransferAmount").FirstOrDefault()?.TagValue ?? "";
                    string fundTransferTo = data?.Where(x => x.TagName == "FundTransferTo").FirstOrDefault()?.TagValue ?? "";
                    // Get DateTime at 3PM
                    DateTime targetTime = new DateTime(serviceRequest.CreatedOn.Year, serviceRequest.CreatedOn.Month, serviceRequest.CreatedOn.Day, 15, 0, 0);

                    RequestBodyForJVCreation requestBody = new()
                    {
                        policyNo = values.polyceNumber,
                        chdrtype = "U25", // Product Code 
                        register = "KAN", // Branch Code
                        rfcode = "CN",
                        rfnum = clientId, // Client ID of PA
                        srcebus = "ST", // Chanel id from UI Header
                        zrsndesc = "",
                        dissectionDetails = new()
                        {
                            new() // To Policy
                            {
                                bankCode = "10",
                                amount = fundTransferAmount, // Fund Transfer amount to another policy
                                entity = fundTransferTo, // To Policy
                                origccy = "INR",
                                sacscode = "LP",
                                sacstypw = "S",
                                scrate = "1",
                                trandesc = ""
                            },
                            new() // From Policy
                            {
                                bankCode = "10",
                                amount = fundTransferAmount,
                                entity = values.polyceNumber,
                                origccy = "INR",
                                sacscode = "LP",
                                sacstypw = "S",
                                scrate = "1",
                                trandesc = ""
                            }
                        }

                    };
                    string url = _workFlowCalls.GetURLS().JVCreation;
                    response = await _workFlowCalls.SurrenderWorkFlow(requestBody, url, values.ServiceRequestid,"JVCreation" ,serReqRefNo);
                }

                if (req.Query["reqtype"] == "JVApproval")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    var serviceRequest = values.ServiceRequest as ServiceRequestModel;
                    string documentNo = data?.Where(x => x.TagName == "JVDocNo").FirstOrDefault()?.TagValue ?? "";
                    dynamic requestBody = new
                    {
                        documentNo = documentNo, // From JV Creation
                        password = "abc"
                    };
                    string url = _workFlowCalls.GetURLS().JVApproval;
                    response = await _workFlowCalls.SurrenderWorkFlow(requestBody, url, values.ServiceRequestid,"", serReqRefNo);
                }

                #endregion

                #region Surrender // CT: 9, ST: 1
                if (req.Query["reqtype"] == "SurrenderRegistration")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    var serviceRequest = values.ServiceRequest as ServiceRequestModel;

                    // Get DateTime at 3PM
                    DateTime targetTime = new DateTime(serviceRequest.CreatedOn.Year, serviceRequest.CreatedOn.Month, serviceRequest.CreatedOn.Day, 15, 0, 0);

                    RequestBodyForSurrenderRegistration requestBody = new()
                    {
                        policyNo = values.polyceNumber,
                        effDate = serviceRequest.CreatedOn.ToString("dd/MM/yyyy"),
                        reasndesc = "test",
                        otheradjst = "",
                        reasoncd = "",
                        zposT3PM1 = serviceRequest.CreatedOn > targetTime ? "Y" : "N"
                    };
                    string url = _workFlowCalls.GetURLS().SurrenderRegistration;
                    response = await _workFlowCalls.SurrenderWorkFlow(requestBody, url, values.ServiceRequestid, serReqRefNo);
                }
                if (req.Query["reqtype"] == "SurrenderApproval")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    var serviceRequest = values.ServiceRequest as ServiceRequestModel;

                    // Get DateTime at 3PM
                    DateTime targetTime = new DateTime(serviceRequest.CreatedOn.Year, serviceRequest.CreatedOn.Month, serviceRequest.CreatedOn.Day, 15, 0, 0);

                    RequestBodyForSurrenderApproval requestBody = new()
                    {
                        policyNo = values.polyceNumber,
                        zposT3PM1 = serviceRequest.CreatedOn > targetTime ? "Y" : "N"
                    };
                    string url = _workFlowCalls.GetURLS().SurrenderApproval;
                    response = await _workFlowCalls.SurrenderWorkFlow(requestBody, url, values.ServiceRequestid, serReqRefNo);
                }
                #endregion

                #region Loan // CT: 11, ST: 1
                if (req.Query["reqtype"] == "LoanRegistration")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    string loanValue = data?.Where(x => x.TagName == "PayableAmount").FirstOrDefault()?.TagValue;
                    RequestBodyForLoanRegistration requestBody = new()
                    {
                        policyNo = values.polyceNumber,
                        EffectiveDate = DateTime.Now.ToString("MM/dd/yyyy"),
                        PRTFLAG = "N",
                        LoanAmount = loanValue,
                        DOCRCVD = "Y",
                        DReasonCode = "",
                        PReasonCode = "",
                    };
                    string url = _workFlowCalls.GetURLS().LoanRegistration;
                    response = await _workFlowCalls.LoanWorkFlow(requestBody, url, values.ServiceRequestid);
                }
                if (req.Query["reqtype"] == "LoanApproval")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    string paymentMode = data?.Where(x => x.TagName == "PaymentMode").FirstOrDefault()?.TagValue;
                    string bankAccountNumber = data?.Where(x => x.TagName == "BankAccountNumber").FirstOrDefault()?.TagValue;
                    string IFSCCode = data?.Where(x => x.TagName == "BankIFSC").FirstOrDefault()?.TagValue;
                    string bankKey = _workFlowCalls.GetBankIFSCDetails(IFSCCode)?.BANK_KEY;
                    RequestBodyForApproval requestBody = new()
                    {
                        policyNo = values.polyceNumber,
                        EffectiveDate = DateTime.Now.ToString("MM/dd/yyyy"),
                        otherAdjustments = 0,
                        methodOfPayment = paymentMode, // B for Bank , C for Check
                        bankAccountNumber = paymentMode == "B" ? bankAccountNumber : "", // If B, add Bank Accont Number
                        bankKey = bankKey, // Pending
                    };
                    string url = _workFlowCalls.GetURLS().LoanApproval;
                    response = await _workFlowCalls.LoanWorkFlow(requestBody, url, values.ServiceRequestid);
                }
                #endregion

                #region FreeLook // CT: 12, ST:1
                if (req.Query["reqtype"] == "FreeLookRegistration")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    var serviceRequest = values.ServiceRequest as ServiceRequestModel;

                    // Get DateTime at 3PM
                    DateTime targetTime = new DateTime(serviceRequest.CreatedOn.Year, serviceRequest.CreatedOn.Month, serviceRequest.CreatedOn.Day, 15, 0, 0);
                    RequestBodyForFreeLookRegistration requestBody = new()
                    {
                        policyNumber = values.polyceNumber,
                        effectiveDate = DateTime.Now.ToString("yyyyMMdd"),
                        sduty = "0",
                        zmedcost = "",
                        zothcost = "",
                        zposT3PM = serviceRequest.CreatedOn > targetTime ? "Y" : "N",
                        zuprcadj = "",
                    };
                    string url = _workFlowCalls.GetURLS().FreeLookRegistration;
                    response = await _workFlowCalls.FreeLookWorkFlow(requestBody, url, values.ServiceRequestid, serReqRefNo);
                }
                if (req.Query["reqtype"] == "FreeLookApproval")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    RequestBodyForFreeLookApproval requestBody = new()
                    {
                        policyNumber = values.polyceNumber,
                        action = "E",
                    };
                    string url = _workFlowCalls.GetURLS().FreeLookApproval;
                    response = await _workFlowCalls.FreeLookWorkFlow(requestBody, url, values.ServiceRequestid, serReqRefNo);
                }
                #endregion

                #region Partial WithDrawal // CT: 8, ST:1
                if (req.Query["reqtype"] == "PartialWithDrawalEnquiry")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    dynamic requestBody = new
                    {
                        PolicyNumber = values.polyceNumber,
                    };
                    string url = _workFlowCalls.GetURLS().PartialWithDrawalEnquiry;
                    response = await _workFlowCalls.FreeLookWorkFlow(requestBody, url, values.ServiceRequestid, "DateTimeForPW", serReqRefNo);
                }
                if (req.Query["reqtype"] == "PartialWithDrawalCreation")
                {
                    var values = _workFlowCalls.GetClientidAndPolicy(serReqRefNo);
                    string reqTime = data?.Where(x => x.TagName == "RequestTime").FirstOrDefault()?.TagValue ?? "";
                    string amount = data?.Where(x => x.TagName == "PayableAmount").FirstOrDefault()?.TagValue ?? "";
                    string allFunds = data?.Where(x => x.TagName == "SelectFund").FirstOrDefault()?.TagValue ?? "";
                    string dateTimeForPW = data?.Where(x => x.TagName == "DateTimeForPW").LastOrDefault()?.TagValue ?? DateTime.Now.ToString();

                    RequestBodyForPartialWithDrawal requestBody = new()
                    {
                        policyNumber = values.polyceNumber,
                        effectiveDate = DateTime.Now.ToString("yyyyMMdd"),
                        prcnt = "0.0",
                        totalamt = amount,
                        zposT3PM = reqTime.Contains("before") ? "N" : "Y",
                        actvalue = new List<int>() { 0 },
                        percreqd = new List<int>() { 0 },
                        virtfund = new List<string>(),// allFunds.Split(",").ToList(),
                        datime = dateTimeForPW
                    };
                    string url = _workFlowCalls.GetURLS().PartialWithDrawalCreation;
                    response = await _workFlowCalls.FreeLookWorkFlow(requestBody, url, values.ServiceRequestid, serReqRefNo);
                }
                #endregion

                #region Default DeDup
                if (req.Query["reqtype"].ToString().Contains("deDup") && response == null)
                {
                    response = true;
                }
                #endregion

                log.LogInformation("Log Response");
                log.LogInformation(JsonConvert.SerializeObject(response));

                return new OkObjectResult(response);
            }
            catch (Exception ex)
            {
                //if (ex.Message != "InternalServerError")
                //{
                //    _workFlowCalls.UpdateStatusInDatabase(serReqRefNo);
                //}
                return new ObjectResult("custom  error") { StatusCode = 500 };
            };
        }
    }
}
