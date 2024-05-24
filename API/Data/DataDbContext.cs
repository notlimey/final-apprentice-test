using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class DataDbContext : DbContext
{
    public DataDbContext(DbContextOptions<DataDbContext> options) : base(options)
    {
        
    }
    
    public DbSet<Restaurant> Restaurants { get; set; } = null!;

    public DbSet<Review> Reviews { get; set; } = null!;

    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Restaurant>()
            .HasMany(r => r.Reviews)
            .WithOne(r => r.Restaurant)
            .HasForeignKey(r => r.RestaurantId);
    }
}