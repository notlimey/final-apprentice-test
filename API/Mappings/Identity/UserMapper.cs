using API.DTOS.Identity;
using API.Models.Identity;
using Riok.Mapperly.Abstractions;

namespace API.Mappings.Identity;

[Mapper]
public static partial class UserMapper
{
    public static partial UserDto ToUserDto(this ApplicationUser user);
}