﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PSCORE.DataBase.Models;
using PSCORE.Models;

namespace PSCORE.Controllers
{
    [Authorize]
    public class HomeController : Controller 
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

       
        public ActionResult ReinoNumeros()
        {
            return View();
        }
        [HttpGet("Activitat1RN")]
        public IActionResult Activitat1RN()
        {

            return View();
        }

        public IActionResult Activitat2RN()
        {
            return View();
        }

        public IActionResult Activitat3RN()
        {
            return View();
        }

        public ActionResult ReinoColores()
        {
            return View();
        }

        public ActionResult Activitat1RC()
        {
            return View();
        }

        public ActionResult Progress()
        {
            return View();
        }
    }
}
