using DisciplineService.Entities;
using Microsoft.EntityFrameworkCore;

namespace DisciplineService
{
    public class DisciplineServiceContext : DbContext
    {
        public DbSet<Discipline> Disciplines { get; set; }

        public DisciplineServiceContext(DbContextOptions<DisciplineServiceContext> options)
            : base(options) { }
    }
}
