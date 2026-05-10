using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Salon.Api.Dtos.Models;
using Salon.Postgres;

namespace Salon.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Policy = "CanManageUsers")]
public class UsersController : ControllerBase
{
    private readonly LoginService _users;

    public UsersController(LoginService users) => _users = users;

    /// <summary>List all staff users (ADMIN only).</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var users = await _users.GetAllAsync();
        var dtos = users.Select(u => new AppUserDto(u.Id, u.Name, u.Email, u.Role, u.CreatedAt));
        return Ok(dtos);
    }

    /// <summary>Update a user's role (ADMIN only).</summary>
    [HttpPatch("{id:guid}/role")]
    public async Task<IActionResult> UpdateRole(Guid id, [FromBody] UpdateUserRoleDto dto)
    {
        var allowed = new[] { "MANAGER", "ADMIN" };
        if (!allowed.Contains(dto.Role, StringComparer.OrdinalIgnoreCase))
            return BadRequest(new { error = "Role must be MANAGER or ADMIN." });

        var user = await _users.UpdateRoleAsync(id, dto.Role.ToUpper());
        if (user is null) return NotFound();

        return Ok(new AppUserDto(user.Id, user.Name, user.Email, user.Role, user.CreatedAt));
    }

    /// <summary>Delete a user (ADMIN only).</summary>
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _users.DeleteAsync(id);
        if (!deleted) return NotFound();
        return NoContent();
    }
}
