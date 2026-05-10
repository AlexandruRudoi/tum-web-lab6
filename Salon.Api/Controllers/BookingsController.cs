using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Salon.Api.Dtos.Mappers;
using Salon.Api.Dtos.Models;
using Salon.Services;

namespace Salon.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class BookingsController : ControllerBase
{
    private readonly BookingService _svc;
    public BookingsController(BookingService svc) => _svc = svc;

    /// <summary>Get all bookings (paginated). Requires ADMIN role.</summary>
    [HttpGet]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> GetAll([FromQuery] int limit = 20, [FromQuery] int offset = 0)
        => Ok((await _svc.GetAllAsync(limit, offset)).ToPagedDto(b => b.ToDto()));

    /// <summary>Get a booking by ID. Requires ADMIN role.</summary>
    [HttpGet("{id:guid}")]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var booking = await _svc.GetByIdAsync(id);
        return booking is null ? NotFound() : Ok(booking.ToDto());
    }

    /// <summary>Create a booking (public — any visitor can book).</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateBookingDto dto)
    {
        var created = await _svc.CreateAsync(dto.ToEntity());
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created.ToDto());
    }

    /// <summary>Update booking status. Requires ADMIN role.</summary>
    [HttpPatch("{id:guid}/status")]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> UpdateStatus(Guid id, [FromBody] UpdateBookingStatusDto dto)
    {
        try { return Ok((await _svc.UpdateStatusAsync(id, dto.Status)).ToDto()); }
        catch (KeyNotFoundException) { return NotFound(); }
    }

    /// <summary>Delete a booking. Requires ADMIN role.</summary>
    [HttpDelete("{id:guid}")]
    [Authorize(Roles = "ADMIN")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try { await _svc.DeleteAsync(id); return NoContent(); }
        catch (KeyNotFoundException) { return NotFound(); }
    }
}
