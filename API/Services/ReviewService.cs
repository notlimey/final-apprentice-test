using API.Data;
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

    public async Task<List<Review>> GetReviewsByRestaurantAsync(Guid resturantId, bool includeRestaurant = false, bool includeUser = false)
    {
        var query = GetReviewsQuery(includeUser, includeRestaurant);
        
        return await query.Where(x => x.RestaurantId == resturantId).ToListAsync();
    }

    public async Task<List<Review>> GetReviewsByUserAsync(string userId, bool includeRestaurant = false, bool includeUser = false)
    {
        var query = GetReviewsQuery(includeUser, includeRestaurant);
        
        return await query.Where(x => x.UserId == userId).ToListAsync();
    }

    public async Task<bool> CreateReviewAsync(Review review)
    {
        await _dbContext.Reviews.AddAsync(review);
        return await _dbContext.SaveChangesAsync() > 0;
    }

    public async Task<bool> UpdateReviewAsync(Review review)
    {
        _dbContext.Reviews.Update(review);
        return await _dbContext.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteReviewAsync(Guid id)
    {
        var review = await _dbContext.Reviews.FindAsync(id);
        if (review == null) return false;
        
        _dbContext.Reviews.Remove(review);
        return await _dbContext.SaveChangesAsync() > 0;
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