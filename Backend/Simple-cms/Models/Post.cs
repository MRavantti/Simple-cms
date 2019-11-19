using System;

namespace Simple_cms.Models
{
    public class Post
    {
        public int Post_id { get; set; }

        public string Post_category { get; set; }

        public string Title { get; set; }

        public string Body_text { get; set; }

        public string Post_image_thumbnail { get; set; }

        public string Link_to { get; set; }

        public DateTime Created_date_time { get; set; }

        public DateTime Updated_at_date_time { get; set; }
    }
}
