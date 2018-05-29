using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PSCORE.Data;
using PSCORE.DataBase.Models;
using PSCORE.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace PSCORE.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class GuardarInformacion : Controller
    {
        private UserManager<ApplicationUser> UserManager;
        private ILogger<GuardarInformacion> Logger;
        private ApplicationUser AppUser;
        public GuardarInformacion(UserManager<ApplicationUser> userManager,
            ApplicationDbContext context,
            ILogger<GuardarInformacion> logger)
        {
            UserManager = userManager;
            dbContext = context;
            Logger = logger;
        }

        private readonly ApplicationDbContext dbContext;


        [Authorize]
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            AppUser = await UserManager.GetUserAsync(User);

            if (AppUser is null)
            {
                return BadRequest("User is null");
            }

            List<UsuarioActivitats> usuariActivitat = await dbContext
                .UsuarioActivitats
                .Include(x => x.Usuario)
                .Include(x => x.Activitat)
                .Where(x => x.Usuario.Id == AppUser.Id)
                .ToListAsync();

            List<Activitat> act = new List<Activitat>();
            foreach (var activitat in usuariActivitat)
            {
                if (AppUser.Id == activitat.Usuario.Id)
                {
                    act.Add(activitat.Activitat);
                }
            }

            if (act.Count == 0)
            {
                return NoContent();
            }

            return Ok(act);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> Guardar([FromBody] ActivitatObject activitat_r)
        {
            Logger.LogInformation(activitat_r?.ToString());

            if (!ModelState.IsValid)
            {
                return BadRequest("Model is invalid");
            }
            else
            {
                ApplicationUser user = await UserManager.GetUserAsync(User);

                if (user is null)
                {
                    return BadRequest("User is null");
                }

                Regne regne = dbContext.Regnes.FirstOrDefault(x => x.Id == activitat_r.IdRegne);

                if (regne is null)
                {
                    return BadRequest("Regne is null");
                }

                Activitat activitat = new Activitat
                {
                    Nom = activitat_r.Nombre,
                    Regne = regne,
                    Fet_be = activitat_r.Fet_be,
                    Progres = activitat_r.Progres
                };

                UsuarioActivitats ua = new UsuarioActivitats()
                {
                    Activitat = activitat,
                    Usuario = user
                };

                try
                {
                    dbContext.UsuarioActivitats.Add(ua);
                    dbContext.Activitats.Add(activitat);
                    dbContext.SaveChanges();

                    return Ok();
                }
                catch (System.Exception e)
                {
                    Logger.LogError(e.ToString());
                    return BadRequest();
                }
            }
        }

        public class ActivitatObject
        {
            public string Nombre { get; set; }
            public int IdRegne { get; set; }
            public bool Fet_be { get; set; }
            public int Progres { get; set; }

            public override string ToString()
            {
                return $"Nombre: {Nombre}, Idregne: {IdRegne}, FetBe: {Fet_be}, Progres: {Progres}";
            }
        }
    }
}