using AutoMapper;
using Business.Interfaces;
using Business.Models;
using SimpleService.Entities;
using SimpleService.Interfaces;

namespace Business.Service
{
    public class FacultyService : IFacultyService
    {
        private readonly IFacultyRepository _facultyRepository;

        private readonly IMapper _mapper;

        public FacultyService(IFacultyRepository facultyRepository, IMapper mapper)
        {
            _facultyRepository = facultyRepository;
            _mapper = mapper;
        }

        public async Task<FacultyModel> AddAsync(FacultyModel model)
        {
            var faculty = _mapper.Map<Faculty>(model);

            var facultyCreated = await _facultyRepository.AddAsync(faculty);

            return _mapper.Map<FacultyModel>(facultyCreated);
        }

        public async Task DeleteByIdAsync(int modelId)
        {
            await _facultyRepository.DeleteByIdAsync(modelId);
        }

        public async Task<IEnumerable<FacultyModel>> GetAllAsync()
        {
            var faculties = await _facultyRepository.GetAllAsync();

            return _mapper.Map<IEnumerable<FacultyModel>>(faculties);
        }

        public async Task<FacultyModel> GetByIdAsync(int id)
        {
            var faculty = await _facultyRepository.GetByIdAsync(id);

            return _mapper.Map<FacultyModel>(faculty);
        }

        public async Task UpdateAsync(int id, FacultyModel model)
        {
            var faculty = _mapper.Map<Faculty>(model);

            await Task.Run(()=> _facultyRepository.Update(faculty));
        }
    }
}
