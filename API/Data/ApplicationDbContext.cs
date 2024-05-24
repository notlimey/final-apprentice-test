using API.Models;
using API.Models.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, string>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        
    }
    
    public DbSet<Restaurant> Restaurants { get; set; } = null!;

    public DbSet<Review> Reviews { get; set; } = null!;

    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Restaurant>(entity =>
        {
            entity.OwnsOne(c => c.OpeningHours,
                d =>
                {
                    d.ToJson();
                    
                    d.OwnsOne(o => o.Monday);
                    d.OwnsOne(o => o.Tuesday);
                    d.OwnsOne(o => o.Wednesday);
                    d.OwnsOne(o => o.Thursday);
                    d.OwnsOne(o => o.Friday);
                    d.OwnsOne(o => o.Saturday);
                    d.OwnsOne(o => o.Sunday);
                });
            
            entity.HasIndex(s => s.Slug).IsUnique();

            entity.HasMany(e => e.Reviews)
                .WithOne(r => r.Restaurant)
                .HasForeignKey(r => r.RestaurantId);
        });
    }
}