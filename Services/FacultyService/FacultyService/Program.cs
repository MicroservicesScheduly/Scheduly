using AutoMapper;
using Business;
using Business.Interfaces;
using Business.Service;
using FacultyService.DbAccess;
using FacultyService.Repositories;
using Microsoft.EntityFrameworkCore;
using SimpleService.Interfaces;
using Dodo.HttpClientResiliencePolicies;
using Polly.Contrib.WaitAndRetry;
using Polly;
using FacultyService;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using FacultyService.Attributes;
using FacultyService.Middlewares;
using FacultyService.Interfaces;
using FacultyService.Service;

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

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(build =>
    {
        build.AllowAnyOrigin().
        AllowAnyMethod().
        AllowAnyHeader();
    });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddTransient<IFacultyRepository, FacultyDbRepository>();
builder.Services.AddTransient<IFacultyService, FacultiesService>();
builder.Services.AddSingleton<IJwtUtils, TokenValidator>();

builder.Services.AddHttpClient<IFacultyService, FacultiesService>(client => 
{
    client.BaseAddress = new Uri("http://localhost/api/users");
})
    .AddTransientHttpErrorPolicy(policyBuilder => policyBuilder.WaitAndRetryAsync(Backoff.DecorrelatedJitterBackoffV2(TimeSpan.FromSeconds(1), 5)));

var facultyConnectionString = builder.Configuration.GetConnectionString("FacultyDb");
builder.Services.AddDbContext<FacultyDbContext>(x => x.UseNpgsql(facultyConnectionString));
builder.Services.AddTransient<FacultyDbContext>();    


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

//app.UseMiddleware<AutorizeMiddleware>();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
