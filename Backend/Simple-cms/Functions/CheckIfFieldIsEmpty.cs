using System;
using Simple_cms.Models;

namespace Simple_cms.Functions
{
    public static class CheckIfFieldIsEmpty
    {
        public static void CheckUserField(User userExist, User user)
        {
            if (string.IsNullOrEmpty(user?.User_name))
            {
                user.User_name = userExist.User_name;
            }

            if (string.IsNullOrEmpty(user?.First_name))
            {
                user.First_name = userExist.First_name;
            }

            if (string.IsNullOrEmpty(user?.Last_name))
            {
                user.Last_name = userExist.Last_name;
            }

            if (string.IsNullOrEmpty(user?.Password))
            {
                user.Password = userExist.Password;
            }

            if (string.IsNullOrEmpty(user?.Email))
            {
                user.Email = userExist.Email;
            }

            if (string.IsNullOrEmpty(user?.User_image_thumbnail))
            {
                user.User_image_thumbnail = userExist.User_image_thumbnail;
            }
        }

        public static void CheckPostField(Post postExist, Post post)
        {
            if (string.IsNullOrEmpty(post?.Post_category))
            {
                post.Post_category = postExist.Post_category;
            }

            if (string.IsNullOrEmpty(post?.Title))
            {
                post.Title = postExist.Title;
            }

            if (string.IsNullOrEmpty(post?.Preamble))
            {
                post.Preamble = postExist.Preamble;
            }

            if (string.IsNullOrEmpty(post?.Body_text))
            {
                post.Body_text = postExist.Body_text;
            }

            if (string.IsNullOrEmpty(post?.Post_image_thumbnail))
            {
                post.Post_image_thumbnail = postExist.Post_image_thumbnail;
            }

            if (string.IsNullOrEmpty(post?.Created_date_time.ToString()))
            {
                post.Created_date_time = postExist.Created_date_time;
            }
        }
    }
}
