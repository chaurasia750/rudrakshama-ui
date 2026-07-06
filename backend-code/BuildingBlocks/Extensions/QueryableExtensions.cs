using Microsoft.EntityFrameworkCore;
using HautSphere.BuildingBlocks.Domain.Models;

namespace HautSphere.BuildingBlocks.Persistence.Extensions
{
    public static class QueryableExtensions
    {
        public static async Task<IPagedList<T>> ToPagedListAsync<T>(this IQueryable<T> source, int pageIndex, int pageSize)
        {
            if (pageIndex < 1) pageIndex = 1;
            if (pageSize < 1) pageSize = 20;
            var totalCount = await source.CountAsync();
            var items = await source.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T>(items, totalCount, pageIndex, pageSize);
        }
    }
}
