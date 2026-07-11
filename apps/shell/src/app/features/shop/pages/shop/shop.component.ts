import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  badge: string;
  mukhi: number;
  origin: string;
  type: string;
  inStock: boolean;
  image: string;
}

interface Category {
  title: string;
  desc: string;
  icon: string;
}

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="min-h-screen bg-white font-body">

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 1: HERO
           ═══════════════════════════════════════════════════════════ -->
      <section class="relative bg-gradient-to-br from-brown-700 via-brown-800 to-brown-900 py-14 sm:py-18 lg:py-24 overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-10 right-20 w-40 h-40 bg-saffron-500 rounded-full blur-3xl"></div>
          <div class="absolute bottom-10 left-20 w-56 h-56 bg-gold-500 rounded-full blur-3xl"></div>
        </div>
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav class="mb-5 sm:mb-7" aria-label="Breadcrumb">
            <ol class="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
              <li><a routerLink="/home" class="hover:text-saffron-500 transition-colors">Home</a></li>
              <li><i class="fa fa-chevron-right text-[8px] sm:text-[10px]" aria-hidden="true"></i></li>
              <li class="text-saffron-500 font-medium">Shop</li>
            </ol>
          </nav>
          <div class="text-center max-w-3xl mx-auto">
            <span class="inline-block px-3 sm:px-4 py-1.5 bg-saffron-500/15 text-saffron-400 text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-5 border border-saffron-500/20">
              <i class="fa fa-shopping-cart mr-1" aria-hidden="true"></i> Our Collection
            </span>
            <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-heading leading-tight">
              Shop Genuine <span class="text-saffron-500">Rudraksha</span> Online
            </h1>
            <p class="mt-3 sm:mt-5 text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Browse our curated collection of 100% authentic, lab-certified Rudraksha beads, malas, bracelets, and spiritual products. Every bead is handpicked, tested, and backed by our purity guarantee.
            </p>
            <div class="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-5 text-[11px] sm:text-xs text-gray-400">
              <span><i class="fa fa-check-circle text-saffron-500 mr-1" aria-hidden="true"></i> Lab Certified</span>
              <span><i class="fa fa-check-circle text-saffron-500 mr-1" aria-hidden="true"></i> Free Shipping</span>
              <span><i class="fa fa-check-circle text-saffron-500 mr-1" aria-hidden="true"></i> 7-Day Returns</span>
              <span><i class="fa fa-check-circle text-saffron-500 mr-1" aria-hidden="true"></i> 50,000+ Happy Customers</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 2: PRODUCT FILTERS + PRODUCT GRID
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-10 sm:py-14 lg:py-20 bg-brown-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">

            <!-- Filters Sidebar -->
            <aside class="w-full lg:w-64 flex-shrink-0">
              <div class="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-gray-100 lg:sticky lg:top-24">
                <div class="flex items-center justify-between mb-4">
                  <h2 class="text-base sm:text-lg font-bold text-brown-700 font-heading">
                    <i class="fa fa-sliders text-saffron-500 mr-1" aria-hidden="true"></i> Filters
                  </h2>
                  <button (click)="resetFilters()" class="text-xs text-saffron-500 hover:text-saffron-600 font-semibold">Reset All</button>
                </div>

                <!-- Mukhi Filter -->
                <div class="mb-4 pb-4 border-b border-gray-100">
                  <h3 class="text-xs sm:text-sm font-bold text-brown-700 mb-2">Mukhi</h3>
                  <div class="grid grid-cols-4 lg:grid-cols-3 gap-1.5">
                    @for (m of mukhiOptions; track m) {
                      <button (click)="toggleMukhi(m)"
                              class="px-2 py-1.5 text-[10px] sm:text-xs rounded-lg border transition-all text-center font-medium"
                              [class.bg-saffron-500]="selectedMukhi.includes(m)"
                              [class.text-white]="selectedMukhi.includes(m)"
                              [class.border-saffron-500]="selectedMukhi.includes(m)"
                              [class.bg-white]="!selectedMukhi.includes(m)"
                              [class.text-gray-600]="!selectedMukhi.includes(m)"
                              [class.border-gray-200]="!selectedMukhi.includes(m)"
                              [class.hover:border-saffron-300]="!selectedMukhi.includes(m)">
                        {{ m }} Mukhi
                      </button>
                    }
                  </div>
                </div>

                <!-- Origin Filter -->
                <div class="mb-4 pb-4 border-b border-gray-100">
                  <h3 class="text-xs sm:text-sm font-bold text-brown-700 mb-2">Origin</h3>
                  <div class="space-y-1.5">
                    @for (o of originOptions; track o) {
                      <label class="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" [checked]="selectedOrigins.includes(o)" (change)="toggleOrigin(o)"
                               class="w-3.5 h-3.5 rounded border-gray-300 text-saffron-500 focus:ring-saffron-500">
                        <span class="text-xs sm:text-sm text-gray-600 group-hover:text-brown-700">{{ o }}</span>
                      </label>
                    }
                  </div>
                </div>

                <!-- Product Type Filter -->
                <div class="mb-4 pb-4 border-b border-gray-100">
                  <h3 class="text-xs sm:text-sm font-bold text-brown-700 mb-2">Product Type</h3>
                  <div class="space-y-1.5">
                    @for (t of typeOptions; track t) {
                      <label class="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" [checked]="selectedTypes.includes(t)" (change)="toggleType(t)"
                               class="w-3.5 h-3.5 rounded border-gray-300 text-saffron-500 focus:ring-saffron-500">
                        <span class="text-xs sm:text-sm text-gray-600 group-hover:text-brown-700">{{ t }}</span>
                      </label>
                    }
                  </div>
                </div>

                <!-- Price Range -->
                <div class="mb-4 pb-4 border-b border-gray-100">
                  <h3 class="text-xs sm:text-sm font-bold text-brown-700 mb-2">Price Range</h3>
                  <div class="space-y-1.5">
                    @for (p of priceRanges; track p.label) {
                      <label class="flex items-center gap-2 cursor-pointer group">
                        <input type="radio" name="priceRange" [checked]="selectedPriceRange === p.label" (change)="selectedPriceRange = p.label"
                               class="w-3.5 h-3.5 border-gray-300 text-saffron-500 focus:ring-saffron-500">
                        <span class="text-xs sm:text-sm text-gray-600 group-hover:text-brown-700">{{ p.label }}</span>
                      </label>
                    }
                  </div>
                </div>

                <!-- Availability -->
                <div class="mb-4 pb-4 border-b border-gray-100">
                  <h3 class="text-xs sm:text-sm font-bold text-brown-700 mb-2">Availability</h3>
                  <label class="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" [(ngModel)]="inStockOnly" class="w-3.5 h-3.5 rounded border-gray-300 text-saffron-500 focus:ring-saffron-500">
                    <span class="text-xs sm:text-sm text-gray-600 group-hover:text-brown-700">In Stock Only</span>
                  </label>
                </div>

                <!-- Sort -->
                <div>
                  <h3 class="text-xs sm:text-sm font-bold text-brown-700 mb-2">Sort By</h3>
                  <select [(ngModel)]="sortBy"
                          class="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm text-brown-700 focus:outline-none focus:border-saffron-500 focus:ring-1 focus:ring-saffron-500">
                    <option value="featured">Featured</option>
                    <option value="newest">Newest First</option>
                    <option value="bestselling">Best Selling</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>
            </aside>

            <!-- Product Grid -->
            <div class="flex-1">
              <div class="flex items-center justify-between mb-5 sm:mb-6">
                <div>
                  <h2 class="text-lg sm:text-xl font-bold text-brown-700 font-heading">All Products</h2>
                  <p class="text-xs sm:text-sm text-gray-500">Showing {{ filteredProducts.length }} products</p>
                </div>
                <button (click)="mobileFiltersOpen = !mobileFiltersOpen" class="lg:hidden px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-brown-700">
                  <i class="fa fa-sliders mr-1" aria-hidden="true"></i> Filters
                </button>
              </div>

              <div class="grid grid-cols-1 xs:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                @for (product of filteredProducts; track product.id) {
                  <div class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group">
                    <div class="relative h-44 sm:h-52 bg-gradient-to-br from-brown-50 to-brown-100 flex items-center justify-center overflow-hidden">
                      <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gold-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <i class="fa fa-diamond text-gold-500 text-3xl sm:text-4xl" aria-hidden="true"></i>
                      </div>
                      @if (product.badge) {
                        <span class="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 text-[10px] sm:text-xs font-bold rounded-full"
                              [class.bg-saffron-500]="product.badge === 'Best Seller'"
                              [class.text-white]="product.badge === 'Best Seller' || product.badge === 'New'"
                              [class.bg-green-500]="product.badge === 'New'"
                              [class.bg-gold-500]="product.badge === 'Trending'"
                              [class.text-brown-800]="product.badge === 'Trending'">
                          {{ product.badge }}
                        </span>
                      }
                      @if (!product.inStock) {
                        <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span class="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">Out of Stock</span>
                        </div>
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
                      <h3 class="text-xs sm:text-sm font-bold text-brown-700 mb-1 line-clamp-2 min-h-[2.5rem]">{{ product.name }}</h3>
                      <p class="text-[10px] sm:text-xs text-gray-500 mb-2 line-clamp-2">{{ product.desc }}</p>
                      <div class="flex items-center gap-2 mb-3">
                        <span class="text-sm sm:text-base font-bold text-saffron-500">\u20B9{{ product.price | number }}</span>
                        @if (product.oldPrice > product.price) {
                          <span class="text-[10px] sm:text-xs text-gray-400 line-through">\u20B9{{ product.oldPrice | number }}</span>
                          <span class="text-[10px] sm:text-xs text-green-600 font-semibold">{{ getDiscount(product) }}% off</span>
                        }
                      </div>
                      <div class="flex gap-2">
                        <a routerLink="/about"
                           class="flex-1 text-center py-1.5 sm:py-2 border border-brown-700 text-brown-700 text-[10px] sm:text-xs font-semibold rounded-lg hover:bg-brown-700 hover:text-white transition-all">
                          View Details
                        </a>
                        <button (click)="addToCart(product)"
                                [disabled]="!product.inStock"
                                class="flex-1 py-1.5 sm:py-2 bg-brown-700 text-white text-[10px] sm:text-xs font-semibold rounded-lg hover:bg-saffron-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                          <i class="fa fa-cart-plus mr-0.5" aria-hidden="true"></i> Add to Cart
                        </button>
                      </div>
                      <button (click)="buyNow(product)"
                              [disabled]="!product.inStock"
                              class="w-full mt-2 py-1.5 sm:py-2 bg-saffron-500 text-white text-[10px] sm:text-xs font-bold rounded-lg hover:bg-saffron-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                        Buy Now
                      </button>
                    </div>
                  </div>
                }
              </div>

              @if (filteredProducts.length === 0) {
                <div class="text-center py-16 sm:py-20">
                  <i class="fa fa-search text-4xl text-gray-300 mb-4" aria-hidden="true"></i>
                  <h3 class="text-lg font-bold text-brown-700 mb-2">No Products Found</h3>
                  <p class="text-sm text-gray-500 mb-4">Try adjusting your filters to find what you are looking for.</p>
                  <button (click)="resetFilters()" class="px-5 py-2 bg-saffron-500 text-white text-sm font-semibold rounded-lg hover:bg-saffron-600 transition-all">Reset Filters</button>
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 3: FEATURED CATEGORIES
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-10 sm:py-14 lg:py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <span class="inline-block px-3 py-1 bg-saffron-500/10 text-saffron-500 text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">Browse by Category</span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-700 font-heading">Featured Rudraksha Categories</h2>
            <p class="mt-3 text-sm sm:text-base text-gray-600">Explore our complete range organized by mukhi count, origin, and product type.</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            @for (cat of categories; track cat.title) {
              <div class="bg-brown-50 rounded-xl p-4 sm:p-5 border border-brown-100 hover:border-saffron-500/30 hover:bg-saffron-500/5 transition-all duration-300 group">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-full bg-saffron-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-saffron-500/20 transition-all">
                    <i class="fa fa-diamond text-saffron-500 text-sm" aria-hidden="true"></i>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h3 class="text-xs sm:text-sm font-bold text-brown-700 mb-1">{{ cat.title }}</h3>
                    <p class="text-[10px] sm:text-xs text-gray-500 leading-relaxed mb-2">{{ cat.desc }}</p>
                    <a routerLink="/shop" class="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-saffron-500 hover:text-saffron-600 transition-colors">
                      Explore Products <i class="fa fa-arrow-right text-[10px]" aria-hidden="true"></i>
                    </a>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 5: WHY BUY FROM RUDRAKSHAMA
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-10 sm:py-14 lg:py-20 bg-brown-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <span class="inline-block px-3 py-1 bg-saffron-500/10 text-saffron-500 text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">Our Promise</span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-700 font-heading">Why Buy from Rudrakshama?</h2>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            @for (item of whyUs; track item.title) {
              <div class="bg-white rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 group text-center">
                <div class="w-12 h-12 rounded-full bg-saffron-500/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-saffron-500/20 transition-all">
                  <i [class]="item.icon" class="text-saffron-500 text-lg" aria-hidden="true"></i>
                </div>
                <h3 class="text-sm sm:text-base font-bold text-brown-700 mb-1">{{ item.title }}</h3>
                <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">{{ item.desc }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 6: BUYING GUIDE
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-10 sm:py-14 lg:py-20 bg-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8 sm:mb-12">
            <span class="inline-block px-3 py-1 bg-saffron-500/10 text-saffron-500 text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">Knowledge Center</span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-700 font-heading">Rudraksha Buying Guide</h2>
            <p class="mt-3 text-sm sm:text-base text-gray-600">Everything you need to know before buying your first (or next) Rudraksha.</p>
          </div>
          <div class="space-y-5 sm:space-y-6">
            @for (item of buyingGuide; track item.title; let i = $index) {
              <div class="bg-brown-50 rounded-xl p-5 sm:p-6 border border-brown-100">
                <div class="flex items-start gap-3 sm:gap-4">
                  <div class="w-8 h-8 rounded-full bg-saffron-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">{{ i + 1 }}</div>
                  <div>
                    <h3 class="text-base sm:text-lg font-bold text-brown-700 mb-2">{{ item.title }}</h3>
                    <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">{{ item.content }}</p>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 7: CUSTOMER REVIEWS
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-10 sm:py-14 lg:py-20 bg-brown-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <span class="inline-block px-3 py-1 bg-saffron-500/10 text-saffron-500 text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">Customer Love</span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-700 font-heading">What Our Customers Say</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            @for (review of reviews; track review.name) {
              <div class="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-gray-100">
                <div class="flex items-center gap-0.5 mb-2">
                  @for (star of [1,2,3,4,5]; track star) {
                    <i class="fa text-xs"
                       [class.fa-star]="star <= review.rating"
                       [class.fa-star-o]="star > review.rating"
                       [class.text-gold-500]="star <= review.rating"
                       [class.text-gray-300]="star > review.rating"
                       aria-hidden="true"></i>
                  }
                </div>
                <p class="text-[10px] sm:text-xs text-saffron-500 font-medium mb-2">Purchased: {{ review.product }}</p>
                <p class="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 italic">"{{ review.review }}"</p>
                <div class="flex items-center gap-2 border-t border-gray-100 pt-3">
                  <div class="w-8 h-8 rounded-full bg-gradient-to-br from-saffron-500 to-gold-500 flex items-center justify-center text-white font-bold text-[10px] sm:text-xs">
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
           SECTION 8: FAQ
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-10 sm:py-14 lg:py-20 bg-white">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8 sm:mb-12">
            <span class="inline-block px-3 py-1 bg-saffron-500/10 text-saffron-500 text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">FAQ</span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-700 font-heading">Frequently Asked Questions</h2>
          </div>
          <div class="space-y-2.5 sm:space-y-3">
            @for (faq of faqs; track faq.q; let i = $index) {
              <div class="border border-gray-200 rounded-xl overflow-hidden hover:border-saffron-500/30 transition-all">
                <button (click)="toggleFaq(i)"
                        class="w-full flex items-center justify-between gap-3 p-3.5 sm:p-4 text-left bg-white hover:bg-brown-50/50 transition-colors">
                  <span class="text-xs sm:text-sm font-semibold text-brown-700">{{ faq.q }}</span>
                  <i class="fa transition-transform duration-300 text-saffron-500 text-xs flex-shrink-0"
                     [class.fa-chevron-down]="!faq.open"
                     [class.fa-chevron-up]="faq.open"
                     aria-hidden="true"></i>
                </button>
                @if (faq.open) {
                  <div class="px-3.5 sm:px-4 pb-3.5 sm:pb-4 text-xs sm:text-sm text-gray-600 leading-relaxed bg-brown-50/30">
                    {{ faq.a }}
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 9: FINAL CTA
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-14 sm:py-20 lg:py-28 bg-brown-700 relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-10 left-10 w-32 h-32 bg-saffron-500 rounded-full blur-3xl"></div>
          <div class="absolute bottom-10 right-10 w-48 h-48 bg-gold-500 rounded-full blur-3xl"></div>
        </div>
        <div class="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span class="inline-block px-3 py-1 bg-saffron-500/15 text-saffron-400 text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-6">
            <i class="fa fa-om mr-1" aria-hidden="true"></i> Your Sacred Collection Awaits
          </span>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-heading leading-tight">
            Begin Your Spiritual Journey <span class="text-saffron-500">Today</span>
          </h2>
          <p class="mt-3 sm:mt-4 text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Browse our collection of genuine, lab-certified Rudraksha with complete confidence. Every bead is backed by our authenticity guarantee, free shipping, and hassle-free returns.
          </p>
          <div class="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a routerLink="/home"
               class="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-3.5 bg-saffron-500 text-white font-bold rounded-lg hover:bg-saffron-600 transition-all shadow-lg shadow-saffron-500/25 text-sm sm:text-base">
              <i class="fa fa-shopping-cart mr-1" aria-hidden="true"></i> Shop Now
            </a>
            <a routerLink="/contact"
               class="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-gold-500 hover:text-gold-500 transition-all text-sm sm:text-base">
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
export class ShopComponent implements OnInit {
  mobileFiltersOpen = false;
  selectedMukhi: number[] = [];
  selectedOrigins: string[] = [];
  selectedTypes: string[] = [];
  selectedPriceRange = 'All';
  inStockOnly = false;
  sortBy = 'featured';

  mukhiOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  originOptions = ['Nepali', 'Indonesian'];
  typeOptions = ['Beads', 'Mala', 'Bracelet', 'Pendant', 'Puja Kit'];
  priceRanges = [
    { label: 'All', min: 0, max: Infinity },
    { label: 'Under \u20B91,000', min: 0, max: 999 },
    { label: '\u20B91,000 - \u20B93,000', min: 1000, max: 3000 },
    { label: '\u20B93,000 - \u20B95,000', min: 3000, max: 5000 },
    { label: '\u20B95,000 - \u20B910,000', min: 5000, max: 10000 },
    { label: 'Above \u20B910,000', min: 10000, max: Infinity },
  ];

  filteredProducts: Product[] = [];
  faqStates: boolean[] = [];

  allProducts: Product[] = [
    { id: 1, name: '5 Mukhi Nepali Rudraksha Mala (108+1 Beads)', desc: 'Original Panchmukhi Rudraksha mala from Nepal. Ideal for japa meditation and daily wear.', price: 1499, oldPrice: 2499, rating: 5, reviews: 342, badge: 'Best Seller', mukhi: 5, origin: 'Nepali', type: 'Mala', inStock: true, image: '' },
    { id: 2, name: '1 Mukhi Rudraksha Pendant (Pure Silver)', desc: 'Rare Ek Mukhi Rudraksha in pure silver pendant. The ultimate symbol of Lord Shiva.', price: 4999, oldPrice: 7999, rating: 5, reviews: 128, badge: 'Trending', mukhi: 1, origin: 'Nepali', type: 'Pendant', inStock: true, image: '' },
    { id: 3, name: 'Rudraksha Bracelet (7 Beads, Adjustable)', desc: 'Daily wear bracelet with 7 natural Rudraksha beads. Perfect for spiritual beginners.', price: 899, oldPrice: 1499, rating: 4, reviews: 567, badge: 'Best Seller', mukhi: 5, origin: 'Indonesian', type: 'Bracelet', inStock: true, image: '' },
    { id: 4, name: 'Nepali Rudraksha Combo Set (5, 7, 11 Mukhi)', desc: 'Curated combo of three powerful Nepali Rudraksha beads for complete spiritual protection.', price: 3999, oldPrice: 5999, rating: 5, reviews: 89, badge: 'New', mukhi: 5, origin: 'Nepali', type: 'Beads', inStock: true, image: '' },
    { id: 5, name: '7 Mukhi Rudraksha Mala (Gold Plated)', desc: 'Saatmukhi Rudraksha mala for wealth and prosperity. Gold-plated premium design.', price: 2499, oldPrice: 3999, rating: 4, reviews: 201, badge: '', mukhi: 7, origin: 'Nepali', type: 'Mala', inStock: true, image: '' },
    { id: 6, name: 'Indonesian Rudraksha Mala (5 Mukhi)', desc: 'Affordable yet powerful Indonesian Panchmukhi mala for daily chanting and meditation.', price: 599, oldPrice: 999, rating: 4, reviews: 890, badge: 'Best Seller', mukhi: 5, origin: 'Indonesian', type: 'Mala', inStock: true, image: '' },
    { id: 7, name: 'Rudraksha + Sphatik Mala Combination', desc: 'Powerful combo of Rudraksha and Sphatik beads for amplified spiritual energy.', price: 1299, oldPrice: 1999, rating: 5, reviews: 156, badge: 'Trending', mukhi: 5, origin: 'Nepali', type: 'Mala', inStock: true, image: '' },
    { id: 8, name: 'Complete Puja Kit with Rudraksha Mala', desc: 'Everything for puja \u2014 Rudraksha mala, dhoop, sindoor, akshata in one sacred box.', price: 2999, oldPrice: 4499, rating: 4, reviews: 73, badge: 'New', mukhi: 5, origin: 'Nepali', type: 'Puja Kit', inStock: true, image: '' },
    { id: 9, name: '2 Mukhi Rudraksha Pendant (Silver)', desc: 'Dwimukhi Rudraksha in silver pendant for unity, harmony, and emotional balance.', price: 1799, oldPrice: 2999, rating: 5, reviews: 64, badge: '', mukhi: 2, origin: 'Nepali', type: 'Pendant', inStock: true, image: '' },
    { id: 10, name: '9 Mukhi Rudraksha Mala (Durga)', desc: 'Navmukhi Rudraksha mala for courage and divine protection. Blessed by Goddess Durga.', price: 3499, oldPrice: 5499, rating: 5, reviews: 47, badge: 'New', mukhi: 9, origin: 'Nepali', type: 'Mala', inStock: false, image: '' },
    { id: 11, name: '14 Mukhi Rudraksha Bead (Hanuman)', desc: 'The divine bead for ultimate protection and courage. Rarest and most powerful variety.', price: 12999, oldPrice: 18999, rating: 5, reviews: 22, badge: 'Trending', mukhi: 14, origin: 'Nepali', type: 'Beads', inStock: true, image: '' },
    { id: 12, name: 'Indonesian Rudraksha Bracelet (5 Beads)', desc: 'Compact and lightweight Indonesian bracelet for daily spiritual wear.', price: 499, oldPrice: 799, rating: 4, reviews: 423, badge: 'Best Seller', mukhi: 5, origin: 'Indonesian', type: 'Bracelet', inStock: true, image: '' },
  ];

  categories: Category[] = [
    { title: '1 Mukhi Rudraksha', desc: 'The rarest bead \u2014 symbolizes Lord Shiva himself. Brings ultimate truth and liberation.', icon: 'fa fa-diamond' },
    { title: '2 Mukhi Rudraksha', desc: 'Represents Ardhanarishvara. Promotes unity, harmony, and emotional balance.', icon: 'fa fa-diamond' },
    { title: '3 Mukhi Rudraksha', desc: 'Symbolizes Lord Agni. Cleanses past sins and boosts confidence and vitality.', icon: 'fa fa-diamond' },
    { title: '4 Mukhi Rudraksha', desc: 'Represents Goddess Saraswati. Enhances knowledge, creativity, and communication.', icon: 'fa fa-diamond' },
    { title: '5 Mukhi Rudraksha', desc: 'Most common bead \u2014 symbolizes Lord Shiva. Brings peace, health, and spiritual growth.', icon: 'fa fa-diamond' },
    { title: '6 Mukhi Rudraksha', desc: 'Represents Lord Kartikeya. Develops willpower, focus, and attractiveness.', icon: 'fa fa-diamond' },
    { title: '7 Mukhi Rudraksha', desc: 'Symbolizes Goddess Lakshmi. Attracts wealth, prosperity, and financial abundance.', icon: 'fa fa-diamond' },
    { title: '8 Mukhi Rudraksha', desc: 'Represents Lord Ganesha. Removes obstacles and brings success in all endeavors.', icon: 'fa fa-diamond' },
    { title: '9 Mukhi Rudraksha', desc: 'Symbolizes Goddess Durga. Grants courage, energy, and divine protection.', icon: 'fa fa-diamond' },
    { title: '10 Mukhi Rudraksha', desc: 'Represents Lord Vishnu. Provides complete protection from negative energies.', icon: 'fa fa-diamond' },
    { title: '11 Mukhi Rudraksha', desc: 'Symbolizes Lord Hanuman. Grants courage, strength, and fearlessness.', icon: 'fa fa-diamond' },
    { title: '12 Mukhi Rudraksha', desc: 'Represents Lord Surya. Brings radiance, leadership, and self-confidence.', icon: 'fa fa-diamond' },
    { title: '13 Mukhi Rudraksha', desc: 'Symbolizes Lord Indra. Grants divine charisma, attraction, and wish fulfillment.', icon: 'fa fa-diamond' },
    { title: '14 Mukhi Rudraksha', desc: 'The divine bead \u2014 symbolizes Lord Hanuman. Ultimate protection and courage.', icon: 'fa fa-diamond' },
    { title: 'Nepali Rudraksha', desc: 'Premium Himalayan beads \u2014 larger, more potent, and considered the most powerful variety.', icon: 'fa fa-mountain' },
    { title: 'Indonesian Rudraksha', desc: 'Smaller, lighter, affordable beads from Java. Spiritually powerful and great for daily wear.', icon: 'fa fa-leaf' },
    { title: 'Rudraksha Mala', desc: 'Sacred 108+1 bead prayer malas for japa meditation, chanting, and spiritual practice.', icon: 'fa fa-circle-o-notch' },
    { title: 'Rudraksha Bracelet', desc: 'Elegant bracelets for daily wear \u2014 spiritual protection meets modern style.', icon: 'fa fa-circle' },
    { title: 'Pendants', desc: 'Beautifully crafted pendants in silver and gold-plated designs.', icon: 'fa fa-id-card-o' },
    { title: 'Puja Accessories', desc: 'Complete puja kits \u2014 malas, ash, sindoor, dhoop, and sacred items for worship.', icon: 'fa fa-fire' },
  ];

  whyUs = [
    { icon: 'fa fa-certificate', title: '100% Genuine Rudraksha', desc: 'Every bead is lab-tested and comes with a certificate of authenticity. No compromises.' },
    { icon: 'fa fa-diamond', title: 'Premium Quality', desc: 'Handpicked beads with correct mukhi count, natural texture, and verified spiritual energy.' },
    { icon: 'fa fa-lock', title: 'Secure Payments', desc: '256-bit SSL encrypted checkout. UPI, cards, net banking, and COD supported.' },
    { icon: 'fa fa-truck', title: 'Fast Shipping', desc: 'Free express delivery across India. Most orders dispatched within 24 hours.' },
    { icon: 'fa fa-undo', title: 'Easy Returns', desc: '7-day hassle-free return policy. Not satisfied? Return for a full refund.' },
    { icon: 'fa fa-headphones', title: 'Dedicated Support', desc: 'Spiritual advisors and customer care available via phone, WhatsApp, and email.' },
  ];

  buyingGuide = [
    { title: 'What is Rudraksha?', content: `Rudraksha beads are sacred seeds from the Elaeocarpus ganitrus tree, revered in Hinduism for thousands of years. According to ancient Vedic texts, these beads originated from the tears of Lord Shiva, shed out of compassion for humanity. Each bead has natural clefts called "mukhis" (faces) that determine its spiritual properties and benefits. Wearing genuine Rudraksha is believed to bring peace of mind, protection from negative energies, and acceleration of spiritual growth. Scientific research has also confirmed the electromagnetic, thermal, and anti-static properties of these remarkable beads, which interact with the human body's energy system to promote well-being and balance.` },
    { title: 'How to Choose the Right Mukhi?', content: `The number of mukhis on a Rudraksha determines its ruling deity and spiritual benefits. For beginners, the 5 Mukhi (Panchmukhi) is universally recommended \u2014 it represents Lord Shiva and brings peace, health, and spiritual growth. If you seek wealth, choose 7 Mukhi (Goddess Lakshmi). For obstacle removal, go with 8 Mukhi (Lord Ganesha). For protection, 10 Mukhi (Lord Vishnu) or 14 Mukhi (Lord Hanuman) are excellent choices. If you are unsure, consult our spiritual advisors who can guide you based on your specific goals, zodiac sign, and spiritual practice. Remember, the "best" Rudraksha is the one that resonates with your personal spiritual journey.` },
    { title: 'Nepali vs Indonesian Rudraksha', content: `Nepali Rudraksha beads originate from the Himalayan forests and are generally larger (15-25mm), heavier, and have deeper grooves. They are considered the most potent variety and are preferred for serious spiritual practice and remedial purposes. Indonesian Rudraksha, sourced from Java and Indonesia, are smaller (4-12mm), lighter, and more affordable. Despite their smaller size, they carry genuine spiritual energy and are excellent for daily wear, meditation, and those beginning their spiritual journey. Both varieties are authentic and effective \u2014 the choice depends on your budget, purpose, and personal preference. At Rudrakshama, we offer both varieties with the same quality guarantee.` },
    { title: 'How to Identify Genuine Rudraksha', content: `Authenticating Rudraksha requires careful observation. First, check the natural texture \u2014 genuine beads have naturally formed grooves (mukhis) that are not artificially carved. Second, perform the water test \u2014 real Rudraksha does not dissolve in water but may sink or float depending on density. Third, try the copper coin test \u2014 rub the bead between two copper coins; genuine beads leave a natural impression. Fourth, examine the seed inside \u2014 real beads have a natural seed structure. The most reliable method is purchasing from a trusted source like Rudrakshama, where every bead comes with an independent laboratory certification confirming its authenticity, mukhi count, and origin.` },
    { title: 'Care and Maintenance of Rudraksha', content: `Proper care ensures your Rudraksha retains its spiritual energy and physical beauty for generations. Apply a light coating of clarified butter (ghee) or sesame oil every few months to keep the beads nourished. Clean occasionally with a soft brush and lukewarm water \u2014 never use soap or chemicals. Store in a clean, dry place when not wearing. You may chant "Om Namah Shivaya" 108 times while holding the bead to re-energize it. Avoid wearing during intimate activities and remove before sleeping if uncomfortable. With proper care, a genuine Rudraksha mala can last a lifetime and even be passed down as a sacred heirloom to future generations.` },
  ];

  reviews = [
    { name: 'Rajesh Kumar', city: 'Varanasi, UP', rating: 5, product: '5 Mukhi Nepali Mala', review: 'Outstanding quality. The beads are perfectly sized and the mala feels incredibly authentic. My daily japa practice has transformed since I started using it.', initials: 'RK' },
    { name: 'Priya Sharma', city: 'Mumbai, Maharashtra', rating: 5, product: '1 Mukhi Silver Pendant', review: 'Rudrakshama is the most trustworthy store I have found. The pendant is beautiful and came with a proper certificate. Truly premium quality and craftsmanship.', initials: 'PS' },
    { name: 'Anand Krishnan', city: 'Bangalore, Karnataka', rating: 5, product: 'Combo Set (5, 7, 11)', review: 'I was skeptical about buying online but Rudrakshama completely changed my perspective. The beads are genuine and their team guided me perfectly.', initials: 'AK' },
    { name: 'Meera Devi', city: 'Haridwar, Uttarakhand', rating: 4, product: '7 Mukhi Gold Plated Mala', review: 'Beautiful collection and fast delivery. The mala is gorgeous and well-crafted. My only suggestion would be to add more pendant designs.', initials: 'MD' },
    { name: 'Vikram Singh', city: 'Jaipur, Rajasthan', rating: 5, product: 'Sphatik + Rudraksha Combo', review: 'As a regular meditator, I can feel the energy difference. This combo is powerful. Highly recommend Rudrakshama to all spiritual seekers.', initials: 'VS' },
    { name: 'Lakshmi Narayan', city: 'Chennai, Tamil Nadu', rating: 5, product: 'Complete Puja Kit', review: 'Excellent quality and very affordable. Ordering from Rudrakshama for over a year now \u2014 consistently authentic. The puja kit is a must-have for every home.', initials: 'LN' },
  ];

  faqs = [
    { q: 'Are all products on Rudrakshama genuine?', a: 'Yes, absolutely. Every Rudraksha product we sell is 100% genuine, naturally sourced, and comes with an independent laboratory certificate of authenticity. We have a zero-tolerance policy for counterfeit products.', open: false },
    { q: 'How do I choose the right Rudraksha for me?', a: 'If you are new to Rudraksha, the 5 Mukhi (Panchmukhi) is universally recommended for peace, health, and spiritual growth. For specific goals like wealth (7 Mukhi), obstacle removal (8 Mukhi), or protection (10/14 Mukhi), choose accordingly. You can also contact our spiritual advisors for personalized guidance.', open: false },
    { q: 'What is the difference between Nepali and Indonesian Rudraksha?', a: 'Nepali Rudraksha are larger (15-25mm), heavier, and considered more potent due to their Himalayan origin. Indonesian Rudraksha are smaller (4-12mm), lighter, and more affordable. Both are genuine and spiritually effective \u2014 the choice depends on your budget and preference.', open: false },
    { q: 'Do you offer cash on delivery?', a: 'Yes, we offer cash on delivery (COD) for orders below \u20B95,000 across India. For higher-value prepaid orders, we recommend online payment for added security and faster processing.', open: false },
    { q: 'How long does shipping take?', a: 'We offer free standard shipping across India, which typically takes 3-5 business days. Express delivery (1-2 days) is available for major metro cities. All orders are dispatched within 24 hours with real-time tracking.', open: false },
    { q: 'Can I return a product if I am not satisfied?', a: 'Yes, we offer a 7-day hassle-free return policy. If you are not satisfied for any reason, return the product in its original packaging for a full refund. Refunds are processed within 3-5 business days.', open: false },
    { q: 'How should I wear Rudraksha?', a: 'Rudraksha can be worn as a mala around the neck, as a bracelet on the wrist, or as a pendant. It is recommended to wear it after bathing and chanting "Om Namah Shivaya" 108 times before first wearing. You can wear it during sleep, work, and daily activities.', open: false },
    { q: 'Can women wear Rudraksha during menstruation?', a: 'Yes, women can wear Rudraksha during menstruation. There is no scriptural or scientific restriction. The Rudraksha works on the body\'s energy system and is beneficial at all times.', open: false },
    { q: 'Do I need to energize the Rudraksha before wearing?', a: 'While not mandatory, energizing is recommended. Hold the bead, chant "Om Namah Shivaya" 108 times on a Monday or during Maha Shivaratri. This consecrates the bead and enhances its spiritual potency. All our products are pre-energized through Vedic rituals.', open: false },
    { q: 'Are there any side effects of wearing Rudraksha?', a: 'Genuine Rudraksha has no negative side effects. If you experience discomfort, it may be due to an allergic reaction to the bead material or wearing a counterfeit product. Always buy from a trusted source like Rudrakshama.', open: false },
    { q: 'Can I wear multiple Rudraksha together?', a: 'Yes, you can wear multiple Rudraksha beads or mukhis together. In fact, combination sets (like our 5-7-11 combo) are designed to amplify spiritual benefits. Our experts can help you choose compatible combinations.', open: false },
    { q: 'Do you ship across all of India?', a: 'Yes, we deliver to every pincode in India. We also offer international shipping to select countries. Contact us for international shipping rates and availability.', open: false },
    { q: 'How can I track my order?', a: 'Once your order is dispatched, you will receive a tracking link via WhatsApp and SMS. You can also log into your account or contact our support team for real-time order status updates.', open: false },
    { q: 'Can I buy in bulk for my temple or organization?', a: 'Yes, we offer special bulk pricing for temples, spiritual organizations, yoga studios, and resellers. Contact us with your requirements and we will provide a customized quote.', open: false },
    { q: 'What payment methods do you accept?', a: 'We accept UPI (Google Pay, PhonePe, Paytm), credit/debit cards, net banking, and cash on delivery. All online transactions are secured with 256-bit SSL encryption.', open: false },
  ];

  ngOnInit() {
    this.applyFilters();
  }

  toggleMukhi(m: number) {
    const idx = this.selectedMukhi.indexOf(m);
    if (idx > -1) { this.selectedMukhi.splice(idx, 1); } else { this.selectedMukhi.push(m); }
    this.applyFilters();
  }

  toggleOrigin(o: string) {
    const idx = this.selectedOrigins.indexOf(o);
    if (idx > -1) { this.selectedOrigins.splice(idx, 1); } else { this.selectedOrigins.push(o); }
    this.applyFilters();
  }

  toggleType(t: string) {
    const idx = this.selectedTypes.indexOf(t);
    if (idx > -1) { this.selectedTypes.splice(idx, 1); } else { this.selectedTypes.push(t); }
    this.applyFilters();
  }

  resetFilters() {
    this.selectedMukhi = [];
    this.selectedOrigins = [];
    this.selectedTypes = [];
    this.selectedPriceRange = 'All';
    this.inStockOnly = false;
    this.sortBy = 'featured';
    this.applyFilters();
  }

  applyFilters() {
    let result = [...this.allProducts];

    if (this.selectedMukhi.length > 0) {
      result = result.filter(p => this.selectedMukhi.includes(p.mukhi));
    }
    if (this.selectedOrigins.length > 0) {
      result = result.filter(p => this.selectedOrigins.includes(p.origin));
    }
    if (this.selectedTypes.length > 0) {
      result = result.filter(p => this.selectedTypes.includes(p.type));
    }
    if (this.selectedPriceRange !== 'All') {
      const range = this.priceRanges.find(r => r.label === this.selectedPriceRange);
      if (range) { result = result.filter(p => p.price >= range.min && p.price < range.max); }
    }
    if (this.inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    switch (this.sortBy) {
      case 'newest': result.reverse(); break;
      case 'bestselling': result.sort((a, b) => b.reviews - a.reviews); break;
      case 'price_asc': result.sort((a, b) => a.price - b.price); break;
      case 'price_desc': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
    }

    this.filteredProducts = result;
  }

  getDiscount(product: Product): number {
    return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  }

  addToCart(product: Product) {
    alert(`Added to cart: ${product.name}`);
  }

  buyNow(product: Product) {
    alert(`Proceeding to checkout: ${product.name} - \u20B9${product.price}`);
  }

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
