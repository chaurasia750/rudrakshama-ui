import { inject, Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, catchError, throwError, of } from 'rxjs';
import { AuthRequest, AuthResponse } from './models';
import { apiConfig } from '@shared/environments/api.dev';

export const AUTH_API_BASE_URL = new InjectionToken<string>('AUTH_API_BASE_URL', {
  // Fallback keeps auth traffic on backend API even if a remote misses provider wiring.
  factory: () => `${apiConfig.baseUrl}/auth`,
});

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(AUTH_API_BASE_URL);

  login(payload: AuthRequest): Observable<AuthResponse> {
    return this.http.post<any>(this.baseUrl, payload, { withCredentials: true }).pipe(
      map((raw) => {
        // Backend returns HTTP 200 with errorCode for business errors (e.g. "Invalid Users")
        if (raw && typeof raw === 'object' && 'errorCode' in raw && raw.errorCode !== 0) {
          const msg = (raw.message as any)?.message ?? raw.data ?? 'Invalid credentials';
          throw new HttpErrorResponse({
            status: 401,
            statusText: msg,
            error: raw,
          });
        }
        // Interceptor already unwrapped to data, or raw response
        return (raw?.data ?? raw) as AuthResponse;
      }),
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          return throwError(() => err);
        }
        return throwError(() => new HttpErrorResponse({
          status: 0,
          statusText: 'Network error',
          error: err,
        }));
      })
    );
  }

  validateSession(): Observable<AuthResponse> {
    return this.http.get<any>(`${this.baseUrl}/validate`, { withCredentials: true }).pipe(
      map((raw) => {
        if (raw && typeof raw === 'object' && 'errorCode' in raw && raw.errorCode !== 0) {
          const msg = (raw.message as any)?.message ?? raw.data ?? 'Session invalid';
          throw new HttpErrorResponse({
            status: 401,
            statusText: msg,
            error: raw,
          });
        }
        return (raw?.data ?? raw) as AuthResponse;
      }),
      catchError((err) => {
        if (err instanceof HttpErrorResponse) return throwError(() => err);
        return throwError(() => new HttpErrorResponse({ status: 0, statusText: 'Network error', error: err }));
      })
    );
  }

  refreshSession(): Observable<AuthResponse> {
    return this.http.post<any>(`${this.baseUrl}/refresh`, {}, { withCredentials: true }).pipe(
      map((raw) => {
        if (raw && typeof raw === 'object' && 'errorCode' in raw && raw.errorCode !== 0) {
          const msg = (raw.message as any)?.message ?? raw.data ?? 'Refresh failed';
          throw new HttpErrorResponse({ status: 401, statusText: msg, error: raw });
        }
        return (raw?.data ?? raw) as AuthResponse;
      }),
      catchError((err) => {
        if (err instanceof HttpErrorResponse) return throwError(() => err);
        return throwError(() => new HttpErrorResponse({ status: 0, statusText: 'Network error', error: err }));
      })
    );
  }

  logout(): Observable<void> {
    return this.http.post<any>(`${this.baseUrl}/logout`, {}, { withCredentials: true }).pipe(
      map(() => void 0),
      catchError(() => of(void 0))
    );
  }
}
