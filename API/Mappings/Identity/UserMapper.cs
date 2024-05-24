using API.DTOS.Identity;
using API.Models.Identity;
using Riok.Mapperly.Abstractions;

namespace API.Mappings.Identity;

[Mapper]
public partial class UserMapper
{
    public partial UserDto ToDto(ApplicationUser user);
}