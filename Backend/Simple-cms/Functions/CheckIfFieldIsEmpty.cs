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
    }
}
