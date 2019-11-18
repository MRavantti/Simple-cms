using Dapper;
using System.Linq;
using MySql.Data.MySqlClient;
using Simple_cms.Interfaces;
using Simple_cms.Models;
using System.Collections.Generic;

namespace Simple_cms.Repositories
{
    public class CompanyInformationRepository : ICompanyInformationRepository
    {
        private readonly string connectionString;

        public CompanyInformationRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public List<CompanyInformation> GetCompanyInformation()
        {
            using (MySqlConnection connection = new MySqlConnection(this.connectionString))
            {
                return connection.Query<CompanyInformation>("SELECT * FROM Company_information").ToList();
            }
        }

        public CompanyInformation GetCompanyInformationByKey(string key)
        {
            using (MySqlConnection connection = new MySqlConnection(this.connectionString))
            {
                return connection.QuerySingleOrDefault<CompanyInformation>("SELECT * FROM Company_information WHERE Id = @key", new { key });
            }
        }

        public void AddCompanyInformation(CompanyInformation companyInformation)
        {
            using (MySqlConnection connection = new MySqlConnection(this.connectionString))
            {
                connection.Execute("INSERT INTO Company_information (Name, Phone, Email, Adress, Zipcode, Province, Country) VALUES(@Name, @Phone, @Email, @Adress, @Zipcode, @Province, @Country)", companyInformation);
            }
        }

        public void EditCompanyInformation(CompanyInformation companyInformation)
        {
            using (MySqlConnection connection = new MySqlConnection(this.connectionString))
            {
                connection.Execute("UPDATE Company_information " +
                    "SET Id = @Id, " +
                    "Name = @Name, " +
                    "Phone = @Phone, " +
                    "Email = @Email, " +
                    "Adress = @Adress, " +
                    "Zipcode = @Zipcode, " +
                    "Province = @Province, " +
                    "Country = @Country " +
                    "WHERE Id = @id", companyInformation);
            }
        }

        public void DeleteCompanyInformation(string key)
        {
            using (MySqlConnection connection = new MySqlConnection(this.connectionString))
            {
                connection.Execute("DELETE FROM Company_information WHERE Id = @key", new { key });
            }
        }
    }
}