using AgreeYaTask.AgreeYaDBContext;
using AgreeYaTask.Models;
using AgreeYaTask.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AgreeYaTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        public readonly HealthcareDbContext _healthcareDbContext;
        public RegisterController(HealthcareDbContext healthcareDbContext)
        {
            _healthcareDbContext = healthcareDbContext;
        }
        [HttpPost(Name = "CustomerRegister")]
        public string CustomerRegister(Customer customer)
        {
            try
            {
                customer.Password = EncryptionHelper.Encrypt(customer.Password);
                _healthcareDbContext.Add(customer);
                _healthcareDbContext.SaveChanges();
                CommuConfg commuConfg = new CommuConfg();
                commuConfg.SenderEMail = "vkatheram@gmail.com";
                commuConfg.MailContent = "Welcome To AgreeYa";
                commuConfg.ReceipientCC = "vkatheram@gmail.com";
                commuConfg.ReceipientTo = customer.Email;
                commuConfg.Subject = "Successfully registred";
                EmailService emailService = new EmailService();
                emailService.SendEmail(commuConfg);
                return "yes";
            }
            catch(Exception ex)
            {
                return "no";
            }
        }
    }
}
