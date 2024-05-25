namespace API.DTOS.Restaurants;

public class OpeningHoursDto
{
    public HoursDto? Monday { get; set; }
    
    public HoursDto? Tuesday { get; set; }
    
    public HoursDto? Wednesday { get; set; }
    
    public HoursDto? Thursday { get; set; }
    
    public HoursDto? Friday { get; set; }
    
    public HoursDto? Saturday { get; set; }
    
    public HoursDto? Sunday { get; set; }
}

public class HoursDto
{
    public TimeSpan OpensAt { get; set; }
    
    public TimeSpan ClosesAt { get; set; }
}