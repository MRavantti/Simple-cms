using System;
using System.Web.Http;
using System.Collections.Generic;
using Simple_cms.Interfaces;
using Simple_cms.Models;

namespace Simple_cms.Services
{
    public class PostService
    {
        private readonly IPostRepository _postRepository;

        public PostService(IPostRepository postRepository)
        {
            this._postRepository = postRepository;
        }

        public List<Post> GetPosts()
        {
            return this._postRepository.GetPosts();
        }

        public Post GetPostById(int id)
        {
            return this._postRepository.GetPostById(id);
        }
    }
}
