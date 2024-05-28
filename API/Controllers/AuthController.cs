using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.DTOS.Identity;
using API.Mappings.Identity;
using API.Models.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IConfiguration _configuration;
    private readonly IHttpContextAccessor _accessor;  
    
    public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration, IHttpContextAccessor accessor)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _configuration = configuration;
        _accessor = accessor;
    }
    
    [HttpPost("login")]
    public async Task<LoginResultDto> Login([FromBody] LoginDto model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email) ?? 
                   await _userManager.FindByNameAsync(model.Email);
        
        if(user is null)
            throw new Exception("Invalid login attempt");
        
        if(!await _userManager.CheckPasswordAsync(user, model.Password))
            throw new Exception("Invalid login attempt");
        
        var roles = await _userManager.GetRolesAsync(user);
        
            
        var token = GenerateJwtToken(user, roles.ToList());
        return new LoginResultDto()
        {
            User = user.ToUserDto(),
            AuthToken = token,
            Roles = roles.ToList()
        };
    }
    
    [HttpPost("register")]
    public async Task<UserDto> Register([FromBody] RegisterUserDto dto)
    {
        var user = new ApplicationUser
        {
            UserName = dto.UserName,
            Email = dto.Email,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            AvatarUrl = dto.AvatarUrl,
            IsAnonymous = dto.IsAnonymous
        };
        
        var result = await _userManager.CreateAsync(user, dto.Password);
        
        if (!result.Succeeded)
        {
            throw new Exception(result.Errors.First().Description);
        }

        return user.ToUserDto();
    }
    

    [HttpGet("externallogin")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public IActionResult ExternalLogin(string provider, string returnUrl = null)
    {
        Console.WriteLine(returnUrl);
        var redirectUrl = Url.Action("externallogincallback", "Auth", new { returnUrl });
        var properties = _signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);
        return Challenge(properties, provider);
    }

    [HttpGet("externallogincallback")]
    [ApiExplorerSettings(IgnoreApi = true)]
    public async Task<IActionResult> ExternalLoginCallback(string returnUrl = null, string remoteError = null)
    {
        
        returnUrl = returnUrl ?? Url.Content("~/");
        if (remoteError != null)
        {
            return BadRequest(new { Error = remoteError });
        }

        var info = await _signInManager.GetExternalLoginInfoAsync();
        if (info == null)
        {
            return BadRequest(new { Error = "Error loading external login information." });
        }

        var signInResult = await _signInManager.ExternalLoginSignInAsync(info.LoginProvider, info.ProviderKey, isPersistent: false);
        if (signInResult.Succeeded)
        {
            var user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
            var roles = await _userManager.GetRolesAsync(user);
            var token = GenerateJwtToken(user, roles.ToList());

            // Send user and token information back to Next.js callback
            return Redirect($"{returnUrl}?token={Uri.EscapeDataString(token)}&id={user.Id}");
        }
        else
        {
            var email = info.Principal.FindFirstValue(ClaimTypes.Email);
            
            var user = new ApplicationUser
            {
                UserName = info.Principal.FindFirstValue(ClaimTypes.Name) ?? email,
                Email = email,
                AvatarUrl = $"https://api.dicebear.com/8.x/adventurer/svg?seed={Guid.NewGuid().ToString()}",
                IsAnonymous = false,
                EmailConfirmed = true,
                PhoneNumberConfirmed = false,
                TwoFactorEnabled = false,
            };
            
            user = await RandomizeUsernameHash(user);
            user.FirstName = user.UserName;

            var result = await _userManager.CreateAsync(user);
            if (result.Succeeded)
            {
                result = await _userManager.AddLoginAsync(user, info);
                if (result.Succeeded)
                {
                    await _signInManager.SignInAsync(user, isPersistent: false);
                    var roles = await _userManager.GetRolesAsync(user);
                    var token = GenerateJwtToken(user, roles.ToList());

                    // Send user and token information back to Next.js callback
                    return Redirect($"{returnUrl}?token={Uri.EscapeDataString(token)}&id={user.Id}");
                }
            }

            return BadRequest(result.Errors);
        }
    }

    [HttpGet("Personal")]
    public async Task<PersonalUserResult> GetPersonal()
    {
        
        var userId = _accessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
            throw new Exception("User id not found");
        
        var user = await _userManager.FindByIdAsync(userId);
        if(user is null)
            throw new Exception("User not found");
        
        var roles = await _userManager.GetRolesAsync(user);
        
        return new PersonalUserResult()
        {
            User = user.ToUserDto(),
            Roles = roles.ToList()
        };
    }
    
    
    [HttpGet("Personal/Extended")]
    public async Task<PersonalUserResultExtended?> GetPersonalExtended()
    {
        var userId = _accessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (userId == null)
            throw new Exception("User id not found");
        
        var user = await _userManager.FindByIdAsync(userId);
        if(user is null)
            throw new Exception("User not found");
        
        var roles = await _userManager.GetRolesAsync(user);
        
        var providers = await _userManager.GetLoginsAsync(user);
        
        return new PersonalUserResultExtended()
        {
            User = user.ToExtendedUserDto(),
            Roles = roles.ToList(),
            Providers = providers.Select(x => x.LoginProvider).ToList(),
        };
    }
    
    private string GenerateJwtToken(ApplicationUser user, List<string> roles = null)
    {
        var jwtSettings = _configuration.GetSection("Jwt");
        var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]);

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.UserName)
        };

        // Add each role as a new claim
        foreach (var role in roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }
        
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(Convert.ToDouble(jwtSettings["ExpireMinutes"])),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            Issuer = jwtSettings["Issuer"],
            Audience = jwtSettings["Audience"]
        };
        
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
    
    private async Task<ApplicationUser> RandomizeUsernameHash(ApplicationUser user, int depth = 0)
    {
        if (depth > 5)
        {
            throw new Exception("Username generation failed");
        }
        var userWithUsername = await _userManager.FindByNameAsync(user.UserName);
        if (userWithUsername != null)
        {
            var length = depth > 3 ? 10 : 5;
            user.UserName = $"{user.UserName}{Guid.NewGuid().ToString().Substring(0, length)}";
            
            return await RandomizeUsernameHash(user);
        }
        
        return user;
    }
}