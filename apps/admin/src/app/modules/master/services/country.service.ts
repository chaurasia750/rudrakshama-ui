import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { apiConfig } from '@shared/environments/api.dev';
import { Country, CountryFilterModel, CountryListResponse, CountryPayload, UpdateCountryStatusPayload } from '../models/country.model';

@Injectable()
export class CountryService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${apiConfig.baseUrl}/master/country`;

  getList(params?: CountryFilterModel): Observable<CountryListResponse> {
    let httpParams = new HttpParams();
    if (params?.pageIndex) httpParams = httpParams.set('PageIndex', params.pageIndex);
    if (params?.pageSize) httpParams = httpParams.set('PageSize', params.pageSize);
    if (params?.keyword) httpParams = httpParams.set('Keyword', params.keyword);
    if (params?.sortingOrder !== undefined) httpParams = httpParams.set('SortingOrder', params.sortingOrder);
    if (params?.colName) httpParams = httpParams.set('ColName', params.colName);
    if (params?.active !== undefined) httpParams = httpParams.set('Active', params.active);

    return this.http.get<CountryListResponse>(this.baseUrl, { params: httpParams }).pipe(
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
          id: r.cid ?? r.CID ?? r.id ?? 0,
          name: r.countryName ?? r.CountryName ?? r.name ?? '',
          isActive: r.cActive ?? r.active ?? r.Active ?? r.isActive ?? true,
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

  getById(id: number): Observable<Country> {
    return this.http.get<Country>(`${this.baseUrl}/${id}`);
  }

  create(payload: CountryPayload): Observable<Country> {
    return this.http.post<Country>(this.baseUrl, payload);
  }

  update(id: number, payload: CountryPayload): Observable<Country> {
    return this.http.put<Country>(`${this.baseUrl}/${id}`, payload);
  }

  updateStatus(id: number, payload: UpdateCountryStatusPayload): Observable<Country> {
    return this.http.put<Country>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
