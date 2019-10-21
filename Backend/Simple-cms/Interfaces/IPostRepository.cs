using System;
using System.Collections.Generic;
using Simple_cms.Models;

namespace Simple_cms.Interfaces
{
    public interface IPostRepository
    {
        IEnumerable<Post> Posts { get; set; }
        Post GetPostById(int postId);
    }
}
