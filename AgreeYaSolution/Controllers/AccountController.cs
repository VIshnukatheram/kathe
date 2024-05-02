using AgreeYaSolution.Models;
using Microsoft.AspNetCore.Mvc;

namespace AgreeYaSolution.Controllers
{
    public class AccountController : Controller
    {
        public readonly HttpService _httpService;
        public AccountController(HttpService httpService) {
            _httpService=httpService;
        }
        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Login(Login login)
        {
           var response = _httpService.HttpGetCall(null, "https://localhost:7160/api/Login?UserName=" + login.Username + "&Password=" + login.Password + "",null);
           if(response.ResponseOutput!=null)
            {
                string token = response.ResponseOutput;
                HttpContext.Session.SetString("JwtToken", token);
                //ViewBag.Error = "Success";
                return RedirectToAction("Index","Customer");
            }
            else
            {
                //ViewBag.Error = "Invalid UserName and password";
                return View();
            }   
        }

        [HttpGet]
        public IActionResult Registration()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Registration(Registration reg)
        {
            _httpService.HttpPostCall<Registration, Registration>(reg,"https://localhost:7160/api/Register");
            return RedirectToAction("Login");
        }
    }
}
