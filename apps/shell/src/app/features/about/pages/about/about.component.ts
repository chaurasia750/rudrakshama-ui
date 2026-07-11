import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="min-h-screen bg-white font-body">

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 1: OUR STORY
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-14 sm:py-20 lg:py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div class="order-2 lg:order-1">
              <span class="inline-block px-3 py-1 bg-saffron-500/10 text-saffron-500 text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">Our Story</span>
              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-700 font-heading leading-tight">How a Sacred Calling Became a Mission of Authenticity</h2>
              <div class="mt-6 space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                <p>
                  Rudrakshama was not born in a boardroom. It was born in the sacred ghats of Varanasi, where the gentle chant of <em>Om Namah Shivaya</em> echoes through ancient temples and the misty morning air carries the fragrance of sandalwood and marigold. Our founder, a lifelong devotee of Lord Shiva and a practitioner of Vedic traditions, grew up witnessing the profound impact that genuine Rudraksha beads had on the lives of those who wore them — from temple priests who found clarity in their daily rituals to elderly grandmothers who wore their Panchmukhi malas with unwavering faith.
                </p>
                <p>
                  Yet as the years passed, a troubling reality emerged. The market became flooded with counterfeit Rudraksha beads — plastic replicas dyed to look authentic, machine-pressed fakes sold at premium prices, and unscrupulous sellers exploiting the faith of genuine seekers. Devotees who placed their trust in online stores often received beads that were damaged, treated with chemicals, or simply not what they had paid for. The sacred connection between a devotee and their Rudraksha was being broken by greed.
                </p>
                <p>
                  This injustice ignited a fire in our founder's heart. In 2015, Rudrakshama was born with a single, unwavering mission — to ensure that every spiritual seeker in India could access genuine, lab-certified Rudraksha beads without fear of deception. We traveled to the sacred forests of Nepal, established direct relationships with trusted harvesters in Indonesia, and partnered with accredited gemological laboratories to create a supply chain rooted in transparency and authenticity.
                </p>
                <p>
                  Today, Rudrakshama serves over 50,000 devotees across India — from the Himalayan foothills to the temples of Tamil Nadu, from the yoga studios of Rishikesh to the meditation halls of Kerala. Each bead that leaves our warehouse carries with it the weight of our sacred promise: that it is 100% genuine, naturally sourced, and handled with the reverence it deserves.
                </p>
                <p>
                  But our journey is far from over. We believe that the divine power of Rudraksha should be accessible to every seeker, regardless of their background or budget. That is why we continue to curate products at every price point — from affordable Indonesian malas to rare 1 Mukhi Nepali beads — so that no devotee is ever turned away.
                </p>
                <p>
                  At Rudrakshama, we are not just selling beads. We are safeguarding a sacred tradition, honoring the tears of Lord Shiva, and walking alongside thousands of spiritual seekers on their path to inner peace and divine connection.
                </p>
              </div>
            </div>
            <div class="order-1 lg:order-2 lg:sticky lg:top-24">
              <div class="grid grid-cols-2 gap-3 sm:gap-4">
                <div class="rounded-xl overflow-hidden shadow-lg">
                  <img src="assets/Rudraksham.jpg" alt="Genuine Rudraksha beads collected from sacred forests of Nepal" class="w-full h-36 sm:h-48 lg:h-56 object-cover" loading="lazy">
                </div>
                <div class="rounded-xl overflow-hidden shadow-lg mt-4 sm:mt-8">
                  <img src="assets/Rudraksham1.jpg" alt="Rudraksha malas handcrafted with devotion at Rudrakshama" class="w-full h-36 sm:h-48 lg:h-56 object-cover" loading="lazy">
                </div>
                <div class="rounded-xl overflow-hidden shadow-lg col-span-2">
                  <img src="assets/Rudraksham2.jpg" alt="Rudrakshama quality inspection process" class="w-full h-40 sm:h-52 lg:h-64 object-cover" loading="lazy">
                </div>
              </div>
              <div class="mt-6 p-5 sm:p-6 rounded-xl bg-brown-50 border border-brown-100">
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-10 h-10 rounded-full bg-saffron-500/15 flex items-center justify-center">
                    <i class="fa fa-quote-left text-saffron-500 text-sm" aria-hidden="true"></i>
                  </div>
                  <span class="text-xs sm:text-sm font-bold text-brown-700">Our Founding Belief</span>
                </div>
                <p class="text-sm text-gray-600 italic leading-relaxed">
                  "Every bead of Rudraksha is a tear of Lord Shiva — sacred, powerful, and deserving of the highest respect. We exist to honor that sacred trust."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 3: OUR MISSION
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-14 sm:py-20 lg:py-24 bg-brown-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div class="rounded-xl overflow-hidden shadow-lg order-2 lg:order-1">
              <img src="assets/Rudraksham3.jpg" alt="Rudrakshama mission to make genuine Rudraksha accessible to every devotee" class="w-full h-64 sm:h-80 lg:h-96 object-cover" loading="lazy">
            </div>
            <div class="order-1 lg:order-2">
              <span class="inline-block px-3 py-1 bg-saffron-500/10 text-saffron-500 text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">Our Mission</span>
              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-700 font-heading leading-tight">Making Authentic Rudraksha Accessible to Every Seeker</h2>
              <div class="mt-5 space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                <p>
                  Our mission is rooted in a sacred obligation — to bridge the gap between the divine power of genuine Rudraksha and the spiritual seekers who long for its blessings. We are committed to sourcing, verifying, and delivering 100% authentic Rudraksha beads, malas, bracelets, pendants, and spiritual accessories to every corner of India with uncompromising quality and complete transparency.
                </p>
                <p>
                  We believe that no devotee should ever have to question the authenticity of their sacred beads. That is why every product at Rudrakshama undergoes rigorous laboratory testing, is accompanied by a certificate of authenticity, and is handled with the spiritual reverence it deserves. Our mission extends beyond commerce — it is a pledge to protect the sanctity of an ancient Vedic tradition and to serve as a trustworthy bridge between the divine and the devoted.
                </p>
              </div>
              <div class="mt-6 grid grid-cols-2 gap-4">
                <div class="p-4 rounded-lg bg-white border border-gray-100 text-center">
                  <div class="text-2xl sm:text-3xl font-bold text-saffron-500 font-heading">50,000+</div>
                  <div class="text-xs sm:text-sm text-gray-500 mt-1">Happy Devotees</div>
                </div>
                <div class="p-4 rounded-lg bg-white border border-gray-100 text-center">
                  <div class="text-2xl sm:text-3xl font-bold text-saffron-500 font-heading">100%</div>
                  <div class="text-xs sm:text-sm text-gray-500 mt-1">Lab Certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 4: OUR VISION
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-14 sm:py-20 lg:py-24 bg-gradient-to-br from-brown-700 via-brown-800 to-brown-900 relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-0 left-1/4 w-64 h-64 bg-saffron-500 rounded-full blur-3xl"></div>
          <div class="absolute bottom-0 right-1/4 w-48 h-48 bg-gold-500 rounded-full blur-3xl"></div>
        </div>
        <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span class="inline-block px-3 py-1 bg-saffron-500/15 text-saffron-400 text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">Our Vision</span>
              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-heading leading-tight">Envisioning a World Where Sacred Traditions Thrive</h2>
              <div class="mt-5 space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
                <p>
                  We envision a future where the ancient wisdom of Vedic spirituality is not lost to time but celebrated and embraced by millions. A world where every spiritual seeker — whether a first-time buyer in a small town or a seasoned practitioner in a metropolitan city — can access genuine, energized Rudraksha beads with absolute confidence and without the fear of deception.
                </p>
                <p>
                  Our long-term vision extends beyond becoming India's largest online Rudraksha store. We aspire to become the global custodian of authentic spiritual products — a trusted institution that preserves the sanctity of sacred traditions while making them accessible to the modern world. We dream of a future where Rudrakshama is synonymous with trust, authenticity, and divine connection — a name that evokes the same reverence as the sacred beads we serve.
                </p>
                <p>
                  We are building a community of conscious consumers who understand the spiritual significance of what they wear and use. Through educational content, spiritual guidance, and unwavering commitment to quality, we aim to transform the way India shops for spiritual products — one genuine bead at a time.
                </p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="p-5 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                <div class="w-12 h-12 rounded-full bg-saffron-500/15 flex items-center justify-center mx-auto mb-3">
                  <i class="fa fa-globe text-saffron-400 text-lg" aria-hidden="true"></i>
                </div>
                <h3 class="text-sm font-bold text-white mb-1">Pan-India Reach</h3>
                <p class="text-xs text-gray-400">Delivering to every pincode across India</p>
              </div>
              <div class="p-5 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                <div class="w-12 h-12 rounded-full bg-saffron-500/15 flex items-center justify-center mx-auto mb-3">
                  <i class="fa fa-users text-saffron-400 text-lg" aria-hidden="true"></i>
                </div>
                <h3 class="text-sm font-bold text-white mb-1">Community of Seekers</h3>
                <p class="text-xs text-gray-400">Building a devoted spiritual community</p>
              </div>
              <div class="p-5 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                <div class="w-12 h-12 rounded-full bg-saffron-500/15 flex items-center justify-center mx-auto mb-3">
                  <i class="fa fa-leaf text-saffron-400 text-lg" aria-hidden="true"></i>
                </div>
                <h3 class="text-sm font-bold text-white mb-1">Sustainable Sourcing</h3>
                <p class="text-xs text-gray-400">Ethical and eco-friendly practices</p>
              </div>
              <div class="p-5 sm:p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-center">
                <div class="w-12 h-12 rounded-full bg-saffron-500/15 flex items-center justify-center mx-auto mb-3">
                  <i class="fa fa-graduation-cap text-saffron-400 text-lg" aria-hidden="true"></i>
                </div>
                <h3 class="text-sm font-bold text-white mb-1">Spiritual Education</h3>
                <p class="text-xs text-gray-400">Spreading Vedic knowledge through content</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 5: OUR VALUES
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-14 sm:py-20 lg:py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span class="inline-block px-3 py-1 bg-saffron-500/10 text-saffron-500 text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">Our Values</span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-700 font-heading">The Principles That Guide Every Bead We Sell</h2>
            <p class="mt-3 text-sm sm:text-base text-gray-600">Our values are not just words on a page — they are the sacred foundation upon which every interaction, product, and promise is built.</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            @for (v of values; track v.title) {
              <div class="bg-brown-50 rounded-xl p-6 sm:p-8 border border-brown-100 hover:border-saffron-500/30 hover:bg-saffron-500/5 transition-all duration-300 group">
                <div class="w-12 h-12 rounded-full bg-saffron-500/10 flex items-center justify-center mb-4 group-hover:bg-saffron-500/20 transition-all">
                  <i [class]="v.icon" class="text-saffron-500 text-lg" aria-hidden="true"></i>
                </div>
                <h3 class="text-base sm:text-lg font-bold text-brown-700 mb-2">{{ v.title }}</h3>
                <p class="text-sm text-gray-600 leading-relaxed">{{ v.desc }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 6: WHY CHOOSE RUDRAKSHAMA
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-14 sm:py-20 lg:py-24 bg-brown-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span class="inline-block px-3 py-1 bg-saffron-500/10 text-saffron-500 text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">Why Us</span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-700 font-heading">Why 50,000+ Devotees Choose Rudrakshama</h2>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            @for (item of whyUs; track item.title) {
              <div class="bg-white rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 group text-center">
                <div class="w-14 h-14 rounded-full bg-saffron-500/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-saffron-500/20 transition-all">
                  <i [class]="item.icon" class="text-saffron-500 text-xl" aria-hidden="true"></i>
                </div>
                <h3 class="text-base sm:text-lg font-bold text-brown-700 mb-2">{{ item.title }}</h3>
                <p class="text-sm text-gray-600 leading-relaxed">{{ item.desc }}</p>
              </div>
            }
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 7: OUR QUALITY PROCESS
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-14 sm:py-20 lg:py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span class="inline-block px-3 py-1 bg-saffron-500/10 text-saffron-500 text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">Quality Assurance</span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-700 font-heading">Our Rigorous Quality Process</h2>
            <p class="mt-3 text-sm sm:text-base text-gray-600">Every bead passes through five stages of verification before it earns the Rudrakshama seal of authenticity.</p>
          </div>
          <div class="relative">
            <div class="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-saffron-500/20 -translate-y-1/2"></div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6 lg:gap-4">
              @for (step of qualitySteps; track step.title; let i = $index) {
                <div class="relative text-center p-5 sm:p-6 bg-white rounded-xl border border-gray-100 hover:border-saffron-500/30 hover:shadow-md transition-all duration-300">
                  <div class="w-10 h-10 rounded-full bg-saffron-500 text-white flex items-center justify-center text-sm font-bold mx-auto mb-3 relative z-10">
                    {{ i + 1 }}
                  </div>
                  <div class="w-10 h-10 rounded-full bg-saffron-500/10 flex items-center justify-center mx-auto mb-3">
                    <i [class]="step.icon" class="text-saffron-500 text-base" aria-hidden="true"></i>
                  </div>
                  <h3 class="text-sm sm:text-base font-bold text-brown-700 mb-1">{{ step.title }}</h3>
                  <p class="text-xs sm:text-sm text-gray-500 leading-relaxed">{{ step.desc }}</p>
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 8: OUR PRODUCTS
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-14 sm:py-20 lg:py-24 bg-brown-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span class="inline-block px-3 py-1 bg-saffron-500/10 text-saffron-500 text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">Our Collection</span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-700 font-heading">A Sacred Collection for Every Seeker</h2>
            <p class="mt-3 text-sm sm:text-base text-gray-600">From rare collector's beads to everyday spiritual essentials, our curated collection serves every devotion and every budget.</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            @for (cat of productCategories; track cat.title) {
              <div class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-gray-100 group">
                <div class="h-32 sm:h-36 bg-gradient-to-br from-brown-600 to-brown-700 flex items-center justify-center relative overflow-hidden">
                  <div class="absolute inset-0 bg-saffron-500/0 group-hover:bg-saffron-500/10 transition-all duration-300"></div>
                  <i [class]="cat.icon" class="text-gold-500/40 text-4xl sm:text-5xl group-hover:text-gold-500/60 transition-all" aria-hidden="true"></i>
                </div>
                <div class="p-4 sm:p-5">
                  <h3 class="text-sm sm:text-base font-bold text-brown-700 mb-1">{{ cat.title }}</h3>
                  <p class="text-xs sm:text-sm text-gray-500 leading-relaxed">{{ cat.desc }}</p>
                </div>
              </div>
            }
          </div>
          <div class="text-center mt-8 sm:mt-10">
            <a routerLink="/home" class="inline-flex items-center gap-2 px-6 sm:px-8 py-3 bg-saffron-500 text-white font-bold rounded-lg hover:bg-saffron-600 transition-all shadow-lg shadow-saffron-500/25 text-sm sm:text-base">
              <i class="fa fa-shopping-cart" aria-hidden="true"></i> Browse Full Collection
            </a>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 9: CUSTOMER COMMITMENT
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-14 sm:py-20 lg:py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span class="inline-block px-3 py-1 bg-saffron-500/10 text-saffron-500 text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">Our Promise</span>
              <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-700 font-heading leading-tight">An Unbreakable Commitment to Every Customer</h2>
              <div class="mt-5 space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                <p>
                  At Rudrakshama, our relationship with you does not end when your package arrives at your doorstep. It begins there. We are deeply committed to your satisfaction, your trust, and your spiritual journey. Every interaction you have with us — from browsing our website to wearing your Rudraksha — is designed to reflect our unwavering dedication to authenticity, transparency, and care.
                </p>
                <p>
                  We promise that every product we sell is exactly what we describe — no exaggeration, no misleading claims, no hidden surprises. Each bead is honestly sourced, genuinely tested, and accurately represented. If at any point you feel that we have fallen short of your expectations, our dedicated customer support team is just a phone call or message away, ready to make things right.
                </p>
                <p>
                  Your trust is the most sacred thing we hold. We earn it every single day through consistent quality, honest practices, and genuine care for your spiritual well-being. This is not just a promise — it is a sacred vow that guides everything we do at Rudrakshama.
                </p>
              </div>
              <div class="mt-6 flex flex-wrap gap-3">
                <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-saffron-500/10 text-saffron-500 text-xs sm:text-sm font-semibold">
                  <i class="fa fa-check" aria-hidden="true"></i> Authenticity Guaranteed
                </div>
                <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-saffron-500/10 text-saffron-500 text-xs sm:text-sm font-semibold">
                  <i class="fa fa-check" aria-hidden="true"></i> 7-Day Return Policy
                </div>
                <div class="flex items-center gap-2 px-4 py-2 rounded-full bg-saffron-500/10 text-saffron-500 text-xs sm:text-sm font-semibold">
                  <i class="fa fa-check" aria-hidden="true"></i> Lifetime Support
                </div>
              </div>
            </div>
            <div class="rounded-xl overflow-hidden shadow-lg">
              <img src="assets/Rudraksham.jpg" alt="Rudrakshama customer commitment to authenticity and satisfaction" class="w-full h-72 sm:h-96 object-cover" loading="lazy">
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 10: CTA
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-14 sm:py-20 lg:py-28 bg-brown-700 relative overflow-hidden">
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-10 left-10 w-32 h-32 bg-saffron-500 rounded-full blur-3xl"></div>
          <div class="absolute bottom-10 right-10 w-48 h-48 bg-gold-500 rounded-full blur-3xl"></div>
        </div>
        <div class="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span class="inline-block px-3 py-1 bg-saffron-500/15 text-saffron-400 text-xs sm:text-sm font-semibold rounded-full mb-4 sm:mb-6">
            <i class="fa fa-om mr-1" aria-hidden="true"></i> Begin Your Journey
          </span>
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-heading leading-tight">
            Begin Your Sacred Journey with <span class="text-saffron-500">Genuine Rudraksha</span>
          </h2>
          <p class="mt-3 sm:mt-4 text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
            Whether you seek peace of mind, spiritual growth, or divine protection — our authenticated collection is here to guide your path. Join 50,000+ devoted customers who trust Rudrakshama.
          </p>
          <div class="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a routerLink="/home"
               class="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-3.5 bg-saffron-500 text-white font-bold rounded-lg hover:bg-saffron-600 transition-all shadow-lg shadow-saffron-500/25 text-sm sm:text-base">
              <i class="fa fa-shopping-cart mr-1" aria-hidden="true"></i> Shop Genuine Rudraksha
            </a>
            <a routerLink="/contact"
               class="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:border-gold-500 hover:text-gold-500 transition-all text-sm sm:text-base">
              <i class="fa fa-phone mr-1" aria-hidden="true"></i> Talk to Our Team
            </a>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 11: FAQ
           ═══════════════════════════════════════════════════════════ -->
      <section class="py-14 sm:py-20 lg:py-24 bg-white">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-10 sm:mb-14">
            <span class="inline-block px-3 py-1 bg-saffron-500/10 text-saffron-500 text-xs sm:text-sm font-semibold rounded-full mb-3 sm:mb-4">FAQ</span>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-brown-700 font-heading">Frequently Asked Questions</h2>
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

    </div>
  `,
  styles: [`
    :host { display: block; }
    .font-heading { font-family: 'Red Hat Display', serif; }
    .font-body { font-family: 'DM Sans', sans-serif; }
  `]
})
export class AboutComponent {
  values = [
    { icon: 'fa fa-certificate', title: 'Authenticity', desc: 'Every Rudraksha bead we sell is 100% genuine, lab-certified, and naturally sourced. We never compromise on authenticity — it is the sacred foundation of our business.' },
    { icon: 'fa fa-handshake-o', title: 'Trust', desc: 'We earn the trust of our customers through consistent honesty, transparent practices, and by standing behind every product with our authenticity guarantee.' },
    { icon: 'fa fa-diamond', title: 'Quality', desc: 'From the sourcing of raw beads to the final packaging, every step in our process is designed to deliver products of the highest quality and spiritual potency.' },
    { icon: 'fa fa-heart', title: 'Customer Satisfaction', desc: 'Your happiness and spiritual fulfillment are our greatest rewards. We go above and beyond to ensure every customer feels valued, heard, and supported.' },
    { icon: 'fa fa-eye', title: 'Transparency', desc: 'We believe in complete openness about our sourcing, pricing, and quality processes. What you see is exactly what you get — no hidden surprises, ever.' },
    { icon: 'fa fa-om', title: 'Spiritual Responsibility', desc: 'We understand that Rudraksha is sacred. We handle every bead with the reverence it deserves and ensure it reaches you energized and ready for your spiritual practice.' },
  ];

  whyUs = [
    { icon: 'fa fa-certificate', title: '100% Genuine Rudraksha', desc: 'Every bead is lab-tested and comes with a certificate of authenticity. Our verification process is the most rigorous in the industry.' },
    { icon: 'fa fa-check-circle', title: 'Quality Verified Products', desc: 'Multiple rounds of quality inspection ensure each bead has the correct mukhi count, natural texture, and energetic purity.' },
    { icon: 'fa fa-inr', title: 'Affordable Pricing', desc: 'We cut out middlemen by sourcing directly from Nepal and Indonesia, passing the savings to you without compromising on quality.' },
    { icon: 'fa fa-lock', title: 'Secure Payments', desc: 'Shop with confidence using our 256-bit SSL encrypted payment gateway. We support all major payment methods including COD.' },
    { icon: 'fa fa-truck', title: 'Fast Delivery', desc: 'Free express shipping across India with most orders dispatched within 24 hours. Track your sacred parcel every step of the way.' },
    { icon: 'fa fa-headphones', title: 'Dedicated Customer Support', desc: 'Our spiritual advisors and customer care team are available to guide you in choosing the right Rudraksha for your specific needs.' },
  ];

  qualitySteps = [
    { icon: 'fa fa-map-marker', title: 'Ethical Sourcing', desc: 'Direct procurement from certified harvesters in Nepal and Indonesia' },
    { icon: 'fa fa-search', title: 'Lab Testing', desc: 'Independent laboratory verification of every bead batch' },
    { icon: 'fa fa-check-square', title: 'Expert Inspection', desc: 'Manual quality check for mukhi count, texture, and energy' },
    { icon: 'fa fa-gift', title: 'Sacred Packaging', desc: 'Vibration-sealed packaging to preserve spiritual energy' },
    { icon: 'fa fa-truck', title: 'Safe Shipping', desc: 'Insured delivery with real-time tracking to your doorstep' },
  ];

  productCategories = [
    { icon: 'fa fa-diamond', title: '1 Mukhi to 14 Mukhi Rudraksha', desc: 'Complete range of single-mukhi to fourteen-mukhi beads, each carrying unique divine properties and spiritual significance for specific purposes.' },
    { icon: 'fa fa-mountain', title: 'Nepali Rudraksha', desc: 'Premium Himalayan beads known for their larger size, deeper grooves, and powerful spiritual energy. Considered the most potent variety in Vedic tradition.' },
    { icon: 'fa fa-leaf', title: 'Indonesian Rudraksha', desc: 'Smaller, lighter, and more affordable beads from Java and Indonesia. Perfect for daily wear and excellent for spiritual beginners on a budget.' },
    { icon: 'fa fa-circle-o-notch', title: 'Rudraksha Malas', desc: 'Sacred 108+1 bead prayer malas for japa meditation, mantra chanting, and daily spiritual practice. Available in multiple mukhi varieties.' },
    { icon: 'fa fa-circle', title: 'Bracelets', desc: 'Elegant Rudraksha bracelets designed for daily wear. Combine spiritual protection with modern style — perfect for work, travel, and everyday life.' },
    { icon: 'fa fa-id-card-o', title: 'Pendants', desc: 'Beautifully crafted Rudraksha pendants in pure silver and gold-plated settings. Premium designs that honor the sacred bead with elegance.' },
    { icon: 'fa fa-fire', title: 'Puja Accessories', desc: 'Complete puja kits with Rudraksha malas, holy ash, sindoor, akshata, dhoop, and all sacred items needed for traditional worship.' },
  ];

  faqs = [
    { q: 'When was Rudrakshama founded and why?', a: 'Rudrakshama was founded in 2015 in Varanasi, India. Our founder, a lifelong devotee of Lord Shiva, was moved to action after witnessing the growing market for counterfeit Rudraksha beads exploiting the faith of genuine spiritual seekers. We started with a simple mission — to ensure every devotee in India can access genuine, lab-certified Rudraksha without fear of deception.', open: false },
    { q: 'How do you ensure the Rudraksha you sell is genuine?', a: 'We have a rigorous five-stage quality process: ethical sourcing directly from certified harvesters in Nepal and Indonesia, independent laboratory testing, expert manual inspection for mukhi count and texture, sacred vibration-sealed packaging, and insured safe shipping. Every product comes with a certificate of authenticity.', open: false },
    { q: 'Where do you source your Rudraksha from?', a: 'We source our Rudraksha directly from two primary regions: the sacred Himalayan forests of Nepal (known for larger, more potent beads) and the fertile regions of Indonesia (known for smaller, affordable beads). We have established direct relationships with trusted harvesters, eliminating middlemen.', open: false },
    { q: 'Do you offer a return or exchange policy?', a: 'Yes, we offer a 7-day hassle-free return and exchange policy. If you are not satisfied with your purchase for any reason, you can return it in its original packaging for a full refund or exchange. Our customer support team will guide you through the process.', open: false },
    { q: 'Is it safe to buy Rudraksha online from Rudrakshama?', a: 'Absolutely. Our website uses 256-bit SSL encryption for all transactions. We support all major payment methods including UPI, credit/debit cards, net banking, and cash on delivery (for orders below \u20B95,000). Your personal and financial information is always protected.', open: false },
    { q: 'How long does delivery take?', a: 'We offer free standard delivery across India, which typically takes 3-5 business days. Express delivery (1-2 days) is available for major metro cities at a nominal charge. All orders are dispatched within 24 hours and come with real-time tracking.', open: false },
    { q: 'Can I consult with someone before buying Rudraksha?', a: 'Yes, absolutely. Our team includes spiritual advisors who can guide you in choosing the right Rudraksha based on your specific needs, zodiac sign, and spiritual goals. You can reach us via phone, WhatsApp, email, or our contact form.', open: false },
    { q: 'Do you offer bulk or wholesale pricing?', a: 'Yes, we offer special pricing for bulk orders, temple requirements, and wholesale inquiries. Please contact our team with your requirements and we will provide a customized quote that respects both your budget and the sacred quality of our products.', open: false },
    { q: 'Are your products energized before shipping?', a: 'Yes, every Rudraksha product at Rudrakshama is energized through proper Vedic rituals before it reaches your doorstep. We follow traditional consecration methods to ensure the beads carry positive spiritual vibrations from the moment you receive them.', open: false },
    { q: 'How can I contact Rudrakshama customer support?', a: 'You can reach us through multiple channels: phone at +91 94547 99616 (Mon-Sat, 9 AM - 7 PM), email at amitkumarpandey28075@gmail.com, WhatsApp, or through our website contact form. Our team typically responds within 2-4 hours during business hours.', open: false },
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
