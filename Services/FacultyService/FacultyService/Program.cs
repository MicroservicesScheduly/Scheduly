using AutoMapper;
using Business;
using Business.Interfaces;
using Business.Service;
using FacultyService.DbAccess;
using FacultyService.Repositories;
using Microsoft.EntityFrameworkCore;
using SimpleService.Interfaces;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<IFacultyRepository, FacultyDbRepository>();
builder.Services.AddSingleton<IFacultyService, FacultiesService>();

builder.Services.AddCors();

var forumConnectionString = builder.Configuration.GetConnectionString("FacultyDb");
builder.Services.AddDbContext<FacultyDbContext>(x => x.UseNpgsql(forumConnectionString));
builder.Services.AddTransient<FacultyDbContext>();

var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new AutomapperProfile());
});

IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder =>
    {
        builder
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader();
    });

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
