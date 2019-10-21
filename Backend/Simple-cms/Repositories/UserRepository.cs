using System;
using Dapper;
using System.Linq;
using MySql.Data.MySqlClient;
using Simple_cms.Interfaces;
using Simple_cms.Models;
using System.Collections.Generic;

namespace Simple_cms.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly string connectionString;

        public UserRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public List<User> Get()
        {
            using (MySqlConnection connection = new MySqlConnection(this.connectionString))
            {
                return connection.Query<User>("SELECT * FROM User").ToList();
            }
        }

        public List<User> Get(int id)
        {
            using (MySqlConnection connection = new MySqlConnection(this.connectionString))
            {
                return connection.Query<User>("SELECT * FROM User WHERE Id = @id", new { id }).ToList();
            }
        }
    }
}
