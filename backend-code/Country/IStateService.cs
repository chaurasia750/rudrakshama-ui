using HautSphere.BuildingBlocks.Domain.Models;
using Binsera.Core.Master.Model;

namespace Binsera.Core.Master.Contract
{
    public interface IStateService
    {
        Task<IPagedList<StateModel>> GetStates(StateFilterModel filterModel);
        Task UpdateStateStatus(int id, bool sActive);
    }
}
