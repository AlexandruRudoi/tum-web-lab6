using System.Linq.Expressions;
using Salon.Domain.Interfaces;

namespace Salon.Repositories;

public interface IGenericRepository<T> where T : class
{
    Task<T?> GetByIdAsync(Guid id);
    Task<IPagedResult<T>> GetAllAsync(int limit, int offset);
    Task<IPagedResult<T>> FindAsync(Expression<Func<T, bool>> predicate, int limit, int offset);
    Task<T> CreateAsync(T entity);
    Task<T> UpdateAsync(T entity);
    Task DeleteAsync(Guid id);
}
