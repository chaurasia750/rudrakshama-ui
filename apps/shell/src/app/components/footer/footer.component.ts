import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  template: `
    <footer class="bg-[#0A1628] text-white">
      <div class="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

          <div>
            <a routerLink="/home" class="flex items-center gap-2 mb-4">
              <div class="w-8 h-8 rounded-lg bg-[#FFD000] flex items-center justify-center">
                <span class="text-[#0A1628] font-bold text-sm">R</span>
              </div>
              <span class="text-lg font-bold text-white">Rudraksham</span>
            </a>
            <p class="text-sm text-gray-400 leading-relaxed mb-4">
              Empowering education and skill development for a brighter future. Join us in shaping tomorrow's leaders.
            </p>
            <div class="flex items-center gap-3">
              <a href="#" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-[#FFD000] hover:text-[#0A1628] transition-all text-sm" aria-label="Facebook">
                <i class="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a href="#" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-[#FFD000] hover:text-[#0A1628] transition-all text-sm" aria-label="Instagram">
                <i class="fa fa-instagram" aria-hidden="true"></i>
              </a>
              <a href="#" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-[#FFD000] hover:text-[#0A1628] transition-all text-sm" aria-label="YouTube">
                <i class="fa fa-youtube-play" aria-hidden="true"></i>
              </a>
              <a href="#" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-[#FFD000] hover:text-[#0A1628] transition-all text-sm" aria-label="WhatsApp">
                <i class="fa fa-whatsapp" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul class="space-y-2.5">
              <li><a routerLink="/home" class="text-sm text-gray-400 hover:text-[#FFD000] transition-colors">Home</a></li>
              <li><a routerLink="/about" class="text-sm text-gray-400 hover:text-[#FFD000] transition-colors">About Us</a></li>
              <li><a routerLink="/contact" class="text-sm text-gray-400 hover:text-[#FFD000] transition-colors">Contact</a></li>
              <li><a routerLink="/signup" class="text-sm text-gray-400 hover:text-[#FFD000] transition-colors">Register</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4">Programs</h4>
            <ul class="space-y-2.5">
              <li><a routerLink="/about" class="text-sm text-gray-400 hover:text-[#FFD000] transition-colors">Scholarship Programs</a></li>
              <li><a routerLink="/about" class="text-sm text-gray-400 hover:text-[#FFD000] transition-colors">Skill Development</a></li>
              <li><a routerLink="/about" class="text-sm text-gray-400 hover:text-[#FFD000] transition-colors">Career Guidance</a></li>
              <li><a routerLink="/about" class="text-sm text-gray-400 hover:text-[#FFD000] transition-colors">Study Abroad</a></li>
            </ul>
          </div>

          <div>
            <h4 class="text-sm font-bold text-white uppercase tracking-wider mb-4">Contact Info</h4>
            <ul class="space-y-3">
              <li class="flex items-start gap-2.5">
                <i class="fa fa-map-marker text-[#FFD000] mt-0.5 text-sm" aria-hidden="true"></i>
                <span class="text-sm text-gray-400">123 Business Street,<br>New Delhi, India</span>
              </li>
              <li>
                <a href="tel:+911234567890" class="flex items-center gap-2.5 text-sm text-gray-400 hover:text-[#FFD000] transition-colors">
                  <i class="fa fa-phone text-[#FFD000] text-sm" aria-hidden="true"></i>
                  +91 123 456 7890
                </a>
              </li>
              <li>
                <a href="mailto:info@rudraksham.com" class="flex items-center gap-2.5 text-sm text-gray-400 hover:text-[#FFD000] transition-colors">
                  <i class="fa fa-envelope text-[#FFD000] text-sm" aria-hidden="true"></i>
                  info@rudraksham.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div class="border-t border-white/10">
        <div class="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p class="text-xs text-gray-500">&copy; 2026 Rudraksham. All rights reserved.</p>
          <div class="flex items-center gap-4 text-xs text-gray-500">
            <a routerLink="/contact" class="hover:text-[#FFD000] transition-colors">Privacy Policy</a>
            <a routerLink="/contact" class="hover:text-[#FFD000] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class FooterComponent {}
