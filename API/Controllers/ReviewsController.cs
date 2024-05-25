using System.Security.Claims;
using API.DTOS.Review;
using API.Interfaces;
using API.Mappings.Reviews;
using API.Models;
using API.Models.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(AuthenticationSchemes = $"ApiToken, {JwtBearerDefaults.AuthenticationScheme}")]
public class ReviewsController
{
    private readonly IReviewService _reviewService;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IHttpContextAccessor _accessor;  

    public ReviewsController(IRestaurantService restaurantService, IReviewService reviewService, UserManager<ApplicationUser> userManager, IHttpContextAccessor accessor)
    {
        _reviewService = reviewService;
        _userManager = userManager;
        _accessor = accessor;
    }

    [HttpGet("Resturant/{id}")]
    public async Task<List<ReviewDto>> GetByRestaurant(Guid id)
    {
        var result = await _reviewService.GetReviewsByRestaurantAsync(id, includeUser: true);

        return result.ToDtos();
    }
    
    [HttpGet("User/{id}")]
    public async Task<List<Review>> GetByUser(string id)
    {
        return await _reviewService.GetReviewsByUserAsync(id, includeRestaurant: true);
    }
    
    [HttpPost("{restaurantId}")]
    public async Task<bool> Create([FromBody] CreateReviewDto dto, string restaurantId)
    {
        var id = _accessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (id == null) throw new Exception("User id not found");
        var user = await  _userManager.FindByIdAsync(id);
        
        if (user == null)
            throw new Exception("User not found");

        Guid.TryParse(restaurantId, out var guid);

        var review = new Review()
        {
            Title = dto.Title,
            DateVisited = dto.DateVisited,
            FoodQualityRating = dto.FoodQualityRating,
            ServiceQualityRating = dto.ServiceQualityRating,
            AmbianceRating = dto.AmbianceRating,
            ValueForMoneyRating = dto.ValueForMoneyRating,
            OverallRating = dto.OverallRating,
            Comment = dto.Comment,
            RestaurantId = guid,
            UserId = user.Id,
            CreatedAt = DateTimeOffset.UtcNow,
            UpdatedAt = DateTimeOffset.UtcNow
        };
        
        var success = await _reviewService.CreateReviewAsync(review);
        
        if(!success)
            throw new Exception("Failed to create review");
        
        return success;
    }
    
    [HttpDelete]
    public async Task<bool> Delete(Guid id)
    {
        
        var success = await _reviewService.DeleteReviewAsync(id);
        
        if(!success)
            throw new Exception("Failed to delete review");
        
        return success;
    }
}