namespace API.DTOS.Identity;

public class RegisterUserDto
{
    public string UserName { get; set; } = String.Empty;
    
    public string Email { get; set; } = String.Empty;
    
    public string Password { get; set; } = String.Empty;
    
    public bool IsAnonymous { get; set; } = false;
    
    public string FirstName { get; set; } = String.Empty;

    public string LastName { get; set; } = String.Empty;
    
    public string AvatarUrl { get; set; } = String.Empty;
}