import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { apiConfig } from '@shared/environments/api.dev';
import { State, StateListResponse, StatePayload, UpdateStateStatusPayload } from '../models/state.model';

@Injectable()
export class StateService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${apiConfig.baseUrl}/master/state`;

  getList(params?: { keyword?: string; pageIndex?: number; pageSize?: number }): Observable<StateListResponse> {
    return this.http.get<State[] | StateListResponse>(this.baseUrl).pipe(
      map((res: any) => {
        let rawItems: any[];
        if (Array.isArray(res)) rawItems = res;
        else if (res?.data && Array.isArray(res.data)) rawItems = res.data;
        else if (res?.items && Array.isArray(res.items)) rawItems = res.items;
        else rawItems = [];
        const items = rawItems.map((r: any) => ({
          id: r.sid ?? r.SID ?? r.id ?? 0,
          name: r.stateName ?? r.StateName ?? r.name ?? '',
          cid: r.cid ?? r.CID ?? 0,
          countryName: r.countryName ?? r.CountryName ?? '',
          isActive: r.sActive ?? r.active ?? r.Active ?? r.isActive ?? true,
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

  getListByCountry(cid: number): Observable<StateListResponse> {
    return this.getList().pipe(
      map((res) => ({
        ...res,
        items: res.items.filter((s) => s.cid === cid),
        totalCount: res.items.filter((s) => s.cid === cid).length,
      })),
    );
  }

  getById(id: number): Observable<State> {
    return this.http.get<State>(`${this.baseUrl}/${id}`);
  }

  create(payload: StatePayload): Observable<State> {
    return this.http.post<State>(this.baseUrl, payload);
  }

  updateStatus(id: number, payload: UpdateStateStatusPayload): Observable<State> {
    return this.http.put<State>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
