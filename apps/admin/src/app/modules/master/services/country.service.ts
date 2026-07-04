import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiConfig } from '@shared/environments/api.dev';
import { Country, CountryListResponse, CountryPayload } from '../models/country.model';

@Injectable()
export class CountryService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${apiConfig.baseUrl}/master/countries`;

  getList(params?: { keyword?: string; pageIndex?: number; pageSize?: number }): Observable<CountryListResponse> {
    const query: Record<string, string | number> = {};
    if (params?.keyword) query['keyword'] = params.keyword;
    if (params?.pageIndex) query['pageIndex'] = params.pageIndex;
    if (params?.pageSize) query['pageSize'] = params.pageSize;
    return this.http.get<CountryListResponse>(this.baseUrl, { params: query });
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

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
