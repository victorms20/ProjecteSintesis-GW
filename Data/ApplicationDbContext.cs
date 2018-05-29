using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PSCORE.DataBase.Models;
using PSCORE.Models;

namespace PSCORE.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext() {}
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.EnableSensitiveDataLogging();
            //optionsBuilder.UseSqlServer("Server=localhost;Database=GlishWorld;User ID=SA;Password=Matilla17s!");
        }

        public DbSet<Activitat> Activitats { get; set; }
        public DbSet<Regne> Regnes {get;set;}

        public DbSet<UsuarioActivitats> UsuarioActivitats { get; set; }
    }
}
