using System;
using System.Web.Http;
using System.Collections.Generic;
using Simple_cms.Interfaces;
using Simple_cms.Models;
using System.Transactions;

namespace Simple_cms.Services
{
    public class UserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            this._userRepository = userRepository;
        }

        public List<User> GetUsers()
        {
            return this._userRepository.GetUsers();
        }

        public User GetUserByKey(string key)
        {
            return this._userRepository.GetUserByKey(key);
        }

        public bool AddUser(User user)
        {
            if (string.IsNullOrEmpty(user?.User_name) || string.IsNullOrEmpty(user?.Email) || string.IsNullOrEmpty(user?.Password))
            {
                return false;
            }

            this._userRepository.AddUser(user);

            return true;
        }

        public bool EditUser(User user, string key)
        {
            using (var transaction = new TransactionScope())
            {
                var userExist = this.GetUserByKey(key);

                if (userExist == null)
                {
                    return false;
                }

                user.Id = Int32.Parse(key);

                this._userRepository.EditUser(user);

                transaction.Complete();

                return true;
            }
        }
    }
}
