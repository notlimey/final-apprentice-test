namespace API.DTOS.Identity;

public class UserDto
{
    public Guid Id { get; set; }
    
    public string FirstName { get; set; } = String.Empty;
    
    public string LastName { get; set; } = String.Empty;
    
    public string AvatarUrl { get; set; } = String.Empty;
    
    public string UserName { get; set; } = String.Empty;
    
    public string Email { get; set; } = String.Empty;
}