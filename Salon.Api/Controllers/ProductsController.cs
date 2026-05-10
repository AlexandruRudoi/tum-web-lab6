using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Salon.Api.Dtos.Mappers;
using Salon.Api.Dtos.Models;
using Salon.Domain.Entities;
using Salon.Services;

namespace Salon.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ProductService _svc;
    public ProductsController(ProductService svc) => _svc = svc;

    /// <summary>Get all products (paginated).</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] int limit = 20, [FromQuery] int offset = 0)
        => Ok((await _svc.GetAllAsync(limit, offset)).ToPagedDto(p => p.ToDto()));

    /// <summary>Get a product by ID.</summary>
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var product = await _svc.GetByIdAsync(id);
        return product is null ? NotFound() : Ok(product.ToDto());
    }

    /// <summary>Create a product. Requires content:manage permission.</summary>
    [HttpPost]
    [Authorize(Policy = "CanManageContent")]
    public async Task<IActionResult> Create([FromBody] CreateProductDto dto)
    {
        var created = await _svc.CreateAsync(dto.ToEntity());
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created.ToDto());
    }

    /// <summary>Update a product. Requires content:manage permission.</summary>
    [HttpPut("{id:guid}")]
    [Authorize(Policy = "CanManageContent")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateProductDto dto)
    {
        try
        {
            var updated = await _svc.UpdateAsync(id, new Product
            {
                Name = dto.Name, Description = dto.Description,
                Price = dto.Price, ImageUrl = dto.ImageUrl
            });
            return Ok(updated.ToDto());
        }
        catch (KeyNotFoundException) { return NotFound(); }
    }

    /// <summary>Delete a product. Requires content:manage permission.</summary>
    [HttpDelete("{id:guid}")]
    [Authorize(Policy = "CanManageContent")]
    public async Task<IActionResult> Delete(Guid id)
    {
        try { await _svc.DeleteAsync(id); return NoContent(); }
        catch (KeyNotFoundException) { return NotFound(); }
    }

    /// <summary>Increment like count on a product.</summary>
    [HttpPost("{id:guid}/like")]
    [Authorize]
    public async Task<IActionResult> Like(Guid id)
    {
        try { return Ok((await _svc.ToggleLikeAsync(id)).ToDto()); }
        catch (KeyNotFoundException) { return NotFound(); }
    }
}
