using System;
using System.Collections.Generic;
using Simple_cms.Interfaces;
using Simple_cms.Models;
using System.Transactions;
using Simple_cms.Functions;


namespace Simple_cms.Services
{
    public class CompanyInformationService
    {
        private readonly ICompanyInformationRepository _CompanyInformationRepository;

        public CompanyInformationService(ICompanyInformationRepository companyInformationRepository)
        {
            this._CompanyInformationRepository = companyInformationRepository;
        }

        public List<CompanyInformation> GetCompanyInformation()
        {
            return this._CompanyInformationRepository.GetCompanyInformation();
        }

        public CompanyInformation GetCompanyInformationByKey(string key)
        {
            return this._CompanyInformationRepository.GetCompanyInformationByKey(key);
        }

        public bool AddCompanyInformation(CompanyInformation companyInformation)
        {
            this._CompanyInformationRepository.AddCompanyInformation(companyInformation);

            return true;
        }

        public bool EditCompanyInformation(CompanyInformation companyInformation, string key)
        {
            using (var transaction = new TransactionScope())
            {
                var companyInformationExist = this.GetCompanyInformationByKey(key);

                if (companyInformationExist == null)
                {
                    return false;
                }

                companyInformation.Id = Int32.Parse(key);

                CheckIfFieldIsEmpty.CheckCompanyInformationField(companyInformationExist, companyInformation);

                this._CompanyInformationRepository.EditCompanyInformation(companyInformation);

                transaction.Complete();

                return true;
            }
        }

        public bool DeleteCompanyInformation(string key)
        {
            using (var transaction = new TransactionScope())
            {
                var companyInformationExist = this.GetCompanyInformationByKey(key);

                if (companyInformationExist == null)
                {
                    return false;
                }

                this._CompanyInformationRepository.DeleteCompanyInformation(key);

                transaction.Complete();

                return true;
            }
        }
    }
}
