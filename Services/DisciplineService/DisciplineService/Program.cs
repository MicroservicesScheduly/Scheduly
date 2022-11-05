using AutoMapper;
using DisciplineService;
using DisciplineService.DbAccess;
using DisciplineService.Interfaces;
using DisciplineService.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<IDisciplineRepository, DisciplineDbRepository>();
builder.Services.AddTransient<IDisciplineService, DisciplineService.Services.DisciplineService>();

builder.Services.AddCors();

var disciplinesConnectionString = builder.Configuration.GetConnectionString("DisciplineDb");
builder.Services.AddDbContext<DisciplineDbContext>(x => x.UseNpgsql(disciplinesConnectionString));
builder.Services.AddTransient<DisciplineDbContext>();

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