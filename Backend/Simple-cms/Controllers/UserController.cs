using System;
using System.Collections.Generic;
using System.Transactions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Simple_cms.Interfaces;
using Simple_cms.Models;
using Simple_cms.Repositories;
using Simple_cms.Services;

namespace Simple_cms.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly string connectionString;
        private readonly UserService _userService;

        public UserController(IConfiguration configuration)
        {
            this.connectionString = configuration.GetConnectionString("ConnectionString");
            this._userService = new UserService(new UserRepository(connectionString));
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<User>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetUsers()
        {
            var user = this._userService.GetUsers();
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpGet("{key}")]
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetUserByKey(string key)
        {
            var user = this._userService.GetUserByKey(key);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult AddUser([FromBody] User user)
        {
            var result = this._userService.AddUser(user);

            if (!result)
            {
                return BadRequest("Wrong");
            }

            return Ok();
        }

        [HttpPut("{key}")]
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult EditUser([FromBody] User user, string key)
        {
            var result = this._userService.EditUser(user, key);

            if (!result)
            {
                return BadRequest("You SUCK");
            }

            return Ok();
        }

        [HttpDelete("{key}")]
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteUser(string key)
        {
            var result = this._userService.DeleteUser(key);

            if (!result)
            {
                return NotFound("You SUCK");
            }

            return Ok();
        }
    }
}
