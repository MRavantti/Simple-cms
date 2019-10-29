using System;
using Dapper;
using System.Linq;
using MySql.Data.MySqlClient;
using Simple_cms.Interfaces;
using Simple_cms.Models;
using System.Collections.Generic;

namespace Simple_cms.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly string connectionString;

        public PostRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public List<Post> GetPosts()
        {
            using (MySqlConnection connection = new MySqlConnection(this.connectionString))
            {
                return connection.Query<Post>("SELECT * FROM Post").ToList();
            }
        }

        public Post GetPostById(int id)
        {
            using (MySqlConnection connection = new MySqlConnection(this.connectionString))
            {
                return connection.QuerySingleOrDefault<Post>("SELECT * FROM Post WHERE Id = @id", new { id });
            }
        }
    }
}
