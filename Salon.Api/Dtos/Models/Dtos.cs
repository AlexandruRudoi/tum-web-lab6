using Salon.Domain.Enums;

namespace Salon.Api.Dtos.Models;

public record TokenRequestDto(string Role);

public record TokenResponseDto(string Token, int ExpiresInSeconds);

// --- Service ---
public record ServiceDto(
    Guid Id, string Name, string Description,
    decimal Price, int DurationMinutes,
    string Category, string? ImageUrl, int LikesCount,
    DateTime CreatedAt, DateTime UpdatedAt);

public record CreateServiceDto(
    string Name, string Description,
    decimal Price, int DurationMinutes,
    ServiceCategory Category, string? ImageUrl);

public record UpdateServiceDto(
    string Name, string Description,
    decimal Price, int DurationMinutes,
    ServiceCategory Category, string? ImageUrl);

// --- Product ---
public record ProductDto(
    Guid Id, string Name, string Description,
    decimal Price, string? ImageUrl, int LikesCount,
    DateTime CreatedAt, DateTime UpdatedAt);

public record CreateProductDto(string Name, string Description, decimal Price, string? ImageUrl);

public record UpdateProductDto(string Name, string Description, decimal Price, string? ImageUrl);

// --- News ---
public record NewsDto(
    Guid Id, string Title, string Content,
    string? ImageUrl, bool IsPinned, int LikesCount,
    DateTime CreatedAt, DateTime UpdatedAt);

public record CreateNewsDto(string Title, string Content, string? ImageUrl);

public record UpdateNewsDto(string Title, string Content, string? ImageUrl);

// --- Booking ---
public record BookingDto(
    Guid Id, string ClientName, string ClientEmail, string ClientPhone,
    Guid ServiceId, DateTime AppointmentAt, string Status, string? Notes,
    DateTime CreatedAt, DateTime UpdatedAt);

public record CreateBookingDto(
    string ClientName, string ClientEmail, string ClientPhone,
    Guid ServiceId, DateTime AppointmentAt, string? Notes);

public record UpdateBookingStatusDto(BookingStatus Status);

// --- Paged ---
public record PagedDto<T>(IEnumerable<T> Items, int Total, int Limit, int Offset);

// --- Auth ---
public record LoginRequestDto(string Email, string Password);

public record LoginResponseDto(
    string Token, int ExpiresInSeconds,
    string Name, string Email, string Role);

// --- Users ---
public record AppUserDto(Guid Id, string Name, string Email, string Role, DateTime CreatedAt);

public record UpdateUserRoleDto(string Role);
