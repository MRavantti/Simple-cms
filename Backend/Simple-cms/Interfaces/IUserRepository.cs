using System;
using System.Collections.Generic;
using Simple_cms.Models;

namespace Simple_cms.Interfaces
{
    public interface IUserRepository
    {
        List<User> GetUsers();
        User GetUserByKey(string key);
        void AddUser(User user);
        void EditUser(User user);
        void DeleteUser(string key);
    }
}
