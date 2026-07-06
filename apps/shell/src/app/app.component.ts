import { Component, OnInit, OnDestroy } from '@angular/core';
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
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
    `
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  showNavbar = true;
  private destroy$ = new Subject<void>();

  constructor(
    private title: Title,
    private i18n: SharedTranslationService,
    private router: Router,
  ) {}

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
