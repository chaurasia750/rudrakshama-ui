import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FinancialManagerService, MemberProfile } from '../../../financial-manager/services/financial-manager.service';
import { CurrencyWalletService, Transaction } from '../../services/currency-wallet.service';

@Component({
  selector: 'admin-transaction-history-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './transaction-history-page.component.html',
})
export class TransactionHistoryPageComponent {
  private readonly financialService = inject(FinancialManagerService);
  private readonly walletService = inject(CurrencyWalletService);
  private readonly cdr = inject(ChangeDetectorRef);

  userName = '';
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

  onSearch(): void {
    if (!this.userName.trim()) return;

    this.isLoading = true;
    this.userData = null;
    this.transactions = [];
    this.errorMessage = '';
    this.currentPage = 1;

    this.financialService.searchByUsername(this.userName.trim()).subscribe({
      next: (res) => {
        this.userData = res;
        this.fetchTransactionHistory(this.userName.trim());
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'User not found.';
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  private fetchTransactionHistory(loginId: string): void {
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
