using HautSphere.BuildingBlocks.Domain.Models;
using Binsera.Core.Master.Model;

namespace Binsera.Core.Master.Contract
{
    public interface ICityService
    {
        Task<IPagedList<CityModel>> GetAllAsync(CityFilterModel filterModel);
        Task<CityModel?> GetByIdAsync(int id);
        Task UpdateAsync(int id, string cityName, string pincode, bool active);
    }
}
