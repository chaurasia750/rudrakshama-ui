import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnquiriesService, EnquiryRequest } from '../../../../services/enquiries.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="min-h-screen bg-white">
      <section class="bg-gradient-to-br from-[#0A1628] via-[#0F1F3D] to-[#1A2D5A] py-16 sm:py-20 lg:py-28">
        <div class="max-w-7xl mx-auto px-4 text-center">
          <span class="inline-block px-4 py-1.5 bg-[#FFD000]/15 text-[#FFD000] text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-6">Contact Us</span>
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-heading leading-tight">
            Get in <span class="text-[#FFD000]">Touch</span>
          </h1>
          <p class="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <section class="py-14 sm:py-20 lg:py-24">
        <div class="max-w-7xl mx-auto px-4">
          <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 font-heading mb-6">Contact Information</h2>
              <div class="space-y-5">
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 rounded-lg bg-[#FFD000]/10 flex items-center justify-center text-[#FFD000] shrink-0">
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900">Address</h4>
                    <p class="text-sm text-gray-600">123 Business Street, New Delhi, India</p>
                  </div>
                </div>
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 rounded-lg bg-[#FFD000]/10 flex items-center justify-center text-[#FFD000] shrink-0">
                    <i class="fa fa-phone" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900">Phone</h4>
                    <a href="tel:+911234567890" class="text-sm text-gray-600 hover:text-[#FFD000] transition-colors">+91 123 456 7890</a>
                  </div>
                </div>
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 rounded-lg bg-[#FFD000]/10 flex items-center justify-center text-[#FFD000] shrink-0">
                    <i class="fa fa-envelope" aria-hidden="true"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900">Email</h4>
                    <a href="mailto:info@rudraksham.com" class="text-sm text-gray-600 hover:text-[#FFD000] transition-colors">info@rudraksham.com</a>
                  </div>
                </div>
              </div>

              <div class="mt-8">
                <h4 class="font-semibold text-gray-900 mb-3">Follow Us</h4>
                <div class="flex items-center gap-3">
                  <a href="#" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#FFD000] hover:text-[#0A1628] transition-all" aria-label="Facebook">
                    <i class="fa fa-facebook" aria-hidden="true"></i>
                  </a>
                  <a href="#" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#FFD000] hover:text-[#0A1628] transition-all" aria-label="Instagram">
                    <i class="fa fa-instagram" aria-hidden="true"></i>
                  </a>
                  <a href="#" class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#FFD000] hover:text-[#0A1628] transition-all" aria-label="YouTube">
                    <i class="fa fa-youtube-play" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 font-heading mb-6">Send Us a Message</h2>
              <form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)" class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Name <span class="text-red-500">*</span></label>
                  <input type="text" name="name" ngModel required
                         class="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FFD000] focus:ring-1 focus:ring-[#FFD000] transition-colors"
                         placeholder="Your name">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Phone <span class="text-red-500">*</span></label>
                  <input type="tel" name="phone" ngModel required
                         class="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FFD000] focus:ring-1 focus:ring-[#FFD000] transition-colors"
                         placeholder="Your phone number">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email <span class="text-red-500">*</span></label>
                  <input type="email" name="email" ngModel required
                         class="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FFD000] focus:ring-1 focus:ring-[#FFD000] transition-colors"
                         placeholder="your@email.com">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Message <span class="text-red-500">*</span></label>
                  <textarea name="message" ngModel required rows="4"
                            class="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#FFD000] focus:ring-1 focus:ring-[#FFD000] transition-colors resize-none"
                            placeholder="Your message"></textarea>
                </div>
                <button type="submit" [disabled]="submitting"
                        class="w-full py-2.5 bg-[#0A1628] hover:bg-[#1a2d5a] text-white font-semibold rounded-lg transition-all"
                        [class.opacity-50]="submitting" [class.cursor-not-allowed]="submitting">
                  {{ submitting ? 'Sending...' : 'Send Message' }}
                </button>
                @if (successMsg) {
                  <div class="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm text-center">{{ successMsg }}</div>
                }
                @if (errorMsg) {
                  <div class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm text-center">{{ errorMsg }}</div>
                }
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .font-heading { font-family: 'Red Hat Display', serif; }
  `]
})
export class ContactComponent {
  private enquiriesService = inject(EnquiriesService);
  private cdr = inject(ChangeDetectorRef);

  submitting = false;
  successMsg = '';
  errorMsg = '';

  onSubmit(form: any) {
    if (form.valid && !this.submitting) {
      this.submitting = true;
      this.successMsg = '';
      this.errorMsg = '';

      const payload: EnquiryRequest = form.value;

      this.enquiriesService.submitEnquiry(payload).subscribe({
        next: () => {
          this.submitting = false;
          this.successMsg = 'Thank you! We will get back to you shortly.';
          form.reset();
          this.cdr.detectChanges();
        },
        error: (err) => {
          this.submitting = false;
          this.errorMsg = 'Something went wrong. Please try again later.';
          console.error('Enquiry submit failed:', err);
          this.cdr.detectChanges();
        }
      });
    }
  }
}
