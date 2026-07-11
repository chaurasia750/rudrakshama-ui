import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EnquiriesService, EnquiryRequest } from '../../../../services/enquiries.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="min-h-screen bg-white font-body">

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 1: CONTACT INFORMATION
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-14 sm:py-20 lg:py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span class="inline-block px-3 py-1 bg-saffron-500/10 text-saffron-500 text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">Get in Touch</span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-700 font-heading">Contact Information</h2>
            <p class="mt-3 text-sm sm:text-base text-gray-600">Reach out through any of these channels. We are always happy to help fellow seekers on their spiritual journey.</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            <!-- Office Address -->
            <div class="p-5 sm:p-6 rounded-xl bg-brown-50 border border-brown-100 hover:border-saffron-500/30 hover:shadow-md transition-all duration-300 group">
              <div class="w-12 h-12 rounded-full bg-saffron-500/10 flex items-center justify-center mb-4 group-hover:bg-saffron-500/20 transition-all">
                <i class="fa fa-map-marker text-saffron-500 text-lg" aria-hidden="true"></i>
              </div>
              <h3 class="text-sm sm:text-base font-bold text-brown-700 mb-1">Office Address</h3>
              <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">Barew, Adalhat,<br>Mirzapur, Uttar Pradesh 221002,<br>India</p>
            </div>
            <!-- Phone -->
            <div class="p-5 sm:p-6 rounded-xl bg-brown-50 border border-brown-100 hover:border-saffron-500/30 hover:shadow-md transition-all duration-300 group">
              <div class="w-12 h-12 rounded-full bg-saffron-500/10 flex items-center justify-center mb-4 group-hover:bg-saffron-500/20 transition-all">
                <i class="fa fa-phone text-saffron-500 text-lg" aria-hidden="true"></i>
              </div>
              <h3 class="text-sm sm:text-base font-bold text-brown-700 mb-1">Phone Number</h3>
              <a href="tel:+919454799616" class="text-xs sm:text-sm text-gray-600 hover:text-saffron-500 transition-colors">+91 94547 99616</a>
              <p class="text-[10px] sm:text-xs text-gray-400 mt-1">Mon - Sat, 9 AM - 7 PM</p>
            </div>
            <!-- WhatsApp -->
            <div class="p-5 sm:p-6 rounded-xl bg-brown-50 border border-brown-100 hover:border-saffron-500/30 hover:shadow-md transition-all duration-300 group">
              <div class="w-12 h-12 rounded-full bg-saffron-500/10 flex items-center justify-center mb-4 group-hover:bg-saffron-500/20 transition-all">
                <i class="fa fa-whatsapp text-saffron-500 text-lg" aria-hidden="true"></i>
              </div>
              <h3 class="text-sm sm:text-base font-bold text-brown-700 mb-1">WhatsApp</h3>
              <a href="https://wa.me/919454799616" target="_blank" rel="noopener noreferrer" class="text-xs sm:text-sm text-gray-600 hover:text-saffron-500 transition-colors">+91 94547 99616</a>
              <p class="text-[10px] sm:text-xs text-gray-400 mt-1">Quick response guaranteed</p>
            </div>
            <!-- Email -->
            <div class="p-5 sm:p-6 rounded-xl bg-brown-50 border border-brown-100 hover:border-saffron-500/30 hover:shadow-md transition-all duration-300 group">
              <div class="w-12 h-12 rounded-full bg-saffron-500/10 flex items-center justify-center mb-4 group-hover:bg-saffron-500/20 transition-all">
                <i class="fa fa-envelope text-saffron-500 text-lg" aria-hidden="true"></i>
              </div>
              <h3 class="text-sm sm:text-base font-bold text-brown-700 mb-1">Email Address</h3>
              <a href="mailto:amitkumarpandey28075@gmail.com" class="text-xs sm:text-sm text-gray-600 hover:text-saffron-500 transition-colors break-all">amitkumarpandey28075&#64;gmail.com</a>
            </div>
            <!-- Business Hours -->
            <div class="p-5 sm:p-6 rounded-xl bg-brown-50 border border-brown-100 hover:border-saffron-500/30 hover:shadow-md transition-all duration-300 group">
              <div class="w-12 h-12 rounded-full bg-saffron-500/10 flex items-center justify-center mb-4 group-hover:bg-saffron-500/20 transition-all">
                <i class="fa fa-clock-o text-saffron-500 text-lg" aria-hidden="true"></i>
              </div>
              <h3 class="text-sm sm:text-base font-bold text-brown-700 mb-1">Business Hours</h3>
              <p class="text-xs sm:text-sm text-gray-600 leading-relaxed">Monday - Saturday<br>9:00 AM - 7:00 PM<br><span class="text-saffron-500 font-medium">Sunday: Online Support Only</span></p>
            </div>
            <!-- Contact Person -->
            <div class="p-5 sm:p-6 rounded-xl bg-brown-50 border border-brown-100 hover:border-saffron-500/30 hover:shadow-md transition-all duration-300 group">
              <div class="w-12 h-12 rounded-full bg-saffron-500/10 flex items-center justify-center mb-4 group-hover:bg-saffron-500/20 transition-all">
                <i class="fa fa-user text-saffron-500 text-lg" aria-hidden="true"></i>
              </div>
              <h3 class="text-sm sm:text-base font-bold text-brown-700 mb-1">Contact Person</h3>
              <p class="text-xs sm:text-sm text-gray-600">Amit Kumar Pandey</p>
              <p class="text-[10px] sm:text-xs text-gray-400 mt-1">Founder, Rudrakshama</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 3: CONTACT FORM + MAP
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-14 sm:py-20 lg:py-24 bg-brown-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <!-- Contact Form -->
            <div>
              <span class="inline-block px-3 py-1 bg-saffron-500/10 text-saffron-500 text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">Send a Message</span>
              <h2 class="text-2xl sm:text-3xl font-bold text-brown-700 font-heading mb-2">Write to Us</h2>
              <p class="text-sm text-gray-600 mb-6 sm:mb-8">Fill out the form below and our team will get back to you within 2-4 hours during business hours.</p>

              <form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)" class="space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label for="contact-name" class="block text-xs sm:text-sm font-semibold text-brown-700 mb-1.5">Full Name <span class="text-saffron-500">*</span></label>
                    <input id="contact-name" type="text" name="name" ngModel required
                           class="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-lg text-brown-700 text-sm placeholder-gray-400 focus:outline-none focus:border-saffron-500 focus:ring-1 focus:ring-saffron-500 transition-colors"
                           placeholder="Your full name">
                  </div>
                  <div>
                    <label for="contact-phone" class="block text-xs sm:text-sm font-semibold text-brown-700 mb-1.5">Mobile Number <span class="text-saffron-500">*</span></label>
                    <input id="contact-phone" type="tel" name="phone" ngModel required
                           class="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-lg text-brown-700 text-sm placeholder-gray-400 focus:outline-none focus:border-saffron-500 focus:ring-1 focus:ring-saffron-500 transition-colors"
                           placeholder="+91 98765 43210">
                  </div>
                </div>
                <div>
                  <label for="contact-email" class="block text-xs sm:text-sm font-semibold text-brown-700 mb-1.5">Email Address <span class="text-saffron-500">*</span></label>
                  <input id="contact-email" type="email" name="email" ngModel required
                         class="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-lg text-brown-700 text-sm placeholder-gray-400 focus:outline-none focus:border-saffron-500 focus:ring-1 focus:ring-saffron-500 transition-colors"
                         placeholder="your@email.com">
                </div>
                <div>
                  <label for="contact-subject" class="block text-xs sm:text-sm font-semibold text-brown-700 mb-1.5">Subject <span class="text-saffron-500">*</span></label>
                  <select id="contact-subject" name="subject" ngModel required
                          class="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-lg text-brown-700 text-sm focus:outline-none focus:border-saffron-500 focus:ring-1 focus:ring-saffron-500 transition-colors">
                    <option value="" disabled selected>Select a subject</option>
                    <option value="Product Inquiry">Product Inquiry</option>
                    <option value="Order Support">Order Support</option>
                    <option value="Shipping Query">Shipping Query</option>
                    <option value="Bulk Order">Bulk Order</option>
                    <option value="Rudraksha Guidance">Rudraksha Guidance</option>
                    <option value="Payment Issue">Payment Issue</option>
                    <option value="Return & Refund">Return & Refund</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label for="contact-message" class="block text-xs sm:text-sm font-semibold text-brown-700 mb-1.5">Your Message <span class="text-saffron-500">*</span></label>
                  <textarea id="contact-message" name="message" ngModel required rows="5"
                            class="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-200 rounded-lg text-brown-700 text-sm placeholder-gray-400 focus:outline-none focus:border-saffron-500 focus:ring-1 focus:ring-saffron-500 transition-colors resize-none"
                            placeholder="Tell us how we can help you..."></textarea>
                </div>
                <button type="submit" [disabled]="submitting"
                        class="w-full py-3 sm:py-3.5 bg-saffron-500 hover:bg-saffron-600 text-white font-bold rounded-lg transition-all shadow-lg shadow-saffron-500/25 text-sm sm:text-base"
                        [class.opacity-50]="submitting" [class.cursor-not-allowed]="submitting">
                  @if (submitting) {
                    <i class="fa fa-spinner fa-spin mr-1" aria-hidden="true"></i> Sending...
                  } @else {
                    <i class="fa fa-paper-plane mr-1" aria-hidden="true"></i> Send Message
                  }
                </button>
                @if (successMsg) {
                  <div class="p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm text-center">
                    <i class="fa fa-check-circle mr-1" aria-hidden="true"></i> {{ successMsg }}
                  </div>
                }
                @if (errorMsg) {
                  <div class="p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center">
                    <i class="fa fa-exclamation-circle mr-1" aria-hidden="true"></i> {{ errorMsg }}
                  </div>
                }
              </form>
            </div>

            <!-- Google Map -->
            <div class="flex flex-col">
              <span class="inline-block px-3 py-1 bg-saffron-500/10 text-saffron-500 text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">Our Location</span>
              <h2 class="text-2xl sm:text-3xl font-bold text-brown-700 font-heading mb-2">Find Us on the Map</h2>
              <p class="text-sm text-gray-600 mb-6">Visit our office in Mirzapur, Uttar Pradesh for in-person consultations.</p>
              <div class="rounded-xl overflow-hidden shadow-lg border border-gray-200 flex-1 min-h-[300px] lg:min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58916.62583979457!2d82.55!3d25.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398f33e3b6b6b6b7%3A0x1234567890abcdef!2sMirzapur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
                  width="100%" height="100%" style="border:0; min-height: 300px;" allowfullscreen="" loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  title="Rudrakshama office location in Mirzapur, Uttar Pradesh"></iframe>
              </div>
              <a href="https://www.google.com/maps/search/Mirzapur+Uttar+Pradesh+221002"
                 target="_blank" rel="noopener noreferrer"
                 class="mt-4 inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brown-700 text-white text-sm font-semibold rounded-lg hover:bg-brown-800 transition-all">
                <i class="fa fa-location-arrow" aria-hidden="true"></i> Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 5: WHY CONTACT US
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-14 sm:py-20 lg:py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span class="inline-block px-3 py-1 bg-saffron-500/10 text-saffron-500 text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">How We Help</span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-700 font-heading">When Should You Contact Us?</h2>
            <p class="mt-3 text-sm sm:text-base text-gray-600">We are here for every step of your spiritual journey. Reach out whenever you need guidance, support, or simply want to talk about Rudraksha.</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            @for (reason of contactReasons; track reason.title) {
              <div class="p-4 sm:p-5 rounded-xl bg-brown-50 border border-brown-100 hover:border-saffron-500/30 hover:bg-saffron-500/5 transition-all duration-300 group">
                <div class="w-10 h-10 rounded-full bg-saffron-500/10 flex items-center justify-center mb-3 group-hover:bg-saffron-500/20 transition-all">
                  <i [class]="reason.icon" class="text-saffron-500 text-base" aria-hidden="true"></i>
                </div>
                <h3 class="text-sm sm:text-base font-bold text-brown-700 mb-1">{{ reason.title }}</h3>
                <p class="text-xs sm:text-sm text-gray-500 leading-relaxed">{{ reason.desc }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 6: WHATSAPP CTA
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-12 sm:py-16 lg:py-20 bg-[#25D366] relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl"></div>
        </div>
        <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <i class="fa fa-whatsapp text-white/30 text-4xl sm:text-5xl mb-4" aria-hidden="true"></i>
          <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold text-white font-heading mb-3">Chat with Us on WhatsApp</h2>
          <p class="text-sm sm:text-base text-white/85 max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            Prefer a quick chat? Send us a message on WhatsApp for instant support. Ask about products, check availability, track orders, or get personalized Rudraksha recommendations — all in real time.
          </p>
          <a href="https://wa.me/919454799616?text=Hi%20Rudrakshama%2C%20I%20have%20a%20question%20about%20Rudraksha."
             target="_blank" rel="noopener noreferrer"
             class="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-[#25D366] font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg text-sm sm:text-base">
            <i class="fa fa-whatsapp text-lg" aria-hidden="true"></i> Chat on WhatsApp
          </a>
          <p class="text-[10px] sm:text-xs text-white/60 mt-3">Typically replies within minutes during business hours</p>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 7: CUSTOMER SUPPORT
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-14 sm:py-20 lg:py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span class="inline-block px-3 py-1 bg-saffron-500/10 text-saffron-500 text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">Support Promise</span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-700 font-heading">World-Class Customer Support</h2>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            <div class="text-center p-6 sm:p-8 rounded-xl bg-brown-50 border border-brown-100">
              <div class="w-14 h-14 rounded-full bg-saffron-500/10 flex items-center justify-center mx-auto mb-4">
                <i class="fa fa-bolt text-saffron-500 text-xl" aria-hidden="true"></i>
              </div>
              <h3 class="text-base sm:text-lg font-bold text-brown-700 mb-2">Rapid Response</h3>
              <p class="text-sm text-gray-600 leading-relaxed">We respond to all inquiries within 2-4 hours during business hours. WhatsApp messages typically get回复 within minutes.</p>
              <div class="mt-3 text-2xl sm:text-3xl font-bold text-saffron-500 font-heading">&lt; 4 Hours</div>
              <div class="text-xs text-gray-400">Average Response Time</div>
            </div>
            <div class="text-center p-6 sm:p-8 rounded-xl bg-brown-50 border border-brown-100">
              <div class="w-14 h-14 rounded-full bg-saffron-500/10 flex items-center justify-center mx-auto mb-4">
                <i class="fa fa-heart text-saffron-500 text-xl" aria-hidden="true"></i>
              </div>
              <h3 class="text-base sm:text-lg font-bold text-brown-700 mb-2">Customer Satisfaction</h3>
              <p class="text-sm text-gray-600 leading-relaxed">Your satisfaction is our highest priority. We go above and beyond to ensure every customer feels valued and supported.</p>
              <div class="mt-3 text-2xl sm:text-3xl font-bold text-saffron-500 font-heading">98%</div>
              <div class="text-xs text-gray-400">Satisfaction Rate</div>
            </div>
            <div class="text-center p-6 sm:p-8 rounded-xl bg-brown-50 border border-brown-100">
              <div class="w-14 h-14 rounded-full bg-saffron-500/10 flex items-center justify-center mx-auto mb-4">
                <i class="fa fa-shopping-bag text-saffron-500 text-xl" aria-hidden="true"></i>
              </div>
              <h3 class="text-base sm:text-lg font-bold text-brown-700 mb-2">Order Assistance</h3>
              <p class="text-sm text-gray-600 leading-relaxed">From placing your order to delivery and beyond — our team guides you through every step of the process.</p>
              <div class="mt-3 text-2xl sm:text-3xl font-bold text-saffron-500 font-heading">24/7</div>
              <div class="text-xs text-gray-400">Online Support Available</div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 8: FAQ
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-14 sm:py-20 lg:py-24 bg-brown-50">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-10 sm:mb-14">
            <span class="inline-block px-3 py-1 bg-saffron-500/10 text-saffron-500 text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">FAQ</span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-700 font-heading">Frequently Asked Questions</h2>
          </div>
          <div class="space-y-3 sm:space-y-4">
            @for (faq of faqs; track faq.q; let i = $index) {
              <div class="border border-gray-200 rounded-xl overflow-hidden hover:border-saffron-500/30 transition-all bg-white">
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
           SECTION 9: FINAL CTA
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-14 sm:py-20 lg:py-28 bg-brown-700 relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-10 left-10 w-32 h-32 bg-saffron-500 rounded-full blur-3xl"></div>
          <div class="absolute bottom-10 right-10 w-48 h-48 bg-gold-500 rounded-full blur-3xl"></div>
        </div>
        <div class="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span class="inline-block px-3 py-1 bg-saffron-500/15 text-saffron-400 text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-6">
            <i class="fa fa-om mr-1" aria-hidden="true"></i> Ready to Connect?
          </span>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-heading leading-tight">
            Your Spiritual Journey Deserves <span class="text-saffron-500">Personal Attention</span>
          </h2>
          <p class="mt-3 sm:mt-4 text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Whether you need help choosing the perfect Rudraksha, have questions about an order, or want to discuss a bulk purchase — we are just a call, message, or email away.
          </p>
          <div class="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a href="tel:+919454799616"
               class="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-3.5 bg-saffron-500 text-white font-bold rounded-lg hover:bg-saffron-600 transition-all shadow-lg shadow-saffron-500/25 text-sm sm:text-base">
              <i class="fa fa-phone mr-1" aria-hidden="true"></i> Contact Our Team
            </a>
            <a href="https://wa.me/919454799616" target="_blank" rel="noopener noreferrer"
               class="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-[#25D366] hover:text-[#25D366] transition-all text-sm sm:text-base">
              <i class="fa fa-whatsapp mr-1" aria-hidden="true"></i> WhatsApp Us
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
  `]
})
export class ContactComponent {
  private enquiriesService = inject(EnquiriesService);
  private cdr = inject(ChangeDetectorRef);

  submitting = false;
  successMsg = '';
  errorMsg = '';

  contactReasons = [
    { icon: 'fa fa-info-circle', title: 'Product Information', desc: 'Need details about a specific Rudraksha bead, mala, or spiritual product? We provide complete information.' },
    { icon: 'fa fa-shopping-cart', title: 'Order Support', desc: 'Help with placing orders, modifying orders, or checking order status and delivery timelines.' },
    { icon: 'fa fa-truck', title: 'Shipping Queries', desc: 'Questions about delivery times, shipping charges, tracking, or shipping to your pincode? Just ask.' },
    { icon: 'fa fa-building', title: 'Bulk Orders', desc: 'Temple requirements, spiritual organizations, or reseller inquiries — we offer special bulk pricing.' },
    { icon: 'fa fa-om', title: 'Rudraksha Guidance', desc: 'Confused about which Rudraksha to wear? Our spiritual advisors help you choose based on your needs.' },
    { icon: 'fa fa-credit-card', title: 'Payment Issues', desc: 'Facing issues with UPI, cards, net banking, or COD? We help resolve payment concerns quickly.' },
    { icon: 'fa fa-undo', title: 'Return & Refund', desc: 'Need to return a product or request a refund? Our hassle-free process has you covered.' },
  ];

  faqs = [
    { q: 'How can I contact Rudrakshama?', a: 'You can reach us through multiple channels: phone at +91 94547 99616 (Mon-Sat, 9 AM - 7 PM), WhatsApp at the same number, email at amitkumarpandey28075@gmail.com, or by filling out the contact form on this page. Our office is located at Barew, Adalhat, Mirzapur, Uttar Pradesh 221002.', open: false },
    { q: 'How long does it take to receive a reply?', a: 'We respond to all inquiries within 2-4 hours during business hours (Mon-Sat, 9 AM - 7 PM). WhatsApp messages typically receive a response within minutes. Emails may take up to 24 hours on Sundays and holidays.', open: false },
    { q: 'Can I order Rudraksha on WhatsApp?', a: 'Yes, absolutely. You can browse our collection, ask questions, and place orders directly through WhatsApp. Simply send us a message with the product you are interested in and our team will guide you through the entire process.', open: false },
    { q: 'How can I track my order?', a: 'Once your order is dispatched, we send you a tracking link via WhatsApp and email. You can also call or WhatsApp us at any time with your order number and we will provide an immediate status update.', open: false },
    { q: 'Do you offer phone consultations for choosing Rudraksha?', a: 'Yes, we offer free phone consultations with our spiritual advisors. They can help you choose the right Rudraksha based on your zodiac sign, spiritual goals, health concerns, and budget. Call us during business hours to schedule.', open: false },
    { q: 'What payment methods do you accept?', a: 'We accept all major payment methods: UPI (Google Pay, PhonePe, Paytm), credit/debit cards, net banking, and cash on delivery (for orders below \u20B95,000). All online transactions are secured with 256-bit SSL encryption.', open: false },
    { q: 'Can I visit your office in person?', a: 'Yes, you are welcome to visit our office at Barew, Adalhat, Mirzapur, Uttar Pradesh 221002 during business hours (Mon-Sat, 9 AM - 7 PM). We recommend calling ahead to ensure someone is available to assist you.', open: false },
    { q: 'Do you ship across India?', a: 'Yes, we offer free shipping across India for all orders. We deliver to every pincode in the country. Express delivery (1-2 days) is available for major metro cities at a nominal additional charge.', open: false },
    { q: 'How do I request a return or refund?', a: 'To request a return or refund, simply contact us via phone, WhatsApp, or email with your order number and reason for return. We offer a 7-day hassle-free return policy. Refunds are processed within 3-5 business days after we receive the returned product.', open: false },
    { q: 'Do you offer bulk or wholesale pricing?', a: 'Yes, we offer special pricing for bulk orders, temple requirements, spiritual organizations, and resellers. Contact us with your specific requirements and we will provide a customized quote. Reach out via phone, WhatsApp, or email for bulk inquiries.', open: false },
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }

  onSubmit(form: any) {
    if (form.valid && !this.submitting) {
      this.submitting = true;
      this.successMsg = '';
      this.errorMsg = '';

      const formValue = form.value;
      const messageWithSubject = formValue.subject
        ? `[${formValue.subject}] ${formValue.message}`
        : formValue.message;

      const payload: EnquiryRequest = {
        name: formValue.name,
        phone: formValue.phone,
        email: formValue.email,
        message: messageWithSubject,
      };

      this.enquiriesService.submitEnquiry(payload).subscribe({
        next: () => {
          this.submitting = false;
          this.successMsg = 'Thank you for reaching out! We will get back to you within 2-4 hours during business hours.';
          form.reset();
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.submitting = false;
          this.errorMsg = 'Something went wrong. Please try again or reach us directly via WhatsApp at +91 94547 99616.';
          console.error('Enquiry submit failed:', err);
          this.cdr.detectChanges();
        }
      });
    }
  }
}
