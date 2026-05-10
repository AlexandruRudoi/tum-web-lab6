using Salon.Domain.Entities;
using Salon.Domain.Enums;

namespace Salon.Postgres.Seed;

public static class ServiceSeeder
{
    public static IEnumerable<Service> GetSeed() =>
    [
        new Service
        {
            Id = Guid.Parse("11111111-0001-0000-0000-000000000000"),
            Name = "Women's Haircut & Style",
            Description = "Precision cut with blow-dry and styling for all hair lengths.",
            Price = 45m,
            DurationMinutes = 60,
            Category = ServiceCategory.Hair,
            ImageUrl = "https://picsum.photos/seed/haircut-women/800/500",
            LikesCount = 12,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        },
        new Service
        {
            Id = Guid.Parse("11111111-0002-0000-0000-000000000000"),
            Name = "Men's Haircut",
            Description = "Classic men's cut with wash and finish.",
            Price = 25m,
            DurationMinutes = 30,
            Category = ServiceCategory.Hair,
            ImageUrl = "https://picsum.photos/seed/haircut-men/800/500",
            LikesCount = 8,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        },
        new Service
        {
            Id = Guid.Parse("11111111-0003-0000-0000-000000000000"),
            Name = "Full Color",
            Description = "Single-process full color application with professional products.",
            Price = 80m,
            DurationMinutes = 90,
            Category = ServiceCategory.Hair,
            ImageUrl = "https://picsum.photos/seed/hair-color/800/500",
            LikesCount = 20,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        },
        new Service
        {
            Id = Guid.Parse("11111111-0004-0000-0000-000000000000"),
            Name = "Manicure",
            Description = "Classic manicure with nail shaping, cuticle care and polish.",
            Price = 20m,
            DurationMinutes = 45,
            Category = ServiceCategory.Nails,
            ImageUrl = "https://picsum.photos/seed/manicure/800/500",
            LikesCount = 15,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        },
        new Service
        {
            Id = Guid.Parse("11111111-0005-0000-0000-000000000000"),
            Name = "Gel Manicure",
            Description = "Long-lasting gel polish application with UV cure.",
            Price = 35m,
            DurationMinutes = 60,
            Category = ServiceCategory.Nails,
            ImageUrl = "https://picsum.photos/seed/gel-manicure/800/500",
            LikesCount = 22,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        },
        new Service
        {
            Id = Guid.Parse("11111111-0006-0000-0000-000000000000"),
            Name = "Facial Treatment",
            Description = "Deep cleansing facial with steam, extraction and mask.",
            Price = 60m,
            DurationMinutes = 75,
            Category = ServiceCategory.Skin,
            ImageUrl = "https://picsum.photos/seed/facial-treatment/800/500",
            LikesCount = 10,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        },
        new Service
        {
            Id = Guid.Parse("11111111-0007-0000-0000-000000000000"),
            Name = "Bridal Makeup",
            Description = "Full bridal makeup with trial session included.",
            Price = 150m,
            DurationMinutes = 120,
            Category = ServiceCategory.Makeup,
            ImageUrl = "https://picsum.photos/seed/bridal-makeup/800/500",
            LikesCount = 30,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        },
        new Service
        {
            Id = Guid.Parse("11111111-0008-0000-0000-000000000000"),
            Name = "Eyebrow Shaping",
            Description = "Waxing and threading to define and shape the brows.",
            Price = 15m,
            DurationMinutes = 20,
            Category = ServiceCategory.Other,
            ImageUrl = "https://picsum.photos/seed/eyebrow-shaping/800/500",
            LikesCount = 5,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        }
    ];
}
