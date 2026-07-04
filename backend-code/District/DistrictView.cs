namespace HautSphereApi.Models.ViewModels.Master
{
    public class DistrictView
    {
        public int CID { get; set; }
        public int SID { get; set; }
        public string DistName { get; set; } = string.Empty;
        public string? CountryName { get; set; }
        public string? StateName { get; set; }
        public bool Active { get; set; }
    }
}
