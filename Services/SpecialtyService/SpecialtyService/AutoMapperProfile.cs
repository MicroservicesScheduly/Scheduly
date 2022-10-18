using AutoMapper;
using Business.Models;
using Data_access.Entities;

public class AutomapperProfile : Profile
{
     public AutomapperProfile()
        {
            CreateMap<Specialty, SpecialtyModel>()
                .ReverseMap();
        }
}