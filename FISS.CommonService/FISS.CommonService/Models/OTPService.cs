using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FISS.CommonService.Models
{
    [Table("FISS.OTPService")]
    public class OTPService
    {
        [Key]
        public long OTPServiceId { get; set; }
        public string MobileNo { get; set; }
        public string Email { get; set; }
        public string PolicyNo { get; set; }
        public string OTP { get; set; }
        public DateTime? ValidTill { get; set; }
        public byte InvalidAttempts { get; set; }
        
    }
}
