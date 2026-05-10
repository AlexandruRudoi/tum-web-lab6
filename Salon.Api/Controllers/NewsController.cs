using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Salon.Api.Dtos.Mappers;
using Salon.Api.Dtos.Models;
using Salon.Domain.Entities;
using Salon.Services;

namespace Salon.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class NewsController : ControllerBase
{
    private readonly NewsService _svc;
    public NewsController(NewsService svc) => _svc = svc;

    /// <summary>Get all news items (paginated).</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int limit = 20, [FromQuery] int offset = 0)
        => Ok((await _svc.GetAllAsync(limit, offset)).ToPagedDto(n => n.ToDto()));

    /// <summary>Get a news item by ID.</summary>
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var news = await _svc.GetByIdAsync(id);
        return news is null ? NotFound() : Ok(news.ToDto());
    }

    /// <summary>Create a news item. Requires ADMIN role.</summary>
    [HttpPost]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> Create([FromBody] CreateNewsDto dto)
    {
        var created = await _svc.CreateAsync(dto.ToEntity());
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created.ToDto());
    }

    /// <summary>Update a news item. Requires ADMIN role.</summary>
    [HttpPut("{id:guid}")]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateNewsDto dto)
    {
        try
        {
            var updated = await _svc.UpdateAsync(id, new News
            {
                Title = dto.Title, Content = dto.Content, ImageUrl = dto.ImageUrl
            });
            return Ok(updated.ToDto());
        }
        catch (KeyNotFoundException) { return NotFound(); }
    }

    /// <summary>Delete a news item. Requires ADMIN role.</summary>
    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try { await _svc.DeleteAsync(id); return NoContent(); }
        catch (KeyNotFoundException) { return NotFound(); }
    }

    /// <summary>Toggle pin on a news item. Requires ADMIN role.</summary>
    [HttpPost("{id:guid}/pin")]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> Pin(Guid id)
    {
        try { return Ok((await _svc.TogglePinAsync(id)).ToDto()); }
        catch (KeyNotFoundException) { return NotFound(); }
    }

    /// <summary>Increment like count on a news item.</summary>
    [HttpPost("{id:guid}/like")]
    [Authorize]
    public async Task<IActionResult> Like(Guid id)
    {
        try { return Ok((await _svc.ToggleLikeAsync(id)).ToDto()); }
        catch (KeyNotFoundException) { return NotFound(); }
    }
}
