namespace Salon.Domain.Entities;

public class AppUser : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;

    /// <summary>One of: MANAGER, ADMIN</summary>
    public string Role { get; set; } = string.Empty;
}
