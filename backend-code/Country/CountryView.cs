using HautSphere.BuildingBlocks.Domain;

namespace Binsera.Core.Master.Domain
{
    public class CountryView : DomainBase
    {
        public string CountryName { get; set; }
        public bool cActive { get; set; }
    }
}
