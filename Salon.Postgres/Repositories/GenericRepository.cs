using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using Salon.Domain.Interfaces;
using Salon.Repositories;

namespace Salon.Postgres.Repositories;

public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    protected readonly SalonDbContext _db;
    protected readonly DbSet<T> _set;

    public GenericRepository(SalonDbContext db)
    {
        _db = db;
        _set = db.Set<T>();
    }

    public async Task<T?> GetByIdAsync(Guid id) =>
        await _set.FindAsync(id);

    public async Task<IPagedResult<T>> GetAllAsync(int limit, int offset)
    {
        var total = await _set.CountAsync();
        var items = await _set.Skip(offset).Take(limit).ToListAsync();
        return new PagedResult<T>(items, total, limit, offset);
    }

    public async Task<IPagedResult<T>> FindAsync(Expression<Func<T, bool>> predicate, int limit, int offset)
    {
        var query = _set.Where(predicate);
        var total = await query.CountAsync();
        var items = await query.Skip(offset).Take(limit).ToListAsync();
        return new PagedResult<T>(items, total, limit, offset);
    }

    public async Task<T> CreateAsync(T entity)
    {
        await _set.AddAsync(entity);
        await _db.SaveChangesAsync();
        return entity;
    }

    public async Task<T> UpdateAsync(T entity)
    {
        _set.Update(entity);
        await _db.SaveChangesAsync();
        return entity;
    }

    public async Task DeleteAsync(Guid id)
    {
        var entity = await GetByIdAsync(id) ?? throw new KeyNotFoundException($"Entity with id {id} not found.");
        _set.Remove(entity);
        await _db.SaveChangesAsync();
    }
}
