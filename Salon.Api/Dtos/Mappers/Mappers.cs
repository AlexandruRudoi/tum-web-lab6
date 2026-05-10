using Salon.Api.Dtos.Models;
using Salon.Domain.Entities;
using Salon.Domain.Interfaces;

namespace Salon.Api.Dtos.Mappers;

public static class Mappers
{
    public static ServiceDto ToDto(this Service s) =>
        new(s.Id, s.Name, s.Description, s.Price, s.DurationMinutes,
            s.Category.ToString(), s.ImageUrl, s.LikesCount, s.CreatedAt, s.UpdatedAt);

    public static Service ToEntity(this CreateServiceDto dto) =>
        new()
        {
            Name = dto.Name, Description = dto.Description, Price = dto.Price,
            DurationMinutes = dto.DurationMinutes, Category = dto.Category, ImageUrl = dto.ImageUrl
        };

    public static ProductDto ToDto(this Product p) =>
        new(p.Id, p.Name, p.Description, p.Price, p.ImageUrl, p.LikesCount, p.CreatedAt, p.UpdatedAt);

    public static Product ToEntity(this CreateProductDto dto) =>
        new() { Name = dto.Name, Description = dto.Description, Price = dto.Price, ImageUrl = dto.ImageUrl };

    public static NewsDto ToDto(this News n) =>
        new(n.Id, n.Title, n.Content, n.ImageUrl, n.IsPinned, n.LikesCount, n.CreatedAt, n.UpdatedAt);

    public static News ToEntity(this CreateNewsDto dto) =>
        new() { Title = dto.Title, Content = dto.Content, ImageUrl = dto.ImageUrl };

    public static BookingDto ToDto(this Booking b) =>
        new(b.Id, b.ClientName, b.ClientEmail, b.ClientPhone,
            b.ServiceId, b.AppointmentAt, b.Status.ToString(), b.Notes, b.CreatedAt, b.UpdatedAt);

    public static Booking ToEntity(this CreateBookingDto dto) =>
        new()
        {
            ClientName = dto.ClientName, ClientEmail = dto.ClientEmail,
            ClientPhone = dto.ClientPhone, ServiceId = dto.ServiceId,
            AppointmentAt = dto.AppointmentAt, Notes = dto.Notes
        };

    public static PagedDto<TDto> ToPagedDto<T, TDto>(
        this IPagedResult<T> result, Func<T, TDto> map) =>
        new(result.Items.Select(map), result.Total, result.Limit, result.Offset);
}
