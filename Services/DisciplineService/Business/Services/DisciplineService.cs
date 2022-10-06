using AutoMapper;
using Business.Interfaces;
using Business.Models;
using Data_access.Entities;
using Data_access.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Business.Service
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

            return _mapper.Map<DisciplineModel>(disciplineCreated);
        }

        public async Task DeleteByIdAsync(int modelId)
        {
            await _disciplineRepository.DeleteByIdAsync(modelId);
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

        public async Task UpdateAsync(int id, DisciplineModel model)
        {
            var discipline = _mapper.Map<Discipline>(model);

            await Task.Run(() => _disciplineRepository.Update(discipline));
        }
    }
}
