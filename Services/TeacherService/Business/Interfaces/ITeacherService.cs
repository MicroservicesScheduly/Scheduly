using Business.Models;

namespace Business.Interfaces
{
    public interface ITeacherService
    {
        Task<TeacherModel> AddAsync(TeacherModel model);
        Task<IEnumerable<TeacherModel>> GetAllAsync();
        Task<TeacherModel> GetByIdAsync(int id);
        Task UpdateAsync(int id, TeacherModel model);
        Task DeleteByIdAsync(int modelId);
    }
}
