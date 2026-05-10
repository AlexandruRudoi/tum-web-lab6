using Salon.Domain.Entities;
using Salon.Domain.Interfaces;
using Salon.Repositories;

namespace Salon.Services;

public class ProductService
{
    private readonly IProductRepository _repo;

    public ProductService(IProductRepository repo) => _repo = repo;

    public Task<IPagedResult<Product>> GetAllAsync(int limit, int offset) =>
        _repo.GetAllAsync(limit, offset);

    public Task<Product?> GetByIdAsync(Guid id) =>
        _repo.GetByIdAsync(id);

    public Task<Product> CreateAsync(Product product) =>
        _repo.CreateAsync(product);

    public async Task<Product> UpdateAsync(Guid id, Product updated)
    {
        var existing = await _repo.GetByIdAsync(id)
            ?? throw new KeyNotFoundException($"Product {id} not found.");
        existing.Name = updated.Name;
        existing.Description = updated.Description;
        existing.Price = updated.Price;
        existing.ImageUrl = updated.ImageUrl;
        existing.UpdatedAt = DateTime.UtcNow;
        return await _repo.UpdateAsync(existing);
    }

    public Task DeleteAsync(Guid id) => _repo.DeleteAsync(id);

    public async Task<Product> ToggleLikeAsync(Guid id)
    {
        var product = await _repo.GetByIdAsync(id)
            ?? throw new KeyNotFoundException($"Product {id} not found.");
        product.LikesCount++;
        product.UpdatedAt = DateTime.UtcNow;
        return await _repo.UpdateAsync(product);
    }
}
