using System;

namespace Simple_cms.Models
{
    public class Post
    {
        public int PostId { get; set; }

        public string Title { get; set; }

        public string Preamble { get; set; }

        public string BodyText { get; set; }

        public string ImageThumbnail { get; set; }

        public string PostCategory { get; set; }

        public virtual Category Category { get; set; }
    }
}
