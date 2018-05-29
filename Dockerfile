FROM microsoft/aspnetcore-build:2.0 as build
WORKDIR /src
COPY . PSCORE/
WORKDIR /src/PSCORE
RUN dotnet restore PSCORE.csproj
RUN dotnet build PSCORE.csproj -c Release -o /app
RUN dotnet publish PSCORE.csproj -c Release -o /app

FROM microsoft/aspnetcore:2.0 as base
EXPOSE 80
WORKDIR /app
COPY --from=build /app .
CMD ["dotnet", "PSCORE.dll"]