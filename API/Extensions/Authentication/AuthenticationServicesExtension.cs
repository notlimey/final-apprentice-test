using System.Runtime.InteropServices.JavaScript;
using System.Text;
using API.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions.Authentication;

public static partial class AuthenticationServicesExtension
{
    public static AuthenticationBuilder AddAuth(this IServiceCollection services, IConfiguration configuration)
    {
        var jwtSettings = configuration.GetSection("Jwt");
        var jwtSettingKey = jwtSettings["Key"];
        
        if (String.IsNullOrEmpty(jwtSettingKey))
        {
            throw new Exception("Jwt Key is required");
        }
        
        var key = Encoding.ASCII.GetBytes(jwtSettingKey);

        return services.AddAuthentication(options =>
            {

                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = jwtSettings["Issuer"],
                    ValidAudience = jwtSettings["Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };
            })
            .AddScheme<AuthenticationSchemeOptions, ApiAuthenticationHandler>("ApiToken", null)
            .AddGoogle(options =>
            {
                options.ClientId = configuration["Authentication:Google:ClientId"];
                options.ClientSecret = configuration["Authentication:Google:ClientSecret"];
                // options.CallbackPath = "/Auth/externallogincallback";
            });
    }
}