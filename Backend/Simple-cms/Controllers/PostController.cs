﻿using System;
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
            var post = this._postService.GetPosts();

            return Ok(post);
        }

        [HttpGet("{key}")]
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetPostByKey(string key)
        {
            var post = this._postService.GetPostByKey(key);

            if (post == null)
            {
                return NotFound();
            }

            return Ok(post);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult AddPost([FromBody]Post post)
        {
            var result = this._postService.AddPost(post);

            if (!result)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPut("{key}")]
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult EditPost([FromBody]Post post, string key)
        {
            var result = this._postService.EditPost(post, key);

            if (!result)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpDelete("{key}")]
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeletePost(string key)
        {
            var result = this._postService.DeletePost(key);

            if (!result)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}
