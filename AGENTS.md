# Project: Haut Spare UI (Member + Admin)

## Progress
### Done
- Member routing paths renamed leads-* → customers-*
- Shared components use `appPrefix` conditional logic for "Customers" vs "Leads"
- "All Users" dropdown hidden on member dashboard
- Add Customer button navigates correctly in both apps
- Horizontal scroll fixed in member layout
- Lead add form validation timing bug fixed (appPrefix race)
- Lead add navigation after save fixed
- Assign user and checkboxes hidden in member leads list
- Lead details null protection (createdBy, assignedUser nullable)
- Lead For → Plan For; [object Object] fixed
- Member dashboard: top card removed; Distributor → Associate with profile API
- SponsorMembers: uses MembersService with response unwrapping fallback
- Full bitscholarsedu.org replica: Navbar (top bar + sticky nav with logo/links/CTA/mobile hamburger), Footer (4-col: brand, quick links, programs, contact + social + copyright), Home page (hero carousel, stats, about, programs, why choose us, testimonials, CTA), About page, Contact page
- BannerComponent removed from AppComponent (hero carousel now in HomeComponent)
- FooterComponent moved to AppComponent (shown on all pages when `showNavbar`)
- Font changed from Inter to DM Sans + Red Hat Display (matching bitscholarsedu)
- Font Awesome 4.7 added (matching bitscholarsedu)
- **Full Rudrakshama eCommerce homepage**: 14-section premium spiritual store homepage with Hero, Trust Badges, About, 20 Categories, Why Choose Us, Benefits, 8 Products, 6 Testimonials, Our Promise, 6 Blog Posts, 10 FAQs, Newsletter, CTA, full SEO with Schema.org
- **Tailwind config**: Added saffron/brown/gold custom color palettes for Rudrakshama brand
- **Navbar/Footer rebranded**: Rudrakshama branding with saffron/brown color scheme
- **SEO**: Full meta tags, Open Graph, Twitter Card, Schema.org (Organization, WebSite, BreadcrumbList, ProductList) in index.html

### In Progress
- SponsorMembers data display issue (intermittent)

## Known Issues
1. **Shell vs remote HttpClient**: Member app provides its own `HttpClient` via `provideHttpClient(withInterceptorsFromDi())` in AppModule. Shell's `HttpResponseInterceptor` may not always be available to remote app HTTP calls.
2. **HTTP 400 on `POST /enquiries`**: Backend rejects payload; need to confirm expected field names/format with backend team.

### SponsorMembersComponent
- Uses `MembersService.getMembers()` (same as member list page)
- Response fallback: `res?.data ?? res` then `unwrapped?.items ?? []`
- Client-side pagination: `itemsPerPage = 5`, same pattern as sponsor-list, bank-details, downline-list
- Date pipe: `member.joiningDate | date:'dd/MM/yyyy'`
- Uses `ButtonComponent` (shared UI) for prev/next
- Added `ChangeDetectorRef.markForCheck()` for CD safety

## Routes
- Member: /member/customers-dashboard, /member/customers-list, /member/customers-add, /member/customers-detail/:id, /member/customers-closing/:id
- Admin: /admin/leads/dashboard, /admin/leads/list, /admin/leads/add, /admin/leads/detail/:id, /admin/leads/closing/:id
- Shell public: /home, /about, /contact, /login (showNavbar: false), /signup (showNavbar: false)

## Key Libraries
- `libs/shared/leads/` - Shared lead components (header, list, detail, add)
- `libs/shared/members/` - Shared member components and MembersService
- `apps/member/` - Member remote app
- `apps/admin/` - Admin app
- `apps/shell/` - Shell with interceptors

## Shell Public Pages (Rudrakshama - eCommerce)
- **NavbarComponent**: Top bar (phone, email, social icons, login/register), sticky nav (logo "Rudrakshama", nav links: Home, About, Shop, Blog, Contact, "Shop Now" CTA button, mobile hamburger menu)
- **FooterComponent**: 4-column grid (brand + social, quick links, categories, contact info), copyright bar with privacy/terms/refund
- **HomeComponent**: Premium eCommerce homepage with 14 sections:
  1. Hero carousel (4 slides, prev/next, dots, auto-advance 6s) with flash sale banner
  2. Trust badges (4: Genuine, Quality, Secure, Fast Delivery)
  3. About Rudrakshama (~300 words, 2-column with image grid)
  4. Featured Categories (20 category cards: 1-14 Mukhi, Nepali, Indonesian, Mala, Bracelets, Pendants, Puja)
  5. Why Choose Us (6 feature cards with icons)
  6. Benefits of Rudraksha (7 benefits with gradient dark section)
  7. Best Selling Products (8 products with price, old price, rating, badges)
  8. Customer Testimonials (6 reviews with star ratings)
  9. Our Promise (5 commitment cards)
  10. Blog Section (6 blog post cards)
  11. FAQ Section (10 expandable questions with toggle)
  12. Newsletter signup (email form on saffron gradient)
  13. Final CTA (spiritual journey prompt with glow effects)
  14. Full SEO: Open Graph, Twitter Card, Schema.org (Organization, WebSite, BreadcrumbList, ProductList)
- **AboutComponent**: Premium About page with 11 sections:
  1. Hero header with breadcrumb and gradient background
  2. Our Story (~500 words, founder's journey from Varanasi, 2-column with sticky image grid)
  3. Our Mission (~200 words, with stats cards)
  4. Our Vision (~200 words, dark gradient section with 4 vision cards)
  5. Our Values (6 value cards: Authenticity, Trust, Quality, Customer Satisfaction, Transparency, Spiritual Responsibility)
  6. Why Choose Rudrakshama (6 feature cards)
  7. Our Quality Process (5-step timeline: Sourcing, Testing, Inspection, Packaging, Shipping)
  8. Our Products (7 category cards with descriptions)
  9. Customer Commitment (promise section with guarantee badges)
  10. CTA (spiritual journey prompt)
  11. FAQ (10 expandable questions about company, authenticity, products, support)
- **ContactComponent**: Premium Contact page with 9 sections:
  1. Hero header with breadcrumb and gradient background
  2. Contact Information (6 cards: Address, Phone, WhatsApp, Email, Hours, Contact Person)
  3. Contact Form (Name, Phone, Email, Subject dropdown, Message) connected to `POST /enquiries`
  4. Google Map embed with Get Directions button (Mirzapur, UP)
  5. Why Contact Us (7 reasons: Product Info, Order Support, Shipping, Bulk, Guidance, Payments, Returns)
  6. WhatsApp CTA (green section with direct chat link)
  7. Customer Support (3 cards: Rapid Response, Satisfaction, Order Assistance)
  8. FAQ (10 expandable questions about contacting, ordering, tracking, returns)
  9. Final CTA (Call + WhatsApp buttons)
  - Real business details: Amit Kumar Pandey, Barew Adalhat Mirzapur UP 221002, +91 94547 99616
- **AppComponent**: Conditional navbar/footer based on route `showNavbar` data, `<router-outlet>` for page content
- **ShopComponent**: Premium Shop page with 9 sections:
  1. Hero header with breadcrumb and trust badges
  2. Product Filters (Mukhi 1-14, Origin, Type, Price, Availability, Sort) + Product Grid (12 products with View/Add/Buy buttons)
  3. Featured Categories (20 category cards with descriptions)
  4. Why Buy from Rudrakshama (6 feature cards)
  5. Buying Guide (5 educational sections: What is Rudraksha, Choosing Mukhi, Nepali vs Indonesian, Identifying Genuine, Care)
  6. Customer Reviews (6 reviews with product names)
  7. FAQ (15 expandable questions about products, shipping, payments, care)
  8. Final CTA (Shop Now + Talk to Expert buttons)
  9. Full SEO: Product Listing Schema, Breadcrumb Schema
- **index.html**: Full SEO meta tags, Open Graph, Twitter Card, Schema.org structured data, custom splash screen with Rudrakshama branding

## Design Tokens (Shell Public - Rudrakshama)
- **Font**: DM Sans (body), Red Hat Display (headings via `.font-heading` class)
- **Colors**: Saffron `#FF6F00` (primary accent), Dark Brown `#4E342E` (headings/dark sections), Gold `#C9A227` (premium accents), White `#FFFFFF`
- **Tailwind Custom**: `saffron-*`, `brown-*`, `gold-*` color palettes defined in tailwind.config.js
- **Icons**: Font Awesome 4.7 (`<i class="fa fa-*">`)
- **Layout**: Tailwind CSS utility classes, max-w-7xl containers
- **Components**: No external UI library for public pages (pure Tailwind + FormsModule for FAQ toggle)
