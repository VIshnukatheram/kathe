using FG_STModels.Models.Shared;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace FG_STModels.Models.FISS
{
    [Table("FISS.EmailClassify")]
    public class EmailClassify
    {
        [Key]
        public int EmailResponseId { get; set; }
        public string Id { get; set; }
        public DateTime? ReceivedDateTime { get; set; }
        public bool HasAttachments { get; set; } = false;
        public string InternetMessageId { get; set; }
        public string Subject { get; set; }
        public string BodyPreview { get; set; }
        public string Importance { get; set; }
        public string ConversationId { get; set; }
        public bool IsRead { get; set; } = false;
        public bool IsHtml { get; set; } = false;
        public string Body { get; set; }
        public string From { get; set; }
        public string ToRecipients { get; set; }
        public string CcRecipients { get; set; }
        public string BccRecipients { get; set; }
        public string ReplyTo { get; set; }
        //public string Attachments varbinary   no
        public bool IsMailSrcLifeLOB { get; set; } = false;
        public bool RegdMailID { get; set; } = false;
        public Int32? MailsReceived { get; set; }
        public Int32? CntOfToRecipients { get; set; }
        public Int32? CntOfCcRecipients { get; set; }
        public Int32? CntOfBccRecipients { get; set; }
        public Int32? PrntEmailID { get; set; }
        public bool MailToSnrLdr { get; set; } = false;
        public string CustName { get; set; }
        public bool IsNLPRespGen { get; set; } = false;
        public bool LifeOrNonLife { get; set; }=false;
        public string ReqSrc { get; set; }
        public string Status { get; set; }
        public EmailSource Source { get; set; } = EmailSource.Undefined;
        public string PolicyNo { get; set; }
        public string ApplicationNo { get; set; }
        public DateTime? Dob { get; set; }
        public bool IsSpamEMS { get; set; } = false;
        public bool IsSpamNLP { get; set; } = false;
        public List<EmailClassCTST>? emailClassCTSTs { get; set; }
        public List<EmailClassAttmnts>? emailClassAttmnts { get; set; }
        [NotMapped]
        public DMLStatus? DMLStatus { get; set; }
        [NotMapped]
        public string AssignedTo { get;set; }
        [NotMapped]
        public string EmailAgeing => $"{((DateTime.Now -  ReceivedDateTime.Value).TotalHours <=24  ? string.Format("{0} hour(s)", (int)(DateTime.Now - ReceivedDateTime.Value).TotalHours) : string.Format("{0} day(s)", (int)(DateTime.Now - ReceivedDateTime.Value).TotalDays))}";
        [NotMapped]
        public Int32 EmailAgeingHrs =>(Int32) (DateTime.Now - ReceivedDateTime.Value).TotalHours;
        [NotMapped]
        public Int32 RepeatCount { get; set; }
        [NotMapped]
        public bool AddressedToMultipleIDs { get; set; } =  false;
        [NotMapped]
        public bool MergedMail { get; set; } = false;
        public bool IsSenderBlckLst { get; set; } = false; 
        [NotMapped]
        public string URN => $"SR{(ReceivedDateTime == null ? string.Empty : ReceivedDateTime.Value.ToString("yyMMdd"))}{EmailResponseId.ToString().PadLeft(4,'0')}";
    }
    [Table("FISS.SpamEmailList")]
    public class SpamEmailList
    {
        public int Id { get; set; }

        public string Email { get; set; }
    }
    [Table("FISS.EmailClassCTST")]
    public class EmailClassCTST
    {
        [Key, Column(Order = 0)]
        public int EmailResponseId { get; set; } 
        [Required]
        [Key, Column(Order = 1)]
        public int CallType { get; set; }
        [Required]
        [Key, Column(Order = 2)]
        public int SubType { get; set; }
        [Required]
        [MaxLength(50)]
        public string DecisionBy { get; set; }
        public long? SrvReqID { get; set; }
        public decimal? ConfidenceScr { get; set; }
        public string SrvReqRefNo { get; set; } = string.Empty;
        [NotMapped]
        public ServiceRequest? serviceRequest { get; set; }
        [NotMapped]
        public string CallTypeDesc { get; set; }
        [NotMapped]
        public string SubTypeDesc { get; set; }
        [NotMapped]
        public string? LA_PolicyNo { get; set; }
        [NotMapped]
        public string? FG_ApplNo { get; set; }
    }
    [Table("FISS.EmailClassAttmnts")]
    public class EmailClassAttmnts {
        [Column(Order = 0)]
        [Required]
        public int EmailResponseId { get; set; }
        [Required]
        [Column(Order = 1)]
        [Key]
        public string FileName { get; set; }
        [Required]
        public string FileExtnMime { get; set; }
        [Required]
        public long FileSizeKB { get; set; }
    }
}
