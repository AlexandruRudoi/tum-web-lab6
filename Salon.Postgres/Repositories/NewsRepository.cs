using Salon.Domain.Entities;
using Salon.Repositories;

namespace Salon.Postgres.Repositories;

public class NewsRepository : GenericRepository<News>, INewsRepository
{
    public NewsRepository(SalonDbContext db) : base(db) { }
}
