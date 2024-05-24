namespace API.Models;

public class OpeningHours
{
    public Hours? Monday { get; set; }
    
    public Hours? Tuesday { get; set; }
    
    public Hours? Wednesday { get; set; }
    
    public Hours? Thursday { get; set; }
    
    public Hours? Friday { get; set; }
    
    public Hours? Saturday { get; set; }
    
    public Hours? Sunday { get; set; }
}

public class Hours
{
    public TimeSpan OpensAt { get; set; }
    
    public TimeSpan ClosesAt { get; set; }
}