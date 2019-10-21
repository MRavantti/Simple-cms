using System;
using System.Collections.Generic;
using Simple_cms.Models;

namespace Simple_cms.Interfaces
{
    public interface ICategoryRepository
    {
        IEnumerable<Category> Categories { get; set; }
    }
}
