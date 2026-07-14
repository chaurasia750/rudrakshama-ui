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
  accountNo: string;
  amount: number;
  status: string;
  requestedOn: string;
}

@Component({
  selector: "shared-epin-request-list",
  standalone: true,
  imports: [CommonModule, UiBreadcrumbComponent, UiPaginationComponent, SharedSidePanelComponent],
  templateUrl: "./epin-request-list.component.html",
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
        const items = Array.isArray(data) ? data : data?.items ?? [];
        this.requests = items.map(
          (item: any, index: number) => ({
            id: item.id,
            siNo: index + 1,
            packageName: item.kitCode ?? "",
            price: item.kitPrice ?? 0,
            quantity: item.quantity ?? 0,
            modeOfPayment: item.paymentMode ?? "",
            accountNo: item.accountNo ?? item.accountNumber ?? item.bankAccountNo ?? item.paymentAccountNo ?? item.referenceNo ?? "",
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

  private readonly hiddenFields = ['referenceType', 'mediaId', 'mediaOId', 'status', 'epinStatus', 'ePinStatus'];

  private flattenObject(obj: any, prefix = ''): { key: string; label: string; value: string }[] {
    const result: { key: string; label: string; value: string }[] = [];
    if (!obj || typeof obj !== 'object') {
      return result;
    }
    for (const key of Object.keys(obj)) {
      if (this.hiddenFields.includes(key) || this.hiddenFields.some(h => key.endsWith(`.${h}`))) continue;
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
