using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Salon.Postgres.Repositories;
using Salon.Postgres.Seed;
using Salon.Repositories;

namespace Salon.Postgres;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddPostgres(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<SalonDbContext>(options =>
            options.UseNpgsql(connectionString));

        services.AddScoped<IServiceRepository, ServiceRepository>();
        services.AddScoped<IProductRepository, ProductRepository>();
        services.AddScoped<INewsRepository, NewsRepository>();
        services.AddScoped<IBookingRepository, BookingRepository>();

        services.AddScoped<SalonDbSeeder>();

        return services;
    }
}
