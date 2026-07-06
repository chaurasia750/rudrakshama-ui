import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { apiConfig } from '@shared/environments/api.dev';
import { State, StateFilterModel, StateListResponse, StatePayload, UpdateStateStatusPayload } from '../models/state.model';

@Injectable()
export class StateService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${apiConfig.baseUrl}/master/state`;

  getList(params?: StateFilterModel): Observable<StateListResponse> {
    let httpParams = new HttpParams();
    if (params?.pageIndex) httpParams = httpParams.set('PageIndex', params.pageIndex);
    if (params?.pageSize) httpParams = httpParams.set('PageSize', params.pageSize);
    if (params?.keyword) httpParams = httpParams.set('Keyword', params.keyword);
    if (params?.sortingOrder !== undefined) httpParams = httpParams.set('SortingOrder', params.sortingOrder);
    if (params?.colName) httpParams = httpParams.set('ColName', params.colName);
    if (params?.cid) httpParams = httpParams.set('CID', params.cid);
    if (params?.sActive !== undefined) httpParams = httpParams.set('sActive', params.sActive);

    return this.http.get<StateListResponse>(this.baseUrl, { params: httpParams }).pipe(
      map((res: any) => {
        let rawItems: any[];
        let pageIndex = params?.pageIndex ?? 1;
        let pageSize = params?.pageSize ?? 20;
        let totalCount = 0;

        if (res?.items && Array.isArray(res.items)) {
          rawItems = res.items;
          pageIndex = res.pageIndex ?? pageIndex;
          pageSize = res.pageSize ?? pageSize;
          totalCount = res.totalCount ?? rawItems.length;
        } else if (res?.data && Array.isArray(res.data)) {
          rawItems = res.data;
        } else if (Array.isArray(res)) {
          rawItems = res;
        } else {
          rawItems = [];
        }

        const items = rawItems.map((r: any) => ({
          id: r.sid ?? r.SID ?? r.id ?? 0,
          name: r.stateName ?? r.StateName ?? r.name ?? '',
          cid: r.cid ?? r.CID ?? 0,
          countryName: r.countryName ?? r.CountryName ?? '',
          isActive: r.sActive ?? r.active ?? r.Active ?? r.isActive ?? true,
        }));

        return {
          items,
          pageIndex,
          pageSize,
          totalCount: totalCount || items.length,
          totalPages: pageSize > 0 ? Math.ceil((totalCount || items.length) / pageSize) : 1,
        };
      }),
    );
  }

  getListByCountry(cid: number): Observable<StateListResponse> {
    return this.getList({ cid, pageSize: 200 });
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
