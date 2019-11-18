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
    public class CompanyInformationController : Controller
    {
        private readonly string connectionString;
        private readonly CompanyInformationService _companyInformationService;

        public CompanyInformationController(IConfiguration configuration)
        {
            this.connectionString = configuration.GetConnectionString("ConnectionString");
            this._companyInformationService = new CompanyInformationService(new CompanyInformationRepository(connectionString));
        }

        [HttpGet]
        [ProducesResponseType(typeof(List<CompanyInformation>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetCompanyInformation()
        {
            var result = this._companyInformationService.GetCompanyInformation();

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpGet("{key}")]
        [ProducesResponseType(typeof(CompanyInformation), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetCompanyInformationByKey(string key)
        {
            var result = this._companyInformationService.GetCompanyInformationByKey(key);

            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult AddCompanyInformation([FromBody] CompanyInformation companyInformation)
        {
            var result = this._companyInformationService.AddCompanyInformation(companyInformation);

            if (!result)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpPut("{key}")]
        [ProducesResponseType(typeof(CompanyInformation), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult EditCompanyInformation([FromBody] CompanyInformation companyInformation, string key)
        {
            var result = this._companyInformationService.EditCompanyInformation(companyInformation, key);

            if (!result)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpDelete("{key}")]
        [ProducesResponseType(typeof(CompanyInformation), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult DeleteCompanyInformation(string key)
        {
            var result = this._companyInformationService.DeleteCompanyInformation(key);

            if (!result)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}
