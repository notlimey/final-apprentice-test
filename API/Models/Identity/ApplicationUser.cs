using Microsoft.AspNetCore.Identity;

namespace API.Models.Identity;

public class ApplicationUser : IdentityUser
{
    public bool IsAnonymous { get; set; } = false;
    
    public string FirstName { get; set; } = String.Empty;

    public string LastName { get; set; } = String.Empty;
    
    public string AvatarUrl { get; set; } = String.Empty;
}