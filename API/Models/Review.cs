using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using API.Models.Identity;

namespace API.Models;

public class Review
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    
    public string Title { get; set; } = String.Empty;
    
    public DateOnly DateVisited { get; set; }
    
    public int FoodQualityRating { get; set; }
    
    public int ServiceQualityRating { get; set; }
    
    public int AmbianceRating { get; set; }
    
    public int ValueForMoneyRating { get; set; }
    
    public int OverallRating { get; set; }
    
    public string Comment { get; set; } = String.Empty;
    
    public DateTimeOffset CreatedAt { get; set; }
    
    public DateTimeOffset UpdatedAt { get; set; }
    
    // relations
    
    public Guid RestaurantId { get; set; }
    
    public Restaurant Restaurant { get; set; } = null!;
    
    public string UserId { get; set; }
    
    public ApplicationUser User { get; set; } = null!;
}