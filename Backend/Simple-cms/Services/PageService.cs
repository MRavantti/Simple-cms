using System;
using System.Web.Http;
using System.Collections.Generic;
using Simple_cms.Interfaces;
using Simple_cms.Models;
using Simple_cms.Functions;
using System.Transactions;

namespace Simple_cms.Services
{
    public class PageService
    {
        private readonly IPageRepository _pageRepository;

        public PageService(IPageRepository postRepository)
        {
            this._pageRepository = postRepository;
        }

        public List<Page> GetPages()
        {
            return this._pageRepository.GetPages();
        }

        public Page GetPageByKey(string key)
        {
            return this._pageRepository.GetPageByKey(key);
        }

        public bool AddPage(Page page)
        {
            if (string.IsNullOrEmpty(page?.Page_name))
            {
                return false;
            }

            var dateTimeNow = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss");

            page.Created_date_time = DateTime.Parse(dateTimeNow);

            this._pageRepository.AddPage(page);

            return true;
        }

        public bool EditPage(Page page, string key)
        {
            using (var transaction = new TransactionScope())
            {
                var pageExist = this.GetPageByKey(key);

                if (pageExist == null)
                {
                    return false;
                }

                page.Page_id = Int32.Parse(key);

                var dateTimeNow = DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss");

                page.Updated_at_date_time = DateTime.Parse(dateTimeNow);

                CheckIfFieldIsEmpty.CheckPageField(pageExist, page);

                this._pageRepository.EditPage(page);

                transaction.Complete();

                return true;
            }
        }

        public bool DeletePage(string key)
        {
            using (var transaction = new TransactionScope())
            {
                var pageExist = this.GetPageByKey(key);

                if (pageExist == null)
                {
                    return false;
                }

                this._pageRepository.DeletePage(key);

                transaction.Complete();

                return true;
            }
        }
    }
}
