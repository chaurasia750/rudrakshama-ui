namespace HautSphere.BuildingBlocks.Domain.Models
{
    public class PagedList<T> : IPagedList<T>
    {
        public PagedList(IList<T> items, int totalCount, int pageIndex, int pageSize)
        {
            Items = items;
            TotalCount = totalCount;
            PageIndex = pageIndex;
            PageSize = pageSize;
            TotalPages = pageSize > 0 ? (int)Math.Ceiling(totalCount / (double)pageSize) : 0;
            HasPreviousPage = pageIndex > 1;
            HasNextPage = pageIndex < TotalPages;
        }

        public int PageIndex { get; }
        public int PageSize { get; }
        public int TotalCount { get; }
        public int TotalPages { get; }
        public bool HasPreviousPage { get; }
        public bool HasNextPage { get; }
        public IList<T> Items { get; }
    }
}
