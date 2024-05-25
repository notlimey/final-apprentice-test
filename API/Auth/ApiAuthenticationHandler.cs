using System.Security.Claims;
using System.Text.Encodings.Web;
using API.Data;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Auth;

public class ApiAuthenticationHandler: AuthenticationHandler<AuthenticationSchemeOptions>
{
    
    private readonly ApplicationDbContext _dbContext;

    public ApiAuthenticationHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock,
        ApplicationDbContext dbContext)
        : base(options, logger, encoder, clock)
    {
        _dbContext = dbContext;
    }
    
    

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        Console.WriteLine($"Header: {Request.Headers["ApiKey"]}");
        if (!Request.Headers.ContainsKey("ApiKey"))
            return AuthenticateResult.NoResult();

        var apiKey = Request.Headers["ApiKey"].FirstOrDefault();
        if (string.IsNullOrEmpty(apiKey))
            return AuthenticateResult.NoResult();

        var apiToken = await _dbContext.ApiTokens.SingleOrDefaultAsync(x => x.Token == apiKey);
        if (apiToken == null)
            return AuthenticateResult.Fail("Invalid API Token");
        
        if(!apiToken.IsActive)
            return AuthenticateResult.Fail("API Token is not active");

        var claims = new[] { new Claim(ClaimTypes.Name, apiToken.Description) };
        var identity = new ClaimsIdentity(claims, nameof(ApiAuthenticationHandler));
        var ticket = new AuthenticationTicket(new ClaimsPrincipal(identity), Scheme.Name);

        return AuthenticateResult.Success(ticket);
    }
}