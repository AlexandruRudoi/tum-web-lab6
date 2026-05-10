namespace Salon.Domain.Entities;

public class News : BaseEntity
{
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public bool IsPinned { get; set; }
    public int LikesCount { get; set; }
}
