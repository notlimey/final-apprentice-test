namespace API.DTOS.Identity;

public class LoginResultDto
{
    public string AuthToken { get; set; } = String.Empty;
    
    public UserDto User { get; set; } = new UserDto();
    
    public List<string> Roles { get; set; } = new();
}