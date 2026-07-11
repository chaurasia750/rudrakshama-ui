import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  template: `
    <footer class="bg-brown-800 text-white">
      <div class="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          <!-- Brand & Social -->
          <div>
            <a routerLink="/home" class="flex items-center gap-2 mb-4">
              <img src="/assets/logo.jpeg" alt="Rudrakshama" class="h-9 w-auto" />
              <span class="text-xl font-bold text-white font-heading">Rudrakshama</span>
            </a>
            <p class="text-sm text-gray-400 leading-relaxed mb-4">
              India's most trusted online store for genuine Rudraksha beads, malas, bracelets, pendants, and spiritual products. Bringing divine energy to your doorstep since 2015.
            </p>
            <div class="flex items-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-saffron-500 hover:text-white transition-all text-sm" aria-label="Facebook">
                <i class="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-saffron-500 hover:text-white transition-all text-sm" aria-label="Instagram">
                <i class="fa fa-instagram" aria-hidden="true"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-saffron-500 hover:text-white transition-all text-sm" aria-label="YouTube">
                <i class="fa fa-youtube-play" aria-hidden="true"></i>
              </a>
              <a href="https://wa.me/919454799616" target="_blank" rel="noopener noreferrer" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-saffron-500 hover:text-white transition-all text-sm" aria-label="WhatsApp">
                <i class="fa fa-whatsapp" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          <!-- Quick Links -->
          <div>
            <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul class="space-y-2.5">
              <li><a routerLink="/home" class="text-sm text-gray-400 hover:text-saffron-500 transition-colors">Home</a></li>
              <li><a routerLink="/about" class="text-sm text-gray-400 hover:text-saffron-500 transition-colors">About Us</a></li>

              <li><a routerLink="/contact" class="text-sm text-gray-400 hover:text-saffron-500 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <!-- Categories -->
          <div>
            <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4">Categories</h4>
            <ul class="space-y-2.5">
              <li><a routerLink="/shop" class="text-sm text-gray-400 hover:text-saffron-500 transition-colors">Nepali Rudraksha</a></li>
              <li><a routerLink="/shop" class="text-sm text-gray-400 hover:text-saffron-500 transition-colors">Indonesian Rudraksha</a></li>
              <li><a routerLink="/shop" class="text-sm text-gray-400 hover:text-saffron-500 transition-colors">Rudraksha Mala</a></li>
              <li><a routerLink="/shop" class="text-sm text-gray-400 hover:text-saffron-500 transition-colors">Bracelets & Pendants</a></li>
              <li><a routerLink="/shop" class="text-sm text-gray-400 hover:text-saffron-500 transition-colors">Puja Accessories</a></li>
            </ul>
          </div>

          <!-- Contact -->
          <div>
            <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact Info</h4>
            <ul class="space-y-3">
              <li class="flex items-start gap-2.5">
                <i class="fa fa-map-marker text-saffron-500 mt-0.5 text-sm" aria-hidden="true"></i>
                <span class="text-sm text-gray-400">123 Spiritual Lane,<br>Varanasi, UP 221001, India</span>
              </li>
              <li>
                <a href="tel:+919454799616" class="flex items-center gap-2.5 text-sm text-gray-400 hover:text-saffron-500 transition-colors">
                  <i class="fa fa-phone text-saffron-500 text-sm" aria-hidden="true"></i>
                  +91 94547 99616
                </a>
              </li>
              <li>
                <a href="mailto:info@rudrakshama.com" class="flex items-center gap-2.5 text-sm text-gray-400 hover:text-saffron-500 transition-colors">
                  <i class="fa fa-envelope text-saffron-500 text-sm" aria-hidden="true"></i>
                  info@rudrakshama.com
                </a>
              </li>
              <li class="flex items-start gap-2.5">
                <i class="fa fa-clock-o text-saffron-500 mt-0.5 text-sm" aria-hidden="true"></i>
                <span class="text-sm text-gray-400">Mon - Sat: 9:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <!-- Copyright Bar -->
      <div class="border-t border-white/10">
        <div class="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p class="text-xs text-gray-500">&copy; 2026 Rudrakshama. All rights reserved. | Trust. Authenticity. Divinity.</p>
          <div class="flex items-center gap-4 text-xs text-gray-500">
            <a routerLink="/contact" class="hover:text-saffron-500 transition-colors">Privacy Policy</a>
            <a routerLink="/contact" class="hover:text-saffron-500 transition-colors">Terms of Service</a>
            <a routerLink="/contact" class="hover:text-saffron-500 transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host { display: block; }
    .font-heading { font-family: 'Red Hat Display', serif; }
  `]
})
export class FooterComponent {}
