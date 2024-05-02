using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

namespace AgreeYaSolution.Models
{
    public class Login
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }   
}
