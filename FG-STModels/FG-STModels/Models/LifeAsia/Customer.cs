using System.ComponentModel.DataAnnotations.Schema;

namespace FISS_ServiceRequestAPI.Models.DB
{
    [Table("LifeAsiaObj.LA_Customer")]
    public class Customer
    {
        public int CustomerRef {  get; set; }
        public string LA_CustomerID { get; set; }
    }
}