import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FinancialManagerService, MemberProfile } from '../../services/financial-manager.service';

@Component({
  selector: 'admin-deposit-in-account-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './deposit-in-account-page.component.html',
})
export class DepositInAccountPageComponent {
  private readonly financialService = inject(FinancialManagerService);
  private readonly cdr = inject(ChangeDetectorRef);

  userName = '';
  isLoading = false;
  userData: MemberProfile | null = null;
  errorMessage = '';
  currentBalance = '';
  amount: number | null = null;
  remark = '';

  get fullName(): string {
    if (!this.userData) return '—';
    const parts = [this.userData.title, this.userData.firstName, this.userData.lastName].filter(Boolean);
    return parts.join(' ') || '—';
  }

  val(v: string | null | undefined): string {
    return v ?? '—';
  }

  onDeposit(): void {
    if (!this.userData?.loginId || !this.amount) return;

    this.isLoading = true;
    this.cdr.markForCheck();

    const payload = {
      loginId: this.userData.loginId,
      amount: this.amount,
      remark: this.remark,
    };

    this.financialService.deposit(payload).subscribe({
      next: () => {
        this.fetchCurrentBalance(this.userData!.loginId!);
        this.amount = null;
        this.remark = '';
        this.errorMessage = '';
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Deposit failed. Please try again.';
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  onCancel(): void {
    this.amount = null;
    this.remark = '';
  }

  onSearch(): void {
    if (!this.userName.trim()) return;

    this.isLoading = true;
    this.userData = null;
    this.errorMessage = '';
    this.currentBalance = '';
    this.amount = null;
    this.remark = '';

    this.financialService.searchByUsername(this.userName.trim()).subscribe({
      next: (res) => {
        this.userData = res;
        this.fetchCurrentBalance(this.userName.trim());
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'User not found.';
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  private fetchCurrentBalance(loginId: string): void {
    this.financialService.getCurrentBalance(loginId).subscribe({
      next: (res) => {
        this.currentBalance = res?.currentBalance?.toString() ?? '0';
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.currentBalance = '0';
        this.isLoading = false;
        this.cdr.markForCheck();
      },
    });
  }
}
