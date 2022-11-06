﻿using AutoMapper;

using DisciplineService.Entities;
using DisciplineService.Interfaces;
using DisciplineService.Models;

namespace DisciplineService.Services
{
    public class DisciplineService : IDisciplineService
    {
        private readonly IDisciplineRepository _disciplineRepository;

        private readonly IMapper _mapper;

        public DisciplineService(IDisciplineRepository disciplineRepository, IMapper mapper)
        {
            _disciplineRepository = disciplineRepository;
            _mapper = mapper;
        }

        public async Task<DisciplineModel> AddAsync(DisciplineModel model)
        {
            var discipline = _mapper.Map<Discipline>(model);

            var disciplineCreated = await _disciplineRepository.AddAsync(discipline);

            await _disciplineRepository.SaveAsync();

            return _mapper.Map<DisciplineModel>(disciplineCreated);
        }

        public async Task DeleteByIdAsync(int modelId)
        {
            await _disciplineRepository.DeleteByIdAsync(modelId);

            await _disciplineRepository.SaveAsync();
        }

        public async Task<IEnumerable<DisciplineModel>> GetAllAsync()
        {
            var disciplines = await _disciplineRepository.GetAllAsync();

            return _mapper.Map<IEnumerable<DisciplineModel>>(disciplines);
        }

        public async Task<DisciplineModel> GetByIdAsync(int id)
        {
            var discipline = await _disciplineRepository.GetByIdAsync(id);

            return _mapper.Map<DisciplineModel>(discipline);
        }

        public async Task<IEnumerable<DisciplineModel>> GetSelective()
        {
            var disciplines = await _disciplineRepository.GetAllAsync();

            return _mapper.Map<IEnumerable<DisciplineModel>>(disciplines.Where(p => p.IsSelective));
        }

        public async Task<IEnumerable<DisciplineModel>> GetMandatory()
        {
            var disciplines = await _disciplineRepository.GetAllAsync();

            return _mapper.Map<IEnumerable<DisciplineModel>>(disciplines.Where(p => !p.IsSelective));
        }

        public async Task UpdateAsync(int id, DisciplineModel model)
        {
            var discipline = _mapper.Map<Discipline>(model);

            await Task.Run(() => _disciplineRepository.Update(discipline));

            await _disciplineRepository.SaveAsync();
        }
    }
}
