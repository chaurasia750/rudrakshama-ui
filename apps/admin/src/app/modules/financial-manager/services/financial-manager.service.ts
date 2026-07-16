import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiConfig } from '@shared/environments/api.dev';

export interface MemberProfileAddress {
  houseNo: string | null;
  street: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  countryId: number | null;
  stateId: number | null;
  cityId: number | null;
  districtId: number | null;
}

export interface SponsorDetails {
  intoRegNo: number | null;
  title: string | null;
  fName: string | null;
  lName: string | null;
  loginId: string | null;
}

export interface MemberProfile {
  id: number;
  registrationNumber: string | null;
  loginId: string | null;
  title: string | null;
  firstName: string | null;
  lastName: string | null;
  gender: string | null;
  primaryContactNumber: string | null;
  secondaryContactNumber: string | null;
  emailId: string | null;
  introRegNo: string | null;
  introSide: string | null;
  registrationDate: string | null;
  aadhaarNo: string | null;
  memPan: string | null;
  address: MemberProfileAddress | null;
  sponsorDetails: SponsorDetails | null;
}

@Injectable({ providedIn: 'root' })
export class FinancialManagerService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${apiConfig.baseUrl}/members`;

  searchByUsername(userName: string): Observable<MemberProfile> {
    return this.http.get<MemberProfile>(`${apiConfig.baseUrl}/admin/member/profile`, {
      params: { loginId: userName },
    });
  }

  getCurrentBalance(loginId: string): Observable<{ currentBalance: number }> {
    return this.http.get<{ currentBalance: number }>(`${this.baseUrl}/account/current-balance`, {
      params: { loginId },
    });
  }

  deposit(payload: { loginId: string; amount: number; remark: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/account/deposit`, payload);
  }

  debit(payload: { loginId: string; amount: number; remark: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/account/debit`, payload);
  }
}
