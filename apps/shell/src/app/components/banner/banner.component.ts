import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="relative w-full overflow-hidden bg-[#0D0D0D]" style="height: 400px;">
      @for (slide of slides; track slide; let i = $index) {
        <img [src]="slide" alt="Banner {{ i + 1 }}"
             class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
             [ngClass]="i === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'">
      }

      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        @for (slide of slides; track slide; let i = $index) {
          <button (click)="goTo(i)"
                  class="w-2.5 h-2.5 rounded-full transition-all duration-300"
                  [ngClass]="i === currentIndex ? 'bg-[#FF6F00] w-6' : 'bg-white/50 hover:bg-white/80'">
          </button>
        }
      </div>

      <button (click)="prev()"
              class="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-200">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <button (click)="next()"
              class="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white transition-all duration-200">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </div>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class BannerComponent implements OnInit, OnDestroy {
  slides = [
    '/assets/Rudraksham.jpg',
    '/assets/Rudraksham1.jpg',
    '/assets/Rudraksham2.jpg',
    '/assets/Rudraksham3.jpg',
  ];

  currentIndex = 0;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  goTo(index: number) {
    this.currentIndex = index;
    this.cdr.markForCheck();
    this.resetAutoSlide();
  }

  prev() {
    this.currentIndex = this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
    this.cdr.markForCheck();
    this.resetAutoSlide();
  }

  next() {
    this.currentIndex = this.currentIndex === this.slides.length - 1 ? 0 : this.currentIndex + 1;
    this.cdr.markForCheck();
  }

  private startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.next();
    }, 4000);
  }

  private stopAutoSlide() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private resetAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }
}
