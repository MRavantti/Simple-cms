using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Simple_cms.Models;
using Simple_cms.Repositories;
using Simple_cms.Services;

namespace Simple_cms.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly string connectionString;
        private readonly UserService userService;

        public UserController(IConfiguration configuration)
        {
            this.connectionString = configuration.GetConnectionString("ConnectionString");
            this.userService = new UserService(new UserRepository(connectionString));
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<User>), StatusCodes.Status200OK)]
        public IActionResult Get()
        {
            var user = this.userService.Get();
            return Ok(user);
        }
    }
}
