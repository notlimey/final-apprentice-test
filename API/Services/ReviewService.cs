using API.Data;
using API.Extensions.Restaurant;
using API.Interfaces;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Services;

public class ReviewService : IReviewService
{
    private readonly ApplicationDbContext _dbContext;

    public ReviewService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Review?> GetReviewByIdAsync(Guid id, bool includeRestaurant = false, bool includeUser = false)
    {
        var query = GetReviewsQuery(includeUser, includeRestaurant);
        
        return await query.FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<Review?> GetPersonalReviewAsync(string userId, Guid restaurantId, bool includeRestaurant = false, bool includeUser = false)
    {
        return await _dbContext.Reviews
            .FirstOrDefaultAsync(r => r.UserId == userId && r.RestaurantId == restaurantId);
    }

    public async Task<List<Review>> GetReviewsByRestaurantAsync(Guid restaurantId, bool includeRestaurant = false, bool includeUser = false)
    {
        var query = GetReviewsQuery(includeUser, includeRestaurant);
        
        return await query.Where(x => x.RestaurantId == restaurantId).ToListAsync();
    }

    public async Task<List<Review>> GetReviewsByUserAsync(string userId, bool includeRestaurant = false, bool includeUser = false)
    {
        var query = GetReviewsQuery(includeUser, includeRestaurant);
        
        return await query.Where(x => x.UserId == userId).ToListAsync();
    }

    public async Task<bool> CreateReviewAsync(Review review)
    {
        var restaurant = await _dbContext.Restaurants.FindAsync(review.RestaurantId);
        if (restaurant == null)
        {
            throw new InvalidOperationException("Restaurant not found");
        }

        restaurant.AddRating(review, restaurant.NumberOfReviews);
        restaurant.NumberOfReviews++;

        restaurant.Reviews.Append(review);

        _dbContext.Entry(restaurant).State = EntityState.Modified;
        _dbContext.Entry(review).State = EntityState.Added;
        await _dbContext.SaveChangesAsync();

        return true;
    }

    public async Task<bool> UpdateReviewAsync(Review review)
    {
        _dbContext.Reviews.Update(review);
        return await _dbContext.SaveChangesAsync() > 0;
    }
    
    public async Task<bool> DeleteReviewAsync(Guid id)
    {
        var review = await _dbContext.Reviews.FindAsync(id);
        if (review == null)
        {
            throw new InvalidOperationException("Review not found");
        }
        
        var restaurant = await _dbContext.Restaurants.FindAsync(review.RestaurantId);
        if (restaurant == null)
        {
            throw new InvalidOperationException("Restaurant not found");
        }

        restaurant.RemoveRating(review, restaurant.NumberOfReviews);
        restaurant.NumberOfReviews--;

        restaurant.Reviews.Remove(review);

        _dbContext.Entry(restaurant).State = EntityState.Modified;
        _dbContext.Entry(review).State = EntityState.Deleted;
        await _dbContext.SaveChangesAsync();

        return true;
    }
    
    private IQueryable<Review> GetReviewsQuery(bool includeUser = false, bool includeRestaurant = false)
    {
        if (includeUser && includeRestaurant)
        {
            return _dbContext.Reviews
                .Include(x => x.User)
                .Include(x => x.Restaurant);
        }
        
        if (includeUser)
        {
            return _dbContext.Reviews
                .Include(x => x.User);
        }
        
        if (includeRestaurant)
        {
            return _dbContext.Reviews
                .Include(x => x.Restaurant);
        }
        
        return _dbContext.Reviews;
    }
}