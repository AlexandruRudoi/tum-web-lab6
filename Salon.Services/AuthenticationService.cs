using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Salon.Domain.Entities;
using Salon.Domain.Permissions;

namespace Salon.Services;

public class AuthenticationService
{
    private readonly IConfiguration _config;

    public AuthenticationService(IConfiguration config) => _config = config;

    /// <summary>Issues an anonymous role-only token (used for VISITOR auto-login).</summary>
    public string GenerateToken(string role)
    {
        var claims = new List<Claim>
        {
            new(ClaimTypes.Role, role),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(JwtRegisteredClaimNames.Iat,
                DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(),
                ClaimValueTypes.Integer64)
        };

        foreach (var permission in AppPermission.ForRole(role))
            claims.Add(new Claim("permission", permission));

        return BuildToken(claims, int.Parse(_config["Jwt:ExpirySeconds"] ?? "60"));
    }

    /// <summary>Issues a token for an authenticated staff user (MANAGER or ADMIN).</summary>
    public (string Token, int ExpiresInSeconds) GenerateTokenForUser(AppUser user)
    {
        const int expiry = 28_800; // 8 hours for real users

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.Name, user.Name),
            new(ClaimTypes.Role, user.Role),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(JwtRegisteredClaimNames.Iat,
                DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(),
                ClaimValueTypes.Integer64)
        };

        foreach (var permission in AppPermission.ForRole(user.Role))
            claims.Add(new Claim("permission", permission));

        return (BuildToken(claims, expiry), expiry);
    }

    private string BuildToken(IEnumerable<Claim> claims, int expirySeconds)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddSeconds(expirySeconds),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
