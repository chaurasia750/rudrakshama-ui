using HautSphere.BuildingBlocks.Domain.Models;

namespace Binsera.Core.Master.Model
{
    public class CityFilterModel : PaginationModel
    {
        public string? Keyword { get; set; }
        public int? CID { get; set; }
        public int? SID { get; set; }
        public int? DistId { get; set; }
        public bool? Active { get; set; }
    }
}
