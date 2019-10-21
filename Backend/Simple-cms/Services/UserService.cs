using System;
using System.Web.Http;
using System.Collections.Generic;
using Simple_cms.Interfaces;
using Simple_cms.Models;

namespace Simple_cms.Services
{
    public class UserService
    {
        private readonly IUserRepository userRepository;

        public UserService(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        public List<User> Get()
        {
            return this.userRepository.Get();
        }
        public List<User> Get(int key)
        {
            return this.userRepository.Get(key);
        }
    }
}
