using System.Collections.Generic;

namespace Simple_cms.Models
{
    public class Category
    {
        public string PostCategory { get; set; }

        public string CategoryName { get; set; }

        public string Description { get; set; }

        public List<Post> Posts { get; set; }
    }
}