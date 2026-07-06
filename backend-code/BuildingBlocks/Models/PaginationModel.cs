namespace HautSphere.BuildingBlocks.Domain.Models
{
    public abstract class PaginationModel
    {
        public int PageIndex { get; set; } = 1;
        public int PageSize { get; set; } = 20;
        public SortingOrder SortingOrder { get; set; } = SortingOrder.Asc;
        public string? ColName { get; set; }
    }

    public enum SortingOrder
    {
        Desc = 1,
        Asc = 0
    }
}
