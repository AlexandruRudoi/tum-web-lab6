using Salon.Domain.Entities;
using Salon.Repositories;

namespace Salon.Postgres.Repositories;

public class BookingRepository : GenericRepository<Booking>, IBookingRepository
{
    public BookingRepository(SalonDbContext db) : base(db) { }
}
