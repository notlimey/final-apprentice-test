using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class RestaurantsController
{
    [HttpGet("/")]
    [Authorize]
    public IEnumerable<Restaurant> GetAll()
    {
        var restaurants = new List<Restaurant>
        {
            new Restaurant
            {
                Id = Guid.NewGuid(),
                Name = "Test Restaurant",
                Description = "This is a test restaurant",
                FoodType = "Test Food",
                Address = "Test Address",
                State = "Innlandet",
                City = "Test City",
                ZipCode = "1234",
                PhoneNumber = "12345678",
                Website = "https://test.com",
                ImageUrl = "https://test.com/image.jpg",
                OpeningHours = new OpeningHours {
                    Monday = new Hours {OpensAt = TimeSpan.FromHours(8), ClosesAt = TimeSpan.FromHours(20)},
                    Tuesday = new Hours {OpensAt = TimeSpan.FromHours(8), ClosesAt = TimeSpan.FromHours(20)},
                    Wednesday = new Hours {OpensAt = TimeSpan.FromHours(8), ClosesAt = TimeSpan.FromHours(20)},
                    Thursday = new Hours {OpensAt = TimeSpan.FromHours(8), ClosesAt = TimeSpan.FromHours(20)},
                    Friday = new Hours {OpensAt = TimeSpan.FromHours(8), ClosesAt = TimeSpan.FromHours(20)},
                },
                Latitude = 60.1234,
                Longitude = 10.1234,
                Summary = "This is a test restaurant",
                CreatedAt = DateTimeOffset.Now,
                UpdatedAt = DateTimeOffset.Now,
                Reviews = new List<Review>
                {
                    new Review
                    {
                        Id = Guid.NewGuid(),
                        Title = "Test Review",
                        DateVisited = DateOnly.FromDateTime(DateTime.Now),
                        FoodQualityRating = 5,
                        ServiceQualityRating = 5,
                        AmbianceRating = 5,
                        ValueForMoneyRating = 5,
                        OverallRating = 5,
                        Comment = "This is a test review",
                        CreatedAt = DateTimeOffset.Now,
                        UpdatedAt = DateTimeOffset.Now,
                        RestaurantId = Guid.NewGuid()
                    }
                }
            }
        };
        
        return restaurants;
    }
    
}