using Salon.Domain.Entities;
using Salon.Domain.Interfaces;
using Salon.Repositories;

namespace Salon.Services;

public class NewsService
{
    private readonly INewsRepository _repo;

    public NewsService(INewsRepository repo) => _repo = repo;

    public Task<IPagedResult<News>> GetAllAsync(int limit, int offset) =>
        _repo.GetAllAsync(limit, offset);

    public Task<News?> GetByIdAsync(Guid id) =>
        _repo.GetByIdAsync(id);

    public Task<News> CreateAsync(News news) =>
        _repo.CreateAsync(news);

    public async Task<News> UpdateAsync(Guid id, News updated)
    {
        var existing = await _repo.GetByIdAsync(id)
            ?? throw new KeyNotFoundException($"News {id} not found.");
        existing.Title = updated.Title;
        existing.Content = updated.Content;
        existing.ImageUrl = updated.ImageUrl;
        existing.UpdatedAt = DateTime.UtcNow;
        return await _repo.UpdateAsync(existing);
    }

    public Task DeleteAsync(Guid id) => _repo.DeleteAsync(id);

    public async Task<News> TogglePinAsync(Guid id)
    {
        var news = await _repo.GetByIdAsync(id)
            ?? throw new KeyNotFoundException($"News {id} not found.");
        news.IsPinned = !news.IsPinned;
        news.UpdatedAt = DateTime.UtcNow;
        return await _repo.UpdateAsync(news);
    }

    public async Task<News> ToggleLikeAsync(Guid id)
    {
        var news = await _repo.GetByIdAsync(id)
            ?? throw new KeyNotFoundException($"News {id} not found.");
        news.LikesCount++;
        news.UpdatedAt = DateTime.UtcNow;
        return await _repo.UpdateAsync(news);
    }
}
