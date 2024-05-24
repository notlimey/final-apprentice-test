using API.Interfaces;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
public class ReviewsController
{
    private readonly IReviewService _reviewService;

    public ReviewsController(IRestaurantService restaurantService, IReviewService reviewService)
    {
        _reviewService = reviewService;
    }

    [HttpGet("Resturant/{id}")]
    [Authorize]
    public async Task<List<Review>> GetByRestaurant(Guid id)
    {
        return await _reviewService.GetReviewsByRestaurantAsync(id);
    }
    
    [HttpGet("User/{id}")]
    [Authorize]
    public async Task<List<Review>> GetByUser(string id)
    {
        return await _reviewService.GetReviewsByUserAsync(id);
    }
    
    
}