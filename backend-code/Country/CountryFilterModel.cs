using HautSphere.BuildingBlocks.Domain.Models;

namespace Binsera.Core.Master.Model
{
    public class CountryFilterModel : PaginationModel
    {
        public string? Keyword { get; set; }
        public bool? Active { get; set; }
    }
}
