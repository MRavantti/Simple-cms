using System;
namespace Simple_cms.Models
{
    public class Post
    {
        public int PostId { get; }
        public string Title { get; }
        public string Preamble { get; }
        public string BodyText { get; }
        public string PostCategory { get; }
        public string ImageThumbnail { get; }

    }
}
