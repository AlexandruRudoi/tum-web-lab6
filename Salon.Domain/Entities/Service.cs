using Salon.Domain.Enums;

namespace Salon.Domain.Entities;

public class Service : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int DurationMinutes { get; set; }
    public ServiceCategory Category { get; set; }
    public string? ImageUrl { get; set; }
    public int LikesCount { get; set; }
}
