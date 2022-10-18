using AutoMapper;
using Business.Models;
using Data_access.Entities;

public class AutomapperProfile : Profile
{
    public AutomapperProfile()
    {
        CreateMap<Teacher, TeacherModel>()
            .ReverseMap();
    }
}