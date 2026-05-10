using Microsoft.AspNetCore.Mvc;
using Salon.Api.Dtos.Models;
using Salon.Services;

namespace Salon.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class TokenController : ControllerBase
{
    private readonly AuthenticationService _auth;

    public TokenController(AuthenticationService auth) => _auth = auth;

    /// <summary>Issues a JWT for the requested role. Valid roles: VISITOR, USER, MANAGER, ADMIN.</summary>
    [HttpPost]
    public IActionResult Post([FromBody] TokenRequestDto request)
    {
        var allowed = new[] { "VISITOR", "USER", "MANAGER", "ADMIN" };
        if (!allowed.Contains(request.Role, StringComparer.OrdinalIgnoreCase))
            return BadRequest(new { error = $"Role must be one of: {string.Join(", ", allowed)}" });

        var roleUp = request.Role.ToUpper();
        var token = _auth.GenerateToken(roleUp);
        var expiry = int.Parse(
            HttpContext.RequestServices
                .GetRequiredService<Microsoft.Extensions.Configuration.IConfiguration>()["Jwt:ExpirySeconds"] ?? "60");
        return Ok(new TokenResponseDto(token, expiry));
    }
}
