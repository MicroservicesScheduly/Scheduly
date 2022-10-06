using Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Interfaces
{
    public interface IDisciplineService
    {
        Task<DisciplineModel> AddAsync(DisciplineModel model);
        Task<IEnumerable<DisciplineModel>> GetAllAsync();
        Task<DisciplineModel> GetByIdAsync(int id);
        Task UpdateAsync(int id, DisciplineModel model);
        Task DeleteByIdAsync(int modelId);
    }
}
