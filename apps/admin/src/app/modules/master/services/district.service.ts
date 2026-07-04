import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { apiConfig } from '@shared/environments/api.dev';
import { District, DistrictListResponse, DistrictPayload, UpdateDistrictStatusPayload } from '../models/district.model';

@Injectable()
export class DistrictService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${apiConfig.baseUrl}/master/district`;

  getList(params?: { keyword?: string; pageIndex?: number; pageSize?: number }): Observable<DistrictListResponse> {
    return this.http.get<District[] | DistrictListResponse>(this.baseUrl).pipe(
      map((res: any) => {
        let rawItems: any[];
        if (Array.isArray(res)) rawItems = res;
        else if (res?.data && Array.isArray(res.data)) rawItems = res.data;
        else if (res?.items && Array.isArray(res.items)) rawItems = res.items;
        else rawItems = [];
        const items = rawItems.map((r: any) => ({
          id: r.distId ?? r.DistId ?? r.id ?? 0,
          name: r.distName ?? r.DistName ?? r.name ?? '',
          cid: r.cid ?? r.CID ?? 0,
          countryName: r.countryName ?? r.CountryName ?? '',
          sid: r.sid ?? r.SID ?? 0,
          stateName: r.stateName ?? r.StateName ?? '',
          isActive: r.active ?? r.Active ?? r.isActive ?? true,
        }));
        const keyword = params?.keyword?.toLowerCase();
        const filtered = keyword ? items.filter((c) => c.name.toLowerCase().includes(keyword)) : items;
        const pageIndex = params?.pageIndex ?? 1;
        const pageSize = params?.pageSize ?? 20;
        const start = (pageIndex - 1) * pageSize;
        return { items: filtered.slice(start, start + pageSize), pageIndex, pageSize, totalCount: filtered.length, totalPages: Math.ceil(filtered.length / pageSize) };
      }),
    );
  }

  getById(id: number): Observable<District> {
    return this.http.get<District>(`${this.baseUrl}/${id}`);
  }

  create(payload: DistrictPayload): Observable<District> {
    return this.http.post<District>(this.baseUrl, payload);
  }

  updateStatus(id: number, payload: UpdateDistrictStatusPayload): Observable<District> {
    return this.http.put<District>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
