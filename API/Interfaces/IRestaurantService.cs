using API.Models;

namespace API.Interfaces;

public interface IRestaurantService
{
    Task<Restaurant?> GetRestaurantByIdAsync(Guid id);
    
    Task<List<Restaurant>> GetRestaurantsAsync();
    
    Task<bool> CreateRestaurantAsync(Restaurant restaurant);
    
    Task<bool> UpdateRestaurantAsync(Restaurant restaurant);
}