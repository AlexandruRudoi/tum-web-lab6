using Salon.Domain.Entities;
using Salon.Repositories;

namespace Salon.Postgres.Repositories;

public class ProductRepository : GenericRepository<Product>, IProductRepository
{
    public ProductRepository(SalonDbContext db) : base(db) { }
}
