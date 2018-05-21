using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PSCORE.DataBase.Models
{
    public class Regne
    {
        [Key]
        [MaxLength(100)]
        public string Nom {get;set;}
        public int Progres {get;set;}
        

        public virtual List<Activitat> Activitats {get;set;} = new List<Activitat>();
    }
}