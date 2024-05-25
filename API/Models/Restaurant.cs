using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class Restaurant
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    
    public string Name { get; set; } = string.Empty;
    
    [Required]
    [MaxLength(100)]
    public string Slug { get; set; } = string.Empty;
    
    public string Description { get; set; } = string.Empty;
    
    public string FoodType { get; set; } = string.Empty;
    
    public string Address { get; set; } = string.Empty;
    
    // Sat State to Innlandet as default since the assignment is about Innlandet. IN the future, this would preferably be changed to string.Empty;
    public string State { get; set; } = "Innlandet";
    
    public string City { get; set; } = string.Empty;
    
    public string ZipCode { get; set; } = string.Empty;
    
    public string PhoneNumber { get; set; } = string.Empty;
    
    public string Website { get; set; } = string.Empty;
    
    public string ImageUrl { get; set; } = string.Empty;
    
    // Add a json property for opening hours
    public OpeningHours OpeningHours { get; set; } = null!;
    
    public double Latitude { get; set; }
    
    public double Longitude { get; set; }
    
    // LLM generated summary based on all information and reviews
    public string Summary { get; set; } = string.Empty;
    
    public double AverageFoodQualityRating { get; set; }
    
    public double AverageServiceQualityRating { get; set; }
    
    public double AverageAmbianceRating { get; set; }
    
    public double AverageValueForMoneyRating { get; set; }
    
    public double AverageOverallRating { get; set; }
    
    public int NumberOfReviews { get; set; }
    
    public DateTimeOffset CreatedAt { get; set; }
    
    public DateTimeOffset UpdatedAt { get; set; }
    
    // relations
    public List<Review> Reviews { get; set; } = new List<Review>();
}

