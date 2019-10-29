﻿using System;
using System.Collections.Generic;
using Simple_cms.Models;

namespace Simple_cms.Interfaces
{
    public interface IPostRepository
    {
        List<Post> GetPosts();
        Post GetPostById(int id);
    }
}
