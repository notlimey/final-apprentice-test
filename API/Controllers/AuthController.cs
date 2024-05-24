using API.DTOS.Identity;
using API.Mappings.Identity;
using API.Models.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly UserMapper _userMapper;
    
    public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, UserMapper userMapper)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _userMapper = userMapper;
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

        return _userMapper.ToDto(user);
    }
}