using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Simple_cms.Models;
using Simple_cms.Repositories;
using Simple_cms.Services;

namespace Simple_cms.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    public class PostController : Controller
    {
        private readonly string connectionString;
        private readonly PostService _postService;

        public PostController(IConfiguration configuration)
        {
            this.connectionString = configuration.GetConnectionString("ConnectionString");
            this._postService = new PostService(new PostRepository(connectionString));
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<Post>), StatusCodes.Status200OK)]
        public IActionResult GetUsers()
        {
            var user = this._postService.GetPosts();

            return Ok(user);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetUserById(int id)
        {
            var user = this._postService.GetPostById(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
    }
}
