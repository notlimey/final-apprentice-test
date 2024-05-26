namespace API.DTOS.Review;

public class CreateReviewDto
{
    public string Title { get; set; } = String.Empty;
    
    public DateOnly DateVisited { get; set; }
    
    public int FoodQualityRating { get; set; }
    
    public int ServiceQualityRating { get; set; }
    
    public int AmbianceRating { get; set; }
    
    public int ValueForMoneyRating { get; set; }
    
    public int OverallRating { get; set; }
    
    public string Comment { get; set; } = String.Empty;
    
    public List<string> DishNames { get; set; } = new();
}