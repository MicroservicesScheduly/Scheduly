using Business.Models;

namespace Business.Interfaces
{
    public interface IFacultyService
    {
        Task<FacultyModel> AddAsync(FacultyModel model);
        Task<IEnumerable<FacultyModel>> GetAllAsync();
        Task<FacultyModel> GetByIdAsync(int id);
        Task UpdateAsync(int id, FacultyModel model);
        Task DeleteByIdAsync(int modelId);
    }
}
