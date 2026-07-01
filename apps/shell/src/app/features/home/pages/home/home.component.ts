import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="min-h-screen bg-white font-sans">

      <!-- ===== HERO CAROUSEL ===== -->
      <section class="relative bg-[#0A1628] overflow-hidden">
        <div class="relative h-[50vh] min-h-[360px] xs:h-[55vh] sm:h-[65vh] md:h-[75vh] lg:h-[85vh]">
          @for (slide of slides; track slide; let i = $index) {
            <div class="absolute inset-0 transition-opacity duration-700 ease-in-out"
                 [class.opacity-100]="currentSlide === i"
                 [class.opacity-0]="currentSlide !== i">
              <img [src]="slide" alt="Slide {{i + 1}}"
                   class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 via-[#0A1628]/80 to-[#0A1628]/60 md:to-transparent"></div>
            </div>
          }
          <div class="relative z-10 h-full flex items-center">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div class="max-w-xl lg:max-w-2xl">
                <span class="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-[#FFD000]/15 text-[#FFD000] text-[11px] xs:text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4 lg:mb-6">
                  Welcome to Rudraksham
                </span>
                <h1 class="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight font-heading">
                  Empowering<br class="hidden xs:block">
                  <span class="text-[#FFD000]">Education</span><br class="hidden xs:block">
                  for Tomorrow
                </h1>
                <p class="mt-2 xs:mt-3 sm:mt-4 lg:mt-6 text-xs xs:text-sm sm:text-base lg:text-lg text-gray-300 max-w-xl leading-relaxed">
                  We provide comprehensive educational programs, skill development, and career guidance to help students achieve their dreams.
                </p>
                <div class="mt-4 xs:mt-5 sm:mt-6 lg:mt-8 flex flex-col xs:flex-row gap-2 xs:gap-3 sm:gap-4">
                  <a routerLink="/signup"
                     class="px-5 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-3.5 bg-[#FFD000] text-[#0A1628] font-bold rounded-lg hover:bg-[#FFD000]/90 transition-all text-xs xs:text-sm sm:text-base text-center shadow-lg shadow-[#FFD000]/25 w-full xs:w-auto">
                    Get Started Today
                  </a>
                  <a routerLink="/about"
                     class="px-5 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-[#FFD000] hover:text-[#FFD000] transition-all text-xs xs:text-sm sm:text-base text-center w-full xs:w-auto">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>

          <button (click)="prevSlide()"
                  class="absolute left-2 xs:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all">
            <i class="fa fa-chevron-left text-xs xs:text-sm sm:text-base" aria-hidden="true"></i>
          </button>
          <button (click)="nextSlide()"
                  class="absolute right-2 xs:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 hover:bg-black/50 text-white flex items-center justify-center transition-all">
            <i class="fa fa-chevron-right text-xs xs:text-sm sm:text-base" aria-hidden="true"></i>
          </button>

          <div class="absolute bottom-3 xs:bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 xs:gap-2">
            @for (slide of slides; track slide; let i = $index) {
              <button (click)="goToSlide(i)"
                      class="rounded-full transition-all duration-300"
                      [class.w-2.5]="currentSlide !== i"
                      [class.h-2.5]="currentSlide !== i"
                      [class.bg-white/40]="currentSlide !== i"
                      [class.w-5]="currentSlide === i"
                      [class.h-2.5]="currentSlide === i"
                      [class.bg-[#FFD000]]="currentSlide === i">
              </button>
            }
          </div>
        </div>
      </section>

      <!-- ===== STATS ===== -->
      <section class="bg-[#0A1628] border-y border-white/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-10 lg:py-12">
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 lg:gap-8">
            @for (s of stats; track s.label) {
              <div class="text-center">
                <div class="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFD000] font-heading">{{ s.value }}</div>
                <div class="text-[11px] xs:text-xs sm:text-sm text-gray-400 mt-0.5 xs:mt-1">{{ s.label }}</div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- ===== ABOUT ===== -->
      <section class="py-10 xs:py-14 sm:py-16 lg:py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
            <div class="order-2 lg:order-1">
              <span class="inline-block px-2.5 xs:px-3 py-0.5 xs:py-1 bg-[#FFD000]/10 text-[#FFD000] text-[11px] xs:text-xs sm:text-sm font-semibold rounded-full mb-2 xs:mb-3 sm:mb-4">About Us</span>
              <h2 class="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 font-heading">Shaping Futures Through Quality Education</h2>
              <p class="mt-2 xs:mt-3 sm:mt-4 text-xs xs:text-sm sm:text-base text-gray-600 leading-relaxed">
                At Rudraksham, we believe every student deserves access to quality education and guidance. Our programs are designed to nurture talent, build skills, and create opportunities for a brighter future.
              </p>
              <p class="mt-2 xs:mt-3 text-xs xs:text-sm sm:text-base text-gray-600 leading-relaxed">
                With experienced mentors and a comprehensive curriculum, we've helped thousands of students achieve their academic and career goals.
              </p>
              <a routerLink="/about"
                 class="mt-4 xs:mt-5 sm:mt-6 inline-flex items-center gap-2 px-4 xs:px-5 py-2 xs:py-2.5 bg-[#0A1628] text-white text-xs xs:text-sm font-semibold rounded-lg hover:bg-[#1a2d5a] transition-all">
                Know More About Us
                <i class="fa fa-arrow-right text-xs" aria-hidden="true"></i>
              </a>
            </div>
            <div class="grid grid-cols-2 gap-3 xs:gap-4 order-1 lg:order-2">
              <div class="rounded-xl overflow-hidden">
                <img src="assets/Rudraksham.jpg" alt="About" class="w-full h-32 xs:h-36 sm:h-48 lg:h-56 object-cover">
              </div>
              <div class="rounded-xl overflow-hidden mt-4 xs:mt-6 sm:mt-8">
                <img src="assets/Rudraksham1.jpg" alt="About" class="w-full h-32 xs:h-36 sm:h-48 lg:h-56 object-cover">
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== PROGRAMS ===== -->
      <section class="py-10 xs:py-14 sm:py-16 lg:py-24 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-xl xs:max-w-2xl sm:max-w-3xl mx-auto mb-6 xs:mb-8 sm:mb-10 lg:mb-14">
            <span class="inline-block px-2.5 xs:px-3 py-0.5 xs:py-1 bg-[#FFD000]/10 text-[#FFD000] text-[11px] xs:text-xs sm:text-sm font-semibold rounded-full mb-2 xs:mb-3 sm:mb-4">Our Programs</span>
            <h2 class="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 font-heading">Comprehensive Educational Programs</h2>
            <p class="mt-1 xs:mt-2 sm:mt-3 lg:mt-4 text-xs xs:text-sm sm:text-base text-gray-600">Discover programs designed to empower students at every stage of their learning journey.</p>
          </div>
          <div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6 lg:gap-8">
            @for (p of programs; track p.title) {
              <div class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group">
                <div class="h-32 xs:h-36 sm:h-40 lg:h-48 bg-gradient-to-br from-[#0A1628] to-[#1a2d5a] flex items-center justify-center">
                  <div class="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 rounded-full bg-[#FFD000]/20 flex items-center justify-center text-2xl xs:text-3xl group-hover:scale-110 transition-transform">
                    {{ p.icon }}
                  </div>
                </div>
                <div class="p-4 xs:p-5 sm:p-6">
                  <h3 class="text-sm xs:text-base sm:text-lg font-bold text-gray-900 mb-1 xs:mb-2">{{ p.title }}</h3>
                  <p class="text-xs xs:text-sm text-gray-600 leading-relaxed">{{ p.desc }}</p>
                  <a routerLink="/about" class="mt-2 xs:mt-3 sm:mt-4 inline-flex items-center gap-1 text-xs xs:text-sm font-semibold text-[#0A1628] hover:text-[#FFD000] transition-colors">
                    Learn More <i class="fa fa-arrow-right text-xs" aria-hidden="true"></i>
                  </a>
                </div>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- ===== WHY CHOOSE US ===== -->
      <section class="py-10 xs:py-14 sm:py-16 lg:py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-xl xs:max-w-2xl sm:max-w-3xl mx-auto mb-6 xs:mb-8 sm:mb-10 lg:mb-14">
            <span class="inline-block px-2.5 xs:px-3 py-0.5 xs:py-1 bg-[#FFD000]/10 text-[#FFD000] text-[11px] xs:text-xs sm:text-sm font-semibold rounded-full mb-2 xs:mb-3 sm:mb-4">Why Choose Us</span>
            <h2 class="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 font-heading">What Sets Us Apart</h2>
            <p class="mt-1 xs:mt-2 sm:mt-3 lg:mt-4 text-xs xs:text-sm sm:text-base text-gray-600">We are committed to providing the best educational experience for our students.</p>
          </div>
          <div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 lg:gap-8">
            @for (item of whyUs; track item.title) {
              <div class="text-center p-4 xs:p-5 sm:p-6 rounded-xl bg-gray-50 hover:bg-[#FFD000]/5 border border-gray-100 hover:border-[#FFD000]/30 transition-all duration-300">
                <div class="w-12 h-12 xs:w-14 xs:h-14 rounded-full bg-[#FFD000]/10 flex items-center justify-center text-xl xs:text-2xl mx-auto mb-3 xs:mb-4">{{ item.icon }}</div>
                <h3 class="text-sm xs:text-base font-bold text-gray-900 mb-1 xs:mb-2">{{ item.title }}</h3>
                <p class="text-xs xs:text-sm text-gray-600 leading-relaxed">{{ item.desc }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- ===== TESTIMONIALS ===== -->
      <section class="py-10 xs:py-14 sm:py-16 lg:py-24 bg-[#0A1628]">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span class="inline-block px-2.5 xs:px-3 py-0.5 xs:py-1 bg-[#FFD000]/15 text-[#FFD000] text-[11px] xs:text-xs sm:text-sm font-semibold rounded-full mb-2 xs:mb-3 sm:mb-4">Testimonials</span>
          <h2 class="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-heading">What Our Students Say</h2>

          <div class="mt-6 xs:mt-8 sm:mt-10 lg:mt-14 relative">
            @for (t of testimonials; track t.name; let i = $index) {
              @if (i === currentTestimonial) {
                <div class="transition-all duration-500">
                  <i class="fa fa-quote-left text-2xl xs:text-3xl sm:text-4xl text-[#FFD000]/30 mb-2 xs:mb-3 sm:mb-4 lg:mb-6" aria-hidden="true"></i>
                  <blockquote class="text-sm xs:text-base sm:text-lg lg:text-2xl text-white/90 leading-relaxed font-medium italic">
                    "{{ t.quote }}"
                  </blockquote>
                  <div class="mt-4 xs:mt-5 sm:mt-6 lg:mt-8 flex items-center justify-center gap-2 xs:gap-3">
                    <div class="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#FFD000] to-yellow-500 flex items-center justify-center text-[#0A1628] font-bold text-sm xs:text-base sm:text-lg">{{ t.initials }}</div>
                    <div class="text-left">
                      <div class="text-xs xs:text-sm sm:text-base font-semibold text-white">{{ t.name }}</div>
                      <div class="text-[11px] xs:text-xs sm:text-sm text-gray-400">{{ t.role }}</div>
                    </div>
                  </div>
                </div>
              }
            }
            <div class="flex items-center justify-center gap-1.5 xs:gap-2 mt-5 xs:mt-6 sm:mt-8">
              @for (t of testimonials; track t.name; let i = $index) {
                <button (click)="currentTestimonial = i"
                        class="w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full transition-all duration-300"
                        [class.bg-[#FFD000]]="i === currentTestimonial"
                        [class.bg-white/30]="i !== currentTestimonial">
                </button>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- ===== CTA ===== -->
      <section class="py-10 xs:py-14 sm:py-16 lg:py-24 bg-white">
        <div class="max-w-xl xs:max-w-2xl sm:max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 font-heading mb-2 xs:mb-3 sm:mb-4">Ready to Start Your Journey?</h2>
          <p class="text-xs xs:text-sm sm:text-base text-gray-600 mb-4 xs:mb-5 sm:mb-6 lg:mb-8">Join thousands of students who have transformed their lives through our programs.</p>
          <div class="flex flex-col xs:flex-row items-center justify-center gap-2 xs:gap-3 sm:gap-4">
            <a routerLink="/signup"
               class="w-full xs:w-auto px-6 xs:px-8 sm:px-12 py-2.5 xs:py-3 sm:py-3.5 bg-[#FFD000] text-[#0A1628] font-bold rounded-lg hover:bg-[#FFD000]/90 transition-all shadow-lg shadow-[#FFD000]/25 text-xs xs:text-sm sm:text-base text-center">
              Enroll Now
            </a>
            <a routerLink="/contact"
               class="w-full xs:w-auto px-6 xs:px-8 sm:px-12 py-2.5 xs:py-3 sm:py-3.5 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-[#FFD000] hover:text-[#FFD000] transition-all text-xs xs:text-sm sm:text-base text-center">
              Contact Us
            </a>
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
export class HomeComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  currentTestimonial = 0;
  private slideInterval: any;
  private testimonialInterval: any;

  slides = [
    'assets/Rudraksham.jpg',
    'assets/Rudraksham1.jpg',
    'assets/Rudraksham2.jpg',
    'assets/Rudraksham3.jpg',
  ];

  stats = [
    { value: '10K+', label: 'Students Enrolled' },
    { value: '500+', label: 'Expert Mentors' },
    { value: '50+', label: 'Programs Offered' },
    { value: '4.9★', label: 'Student Rating' },
  ];

  programs = [
    { icon: '🎓', title: 'Scholarship Programs', desc: 'Financial assistance and merit-based scholarships for deserving students to pursue their academic dreams.' },
    { icon: '💡', title: 'Skill Development', desc: 'Practical training programs focused on building industry-relevant skills and competencies.' },
    { icon: '🌍', title: 'Study Abroad', desc: 'Comprehensive guidance and support for students aspiring to study at international universities.' },
    { icon: '📚', title: 'Career Counseling', desc: 'Professional career guidance to help students make informed decisions about their future.' },
    { icon: '🏆', title: 'Competitive Exams', desc: 'Specialized coaching and preparation programs for various competitive examinations.' },
    { icon: '🤝', title: 'Mentorship Program', desc: 'One-on-one mentorship from industry experts and academic professionals.' },
  ];

  whyUs = [
    { icon: '👨‍🏫', title: 'Expert Faculty', desc: 'Learn from experienced educators and industry professionals.' },
    { icon: '📖', title: 'Quality Curriculum', desc: 'Comprehensive and up-to-date curriculum designed for success.' },
    { icon: '🎯', title: 'Personalized Attention', desc: 'Individual focus to help every student reach their potential.' },
    { icon: '🏅', title: 'Proven Results', desc: 'Track record of academic excellence and student achievement.' },
  ];

  testimonials = [
    { quote: 'Rudraksham transformed my career path. The mentorship and guidance I received were invaluable in helping me achieve my academic goals.', name: 'Priya Sharma', role: 'Scholarship Recipient', initials: 'PS' },
    { quote: 'The skill development programs at Rudraksham gave me the confidence and abilities I needed to succeed in my professional career.', name: 'Arun Patel', role: 'Program Graduate', initials: 'AP' },
    { quote: 'Thanks to Rudraksham\'s study abroad guidance, I was able to secure admission to my dream university. Their support was exceptional throughout.', name: 'Neha Gupta', role: 'International Student', initials: 'NG' },
  ];

  ngOnInit() {
    this.slideInterval = setInterval(() => this.nextSlide(), 5000);
    this.testimonialInterval = setInterval(() => {
      this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
    }, 5000);
  }

  ngOnDestroy() {
    if (this.slideInterval) clearInterval(this.slideInterval);
    if (this.testimonialInterval) clearInterval(this.testimonialInterval);
  }

  prevSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
    this.resetSlideInterval();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.resetSlideInterval();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.resetSlideInterval();
  }

  private resetSlideInterval() {
    if (this.slideInterval) clearInterval(this.slideInterval);
    this.slideInterval = setInterval(() => this.nextSlide(), 5000);
  }
}
