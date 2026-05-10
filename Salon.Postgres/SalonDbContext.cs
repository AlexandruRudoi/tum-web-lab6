using Microsoft.EntityFrameworkCore;
using Salon.Domain.Entities;

namespace Salon.Postgres;

public class SalonDbContext : DbContext
{
    public SalonDbContext(DbContextOptions<SalonDbContext> options) : base(options) { }

    public DbSet<Service> Services => Set<Service>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<News> News => Set<News>();
    public DbSet<Booking> Bookings => Set<Booking>();
    public DbSet<AppUser> Users => Set<AppUser>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(SalonDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}
