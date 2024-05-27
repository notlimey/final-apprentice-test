namespace API.Models.Identity;

public class UserProvider
{
    public string UserId { get; set; }
    public ApplicationUser User { get; set; }
    public string Provider { get; set; }
    public string ProviderKey { get; set; }
}