import { Component, OnInit, inject, ChangeDetectorRef, input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UiBreadcrumbComponent, UiPaginationComponent, SharedSidePanelComponent } from "@shared/ui/src";
import { MembersService } from "../../services/members.service";
import { MediaService } from "@shared/media/services/media.service";

interface EPinRequestListItem {
  id?: number;
  siNo: number;
  packageName: string;
  price: number;
  quantity: number;
  modeOfPayment: string;
  amount: number;
  status: string;
  requestedOn: string;
}

@Component({
  selector: "shared-epin-request-list",
  standalone: true,
  imports: [CommonModule, UiBreadcrumbComponent, UiPaginationComponent, SharedSidePanelComponent],
  template: `
    <ui-breadcrumb pageTitle="Requested E-Pin List" />

    <div class="rounded-2xl border border-gray-200 bg-white pt-4 dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div class="flex flex-col gap-2 px-5 mb-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white/90">
            Requested E-Pin List
          </h3>
        </div>
      </div>

      @if (loading) {
        <div class="px-6 py-4 text-gray-500">Loading...</div>
      } @else {
        <div class="overflow-hidden">
          <div class="max-w-full px-5 overflow-x-auto sm:px-6">
            <table class="min-w-full">
              <thead class="border-gray-100 border-y dark:border-white/[0.05]">
                <tr>
                  <th class="px-4 py-3 font-normal text-gray-500 text-start text-theme-sm dark:text-gray-400">S.N.</th>
                  <th class="px-4 py-3 font-normal text-gray-500 text-start text-theme-sm dark:text-gray-400">Package</th>
                  <th class="px-4 py-3 font-normal text-gray-500 text-start text-theme-sm dark:text-gray-400">Price</th>
                  <th class="px-4 py-3 font-normal text-gray-500 text-start text-theme-sm dark:text-gray-400">No. of Epin</th>
                  <th class="px-4 py-3 font-normal text-gray-500 text-start text-theme-sm dark:text-gray-400">Mode of Payment</th>
                  <th class="px-4 py-3 font-normal text-gray-500 text-start text-theme-sm dark:text-gray-400">Amount</th>
                  <th class="px-4 py-3 font-normal text-gray-500 text-start text-theme-sm dark:text-gray-400">Status</th>
                  <th class="px-4 py-3 font-normal text-gray-500 text-start text-theme-sm dark:text-gray-400">Requested On</th>
                  @if (showActions()) {
                  <th class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 w-28">Actions</th>
                  }
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 dark:divide-white/[0.05]">
                @for (item of currentItems; track $index; let i = $index) {
                <tr class="transition-colors hover:bg-[#FFD000]/10" [ngClass]="i % 2 === 0 ? 'bg-white' : 'bg-[#FFD000]/5'">
                  <td class="px-4 py-4 text-gray-700 whitespace-nowrap text-theme-sm dark:text-gray-400">{{ item.siNo }}</td>
                  <td class="px-4 py-4 text-gray-700 text-theme-sm dark:text-gray-400">{{ item.packageName }}</td>
                  <td class="px-4 py-4 text-gray-700 text-theme-sm dark:text-gray-400">{{ item.price | currency:'INR' }}</td>
                  <td class="px-4 py-4 text-gray-700 text-theme-sm dark:text-gray-400">{{ item.quantity }}</td>
                  <td class="px-4 py-4 text-gray-700 text-theme-sm dark:text-gray-400">{{ item.modeOfPayment }}</td>
                  <td class="px-4 py-4 text-gray-700 text-theme-sm dark:text-gray-400">{{ item.amount | currency:'INR' }}</td>
                  <td class="px-4 py-4 text-gray-700 text-theme-sm dark:text-gray-400">{{ item.status }}</td>
                  <td class="px-4 py-4 text-gray-700 text-theme-sm dark:text-gray-400">{{ item.requestedOn }}</td>
                  @if (showActions()) {
                  <td class="px-4 py-4 text-right">
                    <div class="inline-flex items-center gap-1">
                      <button (click)="viewRequest(item)" class="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700" title="View">
                        <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                  }
                </tr>
                } @empty {
                <tr>
                  <td [attr.colspan]="showActions() ? 9 : 8" class="px-4 py-8 text-center text-gray-500">No records found</td>
                </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <ui-pagination
          [pageIndex]="currentPage"
          [pageSize]="itemsPerPage"
          [totalCount]="requests.length"
          [totalPages]="totalPages"
          (pageChange)="onPageChange($event)"
        />
      }
    </div>

    @if (showDetail) {
      <shared-side-panel [isOpen]="showDetail" title="E-Pin Payment Details" (closed)="closeDetail()">
        @if (detailLoading) {
          <div class="px-4 py-4 text-gray-500">Loading details...</div>
        } @else if (detailError) {
          <div class="px-4 py-4 text-red-500">{{ detailError }}</div>
        } @else if (detailData.length) {
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            @for (field of detailData; track field.key) {
              <div class="flex flex-col rounded-lg bg-gray-50 dark:bg-white/5 px-3 py-2.5">
                <span class="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-0.5">{{ field.label }}</span>
                <span class="text-sm font-medium text-gray-800 dark:text-white/90 break-words">{{ field.value }}</span>
              </div>
            }
          </div>
          @if (detailMediaUrl) {
            <div class="mt-6 pt-4 border-t border-gray-100">
              <span class="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2 block">Receipt</span>
              <img [src]="detailMediaUrl" alt="Receipt" class="w-full rounded-lg border border-gray-200 object-contain max-h-64" />
            </div>
          }
          <div class="mt-6 pt-4 border-t border-gray-100">
            <button (click)="approveRequest()" [disabled]="approving"
              class="w-full inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              @if (approving) {
                <div class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2"></div>
              }
              <i class="fa fa-check mr-2"></i>Approved
            </button>
          </div>
        } @else {
          <div class="px-4 py-4 text-gray-500">No data available</div>
        }
      </shared-side-panel>
    }
  `,
})
export class EpinRequestListComponent implements OnInit {
  readonly showActions = input(false);

  requests: EPinRequestListItem[] = [];
  loading = true;
  currentPage = 1;
  itemsPerPage = 5;

  showDetail = false;
  detailLoading = false;
  detailError = '';
  detailData: { key: string; label: string; value: string }[] = [];
  approving = false;
  detailEpinId: number | null = null;
  detailMediaUrl = '';

  private readonly membersService = inject(MembersService);
  private readonly mediaService = inject(MediaService);
  private readonly cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.loadRequests();
  }

  private loadRequests(): void {
    this.membersService.getEPinRequestList().subscribe({
      next: (res: any) => {
        const data = res?.data ?? res;
        this.requests = (Array.isArray(data) ? data : []).map(
          (item: any, index: number) => ({
            id: item.id,
            siNo: index + 1,
            packageName: item.kitCode ?? "",
            price: item.kitPrice ?? 0,
            quantity: item.quantity ?? 0,
            modeOfPayment: item.paymentMode ?? "",
            amount: item.amount ?? 0,
            status: item.status ?? "",
            requestedOn: item.requestedOn ? item.requestedOn.split("T")[0] : "",
          })
        );
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.loading = false;
        this.cdr.markForCheck();
      },
    });
  }

  get currentItems(): EPinRequestListItem[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.requests.slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.requests.length / this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  viewRequest(item: EPinRequestListItem): void {
    if (!item.id) {
      return;
    }
    this.showDetail = true;
    this.detailLoading = true;
    this.detailError = '';
    this.detailData = [];
    this.detailEpinId = null;
    this.detailMediaUrl = '';
    this.cdr.markForCheck();

    this.membersService.getEPinPayment(item.id).subscribe({
      next: (res: any) => {
        const raw = res?.data ?? res;
        this.detailEpinId = raw?.ePinRequest?.id ?? raw?.id ?? item.id;
        this.detailData = this.flattenObject(raw);
        const mediaId = raw?.paymentTransaction?.mediaId
          ?? raw?.mediaId
          ?? raw?.paymentTransaction?.receiptMediaId
          ?? raw?.receiptMediaId
          ?? this.findMediaId(this.detailData);
        console.log('[EpinRequestList] raw:', raw);
        console.log('[EpinRequestList] mediaId:', mediaId);
        this.detailMediaUrl = mediaId ? this.mediaService.getFileUrl(mediaId) : '';
        console.log('[EpinRequestList] detailMediaUrl:', this.detailMediaUrl);
        this.detailLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.detailError = err?.error?.message || 'Failed to load payment details';
        this.detailLoading = false;
        this.cdr.markForCheck();
      },
    });
  }

  closeDetail(): void {
    this.showDetail = false;
    this.detailData = [];
    this.detailError = '';
    this.detailEpinId = null;
    this.detailMediaUrl = '';
  }

  approveRequest(): void {
    if (!this.detailEpinId) {
      return;
    }
    this.approving = true;
    this.cdr.markForCheck();

    this.membersService.approveEPinRequest(this.detailEpinId).subscribe({
      next: () => {
        this.approving = false;
        this.showDetail = false;
        this.detailData = [];
        this.detailEpinId = null;
        this.loadRequests();
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.approving = false;
        this.detailError = err?.error?.message || 'Failed to approve';
        this.cdr.markForCheck();
      },
    });
  }

  private flattenObject(obj: any, prefix = ''): { key: string; label: string; value: string }[] {
    const result: { key: string; label: string; value: string }[] = [];
    if (!obj || typeof obj !== 'object') {
      return result;
    }
    for (const key of Object.keys(obj)) {
      const val = obj[key];
      const label = this.toLabel(key);
      if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
        result.push(...this.flattenObject(val, prefix ? `${prefix}.${key}` : key));
      } else if (Array.isArray(val)) {
        result.push({ key: `${prefix}.${key}`, label, value: JSON.stringify(val) });
      } else {
        const displayKey = prefix ? `${prefix}.${key}` : key;
        result.push({ key: displayKey, label, value: val === null || val === undefined ? '-' : String(val) });
      }
    }
    return result;
  }

  private toLabel(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/[\._-]/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .trim();
  }

  private findMediaId(fields: { key: string; value: string }[]): number | null {
    for (const f of fields) {
      if (/media/i.test(f.key) && f.value !== '-' && !isNaN(Number(f.value))) {
        return Number(f.value);
      }
    }
    return null;
  }
}
