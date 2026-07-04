import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { apiConfig } from '@shared/environments/api.dev';
import { City, CityListResponse, UpdateCityPayload } from '../models/city.model';

@Injectable()
export class CityService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${apiConfig.baseUrl}/master/city`;

  getList(params?: { keyword?: string; pageIndex?: number; pageSize?: number }): Observable<CityListResponse> {
    return this.http.get<City[] | CityListResponse>(this.baseUrl).pipe(
      map((res: any) => {
        let rawItems: any[];
        if (Array.isArray(res)) rawItems = res;
        else if (res?.data && Array.isArray(res.data)) rawItems = res.data;
        else if (res?.items && Array.isArray(res.items)) rawItems = res.items;
        else rawItems = [];
        const items = rawItems.map((r: any) => ({
          id: r.id ?? r.Id ?? r.ctid ?? r.CTID ?? 0,
          cityName: r.cityName ?? r.CityName ?? r.name ?? '',
          pincode: r.pincode ?? r.Pincode ?? '',
          cid: r.cid ?? r.CID ?? 0,
          countryName: r.countryName ?? r.CountryName ?? '',
          sid: r.sid ?? r.SID ?? 0,
          stateName: r.stateName ?? r.StateName ?? '',
          distId: r.distId ?? r.DistId ?? r.distID ?? r.DistID ?? 0,
          districtName: r.districtName ?? r.DistrictName ?? r.distName ?? r.DistName ?? '',
          isActive: r.active ?? r.Active ?? r.isActive ?? true,
        }));
        const keyword = params?.keyword?.toLowerCase();
        const filtered = keyword ? items.filter((c) => c.cityName.toLowerCase().includes(keyword)) : items;
        const pageIndex = params?.pageIndex ?? 1;
        const pageSize = params?.pageSize ?? 20;
        const start = (pageIndex - 1) * pageSize;
        return { items: filtered.slice(start, start + pageSize), pageIndex, pageSize, totalCount: filtered.length, totalPages: Math.ceil(filtered.length / pageSize) };
      }),
    );
  }

  getById(id: number): Observable<City> {
    return this.http.get<City>(`${this.baseUrl}/${id}`);
  }

  update(id: number, payload: UpdateCityPayload): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, payload);
  }
}
