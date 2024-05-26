using API.Models.Identity;
using Microsoft.AspNetCore.Identity;

namespace API;

public class AuthenticationSeed
{
    private readonly RoleManager<ApplicationRole> _roleManager;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IConfiguration _configuration;

    public AuthenticationSeed(RoleManager<ApplicationRole> roleManager, UserManager<ApplicationUser> userManager, IConfiguration configuration)
    {
        _roleManager = roleManager;
        _userManager = userManager;
        _configuration = configuration;
    }

    public async Task SeedRoles()
    {
        if (!await _roleManager.RoleExistsAsync("Admin"))
        {
            var role = new ApplicationRole { Name = "Admin" };
            await _roleManager.CreateAsync(role);
        }
        
        var user = await _userManager.GetUsersInRoleAsync("Admin").ContinueWith(x => x.Result.FirstOrDefault());

        if (user == null)
        {
            var admin = new ApplicationUser
            {
                UserName = "admin",
                Email = "admin@localadmin.com",
                FirstName = "Admin",
                LastName = "Admin",
                AvatarUrl = "https://api.dicebear.com/8.x/adventurer/svg?seed=Cuddles",
                IsAnonymous = false,
            };

            var res = await _userManager.CreateAsync(admin, _configuration.GetValue<string>("Seed:AdminPassword"));
            
            if (!res.Succeeded)
            {
                
                foreach (var error in res.Errors)
                {
                    Console.WriteLine($"Code: {error.Code}. Description: {error.Description}");
                }
                throw new Exception("Failed to create admin user");
            }

            await _userManager.AddToRoleAsync(admin, "Admin");
        }
    }
}