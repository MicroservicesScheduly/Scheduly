﻿using Data_access.Entities;
using Data_access.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data_access.Repositories
{
    public class FacultyRepository : IFacultyRepository
    {
        private List<Faculty> _list = new List<Faculty>() { new Faculty { Id =1, Name = "Faculty1"} };
        public async Task<Faculty> AddAsync(Faculty entity)
        {
            await Task.Run(() => _list.Add(entity));

            return entity;
        }

        public async Task<Faculty> DeleteByIdAsync(int id)
        {
            var entity = await Task.Run(()=> _list.FirstOrDefault(x => x.Id == id));

            _list.Remove(entity);

            return entity;
        }

        public async Task<IEnumerable<Faculty>> GetAllAsync()
        {
            return await Task.Run(() => _list);
        }

        public async Task<Faculty> GetByIdAsync(int id)
        {
            var entity = await Task.Run(() => _list.FirstOrDefault(x => x.Id == id));

            return entity;
        }

        public async void Update(Faculty entity)
        {
            var toUpdate = await Task.Run(() => _list.FirstOrDefault(x => x.Id == entity.Id));

            _list.Remove(toUpdate);
            _list.Add(entity);
        }
    }
}
