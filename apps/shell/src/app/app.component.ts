import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { SharedTranslationService } from '@shared/i18n';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  template: `
    @if (showNavbar) {
      <app-navbar></app-navbar>
    }
    <router-outlet></router-outlet>
    @if (showNavbar) {
      <app-footer></app-footer>
    }

    <!-- WhatsApp Floating Button -->
    <a
      href="https://wa.me/919454799616"
      target="_blank"
      rel="noopener noreferrer"
      class="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      <i class="fa fa-whatsapp text-2xl group-hover:scale-110 transition-transform"></i>
      <span class="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping"></span>
    </a>

    <!-- Back to Top Button -->
    @if (showBackToTop) {
      <button
        (click)="scrollToTop()"
        class="fixed bottom-6 left-6 z-50 bg-saffron-500 hover:bg-saffron-600 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg shadow-saffron-500/30 transition-all duration-300 hover:scale-110 animate-fade-in"
        aria-label="Back to top"
      >
        <i class="fa fa-chevron-up text-lg"></i>
      </button>
    }
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fade-in {
        animation: fadeIn 0.3s ease-out;
      }
    `
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  showNavbar = true;
  showBackToTop = false;
  private destroy$ = new Subject<void>();

  constructor(
    private title: Title,
    private i18n: SharedTranslationService,
    private router: Router,
  ) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    this.showBackToTop = window.scrollY > 400;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit() {
    this.i18n.setDocumentTitle(this.title);

    let route: ActivatedRoute | null = this.router.routerState.root;
    while (route?.firstChild) route = route.firstChild;
    this.showNavbar = route?.snapshot?.data?.['showNavbar'] === true;

    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      takeUntil(this.destroy$),
      map(() => {
        let r: ActivatedRoute | null = this.router.routerState.root;
        while (r?.firstChild) r = r.firstChild;
        return r?.snapshot?.data?.['showNavbar'];
      })
    ).subscribe(show => {
      this.showNavbar = show === true;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
