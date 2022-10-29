using Microsoft.EntityFrameworkCore;
using SimpleService.Entities;

namespace FacultyService.DbAccess
{
    public class FacultyDbContext : DbContext
    {
        public DbSet<Faculty> Faculties { get; set; }

        public FacultyDbContext(DbContextOptions<FacultyDbContext> options) : base(options)
        {

        }

        public FacultyDbContext()
        {
        }
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseNpgsql("string");
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var faculty = modelBuilder.Entity<Faculty>();
            faculty.Property(x => x.Description).IsRequired().HasMaxLength(300);
            faculty.Property(x => x.Name).IsRequired().HasMaxLength(200);
        }
    }
}
