namespace Binsera.Core.Master.Model
{
    public class CountryModel
    {
        public int CID { get; set; }
        public string CountryName { get; set; }
        public bool cActive { get; set; }
    }

    public class UpdateStatusRequest
    {
        public bool cActive { get; set; }
    }
}
