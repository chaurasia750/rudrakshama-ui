import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { UiBreadcrumbComponent, BreadcrumbItem, UiButtonComponent, UiPaginationComponent, UiSearchInputComponent, SharedSidePanelComponent, ConfirmDialogComponent } from '@shared/ui/src';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiBreadcrumbComponent,
    UiButtonComponent,
    UiPaginationComponent,
    UiSearchInputComponent,
    SharedSidePanelComponent,
    ConfirmDialogComponent,
  ],
  templateUrl: './country-list.component.html',
})
export class CountryListComponent implements OnInit {
  private readonly countryService = inject(CountryService);
  private readonly fb = inject(FormBuilder);

  readonly breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Master' },
    { label: 'Country' },
  ];

  readonly countries = signal<Country[]>([]);
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

  readonly countryForm = this.fb.group({
    name: ['', Validators.required],
    code: ['', Validators.required],
  });

  ngOnInit(): void {
    this.loadCountries();
    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => {
      this.pageIndex.set(1);
      this.loadCountries();
    });
  }

  private loadCountries(): void {
    this.loading.set(true);
    this.countryService.getList({
      keyword: this.keyword || undefined,
      pageIndex: this.pageIndex(),
      pageSize: this.pageSize(),
    }).subscribe({
      next: (res) => {
        this.countries.set(res.items);
        this.pageIndex.set(res.pageIndex);
        this.pageSize.set(res.pageSize);
        this.totalCount.set(res.totalCount);
        this.totalPages.set(res.totalPages);
        this.loading.set(false);
      },
      error: () => {
        this.countries.set([]);
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
    this.loadCountries();
  }

  onAdd(): void {
    this.isEdit.set(false);
    this.editId.set(null);
    this.countryForm.reset();
    this.panelOpen.set(true);
  }

  onEdit(country: Country): void {
    this.isEdit.set(true);
    this.editId.set(country.id);
    this.countryForm.patchValue({ name: country.name, code: country.code });
    this.panelOpen.set(true);
  }

  onClosePanel(): void {
    this.panelOpen.set(false);
    this.countryForm.reset();
  }

  onSave(): void {
    if (this.countryForm.invalid) {
      this.countryForm.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    const payload = this.countryForm.getRawValue() as { name: string; code: string };
    const id = this.editId();

    const request$ = id
      ? this.countryService.update(id, payload)
      : this.countryService.create(payload);

    request$.subscribe({
      next: () => {
        this.saving.set(false);
        this.onClosePanel();
        this.loadCountries();
      },
      error: () => {
        this.saving.set(false);
      },
    });
  }

  onDelete(id: number): void {
    this.deleteId.set(id);
    this.confirmOpen.set(true);
  }

  onConfirmDelete(): void {
    const id = this.deleteId();
    if (!id) return;
    this.deleting.set(true);
    this.countryService.delete(id).subscribe({
      next: () => {
        this.deleting.set(false);
        this.confirmOpen.set(false);
        this.deleteId.set(null);
        this.loadCountries();
      },
      error: () => {
        this.deleting.set(false);
      },
    });
  }

  onCancelDelete(): void {
    this.confirmOpen.set(false);
    this.deleteId.set(null);
  }
}
