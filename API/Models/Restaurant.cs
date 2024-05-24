using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models;

public class Restaurant
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
    
    public string Name { get; set; } = String.Empty;
    
    [Required]
    [MaxLength(100)]
    public string Slug { get; set; } = String.Empty;
    
    public string Description { get; set; } = String.Empty;
    
    public string FoodType { get; set; } = String.Empty;
    
    public string Address { get; set; } = String.Empty;
    
    // Sat State to Innlandet as default since the assignment is about Innlandet. IN the future, this would preferably be changed to String.Empty;
    public string State { get; set; } = "Innlandet";
    
    public string City { get; set; } = String.Empty;
    
    public string ZipCode { get; set; } = String.Empty;
    
    public string PhoneNumber { get; set; } = String.Empty;
    
    public string Website { get; set; } = String.Empty;
    
    public string ImageUrl { get; set; } = String.Empty;
    
    // Add a json property for opening hours
    public OpeningHours OpeningHours { get; set; } = null!;
    
    public double Latitude { get; set; }
    
    public double Longitude { get; set; }
    
    // LLM generated summary based on all information and reviews
    public string Summary { get; set; } = String.Empty;
    
    
    public DateTimeOffset CreatedAt { get; set; }
    
    public DateTimeOffset UpdatedAt { get; set; }
    
    // relations
    public IEnumerable<Review> Reviews { get; set; } = new List<Review>();
}

