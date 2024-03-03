using FG_STModels.BL.EMail;
using FG_STModels.Models.FISS;
using FISS_CommonServiceAPI.Models.DB;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace FISS_CommonServiceAPI.Services
{
    public class ComplaintActions
    {

        private readonly WorkFlowCalls _workFlowCalls;

        private readonly FGDBContext _fgdbcontext;

        private readonly HttpClient _httpClient;
        public ComplaintActions(WorkFlowCalls workFlowCalls, FGDBContext fgdbcontext, HttpClient httpClient)
        {
            _workFlowCalls = workFlowCalls;

            _fgdbcontext = fgdbcontext;

            _httpClient = httpClient;
        }

        public ComplaintAction complaintaction(ComplaintAction complaintAction,string emailid)
        {
            var policy = _workFlowCalls.GetClientidAndPolicy(complaintAction.ServicereqId);
            string policynumber = policy.polyceNumber;
            var serref =_fgdbcontext.ServRequest.Where(x=>x.SrvReqRefNo == complaintAction.ServicereqId).Select(x=>x.SrvReqID).FirstOrDefault();
            var policref = _fgdbcontext.Policy.Where(x => x.LA_PolicyNo == policynumber).Select(x=>x.PolicyRef).FirstOrDefault();
            

            ComplaintAction act = null;
            if (complaintAction != null)
            {
                act = new ComplaintAction()
                {
                    ServicereqId = serref.ToString(),

                    CallType = complaintAction.CallType,

                    SubType = complaintAction.SubType,

                    ComplaintCallType = complaintAction.ComplaintCallType,

                    ComplaintSubType = complaintAction.ComplaintSubType,

                    ComplaintFrom = complaintAction.ComplaintFrom,

                    CC = complaintAction.CC,

                    SenderTo = emailid,
                    Subject=complaintAction.Subject,

                    //Attachment = complaintAction.Attachment,

                    content = complaintAction.content,

                    Policynumber =Convert.ToInt32(policref)
                };

                ComplaintAction Actions = _workFlowCalls.SaveAction(act);
                return act;
            }
            else
            {
                return act;
            }
        }
    }
}
