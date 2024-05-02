using AgreeYaTask.AgreeYaDBContext;
using AgreeYaTask.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AgreeYaTask.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        public readonly HealthcareDbContext _healthcareDbContext;
        private JwtTokenConfig _jwtTokenConfig;
        public LoginController(HealthcareDbContext healthcareDbContext, JwtTokenConfig jwtTokenConfig) 
        {
            _jwtTokenConfig=jwtTokenConfig;
            _healthcareDbContext = healthcareDbContext;
        }
        [HttpGet(Name = "CustomerLogin")]
        public string CustomerLogin(string UserName,string Password)
        {
            var EncPassword = EncryptionHelper.Encrypt(Password);
            var userdetails = _healthcareDbContext.customers.Where(x => x.LoginUser == UserName && x.Password == EncPassword).FirstOrDefault();
            if(userdetails != null)
            {
               
                    var issuer = _jwtTokenConfig.Issuer;
                    var audience = _jwtTokenConfig.Audience;
                    var key = Encoding.UTF8.GetBytes(_jwtTokenConfig.Secret);
                    var signingCredentials = new SigningCredentials(
                                            new SymmetricSecurityKey(key),
                                            SecurityAlgorithms.HmacSha512Signature
                                        );
                    // var role = userService.GetUserRole(request.UserName);
                    var subject = new ClaimsIdentity(new[]
                     {
                  new Claim(ClaimTypes.Name, UserName),
                  new Claim(ClaimTypes.Email,UserName),
                 });

                    var expires = DateTime.UtcNow.AddMinutes(10);
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = subject,
                        Expires = DateTime.UtcNow.AddMinutes(10),
                        Issuer = issuer,
                        Audience = audience,
                        SigningCredentials = signingCredentials
                    };
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var token = tokenHandler.CreateToken(tokenDescriptor);
                    var jwtToken = tokenHandler.WriteToken(token);

                    if (jwtToken != null)
                        HttpContext.User.AddIdentity(subject);
                    //_logger.InfoAsync("Sucessfully logged", LogSource.File);
                    return jwtToken;
                
            }
            else {
                return "no";
            }
            
        }
    }
}
