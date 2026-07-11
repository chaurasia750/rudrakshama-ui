import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styles: [`
    :host { display: block; }
    .font-heading { font-family: 'Red Hat Display', serif; }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-slide-down {
      animation: slideDown 0.2s ease-out;
    }
  `]
})
export class NavbarComponent {
  mobileOpen = false;
  searchOpen = false;
  searchQuery = '';

  popularSearches = ['Rudraksha', '1 Mukhi', 'Nepali Rudraksha', 'Bracelet', 'Mala', 'Pendant'];

  navLinks = [
    { path: '/home', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' },
  ];

  toggleSearch() {
    this.searchOpen = !this.searchOpen;
    if (this.searchOpen) {
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 100);
    }
  }

  closeSearch() {
    this.searchOpen = false;
    this.searchQuery = '';
  }

  search(query: string) {
    if (query.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(query.trim())}`;
    }
  }
}
