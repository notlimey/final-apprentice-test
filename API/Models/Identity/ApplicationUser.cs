using Microsoft.AspNetCore.Identity;

namespace API.Models.Identity;

public class ApplicationUser : IdentityUser
{
    public bool IsAnonymous { get; set; } = false;
    
    public string FirstName { get; set; } = String.Empty;

    public string LastName { get; set; } = String.Empty;
    
    public string AvatarUrl { get; set; } = String.Empty;
    
    public RatingStyle RatingStyle { get; set; } = RatingStyle.Star;
    
    public IEnumerable<ApiToken> ApiTokens { get; set; } = new List<ApiToken>();
    
    public IEnumerable<Review> Reviews { get; set; } = new List<Review>();
}

public enum RatingStyle
{
    Star,
    Emoji,
    Meme
}