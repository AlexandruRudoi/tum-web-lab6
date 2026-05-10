using Salon.Domain.Entities;
using Salon.Repositories;

namespace Salon.Postgres.Repositories;

public class ServiceRepository : GenericRepository<Service>, IServiceRepository
{
    public ServiceRepository(SalonDbContext db) : base(db) { }
}
