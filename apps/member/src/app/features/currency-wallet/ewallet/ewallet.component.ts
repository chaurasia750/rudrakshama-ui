import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyWalletService } from '../currency-wallet.service';
import { MemberProfileService } from '../../../shared/services/member-profile.service';

@Component({
  selector: 'member-ewallet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ewallet.component.html',
})
export class EwalletComponent implements OnInit {
  private readonly walletService = inject(CurrencyWalletService);
  private readonly profileService = inject(MemberProfileService);
  private readonly cdr = inject(ChangeDetectorRef);

  isLoading = false;
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

  ngOnInit(): void {
    this.loadOwnWallet();
  }

  private loadOwnWallet(): void {
    this.isLoading = true;
    this.profileError = '';

    this.profileService.getProfile().subscribe({
      next: (profile) => {
        const loginId = profile.loginId;
        if (!loginId) {
          this.profileError = 'Login ID not found in profile.';
          this.isLoading = false;
          this.cdr.markForCheck();
          return;
        }
        this.fetchWallet(loginId);
      },
      error: () => {
        this.profileError = 'Unable to load your profile.';
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  private fetchWallet(loginId: string): void {
    this.walletService.getEwalletStatus(loginId).subscribe({
      next: (res) => {
        this.profileData = res;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.profileError = err?.error?.message || 'Wallet data not found.';
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }
}
