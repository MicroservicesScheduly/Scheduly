using AutoMapper;
using FluentValidation;
using TokenService.Extentions;
using TokenService.Repositories;
using TokenService.Services;
using TokenService;
using TokenService.DbAccess;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using FluentValidation.AspNetCore;
using Services.Validation.FluentValidation;
using Microsoft.EntityFrameworkCore;
using TokenService.Interfaces;
using TokenService.Mocks;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddTransient<ExceptionMiddleware>();

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

builder.Services.AddControllers().AddFluentValidation(fv =>
{
    fv.RegisterValidatorsFromAssemblyContaining<RegistrationModelValidator>(lifetime: ServiceLifetime.Singleton);
    
    fv.RegisterValidatorsFromAssemblyContaining<LoginModelValidator>(lifetime: ServiceLifetime.Singleton);
   
    fv.RegisterValidatorsFromAssemblyContaining<UserModelValidator>(lifetime: ServiceLifetime.Singleton);
});
ValidatorOptions.Global.LanguageManager.Enabled = false;

builder.Services.AddTransient<ICredentialsRepository, CredRepMock>();
builder.Services.AddTransient<IRoleRepository, RoleRepMock>();
builder.Services.AddTransient<IUserRepository, UserRepMock>();

builder.Services.AddTransient<IUnitOfWork, UnitOWMock>();

builder.Services.AddTransient<UserService>();

var forumConnectionString = builder.Configuration.GetConnectionString("UsersDb");
builder.Services.AddDbContext<UserDbContext>(x => x.UseNpgsql(forumConnectionString));
builder.Services.AddTransient<UserDbContext>();

var mapperConfig = new MapperConfiguration(mc =>
{
    mc.AddProfile(new AutomapperProfile());
});

IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.ApplyMigrations();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();