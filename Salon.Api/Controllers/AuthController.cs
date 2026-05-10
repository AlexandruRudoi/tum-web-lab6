using Microsoft.AspNetCore.Mvc;
using Salon.Api.Dtos.Models;
using Salon.Postgres;

namespace Salon.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly LoginService _login;

    public AuthController(LoginService login) => _login = login;

    /// <summary>Authenticate with email and password. Returns a JWT valid for 8 hours.</summary>
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto req)
    {
        if (string.IsNullOrWhiteSpace(req.Email) || string.IsNullOrWhiteSpace(req.Password))
            return BadRequest(new { error = "Email and password are required." });

        var result = await _login.LoginAsync(req.Email, req.Password);
        if (result is null)
            return Unauthorized(new { error = "Invalid email or password." });

        var (token, expiry, user) = result.Value;
        return Ok(new LoginResponseDto(token, expiry, user.Name, user.Email, user.Role));
    }
}
