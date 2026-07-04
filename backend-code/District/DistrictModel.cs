using HautSphereApi.Domain.Common;

namespace HautSphereApi.Models.Entities.Master
{
    public class District : DomainBase
    {
        public int CID { get; set; }
        public int SID { get; set; }
        public string DistName { get; set; } = string.Empty;
        public bool Active { get; set; } = true;

        // Navigation
        public Country? Country { get; set; }
        public State? State { get; set; }
    }
}
