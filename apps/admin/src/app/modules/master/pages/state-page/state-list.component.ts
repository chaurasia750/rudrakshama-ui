import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { UiBreadcrumbComponent, BreadcrumbItem, UiButtonComponent, UiPaginationComponent, UiSearchInputComponent, ConfirmDialogComponent } from '@shared/ui/src';
import { StateService } from '../../services/state.service';
import { State, StatePayload } from '../../models/state.model';
import { CountryService } from '../../services/country.service';
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-state-list',
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
  templateUrl: './state-list.component.html',
})
export class StateListComponent implements OnInit {
  private readonly stateService = inject(StateService);
  private readonly countryService = inject(CountryService);
  private readonly fb = inject(FormBuilder);

  readonly breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Master' },
    { label: 'State' },
  ];

  readonly states = signal<State[]>([]);
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

  readonly stateForm = this.fb.group({
    name: ['', Validators.required],
    cid: [0, Validators.required],
    isActive: [true, Validators.required],
  });

  ngOnInit(): void {
    this.loadStates();
    this.loadCountries();
    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe(() => {
      this.pageIndex.set(1);
      this.loadStates();
    });
  }

  private loadCountries(): void {
    this.countryService.getList().subscribe({
      next: (res) => this.countries.set(res.items),
    });
  }

  private loadStates(): void {
    this.loading.set(true);
    this.stateService.getList({
      keyword: this.keyword || undefined,
      pageIndex: this.pageIndex(),
      pageSize: this.pageSize(),
    }).subscribe({
      next: (res) => {
        this.states.set(res.items);
        this.pageIndex.set(res.pageIndex);
        this.pageSize.set(res.pageSize);
        this.totalCount.set(res.totalCount);
        this.totalPages.set(res.totalPages);
        this.loading.set(false);
      },
      error: () => {
        this.states.set([]);
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
    this.loadStates();
  }

  onAdd(): void {
    this.isEdit.set(false);
    this.editId.set(null);
    this.stateForm.reset({ cid: 0, isActive: true });
    this.panelOpen.set(true);
  }

  onEdit(state: State): void {
    this.isEdit.set(true);
    this.editId.set(state.id);
    this.stateForm.patchValue({ name: state.name, cid: state.cid, isActive: state.isActive });
    this.panelOpen.set(true);
  }

  onClosePanel(): void {
    this.panelOpen.set(false);
    this.stateForm.reset();
  }

  onSave(): void {
    if (this.stateForm.invalid) {
      this.stateForm.markAllAsTouched();
      return;
    }
    this.saving.set(true);
    const raw = this.stateForm.getRawValue();
    const id = this.editId();

    if (id) {
      this.stateService.updateStatus(id, { sActive: raw.isActive! }).subscribe({
        next: () => {
          this.saving.set(false);
          this.onClosePanel();
          this.loadStates();
        },
        error: () => this.saving.set(false),
      });
    } else {
      this.stateService.create({ name: raw.name!, cid: raw.cid!, isActive: raw.isActive! }).subscribe({
        next: () => {
          this.saving.set(false);
          this.onClosePanel();
          this.loadStates();
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
    this.stateService.delete(id).subscribe({
      next: () => {
        this.deleting.set(false);
        this.confirmOpen.set(false);
        this.deleteId.set(null);
        this.loadStates();
      },
      error: () => this.deleting.set(false),
    });
  }

  onCancelDelete(): void {
    this.confirmOpen.set(false);
    this.deleteId.set(null);
  }
}
