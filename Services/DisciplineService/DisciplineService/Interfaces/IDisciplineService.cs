using DisciplineService.Models;

namespace DisciplineService.Interfaces
{
    public interface IDisciplineService
    {
        Task<DisciplineModel> AddAsync(DisciplineModel model);
        Task<IEnumerable<DisciplineModel>> GetAllAsync();
        Task<IEnumerable<DisciplineModel>> GetSelective();
        Task<IEnumerable<DisciplineModel>> GetMandatory();
        Task<DisciplineModel> GetByIdAsync(int id);
        Task UpdateAsync(int id, DisciplineModel model);
        Task DeleteByIdAsync(int modelId);
    }
}
