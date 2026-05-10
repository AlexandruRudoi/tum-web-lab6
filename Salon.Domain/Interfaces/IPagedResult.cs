namespace Salon.Domain.Interfaces;

public interface IPagedResult<T>
{
    IEnumerable<T> Items { get; }
    int Total { get; }
    int Limit { get; }
    int Offset { get; }
}
