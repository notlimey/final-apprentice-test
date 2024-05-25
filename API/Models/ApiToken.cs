using API.Models.Identity;

namespace API.Models;

public class ApiToken
{
    public Guid Id { get; set; }
    
    public string Token { get; set; }
    
    public string Description { get; set; }
    
    public DateTime CreatedAt { get; set; }
    public DateTime? ExpiresAt { get; set; }
    
    public bool IsActive => ExpiresAt == null || ExpiresAt > DateTime.UtcNow;
    
    public string UserId { get; set; } = String.Empty;
    
    public ApplicationUser User { get; set; } = null!;
}