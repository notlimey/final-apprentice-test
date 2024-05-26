namespace API.DTOS.Identity;

public class UserDto
{
    public string Id { get; set; }
    
    public bool IsAnonymous { get; set; }
    
    public string FirstName { get; set; } = String.Empty;
    
    public string LastName { get; set; } = String.Empty;
    
    public string AvatarUrl { get; set; } = String.Empty;
    
    public string UserName { get; set; } = String.Empty;
    
    public string Email { get; set; } = String.Empty;
}