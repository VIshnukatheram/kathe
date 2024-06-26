﻿

namespace FISS_ServiceRequest.Models.Shared
{
    enum TicketStatus
    {
        OPEN,
        PENDING,
        PROGRESS,
        CLOSED,
        REJECT
    }

    enum CategoryStatus
    {
        Query = 1, // Query
        Request = 2, //Request
        Completed = 3 //Completed
    }
    enum Roles
    {
        BOE,
        POS
    }
    enum MasterCategorys
    {
        CALL_TYP,
        CATEGORY,
        CLIENT_ROLE,
        COMM_TYP,
        EMAIL_DEL_STATUS,
        RAISE_REQMNT,
        REQST_MODE,
        REQST_SOURCE,
        REQUST_VIA,
        SMS_DEL_STATUS,
        SUB_TYP
    }
}
