using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Salon.Domain.Entities;

namespace Salon.Postgres.Configurations;

public class BookingConfiguration : IEntityTypeConfiguration<Booking>
{
    public void Configure(EntityTypeBuilder<Booking> builder)
    {
        builder.HasKey(b => b.Id);
        builder.Property(b => b.ClientName).IsRequired().HasMaxLength(200);
        builder.Property(b => b.ClientEmail).IsRequired().HasMaxLength(200);
        builder.Property(b => b.ClientPhone).HasMaxLength(30);
        builder.Property(b => b.Status).HasConversion<string>();
        builder.HasOne(b => b.Service).WithMany().HasForeignKey(b => b.ServiceId).OnDelete(DeleteBehavior.Restrict);
    }
}
