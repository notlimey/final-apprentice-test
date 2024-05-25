using API.Models;

namespace API.Interfaces;

public interface IReviewService
{
    Task<Review?> GetReviewByIdAsync(Guid id, bool includeRestaurant = false, bool includeUser = false);
    
    Task<Review?> GetPersonalReviewAsync(string userId, Guid restaurantId, bool includeRestaurant = false,
        bool includeUser = false);

    Task<List<Review>> GetReviewsByRestaurantAsync(Guid resturantId, bool includeRestaurant = false,
        bool includeUser = false);

    Task<List<Review>> GetReviewsByUserAsync(string userId, bool includeRestaurant = false, bool includeUser = false);
    
    Task<bool> CreateReviewAsync(Review review);
    
    Task<bool> UpdateReviewAsync(Review review);
    
    Task<bool> DeleteReviewAsync(Guid id);
}