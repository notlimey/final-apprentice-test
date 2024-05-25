using API.DTOS.Restaurants;
using API.Interfaces;
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
    public async Task<List<Restaurant>> Get()
    {
        return await _restaurantService.GetRestaurantsAsync();
    }

    [HttpPost]
    public async Task<Restaurant> Create([FromBody] CreateRestaurantDto dto)
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

        return restaurant;
    }
    
}