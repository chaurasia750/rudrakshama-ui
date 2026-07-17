import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyWalletService, Transaction } from '../currency-wallet.service';
import { MemberProfileService, MemberProfile } from '../../../shared/services/member-profile.service';

@Component({
  selector: 'member-transaction-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-history.component.html',
})
export class TransactionHistoryComponent implements OnInit {
  private readonly walletService = inject(CurrencyWalletService);
  private readonly profileService = inject(MemberProfileService);
  private readonly cdr = inject(ChangeDetectorRef);

  isLoading = false;
  userData: MemberProfile | null = null;
  transactions: Transaction[] = [];
  errorMessage = '';
  currentPage = 1;
  itemsPerPage = 10;

  get fullName(): string {
    if (!this.userData) return '—';
    const parts = [this.userData.title, this.userData.firstName, this.userData.lastName].filter(Boolean);
    return parts.join(' ') || '—';
  }

  get totalPages(): number {
    return Math.ceil(this.transactions.length / this.itemsPerPage);
  }

  get paginatedTransactions(): Transaction[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.transactions.slice(start, start + this.itemsPerPage);
  }

  val(v: string | null | undefined): string {
    return v ?? '—';
  }

  ngOnInit(): void {
    this.loadOwnData();
  }

  private loadOwnData(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.profileService.getProfile().subscribe({
      next: (profile) => {
        this.userData = profile;
        const loginId = profile.loginId;
        if (!loginId) {
          this.errorMessage = 'Login ID not found in profile.';
          this.isLoading = false;
          this.cdr.markForCheck();
          return;
        }
        this.fetchTransactions(loginId);
      },
      error: () => {
        this.errorMessage = 'Unable to load your profile.';
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  private fetchTransactions(loginId: string): void {
    this.walletService.getTransactionHistory(loginId).subscribe({
      next: (res) => {
        this.transactions = res ?? [];
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.transactions = [];
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.cdr.markForCheck();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.cdr.markForCheck();
    }
  }
}
