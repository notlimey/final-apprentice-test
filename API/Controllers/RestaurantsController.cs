using API.DTOS.Restaurants;
using API.Interfaces;
using API.Mappings.Restaurant;
using API.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize(AuthenticationSchemes = $"ApiToken, {JwtBearerDefaults.AuthenticationScheme}")]
public class RestaurantsController
{
    private readonly IRestaurantService _restaurantService;

    public RestaurantsController(IRestaurantService restaurantService)
    {
        _restaurantService = restaurantService;
    }
    
    [HttpGet]
    [AllowAnonymous]
    public async Task<List<RestaurantDto>> Get()
    {
        var results = await _restaurantService.GetRestaurantsAsync();
        return results.ToDtos();
    }
    
    [HttpGet("{slugOrId}")]
    [AllowAnonymous]
    public async Task<RestaurantDto> Get(string slugOrId)
    {
        if (Guid.TryParse(slugOrId, out var id))
        {
            var restaurant = await _restaurantService.GetRestaurantByIdAsync(id);
            if (restaurant == null)
                throw new Exception("Restaurant not found");

            return restaurant.ToDto();
        }
        
        var restaurantBySlug = await _restaurantService.GetRestaurantBySlugAsync(slugOrId);
        
        if (restaurantBySlug == null)
            throw new Exception("Restaurant not found");
        
        return restaurantBySlug.ToDto();
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<RestaurantDto> Create([FromBody] CreateRestaurantDto dto)
    {
        var restaurant = new Restaurant()
        {
            Name = dto.Name,
            Slug = dto.Slug,
            Description = dto.Description,
            FoodType = dto.FoodType,
            Address = dto.Address,
            State = dto.State,
            City = dto.City,
            ZipCode = dto.ZipCode,
            PhoneNumber = dto.PhoneNumber,
            Website = dto.Website,
            ImageUrl = dto.ImageUrl,
            OpeningHours = dto.OpeningHours,
            Latitude = dto.Latitude,
            Longitude = dto.Longitude,
            CreatedAt = DateTimeOffset.UtcNow,
            UpdatedAt = DateTimeOffset.UtcNow
        };

        var success = await _restaurantService.CreateRestaurantAsync(restaurant);
        if (!success)
            throw new Exception("Failed to create restaurant");

        return restaurant.ToDto();
    }
}