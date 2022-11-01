using DisciplineService.Entities;
using DisciplineService.Enums;
using DisciplineService.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DisciplineService.Repositories
{
    public class DisciplineRepository : IDisciplineRepository
    {
        /*private readonly List<Discipline> _list = new() { new Discipline { Id = 1, Name = "Discipline1", Description = "Descipline1Description",
            Course = 1, CreditType = CreditType.Test, Hours = 80, IsSelective = true } };*/
        private readonly DisciplineServiceContext _dbContext;

        public DisciplineRepository(DisciplineServiceContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Discipline> AddAsync(Discipline entity)
        {
            await _dbContext.Disciplines.AddAsync(entity);

            return entity;
        }

        public async Task<Discipline> DeleteByIdAsync(int id)
        {
            var entity = await _dbContext.Disciplines.FindAsync(id);

            if (entity != null)
            {
                _dbContext.Entry(entity).State = EntityState.Deleted;
            }

            return entity;
        }

        public async Task<IEnumerable<Discipline>> GetAllAsync()
        {
            return await _dbContext.Disciplines.ToListAsync();
        }

        public async Task<Discipline> GetByIdAsync(int id)
        {
            return await _dbContext.Disciplines.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async void Update(Discipline entity)
        {
            _dbContext.Entry(entity).State = EntityState.Modified;
        }
    }
}
