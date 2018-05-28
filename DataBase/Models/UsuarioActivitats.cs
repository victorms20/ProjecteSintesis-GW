using System.ComponentModel.DataAnnotations;
using PSCORE.Models;

namespace PSCORE.DataBase.Models
{
    public class UsuarioActivitats
    {
        [Key]
        public int Id {get;set;}
        public virtual ApplicationUser Usuario {get;set;}
        public virtual Activitat Activitat {get;set;}
    }
}