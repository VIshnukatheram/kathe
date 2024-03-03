using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS_ServiceRequest.Models.Request
{
    public class RequestHeaderForContact
    {
        public string Source { get; set; }
        public string CarrierCode { get; set; }
        public string Branch { get; set; }
        public string UserId { get; set; }
        public string UserRole { get; set; }
        public string PartnerId { get; set; }
    }

    public class AddressHeaderForContext
    {
        public string Source { get; set; }
        public string CarrierCode { get; set; }
        public string Branch { get; set; }
        public string UserId { get; set; }
        public string UserRole { get; set; }
        public string PartnerId { get; set; }

        public string ProcessId { get; set; }

        public string MonthEndExtension {  get; set; }

        public string MonthEndDate {  get; set; }
    }

    public class AddressUpdateDetailsRequest
    {
        public AddressHeaderForContext RequestHeader { get; set; }
        public dynamic RequestBody { get; set; }
    }

    public class ContactUpdateDetailsRequest
    {
        public RequestHeaderForContact RequestHeader { get; set; }
        public dynamic RequestBody { get; set; }
    }
    public class DeDupMobileNumberRequest
    {
        public string MobileNo { get; set; }
    }
    public class DeDupEmailRequest
    {
        public string EmailAddress { get; set; }
    }
}
