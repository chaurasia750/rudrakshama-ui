using HautSphere.BuildingBlocks.Domain.Models;

namespace Binsera.Core.Master.Model
{
    public class DistrictFilterModel : PaginationModel
    {
        public string? Keyword { get; set; }
        public int? CID { get; set; }
        public int? SID { get; set; }
        public bool? Active { get; set; }
    }
}
