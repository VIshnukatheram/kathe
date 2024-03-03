using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FISS.PremiumPaidCertificate.Models.Shared
{
    enum TicketStatus
    {
        OPEN,
        PROGRESS,
        CLOSED
    }

    enum CategoryStatus : int
    {
        Q = 0,
        R = 1,
        C = 2
    }
}
