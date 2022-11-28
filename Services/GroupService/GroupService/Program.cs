
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

builder.Services.AddTransient<IGroupRepository, GroupDbRepository>();
builder.Services.AddTransient<IGroupService, CatalogService.Services.GroupService>();

builder.Services.AddCors();

var groupsConnectionString = builder.Configuration.GetConnectionString("GroupDb");
builder.Services.AddDbContext<GroupDbContext>(x => x.UseNpgsql(groupsConnectionString));
builder.Services.AddTransient<GroupDbContext>();

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