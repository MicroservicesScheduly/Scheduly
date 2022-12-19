using AutoMapper;
using CatalogDiscipline.Services;
using DisciplineService;
using DisciplineService.DbAccess;
using DisciplineService.Interfaces;
using DisciplineService.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Polly;
using Polly.Timeout;

var builder = WebApplication.CreateBuilder(args);

var authOptions = builder.Configuration.GetSection("Auth");
builder.Services.Configure<JwtOptions>(authOptions);
var auth = authOptions.Get<JwtOptions>();



builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {

        ValidateIssuer = true,
        ValidIssuer = auth.Issuer,

        ValidateAudience = false,
        ValidAudience = auth.Audience,

        ValidateLifetime = true,

        IssuerSigningKey = auth.GetSymmetricSecurityKey(),
        ValidateIssuerSigningKey = true,

    };
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<IDisciplineRepository, DisciplineDbRepository>();
builder.Services.AddHttpClient<IDisciplineService, DisciplineService.Services.DisciplineService>(a =>
{
    a.BaseAddress = new Uri("http://192.168.59.132/api/specialties/");
})
.AddTransientHttpErrorPolicy(b => b.Or<TimeoutRejectedException>().WaitAndRetryAsync(
    5,
    c => TimeSpan.FromSeconds(Math.Pow(2, c))
))
.AddTransientHttpErrorPolicy(b => b.Or<TimeoutRejectedException>().CircuitBreakerAsync(
    3,
    TimeSpan.FromSeconds(15)
    ))
.AddPolicyHandler(Policy.TimeoutAsync<HttpResponseMessage>(1));

builder.Services.AddTransient<ICatalogRepository, CatalogDbRepository>();
builder.Services.AddTransient<ICatalogService, CatalogService.Services.CatalogService>();

builder.Services.AddTransient<ICatalogDisciplineRepository, CatalogDisciplineDbRepository>();
builder.Services.AddTransient<ICatalogDisciplineService, CatalogDisciplineService>();

builder.Services.AddTransient<ISpecialtyDisciplineRepository, SpecialtyDisciplineDbRepository>();
builder.Services.AddTransient<ISpecialtyDisciplineService, SpecialtyDisciplineService>();

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

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();