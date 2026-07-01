import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styles: [`
    :host { display: block; }
  `]
})
export class NavbarComponent {
  mobileOpen = false;

  navLinks = [
    { path: '/home', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
  ];
}
