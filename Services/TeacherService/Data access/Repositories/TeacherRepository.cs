using Data_access.Entities;
using Data_access.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data_access.Repositories
{
    public class TeacherRepository : ITeacherRepository
    {
        private List<Teacher> _list = new List<Teacher>() { new Teacher { Id = 1, Name = "Anton", Surname = "Tolmachov", Patronymic = "Mykhailovich"} };
        public async Task<Teacher> AddAsync(Teacher entity)
        {
            await Task.Run(() => _list.Add(entity));

            return entity;
        }

        public async Task<Teacher> DeleteByIdAsync(int id)
        {
            var entity = await Task.Run(()=> _list.FirstOrDefault(x => x.Id == id));

            _list.Remove(entity);

            return entity;
        }

        public async Task<IEnumerable<Teacher>> GetAllAsync()
        {
            return await Task.Run(() => _list);
        }

        public async Task<Teacher> GetByIdAsync(int id)
        {
            var entity = await Task.Run(() => _list.FirstOrDefault(x => x.Id == id));

            return entity;
        }

        public async void Update(Teacher entity)
        {
            var toUpdate = await Task.Run(() => _list.FirstOrDefault(x => x.Id == entity.Id));

            _list.Remove(toUpdate);
            _list.Add(entity);
        }
    }
}
