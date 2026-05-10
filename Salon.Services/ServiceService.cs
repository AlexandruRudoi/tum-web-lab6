using Salon.Domain.Entities;
using Salon.Domain.Interfaces;
using Salon.Repositories;

namespace Salon.Services;

public class ServiceService
{
    private readonly IServiceRepository _repo;

    public ServiceService(IServiceRepository repo) => _repo = repo;

    public Task<IPagedResult<Service>> GetAllAsync(int limit, int offset) =>
        _repo.GetAllAsync(limit, offset);

    public Task<Service?> GetByIdAsync(Guid id) =>
        _repo.GetByIdAsync(id);

    public Task<Service> CreateAsync(Service service) =>
        _repo.CreateAsync(service);

    public async Task<Service> UpdateAsync(Guid id, Service updated)
    {
        var existing = await _repo.GetByIdAsync(id)
            ?? throw new KeyNotFoundException($"Service {id} not found.");
        existing.Name = updated.Name;
        existing.Description = updated.Description;
        existing.Price = updated.Price;
        existing.DurationMinutes = updated.DurationMinutes;
        existing.Category = updated.Category;
        existing.ImageUrl = updated.ImageUrl;
        existing.UpdatedAt = DateTime.UtcNow;
        return await _repo.UpdateAsync(existing);
    }

    public Task DeleteAsync(Guid id) => _repo.DeleteAsync(id);

    public async Task<Service> ToggleLikeAsync(Guid id)
    {
        var service = await _repo.GetByIdAsync(id)
            ?? throw new KeyNotFoundException($"Service {id} not found.");
        service.LikesCount++;
        service.UpdatedAt = DateTime.UtcNow;
        return await _repo.UpdateAsync(service);
    }
}
