using HautSphere.BuildingBlocks.Domain.Models;
using Binsera.Core.Master.Model;

namespace Binsera.Core.Master.Contract
{
    public interface ICountryService
    {
        Task<IPagedList<CountryModel>> GetCountries(CountryFilterModel filterModel);
        Task UpdateCountryStatus(int CID, bool cActive);
    }
}
