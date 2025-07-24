# -------- BASE IMAGE (runtime) --------
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000

# -------- BUILD IMAGE (SDK) --------
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy .csproj và restore
COPY *.csproj ./
RUN dotnet restore

# Copy toàn bộ mã nguồn vào image
COPY . .

# Build và publish
RUN dotnet publish -c Release -o /app/publish

# -------- FINAL IMAGE --------
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "sso.dll"]
