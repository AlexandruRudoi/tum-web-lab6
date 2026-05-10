using BCrypt.Net;
using Salon.Domain.Entities;

namespace Salon.Postgres.Seed;

public static class UserSeeder
{
    public static IEnumerable<AppUser> GetSeed() =>
    [
        new AppUser
        {
            Id = Guid.Parse("22222222-0001-0000-0000-000000000000"),
            Name = "Maria Manager",
            Email = "manager@salon.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Manager123!"),
            Role = "MANAGER",
            CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc),
            UpdatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc),
        },
        new AppUser
        {
            Id = Guid.Parse("22222222-0002-0000-0000-000000000000"),
            Name = "Alex Admin",
            Email = "admin@salon.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123!"),
            Role = "ADMIN",
            CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc),
            UpdatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc),
        },
    ];
}
