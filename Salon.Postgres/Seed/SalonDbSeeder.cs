using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Salon.Postgres.Seed;

public class SalonDbSeeder
{
    private readonly SalonDbContext _db;
    private readonly ILogger<SalonDbSeeder> _logger;

    public SalonDbSeeder(SalonDbContext db, ILogger<SalonDbSeeder> logger)
    {
        _db = db;
        _logger = logger;
    }

    public async Task SeedAsync()
    {
        await SeedServicesAsync();
        await SeedProductsAsync();
        await SeedNewsAsync();
        await SeedUsersAsync();
    }

    private async Task SeedServicesAsync()
    {
        if (await _db.Services.AnyAsync())
        {
            _logger.LogInformation("Services already seeded — skipping.");
            return;
        }

        var seeds = ServiceSeeder.GetSeed();
        await _db.Services.AddRangeAsync(seeds);
        await _db.SaveChangesAsync();
        _logger.LogInformation("Seeded {Count} services.", seeds.Count());
    }

    private async Task SeedProductsAsync()
    {
        if (await _db.Products.AnyAsync())
        {
            _logger.LogInformation("Products already seeded — skipping.");
            return;
        }

        var seeds = ProductSeeder.GetSeed();
        await _db.Products.AddRangeAsync(seeds);
        await _db.SaveChangesAsync();
        _logger.LogInformation("Seeded {Count} products.", seeds.Count());
    }

    private async Task SeedNewsAsync()
    {
        if (await _db.News.AnyAsync())
        {
            _logger.LogInformation("News already seeded — skipping.");
            return;
        }

        var seeds = NewsSeeder.GetSeed();
        await _db.News.AddRangeAsync(seeds);
        await _db.SaveChangesAsync();
        _logger.LogInformation("Seeded {Count} news items.", seeds.Count());
    }

    private async Task SeedUsersAsync()
    {
        if (await _db.Users.AnyAsync())
        {
            _logger.LogInformation("Users already seeded — skipping.");
            return;
        }

        var seeds = UserSeeder.GetSeed();
        await _db.Users.AddRangeAsync(seeds);
        await _db.SaveChangesAsync();
        _logger.LogInformation("Seeded {Count} users.", seeds.Count());
    }
}
