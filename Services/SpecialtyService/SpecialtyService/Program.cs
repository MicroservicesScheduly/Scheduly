using AutoMapper;
using Business.Service;
using Business.Interfaces;
using Data_access.Interfaces;
using Data_access.Repositories;
using SpecialtyService.DbAccess;
using Microsoft.EntityFrameworkCore;
using SpecialtyService.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<ISpecialtyRepository, SpecialtyDbRepository>();
builder.Services.AddTransient<ISpecialtyService, Business.Service.SpecialtyService>();

builder.Services.AddTransient<IFacultySpecialtyRepository, FacultySpecialtyDbRepository>();
builder.Services.AddTransient<IFacultySpecialtyService, FacultySpecialtyService>();

builder.Services.AddCors();

var specialtyConnectionString = builder.Configuration.GetConnectionString("SpecialtyDb");
builder.Services.AddDbContext<SpecialtyDbContext>(x => x.UseNpgsql(specialtyConnectionString));
builder.Services.AddTransient<SpecialtyDbContext>();

var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new AutomapperProfile());
});

IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);

var app = builder.Build();
app.ApplyMigrations();

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