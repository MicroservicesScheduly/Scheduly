using FacultyService.DbAccess;
using Microsoft.EntityFrameworkCore;
using SimpleService.Entities;
using SimpleService.Interfaces;

namespace FacultyService.Repositories
{
    public class FacultyDbRepository : IFacultyRepository
    {
        private readonly FacultyDbContext _dbContext;

        public FacultyDbRepository(FacultyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Faculty> AddAsync(Faculty entity)
        {
            await _dbContext.Faculties.AddAsync(entity);

            return entity;
        }

        public async Task<Faculty> DeleteByIdAsync(int id)
        {
            var entity = await _dbContext.Faculties.FindAsync(id);

            if (entity != null)
            {
                _dbContext.Entry(entity).State = EntityState.Deleted;
            }

            return entity;
        }

        public async Task<IEnumerable<Faculty>> GetAllAsync()
        {
            return await _dbContext.Faculties.ToListAsync();
        }

        public async Task<Faculty> GetByIdAsync(int id)
        {
            return await _dbContext.Faculties.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task SaveAsync()
        {
            await _dbContext.SaveChangesAsync();
        }

        public void Update(Faculty entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
        }
    }
}
