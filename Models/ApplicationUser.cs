using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using PSCORE.DataBase.Models;

namespace PSCORE.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        public List<UsuarioActivitats> UsuarioActivitats {get;set;} = new List<UsuarioActivitats>();
    }
}
