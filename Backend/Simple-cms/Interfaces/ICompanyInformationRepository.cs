using System;
using System.Collections.Generic;
using Simple_cms.Models;

namespace Simple_cms.Interfaces
{
    public interface ICompanyInformationRepository
    {
        List<CompanyInformation> GetCompanyInformation();
        CompanyInformation GetCompanyInformationByKey(string key);
        void AddCompanyInformation(CompanyInformation companyInformation);
        void EditCompanyInformation(CompanyInformation companyInformation);
        void DeleteCompanyInformation(string key);
    }
}
