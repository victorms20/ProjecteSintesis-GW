using System.ComponentModel.DataAnnotations;

namespace PSCORE.DataBase.Models
{
    public class Activitat
    {
        [Key]
        [MaxLength(100)]
        public string Nom {get;set;}
        public virtual Regne Regne {get;set;}
        public int Vegades_fet {get;set;}
        public int Vegades_fet_be {get;set;}
        public int Vegades_fet_malament {get;set;}
        public int Progres {get;set;}
        public float Temps {get;set;}
    }
}