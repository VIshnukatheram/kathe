using AgreeYaTask.AgreeYaDBContext;
using AgreeYaTask.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AgreeYaTask.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class CURDController : ControllerBase
    {
        public readonly HealthcareDbContext _HealthcareDbContext;
        public CURDController(HealthcareDbContext healthcareDbContext) { 
            _HealthcareDbContext = healthcareDbContext;
        }

        [HttpGet(Name = "GetCustomerDetails")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public List<Customer> GetCustomerDetails(int? id=0)
        {
            return _HealthcareDbContext.customers.Where(x => (x.Id == ((id != 0)? id : x.Id))).ToList();           
        }

        [HttpPut(Name = "EditCustomerDetails")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public string EditCustomerDetails(int id,Customer customer)
        {
            try
            {
                Customer cs = _HealthcareDbContext.customers.Where(x => (x.Id == ((id != 0) ? id : x.Id))).FirstOrDefault();
                cs.FirstName = customer.FirstName;
                cs.LastName = customer.LastName;
                cs.Email = customer.Email;
                cs.PhoneNumber = customer.PhoneNumber;
                cs.LoginUser = customer.LoginUser;
                _HealthcareDbContext.Update(cs);
                _HealthcareDbContext.SaveChanges();
                return "Successfully Updated";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }
        [HttpDelete(Name = "DeleteCustomerDetails")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public string DeleteCustomerDetails(int id)
        {
            try
            {
                Customer cs = _HealthcareDbContext.customers.Where(x => (x.Id == ((id != 0) ? id : x.Id))).FirstOrDefault();
                _HealthcareDbContext.Remove(cs);
                _HealthcareDbContext.SaveChanges();
                return "Successfully Deleted";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }
    }
}
