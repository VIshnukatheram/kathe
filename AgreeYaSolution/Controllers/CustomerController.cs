using AgreeYaSolution.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.IIS.Core;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace AgreeYaSolution.Controllers
{
    public class CustomerController : Controller
    {

        public readonly HttpService _httpService;
        public CustomerController(HttpService httpService)
        {
            _httpService = httpService;
        }
       
        public IActionResult Index(int? id = 0)
        {
            try
            {
                string token = HttpContext.Session.GetString("JwtToken");
                var response = _httpService.HttpGetCall(null, "https://localhost:7160/api/CURD/GetCustomerDetails?id=" + id, token);
                if (response.Error == null)
                {
                    dynamic responseData = JsonConvert.DeserializeObject(response.ResponseOutput);
                    ViewBag.custDetails = ((JArray)responseData).ToObject<List<AgreeYaSolution.Models.Registration>>();
                    ViewBag.count = ((JArray)responseData).ToObject<List<AgreeYaSolution.Models.Registration>>().Count;
                    return View();
                }
                else
                {
                    return RedirectToAction("Login","Account");
                }
                
            }
            catch (Exception ex)
            {
                return View();
            }
        }
        [HttpGet]
        public IActionResult Edit(int id)
        {
            try
            {
                string token = HttpContext.Session.GetString("JwtToken");
                var response = _httpService.HttpGetCall(null, "https://localhost:7160/api/CURD/GetCustomerDetails?id=" + id, token);
                dynamic responseData = JsonConvert.DeserializeObject(response.ResponseOutput);
                ViewBag.custDetails = ((JArray)responseData).ToObject<List<AgreeYaSolution.Models.Registration>>();
                return View();
            }
            catch(Exception ex)
            {
                return View();
            }
        }
        [HttpPost]
        public IActionResult Edit(Registration registration)
        {
            try
            {
                string token = HttpContext.Session.GetString("JwtToken");
                var response = _httpService.HttpPutCall<Registration, Registration>(registration, "https://localhost:7160/api/CURD/EditCustomerDetails?id=" + registration.Id + "", token);
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                return View();
            }
        }
        [HttpGet]
        public IActionResult Delete(int id)
        {
            try
            {
                string token = HttpContext.Session.GetString("JwtToken");
                var response = _httpService.HttpDeleteCall<Registration, Registration>(null, "https://localhost:7160/api/CURD/DeleteCustomerDetails?id=" + id + "", token);
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                return View();
            }
        }
    }
}
