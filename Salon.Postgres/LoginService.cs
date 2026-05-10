using Microsoft.EntityFrameworkCore;
using Salon.Domain.Entities;
using Salon.Services;

namespace Salon.Postgres;

public class LoginService
{
    private readonly SalonDbContext _db;
    private readonly AuthenticationService _auth;

    public LoginService(SalonDbContext db, AuthenticationService auth)
    {
        _db = db;
        _auth = auth;
    }

    /// <summary>
    /// Validates credentials and returns a JWT + user info, or null if invalid.
    /// </summary>
    public async Task<(string Token, int ExpiresInSeconds, AppUser User)?> LoginAsync(
        string email, string password)
    {
        var user = await _db.Users
            .FirstOrDefaultAsync(u => u.Email == email.ToLower());

        if (user is null) return null;
        if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash)) return null;

        var (token, expiry) = _auth.GenerateTokenForUser(user);
        return (token, expiry, user);
    }

    public async Task<IReadOnlyList<AppUser>> GetAllAsync() =>
        await _db.Users.OrderBy(u => u.Name).ToListAsync();

    public async Task<AppUser?> UpdateRoleAsync(Guid id, string role)
    {
        var user = await _db.Users.FindAsync(id);
        if (user is null) return null;
        user.Role = role;
        user.UpdatedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return user;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var user = await _db.Users.FindAsync(id);
        if (user is null) return false;
        _db.Users.Remove(user);
        await _db.SaveChangesAsync();
        return true;
    }
}
