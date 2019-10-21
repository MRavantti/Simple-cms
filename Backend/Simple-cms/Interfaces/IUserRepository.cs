﻿using System;
using System.Collections.Generic;
using Simple_cms.Models;

namespace Simple_cms.Interfaces
{
    public interface IUserRepository
    {
        List<User> Get();
        List<User> Get(int id);
    }
}
