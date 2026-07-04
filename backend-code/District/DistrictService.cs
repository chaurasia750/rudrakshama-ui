using Microsoft.EntityFrameworkCore;
using HautSphereApi.Data;
using HautSphereApi.Models.Entities.Master;
using HautSphereApi.Models.ViewModels.Master;
using HautSphereApi.Services.Interfaces.Master;

namespace HautSphereApi.Services.Implementations.Master
{
    public class DistrictService : IDistrictService
    {
        private readonly BinseraDbContext _context;

        public DistrictService(BinseraDbContext context)
        {
            _context = context;
        }

        public async Task<List<DistrictView>> GetAllAsync()
        {
            var query = from d in _context.Set<District>()
                        join c in _context.Set<Country>() on d.CID equals c.Id
                        join s in _context.Set<State>() on d.SID equals s.Id
                        where !d.IsDeleted
                        select new DistrictView
                        {
                            Id = d.Id,
                            CID = d.CID,
                            SID = d.SID,
                            DistName = d.DistName,
                            CountryName = c.CountryName,
                            StateName = s.StateName,
                            Active = d.Active,
                        };

            return await query.OrderBy(d => d.DistName).ToListAsync();
        }

        public async Task<DistrictView?> GetByIdAsync(int id)
        {
            var query = from d in _context.Set<District>()
                        join c in _context.Set<Country>() on d.CID equals c.Id
                        join s in _context.Set<State>() on d.SID equals s.Id
                        where d.Id == id && !d.IsDeleted
                        select new DistrictView
                        {
                            Id = d.Id,
                            CID = d.CID,
                            SID = d.SID,
                            DistName = d.DistName,
                            CountryName = c.CountryName,
                            StateName = s.StateName,
                            Active = d.Active,
                        };

            return await query.FirstOrDefaultAsync();
        }

        public async Task<DistrictView?> UpdateStatusAsync(int id, bool active)
        {
            var district = await _context.Set<District>().FirstOrDefaultAsync(d => d.Id == id && !d.IsDeleted);
            if (district == null) return null;

            district.Active = active;
            _context.Entry(district).Property(d => d.Active).IsModified = true;
            await _context.SaveChangesAsync();

            return await GetByIdAsync(id);
        }
    }
}
