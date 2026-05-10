using Salon.Domain.Enums;

namespace Salon.Domain.Entities;

public class Booking : BaseEntity
{
    public string ClientName { get; set; } = string.Empty;
    public string ClientEmail { get; set; } = string.Empty;
    public string ClientPhone { get; set; } = string.Empty;
    public Guid ServiceId { get; set; }
    public Service? Service { get; set; }
    public DateTime AppointmentAt { get; set; }
    public BookingStatus Status { get; set; } = BookingStatus.Pending;
    public string? Notes { get; set; }
}
