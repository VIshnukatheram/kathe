using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FGLIC_ServiceRequest.Models.Shared
{
    enum TicketStatus
    {
        OPEN,
        PROGRESS,
        CLOSED
    }

    enum CategoryStatus: int
    {
        Q = 1, // Query
        R = 2, //Request
        C = 3 //Completed
    }
}
