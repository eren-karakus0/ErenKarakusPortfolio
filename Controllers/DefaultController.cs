using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AcunMediaPortfolio.Controllers
{
    public class DefaultController : Controller
    {
        
        public PartialViewResult PartialSkill()
        {
            return PartialView();
        }
        public PartialViewResult PartialAbout()
        {
            return PartialView();
        }
        public ActionResult Index()
        {
            return View();
        }
        public PartialViewResult PartialHead()
        {
            return PartialView();
        }
        public PartialViewResult PartialScripts()
        {
            return PartialView();
        }
        public PartialViewResult PartialSidebar()
        {
            return PartialView();
        }
        public PartialViewResult PartialHeroSection()
        {
            return PartialView();
        }
        public PartialViewResult PartialResumeSection()
        {
            return PartialView();
        }
        public PartialViewResult PartialStats()
        {
            return PartialView();
        }
        public PartialViewResult PartialPortfolio()
        {
            return PartialView();
        }
        public PartialViewResult PartialTestimonial()
        {
            return PartialView();
        }
        public PartialViewResult PartialContact()
        {
            return PartialView();
        }
        public PartialViewResult PartialFooter()
        {
            return PartialView();
        }

    }
    
}