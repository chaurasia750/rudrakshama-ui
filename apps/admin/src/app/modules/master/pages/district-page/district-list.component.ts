import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { UiBreadcrumbComponent, BreadcrumbItem, UiButtonComponent, UiPaginationComponent, UiSearchInputComponent, ConfirmDialogComponent } from '@shared/ui/src';
import { DistrictService } from '../../services/district.service';
import { District, DistrictPayload, DistrictListResponse } from '../../models/district.model';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country.model';
import { StateService } from '../../services/state.service';
import { State, StateListResponse } from '../../models/state.model';

@Component({
  selector: 'app-district-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiBreadcrumbComponent,
    UiButtonComponent,
    UiPaginationComponent,
    UiSearchInputComponent,
    ConfirmDialogComponent,
  ],
  templateUrl: './district-list.component.html',
})
export class DistrictListComponent implements OnInit {
  private readonly districtService = inject(DistrictService);
  private readonly countryService = inject(CountryService);
  private readonly stateService = inject(StateService);
  private readonly fb = inject(FormBuilder);

  readonly breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Master' },
    { label: 'District' },
  ];

  readonly districts = signal<District[]>([]);
  readonly countries = signal<Country[]>([]);
  readonly states = signal<State[]>([]);
  readonly loading = signal(false);
  readonly pageIndex = signal(1);
  readonly pageSize = signal(20);
  readonly totalCount = signal(0);
  readonly totalPages = signal(0);

  readonly panelOpen = signal(false);
  readonly isEdit = signal(false);
  readonly editId = signal<number | null>(null);
  readonly saving = signal(false);

  readonly confirmOpen = signal(false);
  readonly deleteId = signal<number | null>(null);
  readonly deleting = signal(false);

  keyword = '';
  private readonly searchSubject = new Subject<string>();

  readonly districtForm = this.fb.group({
    name: ['', Validators.required],
    cid: [0, Validators.required],
    sid: [0, Validators.required],
    isActive: [true, Validators.required],
  });

  ngOnInit(): void {
    this.loadDistricts();
    this.loadCountries();
    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => {
      this.pageIndex.set(1);
      this.loadDistricts();
    });
  }

  private loadCountries(): void {
    this.countryService.getList().subscribe({
      next: (res: any) => this.countries.set(res.items),
    });
  }

  onCountryChange(cid: number): void {
    this.districtForm.patchValue({ sid: 0 });
    if (cid) {
      this.stateService.getListByCountry(cid).subscribe({
        next: (res: StateListResponse) => this.states.set(res.items),
      });
    } else {
      this.states.set([]);
    }
  }

  private loadDistricts(): void {
    this.loading.set(true);
    this.districtService.getList({
      keyword: this.keyword || undefined,
      pageIndex: this.pageIndex(),
      pageSize: this.pageSize(),
    }).subscribe({
      next: (res) => {
        this.districts.set(res.items);
        this.pageIndex.set(res.pageIndex);
        this.pageSize.set(res.pageSize);
        this.totalCount.set(res.totalCount);
        this.totalPages.set(res.totalPages);
        this.loading.set(false);
      },
      error: () => {
        this.districts.set([]);
        this.loading.set(false);
      },
    });
  }

  onSearch(value: string): void {
    this.keyword = value;
    this.searchSubject.next(value);
  }

  onPageChange(page: number): void {
    this.pageIndex.set(page);
    this.loadDistricts();
  }

  onAdd(): void {
    this.isEdit.set(false);
    this.editId.set(null);
    this.districtForm.reset({ cid: 0, sid: 0, isActive: true });
    this.states.set([]);
    this.panelOpen.set(true);
  }

  onEdit(district: District): void {
    this.isEdit.set(true);
    this.editId.set(district.id);
    this.loadStatesForCountry(district.cid);
    this.districtForm.patchValue({ name: district.name, cid: district.cid, sid: district.sid, isActive: district.isActive });
    this.panelOpen.set(true);
  }

  private loadStatesForCountry(cid: number): void {
    if (cid) {
      this.stateService.getListByCountry(cid).subscribe({
        next: (res: StateListResponse) => this.states.set(res.items),
      });
    }
  }

  onClosePanel(): void {
    this.panelOpen.set(false);
    this.districtForm.reset();
  }

  onSave(): void {
    if (this.districtForm.invalid) {
      this.districtForm.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    const raw = this.districtForm.getRawValue();
    const id = this.editId();

    if (id) {
      this.districtService.updateStatus(id, { active: raw.isActive! }).subscribe({
        next: () => {
          this.saving.set(false);
          this.onClosePanel();
          this.loadDistricts();
        },
        error: () => this.saving.set(false),
      });
    } else {
      this.districtService.create({ name: raw.name!, cid: raw.cid!, sid: raw.sid!, isActive: raw.isActive! }).subscribe({
        next: () => {
          this.saving.set(false);
          this.onClosePanel();
          this.loadDistricts();
        },
        error: () => this.saving.set(false),
      });
    }
  }

  onDelete(id: number): void {
    this.deleteId.set(id);
    this.confirmOpen.set(true);
  }

  onConfirmDelete(): void {
    const id = this.deleteId();
    if (!id) return;
    this.deleting.set(true);
    this.districtService.delete(id).subscribe({
      next: () => {
        this.deleting.set(false);
        this.confirmOpen.set(false);
        this.deleteId.set(null);
        this.loadDistricts();
      },
      error: () => this.deleting.set(false),
    });
  }

  onCancelDelete(): void {
    this.confirmOpen.set(false);
    this.deleteId.set(null);
  }
}
