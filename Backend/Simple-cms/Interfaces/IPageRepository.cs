using System;
using System.Collections.Generic;
using Simple_cms.Models;

namespace Simple_cms.Interfaces
{
    public interface IPageRepository
    {
        List<Page> GetPages();
        Page GetPageByKey(string key);
        void AddPage(Page page);
        void EditPage(Page page);
        void DeletePage(string key);
    }
}
