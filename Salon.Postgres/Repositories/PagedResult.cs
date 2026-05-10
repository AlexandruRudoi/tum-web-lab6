using Salon.Domain.Interfaces;

namespace Salon.Postgres.Repositories;

public class PagedResult<T> : IPagedResult<T>
{
    public IEnumerable<T> Items { get; }
    public int Total { get; }
    public int Limit { get; }
    public int Offset { get; }

    public PagedResult(IEnumerable<T> items, int total, int limit, int offset)
    {
        Items = items;
        Total = total;
        Limit = limit;
        Offset = offset;
    }
}
