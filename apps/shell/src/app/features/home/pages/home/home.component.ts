import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="min-h-screen bg-white font-body">

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 1: HERO
           ═══════════════════════════════════════════════════════════ -->
      <section class="relative bg-brown-700 overflow-hidden">
        <div class="relative h-[55vh] min-h-[400px] xs:h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh]">
          @for (slide of heroSlides; track slide; let i = $index) {
            <div class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                 [class.opacity-100]="currentSlide === i"
                 [class.opacity-0]="currentSlide !== i">
              <img [src]="slide" [alt]="'Rudrakshama - Sacred Rudraksha Collection ' + (i + 1)"
                   class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-r from-brown-800/95 via-brown-800/80 to-brown-800/50 md:to-transparent"></div>
            </div>
          }

          <div class="relative z-10 h-full flex items-center">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div class="max-w-xl lg:max-w-2xl">
                <span class="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-saffron-500/15 text-saffron-400 text-[11px] xs:text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4 lg:mb-6 border border-saffron-500/20">
                  <i class="fa fa-om mr-1" aria-hidden="true"></i> India's Most Trusted Rudraksha Store
                </span>
                <h1 class="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight font-heading">
                  Discover the Sacred<br class="hidden xs:block">
                  Power of <span class="text-saffron-500">Genuine Rudraksha</span>
                </h1>
                <p class="mt-2 xs:mt-3 sm:mt-4 lg:mt-6 text-xs xs:text-sm sm:text-base lg:text-lg text-gray-300 max-w-xl leading-relaxed">
                  Authentic Nepali &amp; Indonesian Rudraksha beads, malas, bracelets, and spiritual products — lab-certified and trusted by over 50,000 devotees across India.
                </p>
                <div class="mt-4 xs:mt-5 sm:mt-6 lg:mt-8 flex flex-col xs:flex-row gap-2 xs:gap-3 sm:gap-4">
                  <a routerLink="/signup"
                     class="px-5 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-3.5 bg-saffron-500 text-white font-bold rounded-lg hover:bg-saffron-600 transition-all text-xs xs:text-sm sm:text-base text-center shadow-lg shadow-saffron-500/25 w-full xs:w-auto">
                    <i class="fa fa-shopping-cart mr-1" aria-hidden="true"></i> Shop Now
                  </a>
                  <a routerLink="/login"
                     class="px-5 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-gold-500 hover:text-gold-500 transition-all text-xs xs:text-sm sm:text-base text-center w-full xs:w-auto">
                    <i class="fa fa-th-large mr-1" aria-hidden="true"></i> Explore Collection
                  </a>
                </div>
                <div class="mt-4 sm:mt-6 flex flex-wrap items-center gap-3 sm:gap-5 text-[11px] xs:text-xs text-gray-400">
                  <span><i class="fa fa-check-circle text-saffron-500 mr-1" aria-hidden="true"></i> Lab Certified</span>
                  <span><i class="fa fa-check-circle text-saffron-500 mr-1" aria-hidden="true"></i> 50,000+ Happy Customers</span>
                  <span><i class="fa fa-check-circle text-saffron-500 mr-1" aria-hidden="true"></i> Free Shipping</span>
                </div>
              </div>
            </div>
          </div>

          <button (click)="prevSlide()" aria-label="Previous slide"
                  class="absolute left-2 xs:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-saffron-500/80 text-white flex items-center justify-center transition-all">
            <i class="fa fa-chevron-left text-xs xs:text-sm sm:text-base" aria-hidden="true"></i>
          </button>
          <button (click)="nextSlide()" aria-label="Next slide"
                  class="absolute right-2 xs:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-saffron-500/80 text-white flex items-center justify-center transition-all">
            <i class="fa fa-chevron-right text-xs xs:text-sm sm:text-base" aria-hidden="true"></i>
          </button>

          <div class="absolute bottom-3 xs:bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 xs:gap-2">
            @for (slide of heroSlides; track slide; let i = $index) {
              <button (click)="goToSlide(i)" [attr.aria-label]="'Go to slide ' + (i + 1)"
                      class="rounded-full transition-all duration-300"
                      [class.w-2.5]="currentSlide !== i"
                      [class.h-2.5]="currentSlide !== i"
                      [class.bg-white/40]="currentSlide !== i"
                      [class.w-6]="currentSlide === i"
                      [class.h-2.5]="currentSlide === i"
                      [class.bg-saffron-500]="currentSlide === i">
              </button>
            }
          </div>
        </div>

        <!-- Offer Banner -->
        <div class="bg-saffron-500 py-2 sm:py-2.5">
          <div class="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2 text-white text-xs sm:text-sm font-semibold">
            <i class="fa fa-bolt" aria-hidden="true"></i>
            <span>Flash Sale: Get <strong>15% OFF</strong> on all Rudraksha Malas — Use Code: <strong>SACRED15</strong></span>
            <i class="fa fa-bolt" aria-hidden="true"></i>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 2: TRUST BADGES
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-6 sm:py-8 lg:py-10 bg-brown-800 border-t border-b border-gold-500/20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            @for (badge of trustBadges; track badge.title) {
              <div class="flex items-center gap-3 sm:gap-4">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-saffron-500/15 flex items-center justify-center flex-shrink-0">
                  <i [class]="badge.icon" class="text-saffron-500 text-base sm:text-lg" aria-hidden="true"></i>
                </div>
                <div>
                  <h3 class="text-xs sm:text-sm font-bold text-white">{{ badge.title }}</h3>
                  <p class="text-[10px] sm:text-xs text-gray-400">{{ badge.sub }}</p>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 3: ABOUT RUDRAKSHAMA
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-10 xs:py-14 sm:py-16 lg:py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
            <div class="order-2 lg:order-1">
              <span class="inline-block px-2.5 xs:px-3 py-0.5 xs:py-1 bg-saffron-500/10 text-saffron-500 text-[11px] xs:text-xs sm:text-sm font-semibold rounded-full mb-2 xs:mb-3 sm:mb-4">About Rudrakshama</span>
              <h2 class="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-700 font-heading leading-tight">India's Premier Destination for Authentic Rudraksha</h2>
              <div class="mt-4 xs:mt-5 sm:mt-6 space-y-3 sm:space-y-4 text-xs xs:text-sm sm:text-base text-gray-600 leading-relaxed">
                <p>
                  Rudrakshama is a trusted name in the world of sacred Rudraksha beads and spiritual accessories. Founded with a deep reverence for Vedic traditions and a commitment to authenticity, we have been serving devotees, spiritual seekers, yoga practitioners, and meditation enthusiasts across India with genuine, lab-certified Rudraksha products.
                </p>
                <p>
                  Our mission is simple yet profound — to make authentic spiritual tools accessible to every seeker. We source our Rudraksha beads directly from the sacred forests of Nepal and the fertile regions of Indonesia, ensuring every bead retains its natural energy and divine potency. Each product undergoes rigorous quality testing and comes with a certificate of authenticity, so you can wear your Rudraksha with absolute confidence.
                </p>
                <p>
                  Why do over 50,000 customers trust Rudrakshama? Because we understand that Rudraksha is not just a bead — it is a sacred connection to the divine. Whether you seek peace of mind, spiritual growth, protection from negative energies, or a deeper connection during meditation, our carefully curated collection of 1 Mukhi to 14 Mukhi Rudraksha, Nepali and Indonesian varieties, malas, bracelets, pendants, and puja accessories has something for every spiritual journey.
                </p>
                <p>
                  At Rudrakshama, authenticity is not just a promise — it is our sacred duty. Every bead we sell is 100% genuine, naturally sourced, and energized through proper Vedic rituals before it reaches your doorstep.
                </p>
              </div>
              <a routerLink="/about"
                 class="mt-4 xs:mt-5 sm:mt-6 inline-flex items-center gap-2 px-4 xs:px-5 py-2 xs:py-2.5 bg-saffron-500 text-white text-xs xs:text-sm font-semibold rounded-lg hover:bg-saffron-600 transition-all shadow-lg shadow-saffron-500/25">
                Know Our Story
                <i class="fa fa-arrow-right text-xs" aria-hidden="true"></i>
              </a>
            </div>
            <div class="grid grid-cols-2 gap-3 xs:gap-4 order-1 lg:order-2">
              <div class="rounded-xl overflow-hidden shadow-lg">
                <img src="assets/Rudraksham.jpg" alt="Genuine Rudraksha beads from Rudrakshama" class="w-full h-32 xs:h-36 sm:h-48 lg:h-56 object-cover" loading="lazy">
              </div>
              <div class="rounded-xl overflow-hidden shadow-lg mt-4 xs:mt-6 sm:mt-8">
                <img src="assets/Rudraksham1.jpg" alt="Rudraksha Mala collection" class="w-full h-32 xs:h-36 sm:h-48 lg:h-56 object-cover" loading="lazy">
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 4: FEATURED CATEGORIES
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-10 xs:py-14 sm:py-16 lg:py-24 bg-brown-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-xl xs:max-w-2xl sm:max-w-3xl mx-auto mb-6 xs:mb-8 sm:mb-10 lg:mb-14">
            <span class="inline-block px-2.5 xs:px-3 py-0.5 xs:py-1 bg-saffron-500/10 text-saffron-500 text-[11px] xs:text-xs sm:text-sm font-semibold rounded-full mb-2 xs:mb-3 sm:mb-4">Our Collection</span>
            <h2 class="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-700 font-heading">Featured Rudraksha Categories</h2>
            <p class="mt-1 xs:mt-2 sm:mt-3 lg:mt-4 text-xs xs:text-sm sm:text-base text-gray-600">Explore our complete range of genuine Rudraksha beads, each carrying unique spiritual significance and divine blessings.</p>
          </div>
          <div class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 xs:gap-4 sm:gap-5 lg:gap-6">
            @for (cat of categories; track cat.title) {
              <div class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100 hover:border-saffron-500/30">
                <div class="h-24 sm:h-28 bg-gradient-to-br from-brown-700 to-brown-800 flex items-center justify-center relative overflow-hidden">
                  <div class="absolute inset-0 bg-saffron-500/0 group-hover:bg-saffron-500/10 transition-all duration-300"></div>
                  <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gold-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <i class="fa fa-diamond text-gold-500 text-lg sm:text-xl" aria-hidden="true"></i>
                  </div>
                </div>
                <div class="p-3 sm:p-4">
                  <h3 class="text-xs sm:text-sm font-bold text-brown-700 mb-1">{{ cat.title }}</h3>
                  <p class="text-[10px] sm:text-xs text-gray-500 leading-relaxed mb-2 sm:mb-3">{{ cat.desc }}</p>
                  <a routerLink="/about" class="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-saffron-500 hover:text-saffron-600 transition-colors">
                    View Products <i class="fa fa-arrow-right text-[10px]" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 5: WHY CHOOSE US
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-10 xs:py-14 sm:py-16 lg:py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-xl xs:max-w-2xl sm:max-w-3xl mx-auto mb-6 xs:mb-8 sm:mb-10 lg:mb-14">
            <span class="inline-block px-2.5 xs:px-3 py-0.5 xs:py-1 bg-saffron-500/10 text-saffron-500 text-[11px] xs:text-xs sm:text-sm font-semibold rounded-full mb-2 xs:mb-3 sm:mb-4">Why Rudrakshama</span>
            <h2 class="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-700 font-heading">Why Thousands Trust Us</h2>
            <p class="mt-1 xs:mt-2 sm:mt-3 lg:mt-4 text-xs xs:text-sm sm:text-base text-gray-600">We go beyond selling beads — we deliver divine trust, quality, and a sacred experience to every customer.</p>
          </div>
          <div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 lg:gap-8">
            @for (item of whyUs; track item.title) {
              <div class="text-center p-5 sm:p-6 lg:p-8 rounded-xl bg-brown-50 hover:bg-saffron-500/5 border border-gray-100 hover:border-saffron-500/30 transition-all duration-300 group">
                <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-saffron-500/10 flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:bg-saffron-500/20 transition-all">
                  <i [class]="item.icon" class="text-saffron-500 text-xl sm:text-2xl" aria-hidden="true"></i>
                </div>
                <h3 class="text-sm sm:text-base font-bold text-brown-700 mb-1 sm:mb-2">{{ item.title }}</h3>
                <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">{{ item.desc }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 6: BENEFITS OF RUDRAKSHA
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-10 xs:py-14 sm:py-16 lg:py-24 bg-gradient-to-br from-brown-700 via-brown-800 to-brown-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-xl xs:max-w-2xl sm:max-w-3xl mx-auto mb-6 xs:mb-8 sm:mb-10 lg:mb-14">
            <span class="inline-block px-2.5 xs:px-3 py-0.5 xs:py-1 bg-saffron-500/15 text-saffron-400 text-[11px] xs:text-xs sm:text-sm font-semibold rounded-full mb-2 xs:mb-3 sm:mb-4">Sacred Benefits</span>
            <h2 class="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-heading">Transformative Benefits of Wearing Rudraksha</h2>
            <p class="mt-1 xs:mt-2 sm:mt-3 lg:mt-4 text-xs xs:text-sm sm:text-base text-gray-300">Ancient Vedic science and modern research confirm the profound benefits of wearing genuine Rudraksha beads.</p>
          </div>
          <div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            @for (benefit of benefits; track benefit.title) {
              <div class="p-4 sm:p-5 lg:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-saffron-500/30 hover:bg-white/10 transition-all duration-300 group">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-saffron-500/15 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-saffron-500/25 transition-all">
                  <i [class]="benefit.icon" class="text-saffron-400 text-base sm:text-lg" aria-hidden="true"></i>
                </div>
                <h3 class="text-sm sm:text-base font-bold text-white mb-1 sm:mb-2">{{ benefit.title }}</h3>
                <p class="text-xs sm:text-sm text-gray-400 leading-relaxed">{{ benefit.desc }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 7: BEST SELLING PRODUCTS
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-10 xs:py-14 sm:py-16 lg:py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-xl xs:max-w-2xl sm:max-w-3xl mx-auto mb-6 xs:mb-8 sm:mb-10 lg:mb-14">
            <span class="inline-block px-2.5 xs:px-3 py-0.5 xs:py-1 bg-saffron-500/10 text-saffron-500 text-[11px] xs:text-xs sm:text-sm font-semibold rounded-full mb-2 xs:mb-3 sm:mb-4">Best Sellers</span>
            <h2 class="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-700 font-heading">Most Loved Rudraksha Products</h2>
            <p class="mt-1 xs:mt-2 sm:mt-3 lg:mt-4 text-xs xs:text-sm sm:text-base text-gray-600">Handpicked favorites trusted by thousands of devotees for their spiritual journeys.</p>
          </div>
          <div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            @for (product of products; track product.name) {
              <div class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group">
                <div class="relative h-40 sm:h-48 bg-gradient-to-br from-brown-50 to-brown-100 flex items-center justify-center overflow-hidden">
                  <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gold-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <i class="fa fa-diamond text-gold-500 text-3xl sm:text-4xl" aria-hidden="true"></i>
                  </div>
                  @if (product.badge) {
                    <span class="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 text-[10px] sm:text-xs font-bold rounded-full"
                          [class.bg-saffron-500]="product.badge === 'Best Seller'"
                          [class.text-white]="product.badge === 'Best Seller'"
                          [class.bg-green-500]="product.badge === 'New'"
                          [class.text-white]="product.badge === 'New'"
                          [class.bg-gold-500]="product.badge === 'Trending'"
                          [class.text-brown-800]="product.badge === 'Trending'">
                      {{ product.badge }}
                    </span>
                  }
                </div>
                <div class="p-3 sm:p-4">
                  <div class="flex items-center gap-0.5 mb-1">
                    @for (star of [1,2,3,4,5]; track star) {
                      <i class="fa text-[10px] sm:text-xs"
                         [class.fa-star]="star <= product.rating"
                         [class.fa-star-o]="star > product.rating"
                         [class.text-gold-500]="star <= product.rating"
                         [class.text-gray-300]="star > product.rating"
                         aria-hidden="true"></i>
                    }
                    <span class="text-[10px] sm:text-xs text-gray-400 ml-1">({{ product.reviews }})</span>
                  </div>
                  <h3 class="text-xs sm:text-sm font-bold text-brown-700 mb-1 line-clamp-2">{{ product.name }}</h3>
                  <p class="text-[10px] sm:text-xs text-gray-500 mb-2 line-clamp-2">{{ product.desc }}</p>
                  <div class="flex items-center gap-2 mb-2 sm:mb-3">
                    <span class="text-sm sm:text-base font-bold text-saffron-500">{{ product.price }}</span>
                    <span class="text-[10px] sm:text-xs text-gray-400 line-through">{{ product.oldPrice }}</span>
                  </div>
                  <a routerLink="/about" class="block w-full text-center py-1.5 sm:py-2 bg-brown-700 text-white text-[10px] sm:text-xs font-semibold rounded-lg hover:bg-saffron-500 transition-all">
                    <i class="fa fa-shopping-cart mr-1" aria-hidden="true"></i> Add to Cart
                  </a>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 8: CUSTOMER TESTIMONIALS
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-10 xs:py-14 sm:py-16 lg:py-24 bg-brown-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-xl xs:max-w-2xl sm:max-w-3xl mx-auto mb-6 xs:mb-8 sm:mb-10 lg:mb-14">
            <span class="inline-block px-2.5 xs:px-3 py-0.5 xs:py-1 bg-saffron-500/10 text-saffron-500 text-[11px] xs:text-xs sm:text-sm font-semibold rounded-full mb-2 xs:mb-3 sm:mb-4">Testimonials</span>
            <h2 class="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-700 font-heading">What Our Devotees Say</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            @for (review of testimonials; track review.name) {
              <div class="bg-white rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all border border-gray-100">
                <div class="flex items-center gap-0.5 mb-3">
                  @for (star of [1,2,3,4,5]; track star) {
                    <i class="fa text-xs sm:text-sm"
                       [class.fa-star]="star <= review.rating"
                       [class.fa-star-o]="star > review.rating"
                       [class.text-gold-500]="star <= review.rating"
                       [class.text-gray-300]="star > review.rating"
                       aria-hidden="true"></i>
                  }
                </div>
                <p class="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 italic">"{{ review.review }}"</p>
                <div class="flex items-center gap-3 border-t border-gray-100 pt-3">
                  <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-saffron-500 to-gold-500 flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0">
                    {{ review.initials }}
                  </div>
                  <div>
                    <div class="text-xs sm:text-sm font-bold text-brown-700">{{ review.name }}</div>
                    <div class="text-[10px] sm:text-xs text-gray-400">{{ review.city }}</div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 9: OUR PROMISE
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-10 xs:py-14 sm:py-16 lg:py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-xl xs:max-w-2xl sm:max-w-3xl mx-auto mb-6 xs:mb-8 sm:mb-10 lg:mb-14">
            <span class="inline-block px-2.5 xs:px-3 py-0.5 xs:py-1 bg-saffron-500/10 text-saffron-500 text-[11px] xs:text-xs sm:text-sm font-semibold rounded-full mb-2 xs:mb-3 sm:mb-4">Our Promise</span>
            <h2 class="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-700 font-heading">Our Sacred Commitment to You</h2>
          </div>
          <div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
            @for (promise of promises; track promise.title) {
              <div class="text-center p-4 sm:p-5 lg:p-6 rounded-xl border border-gray-100 hover:border-saffron-500/30 hover:bg-saffron-500/5 transition-all duration-300">
                <div class="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-saffron-500/10 flex items-center justify-center mx-auto mb-3">
                  <i [class]="promise.icon" class="text-saffron-500 text-lg sm:text-xl" aria-hidden="true"></i>
                </div>
                <h3 class="text-xs sm:text-sm font-bold text-brown-700 mb-1">{{ promise.title }}</h3>
                <p class="text-[10px] sm:text-xs text-gray-500 leading-relaxed">{{ promise.desc }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 10: BLOG SECTION
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-10 xs:py-14 sm:py-16 lg:py-24 bg-brown-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-xl xs:max-w-2xl sm:max-w-3xl mx-auto mb-6 xs:mb-8 sm:mb-10 lg:mb-14">
            <span class="inline-block px-2.5 xs:px-3 py-0.5 xs:py-1 bg-saffron-500/10 text-saffron-500 text-[11px] xs:text-xs sm:text-sm font-semibold rounded-full mb-2 xs:mb-3 sm:mb-4">Spiritual Knowledge</span>
            <h2 class="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-700 font-heading">From Our Sacred Blog</h2>
          </div>
          <div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            @for (post of blogPosts; track post.title) {
              <article class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 group">
                <div class="h-36 sm:h-44 bg-gradient-to-br from-brown-600 to-brown-700 flex items-center justify-center relative overflow-hidden">
                  <div class="absolute inset-0 bg-saffron-500/0 group-hover:bg-saffron-500/10 transition-all duration-300"></div>
                  <i [class]="post.icon" class="text-gold-500/40 text-5xl sm:text-6xl group-hover:text-gold-500/60 transition-all" aria-hidden="true"></i>
                </div>
                <div class="p-4 sm:p-5">
                  <span class="text-[10px] sm:text-xs text-saffron-500 font-semibold">{{ post.category }}</span>
                  <h3 class="text-sm sm:text-base font-bold text-brown-700 mt-1 mb-2 group-hover:text-saffron-500 transition-colors line-clamp-2">{{ post.title }}</h3>
                  <p class="text-xs sm:text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">{{ post.excerpt }}</p>
                  <a routerLink="/about" class="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-saffron-500 hover:text-saffron-600 transition-colors">
                    Read More <i class="fa fa-arrow-right text-[10px]" aria-hidden="true"></i>
                  </a>
                </div>
              </article>
            }
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 11: FAQ SECTION
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-10 xs:py-14 sm:py-16 lg:py-24 bg-white">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-6 xs:mb-8 sm:mb-10 lg:mb-14">
            <span class="inline-block px-2.5 xs:px-3 py-0.5 xs:py-1 bg-saffron-500/10 text-saffron-500 text-[11px] xs:text-xs sm:text-sm font-semibold rounded-full mb-2 xs:mb-3 sm:mb-4">FAQs</span>
            <h2 class="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-700 font-heading">Frequently Asked Questions</h2>
          </div>
          <div class="space-y-3 sm:space-y-4">
            @for (faq of faqs; track faq.q; let i = $index) {
              <div class="border border-gray-200 rounded-xl overflow-hidden hover:border-saffron-500/30 transition-all">
                <button (click)="toggleFaq(i)"
                        class="w-full flex items-center justify-between gap-3 p-4 sm:p-5 text-left bg-white hover:bg-brown-50/50 transition-colors">
                  <span class="text-xs sm:text-sm font-semibold text-brown-700">{{ faq.q }}</span>
                  <i class="fa transition-transform duration-300 text-saffron-500 text-xs flex-shrink-0"
                     [class.fa-chevron-down]="!faq.open"
                     [class.fa-chevron-up]="faq.open"
                     aria-hidden="true"></i>
                </button>
                @if (faq.open) {
                  <div class="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed bg-brown-50/30">
                    {{ faq.a }}
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 12: NEWSLETTER
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-10 sm:py-12 lg:py-16 bg-gradient-to-r from-saffron-500 to-saffron-600">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <i class="fa fa-envelope text-white/30 text-3xl sm:text-4xl mb-3" aria-hidden="true"></i>
          <h2 class="text-lg sm:text-xl lg:text-2xl font-bold text-white font-heading mb-2">Stay Connected with the Divine</h2>
          <p class="text-xs sm:text-sm text-white/80 mb-5 sm:mb-6 max-w-lg mx-auto">Subscribe to receive spiritual insights, exclusive offers, new arrivals, and sacred knowledge about Rudraksha directly to your inbox.</p>
          <form class="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-md mx-auto" (submit)="$event.preventDefault()">
            <input type="email" placeholder="Enter your email address"
                   class="flex-1 px-4 py-2.5 sm:py-3 rounded-lg bg-white text-brown-700 text-xs sm:text-sm placeholder-gray-400 outline-none focus:ring-2 focus:ring-gold-500"
                   aria-label="Email address">
            <button type="submit" class="px-6 py-2.5 sm:py-3 bg-brown-700 text-white text-xs sm:text-sm font-bold rounded-lg hover:bg-brown-800 transition-all shadow-lg whitespace-nowrap">
              Subscribe <i class="fa fa-paper-plane ml-1" aria-hidden="true"></i>
            </button>
          </form>
          <p class="text-[10px] sm:text-xs text-white/50 mt-3">No spam, unsubscribe anytime. We respect your spiritual journey.</p>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 13: FINAL CTA
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-14 xs:py-16 sm:py-20 lg:py-28 bg-brown-700 relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-10 left-10 w-32 h-32 bg-saffron-500 rounded-full blur-3xl"></div>
          <div class="absolute bottom-10 right-10 w-48 h-48 bg-gold-500 rounded-full blur-3xl"></div>
        </div>
        <div class="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span class="inline-block px-3 py-1 bg-saffron-500/15 text-saffron-400 text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-6">
            <i class="fa fa-om mr-1" aria-hidden="true"></i> Begin Your Sacred Journey
          </span>
          <h2 class="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading leading-tight">
            Begin Your Spiritual Journey with <span class="text-saffron-500">Rudrakshama</span>
          </h2>
          <p class="mt-3 sm:mt-4 lg:mt-6 text-xs sm:text-sm lg:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Whether you seek peace, protection, prosperity, or spiritual awakening — our genuine Rudraksha collection is here to guide your path. Join 50,000+ devotees who trust Rudrakshama.
          </p>
          <div class="mt-6 sm:mt-8 flex flex-col xs:flex-row items-center justify-center gap-3 sm:gap-4">
            <a routerLink="/about"
               class="w-full xs:w-auto px-8 sm:px-10 py-3 sm:py-3.5 bg-saffron-500 text-white font-bold rounded-lg hover:bg-saffron-600 transition-all shadow-lg shadow-saffron-500/25 text-sm sm:text-base">
              <i class="fa fa-shopping-cart mr-1" aria-hidden="true"></i> Start Your Spiritual Journey
            </a>
            <a routerLink="/contact"
               class="w-full xs:w-auto px-8 sm:px-10 py-3 sm:py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-gold-500 hover:text-gold-500 transition-all text-sm sm:text-base">
              <i class="fa fa-phone mr-1" aria-hidden="true"></i> Talk to an Expert
            </a>
          </div>
        </div>
      </section>

    </div>
  `,
  styles: [`
    :host { display: block; }
    .font-heading { font-family: 'Red Hat Display', serif; }
    .font-body { font-family: 'DM Sans', sans-serif; }
    .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  `]
})
export class HomeComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  private slideInterval: any;
  newsletterEmail = '';

  heroSlides = [
    'assets/Rudraksham.jpg',
    'assets/Rudraksham1.jpg',
  ];

  trustBadges = [
    { icon: 'fa fa-certificate', title: '100% Genuine Rudraksha', sub: 'Lab Certified & Authentic' },
    { icon: 'fa fa-diamond', title: 'Premium Quality', sub: 'Handpicked & Quality Tested' },
    { icon: 'fa fa-shield', title: 'Secure Payments', sub: '100% Safe & Encrypted' },
    { icon: 'fa fa-truck', title: 'Fast Delivery', sub: 'Across All of India' },
  ];

  categories = [
    { title: '1 Mukhi Rudraksha', desc: 'The rarest bead — symbolizes Lord Shiva himself. Brings ultimate truth and liberation.' },
    { title: '2 Mukhi Rudraksha', desc: 'Represents Ardhanarishvara. Promotes unity, harmony, and emotional balance.' },
    { title: '3 Mukhi Rudraksha', desc: 'Symbolizes Lord Agni. Cleanses past sins and boosts confidence and vitality.' },
    { title: '4 Mukhi Rudraksha', desc: 'Represents Goddess Saraswati. Enhances knowledge, creativity, and communication.' },
    { title: '5 Mukhi Rudraksha', desc: 'Most common bead — symbolizes Lord Shiva. Brings peace, health, and spiritual growth.' },
    { title: '6 Mukhi Rudraksha', desc: 'Represents Lord Kartikeya. Develops willpower, focus, and attractiveness.' },
    { title: '7 Mukhi Rudraksha', desc: 'Symbolizes Goddess Lakshmi. Attracts wealth, prosperity, and financial abundance.' },
    { title: '8 Mukhi Rudraksha', desc: 'Represents Lord Ganesha. Removes obstacles and brings success in all endeavors.' },
    { title: '9 Mukhi Rudraksha', desc: 'Symbolizes Goddess Durga. Grants courage, energy, and divine protection.' },
    { title: '10 Mukhi Rudraksha', desc: 'Represents Lord Vishnu. Provides complete protection from negative energies.' },
    { title: '11 Mukhi Rudraksha', desc: 'Symbolizes Lord Hanuman. Grants courage, strength, and fearlessness.' },
    { title: '12 Mukhi Rudraksha', desc: 'Represents Lord Surya. Brings radiance, leadership, and self-confidence.' },
    { title: '13 Mukhi Rudraksha', desc: 'Symbolizes Lord Indra. Grants divine charisma, attraction, and wish fulfillment.' },
    { title: '14 Mukhi Rudraksha', desc: 'The divine bead — symbolizes Lord Hanuman. Provides ultimate protection and courage.' },
    { title: 'Nepali Rudraksha', desc: 'Originating from the Himalayas — considered the most powerful and potent variety.' },
    { title: 'Indonesian Rudraksha', desc: 'Smaller, lighter beads from Java — affordable yet spiritually powerful.' },
    { title: 'Rudraksha Mala', desc: 'Sacred prayer beads for japa meditation, chanting, and spiritual practice.' },
    { title: 'Bracelets', desc: 'Elegant Rudraksha bracelets for daily wear — style meets spirituality.' },
    { title: 'Pendants', desc: 'Beautifully crafted Rudraksha pendants in silver and gold-plated designs.' },
    { title: 'Puja Accessories', desc: 'Complete puja kits — malas, ash, sindoor, and sacred items for worship.' },
  ];

  whyUs = [
    { icon: 'fa fa-certificate', title: '100% Authentic Products', desc: 'Every Rudraksha bead is lab-tested and comes with a certificate of authenticity. No compromises on genuineness.' },
    { icon: 'fa fa-check-circle', title: 'Quality Checked', desc: 'Each bead undergoes rigorous quality inspection — natural texture, correct mukhi count, and energy verification.' },
    { icon: 'fa fa-inr', title: 'Affordable Pricing', desc: 'Premium spiritual products at fair prices. We believe sacred items should be accessible to every seeker.' },
    { icon: 'fa fa-lock', title: 'Secure Checkout', desc: 'Shop with confidence. Our payment gateway uses 256-bit SSL encryption to protect your transactions.' },
    { icon: 'fa fa-truck', title: 'Fast Shipping', desc: 'Free express delivery across India. Most orders ship within 24 hours and arrive in 3-5 business days.' },
    { icon: 'fa fa-headphones', title: 'Expert Support', desc: 'Our spiritual advisors are available to help you choose the right Rudraksha for your specific needs.' },
  ];

  benefits = [
    { icon: 'fa fa-heart', title: 'Peace of Mind', desc: 'Wearing genuine Rudraksha calms the mind, reduces anxiety, and brings deep inner peace to your daily life.' },
    { icon: 'fa fa-leaf', title: 'Enhanced Meditation', desc: 'Rudraksha beads amplify meditative practices, helping you achieve deeper states of consciousness and spiritual awareness.' },
    { icon: 'fa fa-sun-o', title: 'Positive Energy', desc: 'The electromagnetic properties of Rudraksha create a protective shield of positive energy around the wearer.' },
    { icon: 'fa fa-rocket', title: 'Spiritual Growth', desc: 'Accelerate your spiritual evolution with the divine vibrations of sacred Rudraksha — a catalyst for higher consciousness.' },
    { icon: 'fa fa-crosshairs', title: 'Improved Focus', desc: 'Rudraksha enhances concentration and mental clarity, making it ideal for students, professionals, and meditators.' },
    { icon: 'fa fa-shield', title: 'Inner Strength', desc: 'Build emotional resilience and courage to face life\'s challenges with the divine blessings of Lord Shiva\'s tears.' },
    { icon: 'fa fa-cloud', title: 'Stress Reduction', desc: 'Scientifically shown to reduce stress hormones and lower blood pressure. Wear Rudraksha for a healthier, calmer life.' },
  ];

  products = [
    { name: '5 Mukhi Nepali Rudraksha Mala (108+1 Beads)', price: '₹1,499', oldPrice: '₹2,499', desc: 'Original Panchmukhi Rudraksha mala from Nepal. Ideal for japa meditation and daily wear.', rating: 5, reviews: 342, badge: 'Best Seller' },
    { name: '1 Mukhi Rudraksha Pendant (Silver)', price: '₹4,999', oldPrice: '₹7,999', desc: 'Rare Ek Mukhi Rudraksha in pure silver pendant setting. The ultimate symbol of Lord Shiva.', rating: 5, reviews: 128, badge: 'Trending' },
    { name: 'Rudraksha Bracelet (7 Beads, Adjustable)', price: '₹899', oldPrice: '₹1,499', desc: 'Daily wear bracelet with 7 natural Rudraksha beads. Perfect for spiritual beginners.', rating: 4, reviews: 567, badge: 'Best Seller' },
    { name: 'Nepali Rudraksha Combo Set (5, 7, 11 Mukhi)', price: '₹3,999', oldPrice: '₹5,999', desc: 'Curated combo of three powerful Nepali Rudraksha beads for complete spiritual protection.', rating: 5, reviews: 89, badge: 'New' },
    { name: '7 Mukhi Rudraksha Mala (Gold Plated)', price: '₹2,499', oldPrice: '₹3,999', desc: 'Saatmukhi Rudraksha mala for wealth and prosperity. Gold-plated for premium look.', rating: 4, reviews: 201, badge: '' },
    { name: 'Indonesian Rudraksha Mala (5 Mukhi)', price: '₹599', oldPrice: '₹999', desc: 'Affordable yet powerful Indonesian Panchmukhi mala. Great for daily chanting.', rating: 4, reviews: 890, badge: 'Best Seller' },
    { name: 'Rudraksha + Sphatik Mala Combination', price: '₹1,299', oldPrice: '₹1,999', desc: 'Powerful combo of Rudraksha and Sphatik (crystal) beads for amplified spiritual energy.', rating: 5, reviews: 156, badge: 'Trending' },
    { name: 'Complete Puja Kit with Rudraksha Mala', price: '₹2,999', oldPrice: '₹4,499', desc: 'Everything for your puja — Rudraksha mala, dhoop, sindoor, akshata, and more in one box.', rating: 4, reviews: 73, badge: 'New' },
  ];

  testimonials = [
    { name: 'Rajesh Kumar', city: 'Varanasi, UP', rating: 5, review: 'I purchased the 5 Mukhi Nepali Rudraksha mala and the quality is outstanding. The beads are perfectly sized and feel incredibly authentic. My meditation has improved significantly since I started wearing it.', initials: 'RK' },
    { name: 'Priya Sharma', city: 'Mumbai, Maharashtra', rating: 5, review: 'Rudrakshama is the most trustworthy online store I have found. The 1 Mukhi pendant I ordered came with a proper certificate and the craftsmanship is beautiful. Truly premium quality.', initials: 'PS' },
    { name: 'Anand Krishnan', city: 'Bangalore, Karnataka', rating: 5, review: 'I was skeptical about buying Rudraksha online, but Rudrakshama completely changed my perspective. The beads are genuine, the packaging is secure, and their customer support guided me perfectly.', initials: 'AK' },
    { name: 'Meera Devi', city: 'Haridwar, Uttarakhand', rating: 4, review: 'Beautiful collection and fast delivery. I ordered a 7 Mukhi mala for my husband and he was very happy with the quality. The only suggestion I have is to add more pendant designs.', initials: 'MD' },
    { name: 'Vikram Singh', city: 'Jaipur, Rajasthan', rating: 5, review: 'As a regular meditator, I can feel the energy difference in these Rudraksha beads. The combination set I purchased was exactly what I needed. Highly recommend Rudrakshama to all spiritual seekers.', initials: 'VS' },
    { name: 'Lakshmi Narayan', city: 'Chennai, Tamil Nadu', rating: 5, review: 'Excellent quality and very affordable prices. I have been ordering from Rudrakshama for over a year now and every product has been consistently authentic. Their puja kit is a must-have.', initials: 'LN' },
  ];

  promises = [
    { icon: 'fa fa-certificate', title: 'Authenticity', desc: 'Every bead is 100% genuine with lab certification' },
    { icon: 'fa fa-diamond', title: 'Quality', desc: 'Handpicked and rigorously tested for natural energy' },
    { icon: 'fa fa-heart', title: 'Customer Satisfaction', desc: 'Dedicated support and hassle-free returns policy' },
    { icon: 'fa fa-box', title: 'Secure Packaging', desc: 'Vibration-sealed packaging to preserve sacred energy' },
    { icon: 'fa fa-truck', title: 'Fast Shipping', desc: 'Free delivery across India in 3-5 business days' },
  ];

  blogPosts = [
    { icon: 'fa fa-diamond', category: 'Spiritual Guide', title: 'Benefits of 5 Mukhi Rudraksha: The Most Powerful Bead for Peace and Protection', excerpt: 'Discover why the Panchmukhi Rudraksha is considered the most versatile and powerful bead for spiritual growth and daily wear.' },
    { icon: 'fa fa-search', category: 'Buying Guide', title: 'How to Identify Original Rudraksha: 7 Simple Tests You Can Do at Home', excerpt: 'Learn the proven methods to distinguish genuine Rudraksha from fake ones — from the water test to the copper coin test.' },
    { icon: 'fa fa-question-circle', category: 'Expert Advice', title: 'Which Rudraksha Should I Wear? Complete Guide Based on Your Needs', excerpt: 'Not sure which Rudraksha is right for you? This comprehensive guide helps you choose based on your goals and zodiac sign.' },
    { icon: 'fa fa-om', category: 'Vedic Wisdom', title: 'The Sacred Science Behind Rudraksha: How These Beads Affect Your Body and Mind', excerpt: 'Explore the electromagnetic, thermal, and spiritual properties of Rudraksha as documented in ancient Vedic texts and modern research.' },
    { icon: 'fa fa-calendar', category: 'Festival Special', title: 'Best Time to Wear Rudraksha: Auspicious Days, Rituals, and Mantras', excerpt: 'Learn the ideal days, muhurat, and proper rituals for energizing and wearing your Rudraksha for maximum spiritual benefit.' },
    { icon: 'fa fa-globe', category: 'Comparison', title: 'Nepali vs Indonesian Rudraksha: Which One is Better and Why?', excerpt: 'A detailed comparison of the two most popular Rudraksha varieties — their origin, power, price, and suitability for different purposes.' },
  ];

  faqs = [
    { q: 'How do I know if the Rudraksha is genuine?', a: 'Every Rudraksha from Rudrakshama comes with a laboratory authenticity certificate. You can also perform simple home tests like the water test, copper coin test, and the thread test to verify genuineness.', open: false },
    { q: 'Which Rudraksha is best for beginners?', a: 'The 5 Mukhi (Panchmukhi) Rudraksha is the most recommended for beginners. It is widely available, affordable, and suitable for everyone regardless of age, gender, or spiritual background. It brings peace, health, and spiritual growth.', open: false },
    { q: 'Can I wear Rudraksha while sleeping?', a: 'Yes, you can wear Rudraksha while sleeping. In fact, keeping it close to your body during sleep is beneficial as it works on your energy system even while you rest. However, avoid wearing it during intimate activities.', open: false },
    { q: 'How should I take care of my Rudraksha?', a: 'Apply a light coating of clarified butter (ghee) or sesame oil occasionally. Clean with a soft brush and warm water. Store in a clean place when not wearing. Avoid chemical contact and excessive heat.', open: false },
    { q: 'Do I need to perform any rituals before wearing Rudraksha?', a: 'While not mandatory, it is recommended to energize your Rudraksha by chanting "Om Namah Shivaya" 108 times on a Monday or during the Maha Shivaratri festival before wearing it for the first time.', open: false },
    { q: 'Is there any side effect of wearing Rudraksha?', a: 'Genuine Rudraksha has no negative side effects. However, if you experience any discomfort, it may be due to allergic reactions to the bead material or wearing an inauthentic product. Always buy from a trusted source like Rudrakshama.', open: false },
    { q: 'Can women wear Rudraksha during menstruation?', a: 'Yes, women can wear Rudraksha during menstruation. There is no scriptural or scientific restriction. The Rudraksha works on the body\'s energy system and is beneficial at all times.', open: false },
    { q: 'What is the difference between Nepali and Indonesian Rudraksha?', a: 'Nepali Rudraksha are larger, heavier, and considered more potent due to their Himalayan origin. Indonesian Rudraksha are smaller, lighter, and more affordable. Both are genuine and spiritually powerful — the choice depends on your budget and preference.', open: false },
    { q: 'Do you offer cash on delivery (COD)?', a: 'Yes, Rudrakshama offers cash on delivery across India for orders below ₹5,000. For higher-value orders, we recommend prepaid payment for added security and faster processing.', open: false },
    { q: 'How long does delivery take?', a: 'We offer free standard delivery across India, which typically takes 3-5 business days. Express delivery (1-2 days) is available for major metro cities at a nominal additional charge.', open: false },
  ];

  ngOnInit() {
    this.slideInterval = setInterval(() => this.nextSlide(), 6000);
  }

  ngOnDestroy() {
    if (this.slideInterval) clearInterval(this.slideInterval);
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.heroSlides.length - 1 : this.currentSlide - 1;
    this.resetSlideInterval();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.heroSlides.length;
    this.resetSlideInterval();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.resetSlideInterval();
  }

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }

  private resetSlideInterval() {
    if (this.slideInterval) clearInterval(this.slideInterval);
    this.slideInterval = setInterval(() => this.nextSlide(), 6000);
  }
}
