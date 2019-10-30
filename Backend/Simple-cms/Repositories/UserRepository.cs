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

        public List<User> GetUsers()
        {
            using (MySqlConnection connection = new MySqlConnection(this.connectionString))
            {
                return connection.Query<User>("SELECT * FROM User").ToList();
            }
        }

        public User GetUserByKey(string key)
        {
            using (MySqlConnection connection = new MySqlConnection(this.connectionString))
            {
                return connection.QuerySingleOrDefault<User>("SELECT * FROM User WHERE Id = @key OR User_name = @key OR Email = @key", new { key });
            }
        }

        public void AddUser(User user)
        {
            using (MySqlConnection connection = new MySqlConnection(this.connectionString))
            {
                connection.Execute("INSERT INTO User (User_name, Email, Password) VALUES(@User_name, @Email, @Password)", user);
            }
        }

        public void EditUser(User user)
        {
            using (MySqlConnection connection = new MySqlConnection(this.connectionString))
            {
                connection.Execute("UPDATE User SET Id = @Id, User_name = @User_name, First_name = @First_name, Last_name = @Last_name, Email = @Email, Password = @Password, User_image_thumbnail = @User_image_thumbnail WHERE Id = @id", user );
            }
        }
    }
}