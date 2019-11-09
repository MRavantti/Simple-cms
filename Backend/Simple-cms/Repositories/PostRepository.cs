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

        public Post GetPostByKey(string key)
        {
            using (MySqlConnection connection = new MySqlConnection(this.connectionString))
            {
                return connection.QuerySingleOrDefault<Post>("SELECT * FROM Post WHERE Post_id = @key", new { key });
            }
        }

        public void AddPost(Post post)
        {
            using (MySqlConnection connection = new MySqlConnection(this.connectionString))
            {
                connection.Execute("INSERT INTO Post " +
                    "(Post_category, " +
                    "Title, " +
                    "Body_text, " +
                    "Post_image_thumbnail, " +
                    "Created_date_time) " +
                    "VALUES" +
                    "(@Post_category, " +
                    "@Title, " +
                    "@Body_text, " +
                    "@Post_image_thumbnail, " +
                    "@Created_date_time)", post);
            }
        }

        public void EditPost(Post post)
        {
            using (MySqlConnection connection = new MySqlConnection(this.connectionString))
            {
                connection.Execute("UPDATE Post " +
                    "SET Post_id = @Post_id, " +
                    "Post_category = @Post_category, " +
                    "Title = @Title, " +
                    "Body_text = @Body_text, " +
                    "Post_image_thumbnail = @Post_image_thumbnail, " +
                    "Updated_at_date_time = @Updated_at_date_time " +
                    "WHERE Post_id = @Post_id", post);
            }
        }

        public void DeletePost(string key)
        {
            using (MySqlConnection connection = new MySqlConnection(this.connectionString))
            {
                connection.Execute("DELETE FROM Post WHERE Post_id = @key", new { key });
            }
        }
    }
}
