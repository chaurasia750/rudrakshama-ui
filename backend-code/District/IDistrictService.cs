using HautSphereApi.Models.ViewModels.Master;

namespace HautSphereApi.Services.Interfaces.Master
{
    public interface IDistrictService
    {
        Task<List<DistrictView>> GetAllAsync();
        Task<DistrictView?> GetByIdAsync(int id);
        Task<DistrictView?> UpdateStatusAsync(int id, bool active);
    }
}
