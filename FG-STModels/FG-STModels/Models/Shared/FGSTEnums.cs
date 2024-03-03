namespace FG_STModels.Models.Shared
{
    public enum TicketStatus
    {
        OPEN,
        PENDING,
        PROGRESS,
        CLOSED,
        REJECT,
        FAILED
    }
    [Flags]
    public enum RequestCategory:UInt16
    {
        Query = 1, // Query
        Request = 2, //Request
        Completed = 3//Completed        
    }
    public enum Roles
    {
        BOE,
        POS
    }
    public enum MasterCategorys
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
    public enum CommunicationType
    {
        SMS = 1,
        EMAIL = 2,
        WHATSAPP = 3
    }
    public enum EmailSource
    {
        Undefined = -1000,
        Internal = 1,
        External  = 2,
        OtherDomain  =3
    }
    public enum EmailStatus
    {

    }
    public enum DMLStatus
    {
        SAVED = 1,
        DELETED =2
    }
    public enum AddrChange
    {
        AddressChnage=1,
        LandMark=2
    }
    public enum Donotcall
    {
        InActive = 0,
        Active=1
    }
}