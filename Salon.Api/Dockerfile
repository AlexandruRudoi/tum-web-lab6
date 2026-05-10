# syntax=docker/dockerfile:1.6

# ----------------------------------------------------------------------------
# Stage 1 — runtime base
# ----------------------------------------------------------------------------
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080

# ----------------------------------------------------------------------------
# Stage 2 — build
# ----------------------------------------------------------------------------
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy project files and restore (layer-cache friendly)
COPY ["Salon.Api/Salon.Api.csproj",             "Salon.Api/"]
COPY ["Salon.Domain/Salon.Domain.csproj",        "Salon.Domain/"]
COPY ["Salon.Postgres/Salon.Postgres.csproj",    "Salon.Postgres/"]
COPY ["Salon.Repositories/Salon.Repositories.csproj", "Salon.Repositories/"]
COPY ["Salon.Services/Salon.Services.csproj",    "Salon.Services/"]
RUN dotnet restore "Salon.Api/Salon.Api.csproj"

# Copy sources and build
COPY . .
WORKDIR "/src/Salon.Api"
RUN dotnet build "Salon.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

# ----------------------------------------------------------------------------
# Stage 3 — publish
# ----------------------------------------------------------------------------
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "Salon.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# ----------------------------------------------------------------------------
# Stage 4 — final image
# ----------------------------------------------------------------------------
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Salon.Api.dll"]
