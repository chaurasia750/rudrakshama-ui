import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="min-h-screen bg-white">
      <section class="bg-gradient-to-br from-[#0A1628] via-[#0F1F3D] to-[#1A2D5A] py-16 sm:py-20 lg:py-28">
        <div class="max-w-7xl mx-auto px-4 text-center">
          <span class="inline-block px-4 py-1.5 bg-[#FFD000]/15 text-[#FFD000] text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-6">About Us</span>
          <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-heading leading-tight">
            Empowering Education,<br>
            <span class="text-[#FFD000]">Transforming Lives</span>
          </h1>
          <p class="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Rudraksham is dedicated to providing quality education, skill development, and career guidance to help students achieve their full potential.
          </p>
        </div>
      </section>

      <section class="py-14 sm:py-20 lg:py-24">
        <div class="max-w-7xl mx-auto px-4">
          <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 font-heading">Our Mission</h2>
              <p class="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                To make quality education accessible and affordable for every student, providing them with the tools, resources, and guidance needed to succeed in their academic and professional journeys.
              </p>
              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 font-heading mt-8">Our Vision</h2>
              <p class="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                To be a leading educational platform that empowers students worldwide, creating a community of lifelong learners and future leaders.
              </p>
            </div>
            <div class="rounded-xl overflow-hidden shadow-lg">
              <img src="assets/Rudraksham.jpg" alt="About Rudraksham" class="w-full h-72 sm:h-96 object-cover">
            </div>
          </div>
        </div>
      </section>

      <section class="py-14 sm:py-20 lg:py-24 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4">
          <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span class="inline-block px-3 py-1 bg-[#FFD000]/10 text-[#FFD000] text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">Our Values</span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 font-heading">What We Stand For</h2>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            @for (v of values; track v.title) {
              <div class="bg-white rounded-xl p-6 sm:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div class="w-12 h-12 rounded-lg bg-[#FFD000]/10 flex items-center justify-center text-2xl mb-4">{{ v.icon }}</div>
                <h3 class="text-lg font-bold text-gray-900 mb-2">{{ v.title }}</h3>
                <p class="text-sm text-gray-600">{{ v.desc }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <section class="py-14 sm:py-20 lg:py-24 bg-[#0A1628]">
        <div class="max-w-3xl mx-auto px-4 text-center">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-heading mb-4">Join Us in Shaping the Future</h2>
          <p class="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8">Be a part of our mission to transform education.</p>
          <a routerLink="/contact" class="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-[#FFD000] text-[#0A1628] font-bold rounded-lg hover:bg-[#FFD000]/90 transition-all text-sm sm:text-base">
            Get in Touch
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .font-heading { font-family: 'Red Hat Display', serif; }
  `]
})
export class AboutComponent {
  values = [
    { icon: '📚', title: 'Quality Education', desc: 'Commitment to providing high-quality educational programs and resources.' },
    { icon: '🤝', title: 'Integrity', desc: 'Operating with transparency, honesty, and ethical practices in all we do.' },
    { icon: '💡', title: 'Innovation', desc: 'Embracing new technologies and methodologies to enhance learning outcomes.' },
    { icon: '🌍', title: 'Inclusivity', desc: 'Creating equal opportunities for students from all backgrounds.' },
    { icon: '🎯', title: 'Excellence', desc: 'Striving for the highest standards in education and student support.' },
    { icon: '💪', title: 'Empowerment', desc: 'Equipping students with the skills and confidence to achieve their goals.' },
  ];
}
