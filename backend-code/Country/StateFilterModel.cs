using HautSphere.BuildingBlocks.Domain.Models;

namespace Binsera.Core.Master.Model
{
    public class StateFilterModel : PaginationModel
    {
        public string? Keyword { get; set; }
        public int? CID { get; set; }
        public bool? sActive { get; set; }
    }
}
