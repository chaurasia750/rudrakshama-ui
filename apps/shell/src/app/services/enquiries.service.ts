import { inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiConfig } from '@shared/environments/api.dev';

export interface EnquiryRequest {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export const ENQUIRIES_API_BASE_URL = new InjectionToken<string>('ENQUIRIES_API_BASE_URL', {
  factory: () => `${apiConfig.baseUrl}/enquiries`,
});

@Injectable({ providedIn: 'root' })
export class EnquiriesService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(ENQUIRIES_API_BASE_URL);

  submitEnquiry(payload: EnquiryRequest): Observable<any> {
    return this.http.post(this.baseUrl, payload);
  }
}
