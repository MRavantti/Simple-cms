using System;
using System.Web.Http;
using System.Collections.Generic;
using Simple_cms.Interfaces;
using Simple_cms.Models;
using Simple_cms.Functions;
using System.Transactions;

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

        public Post GetPostByKey(string key)
        {
            return this._postRepository.GetPostById(key);
        }

        public bool AddPost(Post post)
        {
            if (string.IsNullOrEmpty(post?.Post_category) || string.IsNullOrEmpty(post?.Title) || string.IsNullOrEmpty(post?.Preamble) || string.IsNullOrEmpty(post?.Body_text))
            {
                return false;
            }

            var dateTimeNow = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss");

            post.Created_date_time = DateTime.Parse(dateTimeNow);

            this._postRepository.AddPost(post);

            return true;
        }

        public bool EditPost(Post post, string key)
        {
            using (var transaction = new TransactionScope())
            {
                var postExist = this.GetPostByKey(key);

                if (postExist == null)
                {
                    return false;
                }

                post.Post_id = Int32.Parse(key);

                var dateTimeNow = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss");

                post.Updated_at_date_time = DateTime.Parse(dateTimeNow);

                CheckIfFieldIsEmpty.CheckPostField(postExist, post);

                this._postRepository.EditPost(post);

                transaction.Complete();

                return true;
            }
        }

        public bool DeletePost(string key)
        {
            using (var transaction = new TransactionScope())
            {
                var userExist = this.GetPostByKey(key);

                if (userExist == null)
                {
                    return false;
                }

                this._postRepository.DeletePost(key);

                transaction.Complete();

                return true;
            }
        }
    }
}
