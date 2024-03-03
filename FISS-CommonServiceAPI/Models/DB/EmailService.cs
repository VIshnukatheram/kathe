using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_CommonServiceAPI.Models.DB
{
    [Table("FISS.EmailService")]

    public class EmailService
    {
        public long EmailUniqRefNo { get; set; }
        public string ReceipientIDs { get; set; }
        public string CCIDs { get; set; }
        public string BCCIDs { get; set; }
        public string MailSubject { get; set; }
        public string ConversionID { get; set; }
        public DateTime? ReceivedOn { get; set; }
        public bool? NLP_Response { get; set; }
        public bool? RegisteredEMail { get; set; }
        public bool? AddressedMultipleMails { get; set; }
        public bool? Spam { get; set; }
        public string SenderIDs { get; set; }
        public bool? LIFEORNONLIFE { get; set; }
    }
}
