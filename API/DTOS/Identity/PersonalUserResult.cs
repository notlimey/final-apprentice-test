namespace API.DTOS.Identity;

public class PersonalUserResult
{
    public UserDto User { get; set; }
    
    public List<string> Roles { get; set; }
}