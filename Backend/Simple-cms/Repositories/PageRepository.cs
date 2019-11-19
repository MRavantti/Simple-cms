using System;
using Dapper;
using System.Linq;
using MySql.Data.MySqlClient;
using Simple_cms.Interfaces;
using Simple_cms.Models;
using System.Collections.Generic;

namespace Simple_cms.Repositories
{
    public class PageRepository : IPageRepository
    {
        private readonly string connectionString;

        public PageRepository(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public List<Page> GetPages()
        {
            string sql = "SELECT * FROM Page AS Pa LEFT JOIN Post AS Po ON Pa.Page_name = Po.Post_category";

            using (MySqlConnection connection = new MySqlConnection(this.connectionString))
            {
                var pageDictionary = new Dictionary<string, Page>();

                var list = connection.Query<Page, Post, Page>(
                    sql,
                    (page, post) =>
                    {
                        if (!pageDictionary.TryGetValue(page.Page_name, out Page pageEntry))
                        {
                            pageEntry = page;
                            pageEntry.Posts = new List<Post>();
                            pageDictionary.Add(pageEntry.Page_name, pageEntry);
                        }
                        pageEntry.Posts.Add(post);
                        return pageEntry;
                    },
                    splitOn: "Post_id")
                    .Distinct()
                    .ToList();

                return list;
            }
        }

        public List<Page> GetPageByKey(string key)
        {
            string sql = "SELECT * FROM Page AS Pa LEFT JOIN Post AS Po ON Pa.Page_name = Po.Post_category WHERE Page_id = @key OR Page_name = @key";

            using (MySqlConnection connection = new MySqlConnection(this.connectionString))
            {
                var pageDictionary = new Dictionary<string, Page>();

                var list = connection.Query<Page, Post, Page>(
                    sql,
                    (page, post) =>
                    {
                        if (!pageDictionary.TryGetValue(page.Page_name, out Page pageEntry))
                        {
                            pageEntry = page;
                            pageEntry.Posts = new List<Post>();
                            pageDictionary.Add(pageEntry.Page_name, pageEntry);
                        }
                        pageEntry.Posts.Add(post);
                        return pageEntry;

                    }, new { key },

                    splitOn: "Post_id")
                    .Distinct()
                    .ToList();

                return list;
            }
        }

        public void AddPage(Page page)
        {
            using (MySqlConnection connection = new MySqlConnection(this.connectionString))
            {
                connection.Execute("INSERT INTO Page (Page_name, Hero_text, Created_date_time) VALUES(@Page_name, @Hero_text, @Created_date_time)", page);
            }
        }

        public void EditPage(Page page)
        {
            using (MySqlConnection connection = new MySqlConnection(this.connectionString))
            {
                connection.Execute("UPDATE Page SET Page_name = @Page_name, Hero_text = @Hero_text, Updated_at_date_time = @Updated_at_date_time  WHERE Page_id = @Page_id", page);
            }
        }

        public void DeletePage(string key)
        {
            using (MySqlConnection connection = new MySqlConnection(this.connectionString))
            {
                connection.Execute("DELETE FROM Page WHERE Page_id = @key", new { key });
            }
        }
    }
}
