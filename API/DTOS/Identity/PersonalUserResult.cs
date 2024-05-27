using API.Models.Identity;
using Microsoft.AspNetCore.Identity;

namespace API.DTOS.Identity;

public class PersonalUserResult
{
    public virtual UserDto User { get; set; }

    public List<string> Roles { get; set; }
};

public class PersonalUserResultExtended : PersonalUserResult
{
    public List<string> Providers { get; set; }
    
    public ExtendedUserDto User { get; set; }
}