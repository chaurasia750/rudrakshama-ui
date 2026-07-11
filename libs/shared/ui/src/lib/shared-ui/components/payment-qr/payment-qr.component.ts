import {
  Component,
  input,
  effect,
  signal,
  ChangeDetectorRef,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as QRCode from 'qrcode';

/**
 * PaymentQrComponent
 *
 * Standalone component that generates a UPI QR code entirely on the
 * client side via the `qrcode` npm package — no backend / API needed.
 *
 * Usage:
 *   <ui-payment-qr
 *     [upiId]="'merchant@upi'"
 *     [merchantName]="'ABC Corp'"
 *     [amount]="1500"
 *     [transactionNote]="'INV-1001'"
 *     [compact]="true"
 *   />
 */
@Component({
  selector: 'ui-payment-qr',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Loading state -->
    @if (isLoading()) {
      <div [class]="compact() ? 'pqr-card pqr-card--sm' : 'pqr-card'">
        <div class="pqr-spinner">
          <div class="pqr-spinner__ring"></div>
        </div>
        <p class="pqr-spinner__text">Generating QR Code...</p>
      </div>
    }

    <!-- Error state -->
    @if (errorMessage()) {
      <div [class]="compact() ? 'pqr-card pqr-card--sm pqr-error' : 'pqr-card pqr-error'">
        <div class="pqr-error__icon">
          <i class="fa fa-exclamation-triangle"></i>
        </div>
        <p class="pqr-error__text">{{ errorMessage() }}</p>
        <button class="pqr-error__retry" (click)="generateQr()">
          <i class="fa fa-refresh mr-1"></i> Retry
        </button>
      </div>
    }

    <!-- QR Code display -->
    @if (!isLoading() && !errorMessage() && qrDataUrl()) {
      <div [class]="compact() ? 'pqr-card pqr-card--sm' : 'pqr-card'">
        <!-- Header -->
        <div [class]="compact() ? 'pqr-header pqr-header--sm' : 'pqr-header'">
          <div [class]="compact() ? 'pqr-header__icon pqr-header__icon--sm' : 'pqr-header__icon'">
            <i class="fa fa-qrcode"></i>
          </div>
          <span [class]="compact() ? 'pqr-header__text pqr-header__text--sm' : 'pqr-header__text'">
            UPI Payment
          </span>
        </div>

        <!-- QR Image -->
        <div [class]="compact() ? 'pqr-img-wrap pqr-img-wrap--sm' : 'pqr-img-wrap'">
          <img
            [src]="qrDataUrl()"
            alt="UPI QR Code for {{ merchantName() }}"
            [class]="compact() ? 'pqr-img pqr-img--sm' : 'pqr-img'"
          />
        </div>

        <!-- Merchant Info (hidden in compact) -->
        @if (!compact()) {
          <div class="pqr-info">
            <div class="pqr-info__row">
              <span class="pqr-info__label">Merchant</span>
              <span class="pqr-info__value pqr-info__value--name">{{ merchantName() }}</span>
            </div>
            <div class="pqr-info__divider"></div>
            <div class="pqr-info__row">
              <span class="pqr-info__label">UPI ID</span>
              <span class="pqr-info__value pqr-info__value--upi">{{ upiId() }}</span>
            </div>
            <div class="pqr-info__divider"></div>
            <div class="pqr-info__row">
              <span class="pqr-info__label">Amount</span>
              <span class="pqr-info__value pqr-info__value--amt">{{ formattedAmount() }}</span>
            </div>
          </div>
        }

        <!-- Compact: inline amount badge -->
        @if (compact()) {
          <div class="pqr-badge">{{ formattedAmount() }}</div>
        }

        <!-- Scan instruction -->
        <div [class]="compact() ? 'pqr-footer pqr-footer--sm' : 'pqr-footer'">
          <i class="fa fa-mobile pqr-footer__icon"></i>
          <span>Scan any UPI App to Pay</span>
        </div>
      </div>
    }
  `,
  styles: [`
    /* ═══════════════════════════════════════════
       Card
       ═══════════════════════════════════════════ */
    .pqr-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      max-width: 340px;
      margin: 0 auto;
      background: #fff;
      border-radius: 1rem;
      box-shadow: 0 1px 3px rgba(0,0,0,.08), 0 8px 24px rgba(0,0,0,.06);
      overflow: hidden;
      font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
    }
    .pqr-card--sm {
      max-width: 220px;
      border-radius: 0.75rem;
    }

    /* ═══════════════════════════════════════════
       Loading
       ═══════════════════════════════════════════ */
    .pqr-spinner {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2.5rem;
    }
    .pqr-spinner__ring {
      width: 36px;
      height: 36px;
      border: 3px solid #e5e7eb;
      border-top-color: #06b6d4;
      border-radius: 50%;
      animation: pqr-spin .8s linear infinite;
    }
    @keyframes pqr-spin { to { transform: rotate(360deg); } }
    .pqr-spinner__text {
      margin: 0 0 1.25rem;
      font-size: .8125rem;
      color: #6b7280;
    }

    /* ═══════════════════════════════════════════
       Error
       ═══════════════════════════════════════════ */
    .pqr-error { padding: 1.5rem 1.25rem; gap: .625rem; }
    .pqr-error__icon {
      display: flex; align-items: center; justify-content: center;
      width: 40px; height: 40px; border-radius: 50%;
      background: #fef2f2; color: #ef4444; font-size: 1.1rem;
    }
    .pqr-error__text { margin: 0; font-size: .8125rem; color: #6b7280; text-align: center; }
    .pqr-error__retry {
      display: inline-flex; align-items: center; gap: .25rem;
      margin-top: .5rem; padding: .4rem 1rem;
      font-size: .75rem; font-weight: 600; color: #fff;
      background: #06b6d4; border: none; border-radius: .5rem;
      cursor: pointer; transition: background .15s;
    }
    .pqr-error__retry:hover { background: #0891b2; }

    /* ═══════════════════════════════════════════
       Header
       ═══════════════════════════════════════════ */
    .pqr-header {
      display: flex; align-items: center; gap: .5rem;
      width: 100%; padding: .875rem 1.125rem;
      background: linear-gradient(135deg, #06b6d4, #0891b2);
    }
    .pqr-header--sm { padding: .625rem .875rem; gap: .375rem; }
    .pqr-header__icon {
      display: flex; align-items: center; justify-content: center;
      width: 28px; height: 28px; border-radius: .4rem;
      background: rgba(255,255,255,.2); color: #fff; font-size: .875rem;
    }
    .pqr-header__icon--sm { width: 22px; height: 22px; font-size: .7rem; }
    .pqr-header__text {
      font-size: .875rem; font-weight: 700; color: #fff; letter-spacing: .01em;
    }
    .pqr-header__text--sm { font-size: .75rem; }

    /* ═══════════════════════════════════════════
       QR Image
       ═══════════════════════════════════════════ */
    .pqr-img-wrap {
      display: flex; align-items: center; justify-content: center;
      padding: 1.25rem 1.125rem .75rem;
    }
    .pqr-img-wrap--sm { padding: .75rem .75rem .5rem; }
    .pqr-img {
      width: 250px; height: 250px;
      border-radius: .625rem; border: 1px solid #f3f4f6; object-fit: contain;
    }
    .pqr-img--sm { width: 150px; height: 150px; border-radius: .5rem; }

    /* ═══════════════════════════════════════════
       Info section (full mode only)
       ═══════════════════════════════════════════ */
    .pqr-info { width: 100%; padding: 0 1.125rem; }
    .pqr-info__row {
      display: flex; align-items: center; justify-content: space-between;
      padding: .5rem 0;
    }
    .pqr-info__divider { height: 1px; background: #f3f4f6; }
    .pqr-info__label { font-size: .75rem; color: #9ca3af; font-weight: 500; }
    .pqr-info__value {
      font-size: .8125rem; color: #111827; font-weight: 600;
      text-align: right; max-width: 60%;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    .pqr-info__value--name { color: #1f2937; }
    .pqr-info__value--upi { color: #0891b2; font-family: 'SF Mono','Fira Code',monospace; font-size: .75rem; }
    .pqr-info__value--amt { color: #059669; font-size: .9375rem; font-weight: 700; }

    /* ═══════════════════════════════════════════
       Amount badge (compact mode)
       ═══════════════════════════════════════════ */
    .pqr-badge {
      padding: .25rem .75rem; margin: .125rem 0 .25rem;
      font-size: .75rem; font-weight: 700; color: #059669;
      background: #ecfdf5; border-radius: 2rem;
    }

    /* ═══════════════════════════════════════════
       Footer
       ═══════════════════════════════════════════ */
    .pqr-footer {
      display: flex; align-items: center; justify-content: center; gap: .375rem;
      width: 100%; padding: .75rem 1rem; margin-top: .5rem;
      background: #f0fdfa; border-top: 1px solid #e0f2fe;
      font-size: .75rem; font-weight: 600; color: #0891b2; letter-spacing: .01em;
    }
    .pqr-footer--sm { padding: .5rem .75rem; font-size: .6875rem; margin-top: .25rem; }
    .pqr-footer__icon { font-size: 1rem; }
    .pqr-footer--sm .pqr-footer__icon { font-size: .8rem; }

    /* ═══════════════════════════════════════════
       Responsive
       ═══════════════════════════════════════════ */
    @media (max-width: 400px) {
      .pqr-card { max-width: 100%; border-radius: .75rem; }
      .pqr-card--sm { max-width: 180px; }
      .pqr-img { width: 200px; height: 200px; }
      .pqr-img--sm { width: 130px; height: 130px; }
    }
  `],
})
export class PaymentQrComponent implements OnInit {
  /** UPI virtual payment address (e.g. "merchant@bank") */
  readonly upiId = input.required<string>();

  /** Display name of the merchant / payee */
  readonly merchantName = input.required<string>();

  /** Payment amount in INR */
  readonly amount = input.required<number>();

  /** Optional transaction note (e.g. invoice number) */
  readonly transactionNote = input('');

  /** When true, renders a smaller card with 150px QR and no info rows */
  readonly compact = input(false);

  /** Generated QR code data URL (base-64 PNG) */
  readonly qrDataUrl = signal<string>('');

  /** Loading indicator while QR is being generated */
  readonly isLoading = signal<boolean>(false);

  /** Error message if QR generation fails */
  readonly errorMessage = signal<string>('');

  private readonly cdr = inject(ChangeDetectorRef);

  constructor() {
    // Re-generate the QR code whenever any input changes.
    effect(() => {
      const upi = this.upiId();
      const name = this.merchantName();
      const amt = this.amount();
      const note = this.transactionNote();

      if (upi && name && amt > 0) {
        this.generateQr();
      }
    });
  }

  ngOnInit(): void {
    if (this.upiId() && this.merchantName() && this.amount() > 0) {
      this.generateQr();
    }
  }

  /** Format the amount to two decimal places with ₹ symbol. */
  readonly formattedAmount = (): string => {
    const value = this.amount() ?? 0;
    return `\u20B9${value.toFixed(2)}`;
  };

  /**
   * Build the UPI URI and generate a QR code data URL using the
   * `qrcode` library. Runs entirely in the browser — no network calls.
   */
  async generateQr(): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.qrDataUrl.set('');
    this.cdr.markForCheck();

    try {
      const uri = this.buildUpiUri();
      const qrSize = this.compact() ? 150 : 250;
      const dataUrl = await QRCode.toDataURL(uri, {
        width: qrSize,
        margin: 1,
        color: { dark: '#111827', light: '#ffffff' },
        errorCorrectionLevel: 'M',
      });

      this.qrDataUrl.set(dataUrl);
    } catch (err) {
      console.error('QR generation failed:', err);
      this.errorMessage.set('Failed to generate QR code. Please try again.');
    } finally {
      this.isLoading.set(false);
      this.cdr.markForCheck();
    }
  }

  /**
   * Construct a UPI payment URI per the NPCI specification.
   *
   * Format: upi://pay?pa={upiId}&pn={merchantName}&am={amount}&cu=INR&tn={note}
   * All string parameters are encoded with encodeURIComponent().
   * Amount is formatted to two decimal places.
   */
  private buildUpiUri(): string {
    const pa = encodeURIComponent(this.upiId());
    const pn = encodeURIComponent(this.merchantName());
    const am = (this.amount() ?? 0).toFixed(2);
    const tn = encodeURIComponent(this.transactionNote() || '');

    let uri = `upi://pay?pa=${pa}&pn=${pn}&am=${am}&cu=INR`;
    if (tn) {
      uri += `&tn=${tn}`;
    }
    return uri;
  }
}
