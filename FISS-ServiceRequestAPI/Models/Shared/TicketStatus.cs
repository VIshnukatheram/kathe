

namespace FISS_ServiceRequestAPI.Models.Shared
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
        Completed = 3, //Completed
        Retention = 4 // Retention

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
        SUB_TYP,
        ASSISTANCE,
        RAISE_REQMNT_BOE
    }
}
