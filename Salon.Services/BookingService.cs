using Salon.Domain.Entities;
using Salon.Domain.Enums;
using Salon.Domain.Interfaces;
using Salon.Repositories;

namespace Salon.Services;

public class BookingService
{
    private readonly IBookingRepository _repo;

    public BookingService(IBookingRepository repo) => _repo = repo;

    public Task<IPagedResult<Booking>> GetAllAsync(int limit, int offset) =>
        _repo.GetAllAsync(limit, offset);

    public Task<Booking?> GetByIdAsync(Guid id) =>
        _repo.GetByIdAsync(id);

    public Task<Booking> CreateAsync(Booking booking) =>
        _repo.CreateAsync(booking);

    public async Task<Booking> UpdateStatusAsync(Guid id, BookingStatus status)
    {
        var booking = await _repo.GetByIdAsync(id)
            ?? throw new KeyNotFoundException($"Booking {id} not found.");
        booking.Status = status;
        booking.UpdatedAt = DateTime.UtcNow;
        return await _repo.UpdateAsync(booking);
    }

    public Task DeleteAsync(Guid id) => _repo.DeleteAsync(id);
}
