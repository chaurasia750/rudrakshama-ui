import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { UiBreadcrumbComponent, BreadcrumbItem, UiButtonComponent, UiPaginationComponent, UiSearchInputComponent } from '@shared/ui/src';
import { CityService } from '../../services/city.service';
import { City } from '../../models/city.model';

@Component({
  selector: 'app-city-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UiBreadcrumbComponent,
    UiButtonComponent,
    UiPaginationComponent,
    UiSearchInputComponent,
  ],
  templateUrl: './city-list.component.html',
})
export class CityListComponent implements OnInit {
  private readonly cityService = inject(CityService);
  private readonly fb = inject(FormBuilder);

  readonly breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Master' },
    { label: 'City' },
  ];

  readonly cities = signal<City[]>([]);
  readonly loading = signal(false);
  readonly pageIndex = signal(1);
  readonly pageSize = signal(20);
  readonly totalCount = signal(0);
  readonly totalPages = signal(0);

  readonly panelOpen = signal(false);
  readonly editId = signal<number | null>(null);
  readonly saving = signal(false);

  keyword = '';
  private readonly searchSubject = new Subject<string>();

  readonly cityForm = this.fb.group({
    cityName: ['', Validators.required],
    pincode: ['', [Validators.minLength(6), Validators.maxLength(6)]],
    isActive: [true, Validators.required],
  });

  ngOnInit(): void {
    this.loadCities();
    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => {
      this.pageIndex.set(1);
      this.loadCities();
    });
  }

  private loadCities(): void {
    this.loading.set(true);
    this.cityService.getList({
      keyword: this.keyword || undefined,
      pageIndex: this.pageIndex(),
      pageSize: this.pageSize(),
    }).subscribe({
      next: (res) => {
        this.cities.set(res.items);
        this.pageIndex.set(res.pageIndex);
        this.pageSize.set(res.pageSize);
        this.totalCount.set(res.totalCount);
        this.totalPages.set(res.totalPages);
        this.loading.set(false);
      },
      error: () => {
        this.cities.set([]);
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
    this.loadCities();
  }

  onEdit(city: City): void {
    this.editId.set(city.id);
    this.cityForm.patchValue({ cityName: city.cityName, pincode: city.pincode, isActive: city.isActive });
    this.panelOpen.set(true);
  }

  onInputPincode(e: Event): void {
    const el = e.target as HTMLInputElement;
    el.value = el.value.replace(/\D/g, '').slice(0, 6);
    this.cityForm.get('pincode')?.setValue(el.value, { emitEvent: false });
  }

  onClosePanel(): void {
    this.panelOpen.set(false);
    this.cityForm.reset();
  }

  onSave(): void {
    if (this.cityForm.invalid) {
      this.cityForm.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    const raw = this.cityForm.getRawValue();
    const id = this.editId();
    if (!id) return;

    this.cityService.update(id, { cityName: raw.cityName!, pincode: raw.pincode ?? '', active: raw.isActive! }).subscribe({
      next: () => {
        this.saving.set(false);
        this.onClosePanel();
        this.loadCities();
      },
      error: () => this.saving.set(false),
    });
  }
}
