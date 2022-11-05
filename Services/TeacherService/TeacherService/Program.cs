using AutoMapper;
using Business;
using Business.Interfaces;
using Business.Service;
using Data_access.Interfaces;
using Data_access.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using TeacherService.DbAccess;
using TeacherService.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<ITeacherRepository, TeacherDbRepository>();
builder.Services.AddTransient<ITeacherService, Business.Service.TeacherService>();

builder.Services.AddCors();

var teacherConnectionString = builder.Configuration.GetConnectionString("TeacherDb");
builder.Services.AddDbContext<TeacherDbContext>(x => x.UseNpgsql(teacherConnectionString));
builder.Services.AddTransient<TeacherDbContext>();

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
