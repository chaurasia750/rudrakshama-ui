import { Component, OnInit, inject, ChangeDetectorRef } from "@angular/core";
import { PageBreadcrumbComponent } from "../../../shared/components/common/page-breadcrumb/page-breadcrumb.component";
import { ButtonComponent } from "../../../shared/components/ui/button/button.component";
import { CommonModule } from "@angular/common";
import { MembersService } from "@shared/members/src";

interface EPinRequestListItem {
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
  selector: "app-epin-request-list",
  imports: [CommonModule, PageBreadcrumbComponent, ButtonComponent],
  templateUrl: "./epin-request-list.component.html",
})
export class EpinRequestListComponent implements OnInit {
  requests: EPinRequestListItem[] = [];
  loading = true;
  currentPage = 1;
  itemsPerPage = 5;

  private readonly membersService = inject(MembersService);
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
            siNo: index + 1,
            packageName: item.kitCode ?? "",
            price: item.kitPrice ?? 0,
            quantity: item.quantity ?? 0,
            modeOfPayment: item.paymentMode ?? "",
            amount: item.amount ?? 0,
            status: item.status ?? "",
            requestedOn: item.requestedOn ? item.requestedOn.split('T')[0] : "",
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

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
