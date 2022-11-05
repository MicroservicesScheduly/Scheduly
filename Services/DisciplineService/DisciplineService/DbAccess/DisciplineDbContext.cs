using DisciplineService.Entities;
using Microsoft.EntityFrameworkCore;

namespace DisciplineService.DbAccess
{
    public class DisciplineDbContext : DbContext
    {
        public DbSet<Discipline> Disciplines { get; set; }

        public DisciplineDbContext(DbContextOptions<DisciplineDbContext> options) : base(options)
        {

        }

        public DisciplineDbContext()
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var discipline = modelBuilder.Entity<Discipline>();
            discipline.Property(x => x.Name).IsRequired().HasMaxLength(50);
            discipline.Property(x => x.Course).IsRequired();
            discipline.Property(x => x.Description).IsRequired().HasMaxLength(200);
            discipline.Property(x => x.CreditType).IsRequired();
            discipline.Property(x => x.IsSelective).IsRequired();
            discipline.Property(x => x.Hours).IsRequired();
        }
    }
}
