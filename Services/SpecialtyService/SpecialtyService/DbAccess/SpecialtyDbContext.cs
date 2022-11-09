using Data_access.Entities;
using Microsoft.EntityFrameworkCore;

namespace SpecialtyService.DbAccess
{
    public class SpecialtyDbContext : DbContext
    {
        public DbSet<Specialty> Specialties { get; set; }

        public SpecialtyDbContext(DbContextOptions<SpecialtyDbContext> options) : base(options)
        {

        }

        public SpecialtyDbContext()
        {
        }
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseNpgsql("string");
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var specialty = modelBuilder.Entity<Specialty>();
            specialty.Property(x => x.Description).IsRequired().HasMaxLength(300);
            specialty.Property(x => x.Name).IsRequired().HasMaxLength(200);
            specialty.Property(x => x.Cipher).IsRequired();
        }
    }
}
