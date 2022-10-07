using AutoMapper;
using DisciplineService.Entities;
using DisciplineService.Models;

namespace DisciplineService
{
    public class AutomapperProfile : Profile
    {
        public AutomapperProfile()
        {
            CreateMap<Discipline, DisciplineModel>()
                .ReverseMap();
        }
    }
}
