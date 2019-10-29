using System;

namespace Simple_cms.Models
{
    public class User
    {
        public int Id { get; set; }

        public string User_name { get; set; }

        public string First_name { get; set; }

        public string Last_name { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string User_image_thumbnail { get; set; }
    }
}
