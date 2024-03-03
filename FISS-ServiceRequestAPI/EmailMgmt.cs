using FG_STModels.Models.FISS;
using FG_STModels.Models.OmniDocs;
using FG_STModels.Models.Shared;
using FISS_ServiceRequestAPI.Models.DB;
using FISS_ServiceRequestAPI.Models.Request;
using FISS_ServiceRequestAPI.Services;
using Microsoft.AspNetCore.Http.Features;
using System.Collections.Generic;
using System.Data.Entity.Migrations;

namespace FISS_ServiceRequestAPI
{
    public class EmailMgmt
    {
        private readonly FGDBContext _FGDBContext;
        public List<DMSLinks> Uploads;

        public EmailMgmt(string ConnectionString) {
            _FGDBContext = new FGDBContext(ConnectionString);
        }
        public EmailClassify SaveEmailClassify(EmailClassify emailClassify) {
            emailClassify.Status = "CLOSED";
            _FGDBContext.EmailClassify.AddOrUpdate(emailClassify);
            foreach (EmailClassCTST item in emailClassify.emailClassCTSTs)
            {
                item.EmailResponseId = emailClassify.EmailResponseId; 
                _FGDBContext.EmailClassCTST.AddOrUpdate(item);
            }
            foreach (EmailClassAttmnts item in emailClassify.emailClassAttmnts)
            {
                item.EmailResponseId = emailClassify.EmailResponseId;
                _FGDBContext.EmailClassAttmnts.AddOrUpdate(item);
            }
            emailClassify.DMLStatus = FG_STModels.Models.Shared.DMLStatus.SAVED;
            _FGDBContext.SaveChanges();
            return emailClassify;
        }
    }
}