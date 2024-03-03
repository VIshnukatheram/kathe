using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS.PremiumPaidCertificate.Models.Shared
{
    public class APIURLS
    {
        public LAURLS LAURLS { get; set; }
        public CommonURLS CommonURLS { get; set; }
    }

    public class LAURLS
    {
        public string PPCApi { get; set; }
    }
    public class CommonURLS
    {
        public string Email { get; set; }
        public string BlobConnectionString { get; set; }
        public string containerName { get; set; }
    }
}
