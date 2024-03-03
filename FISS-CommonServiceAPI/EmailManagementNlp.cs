using FG_STModels.Models.FISS;
using FISS_CommonServiceAPI.Models.DB;
using FISS_CommonServiceAPI.Services;
using System.Diagnostics;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using SelectPdf;

namespace FISS_CommonServiceAPI
{
    public class EmailManagementNlp
    {
        private readonly WorkFlowCalls _workFlowCalls;

        private readonly FGDBContext _fgdbcontext;

        private readonly HttpClient _httpClient;
        public EmailManagementNlp(WorkFlowCalls workFlowCalls, FGDBContext fgdbcontext, HttpClient httpClient)
        {
            _workFlowCalls = workFlowCalls;

            _fgdbcontext = fgdbcontext;

            _httpClient = httpClient;
        }

        public EmailClassify mailman(EmailClassify emailResponse)
        {
            var matchemail = _fgdbcontext.SpamEmailLists.ToList().Where(x => x.Email == emailResponse.From).SingleOrDefault();
            bool IsAddressedToSLT = false;
            bool IsSenderBlckLst = false;

            IsAddressedToSLT = _fgdbcontext.AppMasters.
                Where( x=> x.MstCategory == "SLT_LIST_EM" && x.MstDesc.ToLower() == emailResponse.From.ToLower()).
                ToList().Count() > 0;
            IsSenderBlckLst = _fgdbcontext.AppMasters.
                Where(x => x.MstCategory == "BLCK_LIST_EM" && x.MstDesc.ToLower() == emailResponse.From.ToLower()).
                ToList().Count() > 0;
            var task1 = new EmailClassify()
            {
                // Assuming Source is equivalent to Id in EmailModel
                Id = emailResponse.Id,
                ReceivedDateTime = emailResponse.ReceivedDateTime,
                HasAttachments = (emailResponse.emailClassAttmnts != null ? emailResponse.emailClassAttmnts.Count > 0 : false), // You may need to update this based on your actual data
                InternetMessageId = emailResponse.InternetMessageId, // Assuming ConversationID is equivalent to InternetMessageId in EmailModel
                Subject = emailResponse.Subject,
                BodyPreview = emailResponse.BodyPreview,
                Importance = emailResponse.Importance, // Assuming Importance is available in your nlpEmail
                ConversationId = emailResponse.ConversationId,
                IsRead = emailResponse.IsRead,
                IsHtml = emailResponse.IsHtml,
                Body = emailResponse.Body,
                From = emailResponse.From,
                ToRecipients = emailResponse.ToRecipients,
                CcRecipients = emailResponse.CcRecipients,
                BccRecipients = emailResponse.BccRecipients,
                ReplyTo = emailResponse.ReplyTo,
                emailClassAttmnts = emailResponse.emailClassAttmnts,
                IsSpamEMS = (matchemail != null),
                MailToSnrLdr = IsAddressedToSLT,
                IsSenderBlckLst = IsSenderBlckLst,
                Status = "NEW"
            };
            EmailClassify EmailResponse = _workFlowCalls.EmailResponse(task1);
            
            if (matchemail == null){
                string url = "https://lfagentapigw-rsg.azure-api.net/POSMicroservice/Generic/api/SearchAPI/GetSearchAPI";
                var res = _workFlowCalls.EmsService(emailResponse.From, url);
                // Continue with the rest of your logic
            }
            return task1;
        }        
    }    
}