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

        //GET para enviar la informacion en la parte cliente (AJAX)
        [Authorize]
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            AppUser = await UserManager.GetUserAsync(User);

            if (AppUser is null)
            {
                return BadRequest("User is null");
            }
            //Coger solo la informacion de las actividades del usuario logeado
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
        // Post para guardar en la base de datos la informacion de las Actividades
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
                //Coger Usuario Logeado
                ApplicationUser user = await UserManager.GetUserAsync(User);

                if (user is null)
                {
                    return BadRequest("User is null");
                }
                //Coger reino de la actividad
                Regne regne = dbContext.Regnes.FirstOrDefault(x => x.Id == activitat_r.IdRegne);

                if (regne is null)
                {
                    return BadRequest("Regne is null");
                }

                //Añadir nueva actividad
                Activitat activitat = new Activitat
                {
                    Nom = activitat_r.Nombre,
                    Regne = regne,
                    Fet_be = activitat_r.Fet_be,
                    Progres = activitat_r.Progres
                };

                //Usuario de la actividad
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
        //Metodo para coger las variables de AJAX
        public class ActivitatObject
        {
            public string Nombre { get; set; }
            public int IdRegne { get; set; }
            public bool Fet_be { get; set; }
            public int Progres { get; set; }
        }
    }
}