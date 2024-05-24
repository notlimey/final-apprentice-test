using API.Data;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

public class RestaurantService : IRestaurantService
{
    private readonly ApplicationDbContext _dbContext;

    public RestaurantService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Restaurant?> GetRestaurantByIdAsync(Guid id)
    {
        return await _dbContext.Restaurants.FindAsync(id);
    }

    public async Task<List<Restaurant>> GetRestaurantsAsync()
    {
        return await _dbContext.Restaurants.ToListAsync();
    }

    public async Task<bool> CreateRestaurantAsync(Restaurant restaurant)
    {
        await _dbContext.Restaurants.AddAsync(restaurant);
        return await _dbContext.SaveChangesAsync() > 0;
    }

    public async Task<bool> UpdateRestaurantAsync(Restaurant restaurant)
    {
        _dbContext.Restaurants.Update(restaurant);
        return await _dbContext.SaveChangesAsync() > 0;
    }
}