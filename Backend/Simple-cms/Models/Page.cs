using System;
using System.Collections.Generic;

namespace Simple_cms.Models
{
    public class Page
    {
        public int Page_id { get; set; }

        public string Page_name { get; set; }

        public List<Post> Posts { get; set; }

        public DateTime Created_date_time { get; set; }

        public DateTime Updated_at_date_time { get; set; }
    }
}
