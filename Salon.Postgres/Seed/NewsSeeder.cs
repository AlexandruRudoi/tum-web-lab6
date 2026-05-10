using Salon.Domain.Entities;

namespace Salon.Postgres.Seed;

public static class NewsSeeder
{
    public static IEnumerable<News> GetSeed() =>
    [
        new News
        {
            Id = Guid.Parse("33333333-0001-0000-0000-000000000000"),
            Title = "Spring Promotion: 20% off all hair services",
            Content = "Celebrate spring with us! Throughout April and May enjoy 20% off all hair services — cuts, colour and treatments. Book now to secure your slot.",
            ImageUrl = "/images/news/spring_promotion.webp",
            IsPinned = true,
            LikesCount = 34,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        },
        new News
        {
            Id = Guid.Parse("33333333-0002-0000-0000-000000000000"),
            Title = "New stylist joining our team",
            Content = "We are thrilled to welcome Alexandra, an award-winning colourist with over 8 years of experience, to the Happiness salon family. She will be available for bookings starting June 1st.",
            ImageUrl = "/images/news/stylist.jpg",
            IsPinned = false,
            LikesCount = 19,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        },
        new News
        {
            Id = Guid.Parse("33333333-0003-0000-0000-000000000000"),
            Title = "New skincare line now in stock",
            Content = "Our latest skincare collection has arrived, featuring hyaluronic serums, vitamin C masks and SPF moisturisers from trusted European brands.",
            ImageUrl = null,
            IsPinned = false,
            LikesCount = 8,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        },
        new News
        {
            Id = Guid.Parse("33333333-0004-0000-0000-000000000000"),
            Title = "Extended working hours this summer",
            Content = "Starting June 1st we will be open until 20:00 Monday through Saturday to better serve you during the summer season.",
            ImageUrl = null,
            IsPinned = false,
            LikesCount = 5,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        }
    ];
}
