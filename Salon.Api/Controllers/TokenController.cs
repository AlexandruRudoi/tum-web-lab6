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

    /// <summary>Issues a JWT for the requested role. Valid roles: VISITOR, ADMIN.</summary>
    [HttpPost]
    public IActionResult Post([FromBody] TokenRequestDto request)
    {
        var allowed = new[] { "VISITOR", "ADMIN" };
        if (!allowed.Contains(request.Role, StringComparer.OrdinalIgnoreCase))
            return BadRequest(new { error = $"Role must be one of: {string.Join(", ", allowed)}" });

        var token = _auth.GenerateToken(request.Role.ToUpper());
        return Ok(new TokenResponseDto(token, 60));
    }
}
