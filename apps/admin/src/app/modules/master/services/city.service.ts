import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { apiConfig } from '@shared/environments/api.dev';
import { City, CityFilterModel, CityListResponse, UpdateCityPayload } from '../models/city.model';

@Injectable()
export class CityService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${apiConfig.baseUrl}/master/city`;

  getList(params?: CityFilterModel): Observable<CityListResponse> {
    let httpParams = new HttpParams();
    if (params?.pageIndex) httpParams = httpParams.set('PageIndex', params.pageIndex);
    if (params?.pageSize) httpParams = httpParams.set('PageSize', params.pageSize);
    if (params?.keyword) httpParams = httpParams.set('Keyword', params.keyword);
    if (params?.sortingOrder !== undefined) httpParams = httpParams.set('SortingOrder', params.sortingOrder);
    if (params?.colName) httpParams = httpParams.set('ColName', params.colName);
    if (params?.cid) httpParams = httpParams.set('CID', params.cid);
    if (params?.sid) httpParams = httpParams.set('SID', params.sid);
    if (params?.distId) httpParams = httpParams.set('DistId', params.distId);
    if (params?.active !== undefined) httpParams = httpParams.set('Active', params.active);

    return this.http.get<CityListResponse>(this.baseUrl, { params: httpParams }).pipe(
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

  getById(id: number): Observable<City> {
    return this.http.get<City>(`${this.baseUrl}/${id}`);
  }

  update(id: number, payload: UpdateCityPayload): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, payload);
  }
}
