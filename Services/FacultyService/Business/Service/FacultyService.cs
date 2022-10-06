using Business.Interfaces;
using Business.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Service
{
    public class FacultyService : IFacultyService
    {
        public Task<FacultyModel> AddAsync(FacultyModel model)
        {
            throw new NotImplementedException();
        }

        public Task DeleteByIdAsync(int modelId)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<FacultyModel>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<FacultyModel> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task UpdateAsync(int id, FacultyModel model)
        {
            throw new NotImplementedException();
        }
    }
}
