using API;
using API.Data;
using API.Extensions.Authentication;
using API.Extensions.Swagger;
using API.Interfaces;
using API.Models.Identity;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Google;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ??
                       Environment.GetEnvironmentVariable("POSTGRESQLCONNSTR_DefaultConnection");

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddIdentity<ApplicationUser, ApplicationRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuth(builder.Configuration);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerSecurity(builder.Configuration);

builder.Services.AddHttpContextAccessor();

builder.Services.AddScoped<AuthenticationSeed>();
builder.Services.AddScoped<IRestaurantService, RestaurantService>();
builder.Services.AddScoped<IReviewService, ReviewService>();

var app = builder.Build();

// Resolve the AuthenticationSeed service
using var scope = app.Services.CreateScope();
var seeder = scope.ServiceProvider.GetRequiredService<AuthenticationSeed>();
await seeder.SeedRoles();

// existing code...

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
