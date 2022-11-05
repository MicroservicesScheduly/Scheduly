using AutoMapper;
using Business.Interfaces;
using Business.Models;
using Data_access.Entities;
using Data_access.Interfaces;

namespace Business.Service
{
    public class TeacherService : ITeacherService
    {
        private readonly ITeacherRepository _teacherRepository;

        private readonly IMapper _mapper;

        public TeacherService(ITeacherRepository teacherRepository, IMapper mapper)
        {
            _teacherRepository = teacherRepository;
            _mapper = mapper;
        }

        public async Task<TeacherModel> AddAsync(TeacherModel model)
        {
            var teacher = _mapper.Map<Teacher>(model);

            var teacherCreated = await _teacherRepository.AddAsync(teacher);

            await _teacherRepository.SaveAsync();

            return _mapper.Map<TeacherModel>(teacherCreated);
        }

        public async Task DeleteByIdAsync(int modelId)
        {
            await _teacherRepository.DeleteByIdAsync(modelId);

            await _teacherRepository.SaveAsync();
        }

        public async Task<IEnumerable<TeacherModel>> GetAllAsync()
        {
            var teachers = await _teacherRepository.GetAllAsync();

            return _mapper.Map<IEnumerable<TeacherModel>>(teachers);
        }

        public async Task<TeacherModel> GetByIdAsync(int id)
        {
            var teacher = await _teacherRepository.GetByIdAsync(id);

            return _mapper.Map<TeacherModel>(teacher);
        }

        public async Task UpdateAsync(int id, TeacherModel model)
        {
            var teacher = _mapper.Map<Teacher>(model);

            await Task.Run(()=> _teacherRepository.Update(teacher));

            await _teacherRepository.SaveAsync();
        }
    }
}
