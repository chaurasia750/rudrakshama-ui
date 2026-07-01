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

## Shell Public Pages (bitscholarsedu replica)
- **NavbarComponent**: Top bar (phone, email, social icons, login/register), sticky nav (logo "Rudraksham", nav links, Contact CTA button, mobile hamburger menu with slide-down)
- **FooterComponent**: 4-column grid (brand + social, quick links, programs, contact info), copyright bar with privacy/terms
- **HomeComponent**: Hero carousel slideshow (4 Rudraksham images, prev/next arrows, dot indicators, auto-advance 5s), stats bar, about section with image grid, programs cards, "Why Choose Us" 4-column grid, testimonials carousel, CTA section
- **AboutComponent**: Hero header, mission/vision with image, values grid, CTA section
- **ContactComponent**: Contact info block, contact form with name/phone/email/message (connected to `POST /enquiries`), social links
- **AppComponent**: Conditional navbar/footer based on route `showNavbar` data, `<router-outlet>` for page content

## Design Tokens (Shell Public)
- **Font**: DM Sans (body), Red Hat Display (headings via `.font-heading` class)
- **Primary**: `#0A1628` navy, `#FFD000` gold, `#1a2d5a` hover blue
- **Icons**: Font Awesome 4.7 (`<i class="fa fa-*">`)
- **Layout**: Tailwind CSS utility classes, max-w-7xl containers
- **Components**: No external UI library for public pages (pure Tailwind)
