using AutoMapper;
using Business.Models;
using Data_access.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business
{
    public class AutomapperProfile : Profile
    {
        public AutomapperProfile()
        {
            CreateMap<Faculty, FacultyModel>()
                .ReverseMap();
        }
    }
}
