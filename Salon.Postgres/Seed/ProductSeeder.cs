using Salon.Domain.Entities;

namespace Salon.Postgres.Seed;

public static class ProductSeeder
{
    public static IEnumerable<Product> GetSeed() =>
    [
        new Product
        {
            Id = Guid.Parse("22222222-0001-0000-0000-000000000000"),
            Name = "Argan Repair Shampoo",
            Description = "Sulfate-free shampoo with argan oil for damaged and frizzy hair.",
            Price = 18.99m,
            ImageUrl = "/images/products/argan_repair_shampoo.jpg",
            LikesCount = 14,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        },
        new Product
        {
            Id = Guid.Parse("22222222-0002-0000-0000-000000000000"),
            Name = "Keratin Hair Mask",
            Description = "Intensive keratin mask that restores elasticity and shine in 10 minutes.",
            Price = 24.50m,
            ImageUrl = "/images/products/keratin_hair_mask.jpg",
            LikesCount = 9,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        },
        new Product
        {
            Id = Guid.Parse("22222222-0003-0000-0000-000000000000"),
            Name = "Vitamin Nail Oil",
            Description = "Nourishing cuticle oil enriched with vitamins E and C.",
            Price = 12.00m,
            ImageUrl = "/images/products/vitamin_nail_oil.jpg",
            LikesCount = 7,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        },
        new Product
        {
            Id = Guid.Parse("22222222-0004-0000-0000-000000000000"),
            Name = "Hyaluronic Face Cream",
            Description = "Lightweight daily moisturiser with hyaluronic acid for all skin types.",
            Price = 32.00m,
            ImageUrl = "/images/products/hyaluronic_face_cream.jpg",
            LikesCount = 18,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        },
        new Product
        {
            Id = Guid.Parse("22222222-0005-0000-0000-000000000000"),
            Name = "Glow Hair Serum",
            Description = "Silicone-free heat protection serum that adds mirror-like shine.",
            Price = 21.00m,
            ImageUrl = "/images/products/glow_hair_serum.jpg",
            LikesCount = 11,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        },
        new Product
        {
            Id = Guid.Parse("22222222-0006-0000-0000-000000000000"),
            Name = "Velvet Matte Lipstick",
            Description = "Long-wear matte lipstick available in 12 shades.",
            Price = 16.50m,
            ImageUrl = "/images/products/velvet_matte_lipstick.jpg",
            LikesCount = 25,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        }
    ];
}
