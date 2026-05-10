using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Salon.Api.Dtos.Mappers;
using Salon.Api.Dtos.Models;
using Salon.Domain.Entities;
using Salon.Services;

namespace Salon.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ServicesController : ControllerBase
{
    private readonly ServiceService _svc;
    public ServicesController(ServiceService svc) => _svc = svc;

    /// <summary>Get all services (paginated).</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int limit = 20, [FromQuery] int offset = 0)
    {
        var result = await _svc.GetAllAsync(limit, offset);
        return Ok(result.ToPagedDto(s => s.ToDto()));
    }

    /// <summary>Get a service by ID.</summary>
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var service = await _svc.GetByIdAsync(id);
        return service is null ? NotFound() : Ok(service.ToDto());
    }

    /// <summary>Create a new service. Requires ADMIN role.</summary>
    [HttpPost]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> Create([FromBody] CreateServiceDto dto)
    {
        var created = await _svc.CreateAsync(dto.ToEntity());
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created.ToDto());
    }

    /// <summary>Update a service. Requires ADMIN role.</summary>
    [HttpPut("{id:guid}")]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateServiceDto dto)
    {
        try
        {
            var updated = await _svc.UpdateAsync(id, new Service
            {
                Name = dto.Name, Description = dto.Description, Price = dto.Price,
                DurationMinutes = dto.DurationMinutes, Category = dto.Category, ImageUrl = dto.ImageUrl
            });
            return Ok(updated.ToDto());
        }
        catch (KeyNotFoundException) { return NotFound(); }
    }

    /// <summary>Delete a service. Requires ADMIN role.</summary>
    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try { await _svc.DeleteAsync(id); return NoContent(); }
        catch (KeyNotFoundException) { return NotFound(); }
    }

    /// <summary>Increment like count on a service.</summary>
    [HttpPost("{id:guid}/like")]
    [Authorize]
    public async Task<IActionResult> Like(Guid id)
    {
        try { return Ok((await _svc.ToggleLikeAsync(id)).ToDto()); }
        catch (KeyNotFoundException) { return NotFound(); }
    }
}
