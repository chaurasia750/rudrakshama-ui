import { Component, OnInit, inject, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentCardComponent } from '../../../shared/components/common/component-card/component-card.component';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { PaymentQrComponent } from '@shared';
import { MembersService, Kit, CompanyBankAccount } from '@shared/members/src';
import { MediaService } from '@shared/index';
import { MemberProfileService } from '../../../shared/services/member-profile.service';

@Component({
  selector: 'app-epin-request',
  imports: [CommonModule, FormsModule, ComponentCardComponent, PageBreadcrumbComponent, PaymentQrComponent],
  templateUrl: './epin-request.component.html',
})
export class EpinRequestComponent implements OnInit {
  kits: Kit[] = [];
  selectedKitId: number | null = null;
  selectedPrice: number | null = null;
  noOfEpin: number = 0;
  amount: number = 0;
  paymentMode: string = '';
  bankAccounts: CompanyBankAccount[] = [];
  filteredBankAccounts: CompanyBankAccount[] = [];
  selectedBankAccNo: string | null = null;
  accountNo: string = '';
  selectedBank: CompanyBankAccount | null = null;
  paymentTypeId: number | null = null;
  companyName: string = 'Company';
  referenceType: string = '';
  referenceId: string = '';
  referenceNo: string = '';
  paymentDate: string = '';
  receiptFile: File | null = null;
  receiptPath: string = '';
  receiptMediaId: number | null = null;
  remark: string = '';
  @ViewChild('epinForm') epinForm!: NgForm;
  loading = true;
  successMessage = '';
  errorMessage = '';

  private readonly membersService = inject(MembersService);
  private readonly mediaService = inject(MediaService);
  private readonly memberProfileService = inject(MemberProfileService);
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.loadKits();
    this.loadBankAccounts();
  }

  get isEpinStepComplete(): boolean {
    return this.selectedKitId !== null && this.noOfEpin > 0;
  }

  onKitChange(): void {
    const kit = this.kits.find(k => k.id === Number(this.selectedKitId));
    this.selectedPrice = kit ? kit.kitPrice : null;
    this.noOfEpin = 0;
    this.amount = 0;
  }

  calculateAmount(): void {
    this.amount = (this.noOfEpin || 0) * (this.selectedPrice || 0);
  }

  onPaymentModeChange(mode: string): void {
    console.log('onPaymentModeChange called with mode:', mode);
    this.selectedBankAccNo = null;
    this.accountNo = '';
    this.selectedBank = null;
    if (mode === 'Account') {
      this.paymentTypeId = 1;
      this.filteredBankAccounts = this.bankAccounts.filter(b => b.paymentTypeId === 1);
    } else if (mode === 'UPI') {
      this.paymentTypeId = 2;
      this.filteredBankAccounts = this.bankAccounts.filter(b => b.paymentTypeId === 2);
    } else {
      this.paymentTypeId = null;
      this.filteredBankAccounts = [];
    }
    this.cdr.markForCheck();
  }

  onSubmit(): void {
    const doSubmit = () => {
      this.memberProfileService.getProfile().subscribe({
        next: (profile) => {
          const memberId = profile.id;

          this.membersService.createEPinRequest({
            memberId,
            kitId: Number(this.selectedKitId),
            quantity: this.noOfEpin,
          }).subscribe({
            next: (epinRes: any) => {
              const epinRequestId = epinRes?.data ?? epinRes;

              this.membersService.createPaymentTransaction({
                referenceType: this.referenceType,
                referenceNo: this.referenceId,
                referenceId: this.referenceId,
                amount: this.amount,
                paymentMode: this.paymentMode,
                status: 'Pending',
                mediaId: this.receiptMediaId ?? undefined,
              }).subscribe({
                next: () => {
                  this.resetForm();
                  this.successMessage = 'Requested EPin successfully';
                },
                error: (err) => console.error('payment error:', err),
              });
            },
            error: (err) => console.error('epin request error:', err),
          });
        },
        error: (err) => console.error('profile error:', err),
      });
    };

    if (this.receiptFile && !this.receiptPath) {
      this.uploadReceipt(doSubmit);
    } else {
      doSubmit();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.receiptFile = input.files[0];
    }
  }

  private uploadReceipt(callback: () => void): void {
    if (!this.receiptFile) { callback(); return; }
    this.mediaService.tempUpload([this.receiptFile]).subscribe({
      next: (res) => {
        this.receiptPath = res.files?.[0]?.url ?? '';
        this.receiptMediaId = res.files?.[0]?.id ?? null;
        this.cdr.markForCheck();
        callback();
      },
      error: (err) => {
        console.error('File upload error:', err);
      },
    });
  }

  onBankChange(accNo: string): void {
    console.log('onBankChange called with accNo:', accNo);
    this.selectedBankAccNo = accNo;
    const bank = this.bankAccounts.find(b => b.accountNo === accNo);
    this.selectedBank = bank ?? null;
    this.accountNo = bank ? bank.accountNo : '';
  }

  maskAccountNo(accNo: string): string {
    if (!accNo) return accNo;
    if (accNo.length <= 4) return '****';
    return '****' + accNo.slice(4);
  }

  getIfscCode(bank: CompanyBankAccount): string {
    return bank.ifscCode || bank.ifsccode || '';
  }

  private defaultsApplied = false;

  private loadBankAccounts(): void {
    this.membersService.getCompanyBankAccounts().subscribe({
      next: (res: any) => {
        const unwrapped = res?.data ?? res;
        this.bankAccounts = Array.isArray(unwrapped) ? unwrapped : [];
        this.applyDefaults();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('loadBankAccounts error:', err);
        this.bankAccounts = [];
        this.cdr.markForCheck();
      },
    });
  }

  private resetForm(): void {
    this.selectedKitId = null;
    this.selectedPrice = null;
    this.noOfEpin = 0;
    this.amount = 0;
    this.paymentMode = '';
    this.bankAccounts = [];
    this.selectedBankAccNo = null;
    this.accountNo = '';
    this.selectedBank = null;
    this.referenceType = '';
    this.referenceId = '';
    this.referenceNo = '';
    this.paymentDate = '';
    this.receiptFile = null;
    this.receiptPath = '';
    this.receiptMediaId = null;
    this.remark = '';
    this.epinForm?.resetForm();
  }

  private loadKits(): void {
    this.membersService.getKits().subscribe({
      next: (res: any) => {
        const unwrapped = res?.data ?? res;
        this.kits = unwrapped?.items ?? (Array.isArray(unwrapped) ? unwrapped : []);
        this.loading = false;
        this.applyDefaults();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('getKits error:', err);
        this.errorMessage = `Failed to load kits: ${err.status ?? 'network error'}${err.url ? ' — ' + err.url : ''}`;
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  /**
   * Apply default values once both kits and bank accounts are loaded.
   * Runs only once to avoid overwriting user selections.
   */
  private applyDefaults(): void {
    if (this.defaultsApplied) return;
    if (this.kits.length === 0) return;

    this.defaultsApplied = true;

    // 1. Select first kit, set e-pin count to 1
    const firstKit = this.kits[0];
    this.selectedKitId = firstKit.id;
    this.selectedPrice = firstKit.kitPrice;
    this.noOfEpin = 1;
    this.amount = this.noOfEpin * (this.selectedPrice || 0);

    // 2. Payment date = today
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    this.paymentDate = `${yyyy}-${mm}-${dd}`;

    // 3. Payment mode = UPI (mode 2)
    this.paymentMode = 'UPI';
    this.onPaymentModeChange('UPI');
  }
}
