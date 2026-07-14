import { Component, OnInit, inject, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { PaymentQrComponent } from '@shared';
import { SharedDatePickerComponent } from '@shared/ui/src';
import { MembersService, Kit, CompanyBankAccount } from '@shared/members/src';
import { MediaService } from '@shared/index';
import { MemberProfileService } from '../../../shared/services/member-profile.service';

interface KitProduct extends Kit {
  name: string;
  desc: string;
  badge: string;
  rating: number;
  reviews: number;
  icon: string;
  gradient: string;
}

@Component({
  selector: 'app-epin-request',
  imports: [CommonModule, FormsModule, PageBreadcrumbComponent, PaymentQrComponent, SharedDatePickerComponent],
  templateUrl: './epin-request.component.html',
})
export class EpinRequestComponent implements OnInit {
  kits: KitProduct[] = [];
  selectedKitId: number | null = null;
  selectedKit: KitProduct | null = null;
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
  companyName: string = 'Rudrakshama';
  referenceType: string = '';
  referenceId: string = '';
  referenceNo: string = '';
  paymentDate: Date | null = null;
  receiptFile: File | null = null;
  receiptPath: string = '';
  receiptMediaId: number | null = null;
  remark: string = '';
  showPayment = false;
  @ViewChild('epinForm') epinForm!: NgForm;
  @ViewChild('paymentSection') paymentSection!: ElementRef;
  loading = true;
  successMessage = '';
  errorMessage = '';

  private readonly membersService = inject(MembersService);
  private readonly mediaService = inject(MediaService);
  private readonly memberProfileService = inject(MemberProfileService);
  private readonly cdr = inject(ChangeDetectorRef);

  private readonly kitMeta: Record<string, Partial<KitProduct>> = {
    '5M': { name: '5 Mukhi Nepali Rudraksha Mala', desc: 'Original Panchmukhi Rudraksha mala from Nepal. Ideal for japa meditation and daily spiritual wear.', badge: 'Best Seller', rating: 5, reviews: 342, icon: 'fa-diamond', gradient: 'from-amber-50 to-orange-50' },
    '7M': { name: '7 Mukhi Rudraksha Mala (Gold Plated)', desc: 'Saatmukhi Rudraksha mala for wealth and prosperity. Gold-plated premium design.', badge: '', rating: 4, reviews: 201, icon: 'fa-diamond', gradient: 'from-yellow-50 to-amber-50' },
    '1M': { name: '1 Mukhi Rudraksha Pendant (Pure Silver)', desc: 'Rare Ek Mukhi Rudraksha in pure silver pendant. The ultimate symbol of Lord Shiva.', badge: 'Trending', rating: 5, reviews: 128, icon: 'fa-diamond', gradient: 'from-emerald-50 to-teal-50' },
    '2M': { name: '2 Mukhi Rudraksha Pendant (Silver)', desc: 'Dwimukhi Rudraksha in silver pendant for unity, harmony, and emotional balance.', badge: '', rating: 5, reviews: 64, icon: 'fa-diamond', gradient: 'from-blue-50 to-indigo-50' },
    '9M': { name: '9 Mukhi Rudraksha Mala (Durga)', desc: 'Navmukhi Rudraksha mala for courage and divine protection. Blessed by Goddess Durga.', badge: 'New', rating: 5, reviews: 47, icon: 'fa-diamond', gradient: 'from-red-50 to-pink-50' },
    '11M': { name: '11 Mukhi Rudraksha (Hanuman)', desc: 'Symbolizes Lord Hanuman. Grants courage, strength, and fearlessness.', badge: '', rating: 5, reviews: 35, icon: 'fa-diamond', gradient: 'from-orange-50 to-red-50' },
    '14M': { name: '14 Mukhi Rudraksha Bead (Hanuman)', desc: 'The divine bead for ultimate protection and courage. Rarest and most powerful variety.', badge: 'Premium', rating: 5, reviews: 22, icon: 'fa-diamond', gradient: 'from-purple-50 to-pink-50' },
  };

  private readonly defaultMeta: Partial<KitProduct> = {
    name: 'Rudraksha Kit',
    desc: 'Genuine Rudraksha kit with authentic beads for spiritual growth and protection.',
    badge: '',
    rating: 4,
    reviews: 100,
    icon: 'fa-diamond',
    gradient: 'from-brown-50 to-amber-50',
  };

  ngOnInit(): void {
    this.loadKits();
    this.loadBankAccounts();
  }

  get isEpinStepComplete(): boolean {
    return this.selectedKitId !== null && this.noOfEpin > 0;
  }

  selectKit(kit: KitProduct): void {
    this.selectedKitId = kit.id;
    this.selectedKit = kit;
    this.selectedPrice = kit.kitPrice;
    this.noOfEpin = 1;
    this.amount = this.noOfEpin * (this.selectedPrice || 0);
    this.cdr.markForCheck();
  }

  buyKit(kit: KitProduct): void {
    this.selectKit(kit);
    this.showPayment = true;
    setTimeout(() => {
      this.paymentSection?.nativeElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  changeQty(delta: number): void {
    const newQty = this.noOfEpin + delta;
    if (newQty >= 1 && newQty <= 99) {
      this.noOfEpin = newQty;
      this.amount = this.noOfEpin * (this.selectedPrice || 0);
    }
  }

  onPaymentModeChange(mode: string): void {
    this.selectedBankAccNo = null;
    this.accountNo = '';
    this.selectedBank = null;
    if (mode === 'Account') {
      this.paymentTypeId = 1;
      this.filteredBankAccounts = this.bankAccounts.filter(b => b.paymentTypeId === 1);
    } else if (mode === 'UPI') {
      this.paymentTypeId = 2;
      this.filteredBankAccounts = this.bankAccounts.filter(b => b.paymentTypeId === 2);
      if (this.filteredBankAccounts.length > 0) {
        const first = this.filteredBankAccounts[0];
        const upiVal = first.upiId || first.accountNo;
        this.selectedBankAccNo = upiVal;
        this.onBankChange(upiVal);
      }
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
                  this.successMessage = 'Order placed successfully! Your request is being processed.';
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
    this.selectedBankAccNo = accNo;
    const bank = this.bankAccounts.find(b =>
      (b.upiId && String(b.upiId) === String(accNo)) ||
      String(b.accountNo) === String(accNo)
    );
    this.selectedBank = bank ?? null;
    this.accountNo = bank ? String(bank.accountNo) : '';
    this.cdr.markForCheck();
  }

  getUpiDisplay(bank: CompanyBankAccount): string {
    return bank.upiId || bank.accountNo;
  }

  maskAccountNo(accNo: string): string {
    if (!accNo) return accNo;
    if (accNo.length <= 4) return '****';
    return '****' + accNo.slice(4);
  }

  getIfscCode(bank: CompanyBankAccount): string {
    return bank.ifscCode || bank.ifsccode || '';
  }

  getDiscount(kit: KitProduct): number {
    return 0;
  }

  getStars(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }

  private defaultsApplied = false;

  private loadBankAccounts(): void {
    this.membersService.getCompanyBankAccounts().subscribe({
      next: (res: any) => {
        const unwrapped = res?.data ?? res;
        this.bankAccounts = Array.isArray(unwrapped) ? unwrapped : [];
        this.applyDefaults();
        if (this.paymentTypeId !== null) {
          this.filteredBankAccounts = this.bankAccounts.filter(b => b.paymentTypeId === this.paymentTypeId);
          if (this.filteredBankAccounts.length > 0 && !this.selectedBankAccNo) {
            const first = this.filteredBankAccounts[0];
            const upiVal = first.upiId || first.accountNo;
            this.selectedBankAccNo = upiVal;
            this.onBankChange(upiVal);
          }
        }
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
    this.selectedKit = null;
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
    this.paymentDate = null;
    this.receiptFile = null;
    this.receiptPath = '';
    this.receiptMediaId = null;
    this.remark = '';
    this.showPayment = false;
    this.epinForm?.resetForm();
  }

  private loadKits(): void {
    this.membersService.getKits().subscribe({
      next: (res: any) => {
        const unwrapped = res?.data ?? res;
        const rawKits: Kit[] = unwrapped?.items ?? (Array.isArray(unwrapped) ? unwrapped : []);
        this.kits = rawKits.map((kit) => {
          const meta = this.findMetaForKit(kit);
          return { ...kit, ...meta } as KitProduct;
        });
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

  private findMetaForKit(kit: Kit): Partial<KitProduct> {
    const code = (kit.kitCode || '').toUpperCase().replace(/\s+/g, '');
    for (const [key, meta] of Object.entries(this.kitMeta)) {
      if (code.includes(key)) return meta;
    }
    return this.defaultMeta;
  }

  private applyDefaults(): void {
    if (this.defaultsApplied) return;
    if (this.kits.length === 0) return;

    this.defaultsApplied = true;

    const firstKit = this.kits[0];
    this.selectedKitId = firstKit.id;
    this.selectedKit = firstKit;
    this.selectedPrice = firstKit.kitPrice;
    this.noOfEpin = 1;
    this.amount = this.noOfEpin * (this.selectedPrice || 0);

    this.paymentDate = new Date();

    this.paymentMode = 'UPI';
    this.onPaymentModeChange('UPI');
  }
}
