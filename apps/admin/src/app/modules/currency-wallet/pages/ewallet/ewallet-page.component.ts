import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { apiConfig } from '@shared/environments/api.dev';

@Component({
  selector: 'admin-ewallet-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ewallet-page.component.html',
})
export class EwalletPageComponent {
  private readonly http = inject(HttpClient);
  private readonly cdr = inject(ChangeDetectorRef);

  profileUserName = '';
  isProfileLoading = false;
  profileData: Record<string, any> | null = null;
  profileError = '';

  val(v: string | null | undefined): string {
    return v ?? '—';
  }

  getFieldValue(key: string): string {
    if (!this.profileData) return '—';

    const snakeKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();

    const raw = this.profileData[key] ?? this.profileData[snakeKey];

    if (raw === null || raw === undefined) return '—';

    if (typeof raw === 'number') {
      return raw.toLocaleString('en-IN');
    }

    return String(raw);
  }

  onSearchProfile(): void {
    if (!this.profileUserName.trim()) return;

    this.isProfileLoading = true;
    this.profileData = null;
    this.profileError = '';

    const loginId = this.profileUserName.trim();

    this.http.get<any>(`${apiConfig.baseUrl}/members/ewallet-status`, {
      params: { loginId },
    }).subscribe({
      next: (res) => {
        this.profileData = res;
        this.isProfileLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.profileError = err?.error?.message || 'Profile not found.';
        this.isProfileLoading = false;
        this.cdr.markForCheck();
      },
    });
  }
}
