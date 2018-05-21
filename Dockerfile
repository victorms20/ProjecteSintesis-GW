FROM microsoft/aspnetcore:2.0 as base
WORKDIR /app
EXPOSE 80

FROM microsoft/aspnetcore-build:2.0 as build
WORKDIR /src
COPY . PSCORE/
COPY PSCORE.csproj PSCORE/
RUN dotnet restore PSCORE/PSCORE.csproj
WORKDIR /src/PSCORE
RUN dotnet build PSCORE.csproj -c Release -o /app

FROM build as publish
RUN dotnet publish PSCORE.csproj -c Release -o /app

FROM base as final
WORKDIR /app
COPY --from=publish /app .
CMD ["dotnet", "PSCORE.dll"]