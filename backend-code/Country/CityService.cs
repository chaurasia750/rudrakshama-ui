using Microsoft.EntityFrameworkCore;
using Binsera.Core.Master.Contract;
using Binsera.Core.Master.Domain;
using Binsera.Core.Master.Model;
using Binsera.Persistence;
using HautSphere.BuildingBlocks.Domain.Models;
using HautSphere.BuildingBlocks.Persistence.Contracts;
using HautSphere.BuildingBlocks.Persistence.Extensions;

namespace Binsera.Application.Master.Service
{
    public class CityService : ICityService
    {
        private readonly IRepository<CityView> _cityRepository;
        private readonly IRepository<CountryView> _countryRepository;
        private readonly IRepository<StateView> _stateRepository;
        private readonly IRepository<DistrictView> _districtRepository;
        private readonly BinseraDbContext _context;

        public CityService(IUnitOfWork unitOfWork, BinseraDbContext context)
        {
            _cityRepository = unitOfWork.Repository<CityView>();
            _countryRepository = unitOfWork.Repository<CountryView>();
            _stateRepository = unitOfWork.Repository<StateView>();
            _districtRepository = unitOfWork.Repository<DistrictView>();
            _context = context;
        }

        public async Task<IPagedList<CityModel>> GetAllAsync(CityFilterModel filterModel)
        {
            var query = from c in _cityRepository.TableNoTracking
                        join co in _countryRepository.TableNoTracking on c.CID equals co.Id
                        join s in _stateRepository.TableNoTracking on c.SID equals s.Id
                        join d in _districtRepository.TableNoTracking on c.DistId equals d.Id
                        where (string.IsNullOrEmpty(filterModel.Keyword) || c.CityName.Contains(filterModel.Keyword))
                           && (!filterModel.CID.HasValue || c.CID == filterModel.CID.Value)
                           && (!filterModel.SID.HasValue || c.SID == filterModel.SID.Value)
                           && (!filterModel.DistId.HasValue || c.DistId == filterModel.DistId.Value)
                           && (!filterModel.Active.HasValue || c.Active == filterModel.Active.Value)
                        select new CityModel
                        {
                            CTID = (int)c.Id,
                            CID = c.CID,
                            CountryName = co.CountryName,
                            SID = c.SID,
                            StateName = s.StateName,
                            DistId = c.DistId,
                            DistrictName = d.DistName,
                            CityName = c.CityName,
                            Pincode = c.Pincode,
                            Active = c.Active,
                        };

            query = filterModel.SortingOrder == SortingOrder.Desc
                ? query.OrderByDescending(c => c.CityName)
                : query.OrderBy(c => c.CityName);

            return await query.ToPagedListAsync(filterModel.PageIndex, filterModel.PageSize);
        }

        public async Task<CityModel?> GetByIdAsync(int id)
        {
            return await (from c in _cityRepository.TableNoTracking
                          join co in _countryRepository.TableNoTracking on c.CID equals co.Id
                          join s in _stateRepository.TableNoTracking on c.SID equals s.Id
                          join d in _districtRepository.TableNoTracking on c.DistId equals d.Id
                          where c.Id == id
                          select new CityModel
                          {
                              CTID = (int)c.Id,
                              CID = c.CID,
                              CountryName = co.CountryName,
                              SID = c.SID,
                              StateName = s.StateName,
                              DistId = c.DistId,
                              DistrictName = d.DistName,
                              CityName = c.CityName,
                              Pincode = c.Pincode,
                              Active = c.Active,
                          }).FirstOrDefaultAsync();
        }

        public async Task UpdateAsync(int id, string cityName, string pincode, bool active)
        {
            var city = await _context.Set<CityView>()
                .FirstOrDefaultAsync(c => c.Id == id);

            if (city == null)
                throw new KeyNotFoundException($"City with Id {id} not found.");

            city.CityName = cityName;
            city.Pincode = pincode;
            city.Active = active;

            _context.Entry(city).Property(x => x.CityName).IsModified = true;
            _context.Entry(city).Property(x => x.Pincode).IsModified = true;
            _context.Entry(city).Property(x => x.Active).IsModified = true;

            await _context.SaveChangesAsync();
        }
    }
}
