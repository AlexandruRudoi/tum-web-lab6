using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Salon.Domain.Permissions;
using Salon.Postgres;
using Salon.Services;

var builder = WebApplication.CreateBuilder(args);

// --- Database ---
builder.Services.AddPostgres(
    builder.Configuration.GetConnectionString("DefaultConnection")!);

// --- Services ---
builder.Services.AddScoped<ServiceService>();
builder.Services.AddScoped<ProductService>();
builder.Services.AddScoped<NewsService>();
builder.Services.AddScoped<BookingService>();
builder.Services.AddScoped<AuthenticationService>();
builder.Services.AddScoped<LoginService>();

// --- JWT ---
var jwtKey = builder.Configuration["Jwt:Key"]!;
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddAuthorization(opts =>
{
    // Requires the content:manage permission claim (ADMIN only)
    opts.AddPolicy("CanManageContent", p =>
        p.RequireClaim("permission", AppPermission.ManageContent));

    // Requires the appointments:manage permission claim (MANAGER or ADMIN)
    opts.AddPolicy("CanManageAppointments", p =>
        p.RequireClaim("permission", AppPermission.ManageAppointments));

    // Requires the users:manage permission claim (ADMIN only)
    opts.AddPolicy("CanManageUsers", p =>
        p.RequireClaim("permission", AppPermission.ManageUsers));
});

// --- Controllers + Swagger ---
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Salon API",
        Version = "v1",
        Description = "REST API for Salon.Web — Lab 7"
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter your JWT token (without 'Bearer ' prefix)."
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            Array.Empty<string>()
        }
    });

    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath)) c.IncludeXmlComments(xmlPath);
});

// --- CORS ---
builder.Services.AddCors(options =>
    options.AddPolicy("SalonWeb", policy =>
        policy
            .WithOrigins("http://localhost:5173", "http://localhost:8080", "http://localhost")
            .AllowAnyHeader()
            .AllowAnyMethod()));

var app = builder.Build();

app.UseCors("SalonWeb");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Auto-apply migrations and seed on startup
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<Salon.Postgres.SalonDbContext>();
    db.Database.Migrate();

    var seeder = scope.ServiceProvider.GetRequiredService<Salon.Postgres.Seed.SalonDbSeeder>();
    await seeder.SeedAsync();
}

app.Run();
