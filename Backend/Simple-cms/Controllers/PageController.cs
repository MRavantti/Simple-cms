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
    public class PageController : Controller
    {
        private readonly string connectionString;
        private readonly PageService _pageService;

        public PageController(IConfiguration configuration)
        {
            this.connectionString = configuration.GetConnectionString("ConnectionString");
            this._pageService = new PageService(new PageRepository(connectionString));
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<Page>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetPages()
        {
            var page = this._pageService.GetPages();

            if (page == null)
            {
                return NotFound();
            }

            return Ok(page);
        }

        [HttpGet("{key}")]
        [ProducesResponseType(typeof(List<Page>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetPageByKey(string key)
        {
            var page = this._pageService.GetPageByKey(key);

            if (page == null)
            {
                return NotFound();
            }

            return Ok(page);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult AddPage([FromBody]Page page)
        {
            var result = this._pageService.AddPage(page);

            if (!result)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPut("{key}")]
        [ProducesResponseType(typeof(Page), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult EditPage([FromBody]Page page, string key)
        {
            var result = this._pageService.EditPage(page, key);

            if (!result)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpDelete("{key}")]
        [ProducesResponseType(typeof(Page), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeletePage(string key)
        {
            var result = this._pageService.DeletePage(key);

            if (!result)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}
