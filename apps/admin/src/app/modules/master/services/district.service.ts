import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { apiConfig } from '@shared/environments/api.dev';
import { District, DistrictFilterModel, DistrictListResponse, DistrictPayload, UpdateDistrictStatusPayload } from '../models/district.model';

@Injectable()
export class DistrictService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${apiConfig.baseUrl}/master/district`;

  getList(params?: DistrictFilterModel): Observable<DistrictListResponse> {
    let httpParams = new HttpParams();
    if (params?.pageIndex) httpParams = httpParams.set('PageIndex', params.pageIndex);
    if (params?.pageSize) httpParams = httpParams.set('PageSize', params.pageSize);
    if (params?.keyword) httpParams = httpParams.set('Keyword', params.keyword);
    if (params?.sortingOrder !== undefined) httpParams = httpParams.set('SortingOrder', params.sortingOrder);
    if (params?.colName) httpParams = httpParams.set('ColName', params.colName);
    if (params?.cid) httpParams = httpParams.set('CID', params.cid);
    if (params?.sid) httpParams = httpParams.set('SID', params.sid);
    if (params?.active !== undefined) httpParams = httpParams.set('Active', params.active);

    return this.http.get<DistrictListResponse>(this.baseUrl, { params: httpParams }).pipe(
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
          id: r.distId ?? r.DistId ?? r.id ?? 0,
          name: r.distName ?? r.DistName ?? r.name ?? '',
          cid: r.cid ?? r.CID ?? 0,
          countryName: r.countryName ?? r.CountryName ?? '',
          sid: r.sid ?? r.SID ?? 0,
          stateName: r.stateName ?? r.StateName ?? '',
          isActive: r.active ?? r.Active ?? r.isActive ?? true,
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
