using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PSCORE.DataBase.Models
{
    public class Activitat
    {
        [Key]
        public int Id {get;set;}

        [MaxLength(100)]
        public string Nom {get;set;}
        public virtual Regne Regne {get;set;}
        public bool Fet_be {get;set;}
        public int Progres {get;set;} = 0;
        public virtual List<UsuarioActivitats> UsuarioActivitats {get;set;} = new List<UsuarioActivitats>();

    }
}