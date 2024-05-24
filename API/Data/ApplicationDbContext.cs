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
    
    public DbSet<ApiToken> ApiTokens { get; set; } = null!;

    
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
        
        modelBuilder.Entity<Review>(entity =>
        {
            entity.HasOne(r => r.Restaurant)
                .WithMany(r => r.Reviews)
                .HasForeignKey(r => r.RestaurantId);
            
            entity.HasOne(r => r.User)
                .WithMany(u => u.Reviews)
                .HasForeignKey(r => r.UserId);
        });
        

        modelBuilder.Entity<ApplicationUser>(entity =>
        {
            entity.HasMany(u => u.ApiTokens)
                .WithOne(t => t.User)
                .HasForeignKey(t => t.UserId);
        });
    }
}