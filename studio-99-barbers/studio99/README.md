# Studio 99 Barbers — premium barbershop website template

A reusable, production-ready barbershop site built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4** and **Motion**. Every business detail lives in one typed config file, so a new client is a config edit, not a rewrite.

> Everything in the demo — shop name, address, phone, barbers, statistics and testimonials — is **fictional**. The site labels it as demo content and blocks search indexing until you switch `demoMode` off.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # optional — only needed for email delivery
npm run dev                  # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build (type-checks too) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint (Next.js core-web-vitals + TypeScript rules) |
| `npm run typecheck` | Standalone TypeScript check |

Requires Node.js 20.9 or newer.

---

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero, at-a-glance stats, most-booked services, signature work, barbers, values, testimonial, social strip, final CTA |
| `/services` | Full menu with category filters and an estimate builder (total + time, overlap warnings) |
| `/barbers` and `/barbers/[slug]` | Team grid and statically generated profile pages |
| `/gallery` | Filterable portfolio with a full-screen lightbox (keyboard, swipe, deep links like `?category=fades`) |
| `/style-finder` | Four-question quiz that suggests styles with matching gallery photos |
| `/about` | Story, philosophy, experience, standards, milestones |
| `/booking` | Service + barber selection, estimate, cancellation policy, honest hand-off (see Booking) |
| `/contact` | Address, phone, email, hours with live open/closed status, map, contact form |
| `/faq` | Accessible accordion |
| `/privacy`, `/terms` | Templates clearly marked for owner review |

Also generated: `sitemap.xml`, `robots.txt`, an Open Graph image, favicon and a branded 404.

---

## Rebranding for a new barbershop

Almost everything is in **`src/config/site.ts`**. Work through it top to bottom:

1. **`business`** — name, wordmark (`top`, `mark`, `bottom`), tagline, description, currency, locale and **time zone** (drives the "Open now" indicator).
2. **`theme.colors`** — background, surface, text, muted, accent, `onAccent` (text colour on accent buttons), border, silver. These become CSS variables at runtime; no component edits needed. Check contrast: muted text and the accent should stay at least 4.5:1 against the background.
3. **`contact`** — phone (display + E.164), email, address, neighbourhood, parking note, optional `mapEmbedUrl`, optional `geo` coordinates.
4. **`hours`** — 24-hour `HH:MM` strings, or `null` for closed days.
5. **`social`**, **`announcement`** (set `enabled: false` to hide the bar), **`stats`**.
6. **`services`**, **`barbers`**, **`gallery`**, **`testimonials`**, **`values`**, **`about`**, **`faqs`**, **`styles`** (quiz results).
7. **`seo`** — titles, description, keywords.
8. **`legal`** — company name, jurisdiction, last-updated date.
9. Finally set **`demoMode: false`** and **`seo.allowIndexing: true`**.

### Logo
The wordmark is typographic (`src/components/layout/wordmark.tsx`). To use a client's logo file instead, put it in `/public` and replace the contents of that component with a `next/image`. Also update `src/app/icon.svg` (favicon).

### Fonts
Fonts are self-hosted through `@fontsource` packages, so there are no runtime calls to Google Fonts. To change them:
1. `npm install @fontsource/<family>`
2. Update the imports at the top of `src/app/layout.tsx`
3. Update `theme.fonts` in the config

### Photos
Demo photos come from Unsplash under the free Unsplash License; credits are kept in the config (`credit`). To use a client's own photos:
- Put them in `public/photos/` and set `src: "/photos/fade-01.jpg"`, **or**
- Host them elsewhere and add that hostname to `images.remotePatterns` in `next.config.ts`.

Always write a real `alt` description. Use `position` (e.g. `"50% 25%"`) to keep faces in frame when an image is cropped. If an image ever fails to load, a branded fallback panel with its description appears instead of a broken icon.

### Services and prices
Each service supports `name`, `description`, `price`, `priceFrom` (shows "from"), `durationMinutes`, `category`, `image`, `popular`, `bookingUrl` and `includes`. `includes` lists other service ids bundled in a package, so the estimator can warn about double-booking. The homepage shows `popular` services first.

### Barber profiles
Each barber has a `slug` (becomes `/barbers/<slug>`), `specialty`, optional `yearsExperience`, `shortBio`, `bio` paragraphs, `favoriteStyles`, `signatureServiceId`, `portrait`, `instagram` and an individual `bookingUrl`. Gallery items with a matching `barberSlug` appear on that barber's profile.

---

## Booking

The booking page **never invents availability or confirms appointments itself**.

- **Demo mode (default):** `booking.url` is empty. The page lets visitors plan services and a barber, shows the estimate, states that online booking isn't connected, and offers **Call to book** plus **Email this request**, which opens their mail app with the selection pre-filled.
- **External booking:** paste the client's public booking link (Square Appointments, Fresha, Booksy, Vagaro, Setmore…) into `booking.url` and set `booking.providerLabel` (e.g. `"Square"`). The page then hands off to that provider in a new tab, where the client picks a real time slot.

Link priority is **barber `bookingUrl` → service `bookingUrl` (single service) → shop `booking.url`**. This lets each barber use their own staff booking page. Edit `booking.cancellationPolicy` and `booking.paymentNote` to match the shop's real policies.

Deep links work everywhere, for example `/booking?services=skin-fade,beard-trim&barber=teo-navarro`.

---

## Contact form

`src/app/api/contact/route.ts` validates submissions on the server with Zod (the same schema as the browser) and includes a honeypot field for basic spam filtering.

- **Without credentials (default):** the form clearly shows *demo mode*. After a valid submission it says **the message wasn't sent** and offers a one-tap email fallback. It never shows a false "sent" message.
- **To deliver by email via [Resend](https://resend.com):**
  1. Create a Resend account and verify the sending domain.
  2. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` (see `.env.example`).
  3. Redeploy. The form switches to live mode automatically.

The API key is read only on the server and never reaches the browser. To use a different provider, replace the `fetch` call in the route. For high-traffic sites, consider adding rate limiting (for example via Vercel's firewall rules).

---

## SEO

- Per-page titles, descriptions, canonical URLs and Open Graph and Twitter metadata (`src/lib/seo.ts`).
- `sitemap.xml` includes every page and barber profile.
- **Indexing is automatically disabled while `demoMode` is true** (`robots.txt` disallows all and pages carry `noindex`). This keeps a fictional business out of search results.
- **schema.org `BarberShop` structured data** (name, address, phone, hours, socials, booking action) is emitted only when `demoMode` is false. Aggregate ratings are intentionally not included; only add them if they come from a real review platform.
- Set `NEXT_PUBLIC_SITE_URL` to the live domain so canonical and sitemap URLs are correct.

---

## Accessibility and performance notes

- Skip link, semantic landmarks, one `h1` per page, visible focus rings.
- Mobile menu traps focus, closes on Escape and returns focus to its toggle.
- The lightbox is a native `<dialog>` with arrow-key navigation, swipe, and focus restored on close.
- FAQ follows the WAI-ARIA accordion pattern. Form errors are announced and linked to their fields.
- `prefers-reduced-motion` is honoured. The hero entrance is CSS-only, so the headline renders without waiting for JavaScript; parallax and other Motion effects switch off for reduced-motion users.
- Pages are statically generated. Images use `next/image` with AVIF/WebP, responsive `sizes` and fixed aspect boxes to avoid layout shift.

---

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project**, import the repo, and accept the detected Next.js settings. No build overrides are needed.
3. Under **Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL` and, if using email, `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL`.
4. Deploy. Later pushes to the main branch deploy automatically, and pull requests get preview URLs.
5. **Custom domain:** go to **Settings → Domains**, add the domain, and create the DNS records Vercel shows at the registrar. Then update `NEXT_PUBLIC_SITE_URL` and redeploy.

The CLI alternative is `npx vercel` for a preview deploy, then `npx vercel --prod`.

---

## What's still demo or unconnected

| Area | Status | To make it real |
| --- | --- | --- |
| Business details, staff, stats, testimonials, about story, FAQ policies | Fictional, labelled on the page | Replace in `site.ts` and set `demoMode: false` |
| Online booking | Demo mode (call or email fallback) | Set `booking.url` |
| Contact form delivery | Demo mode (honest notice + mailto) | Set the Resend environment variables |
| Map | Styled placeholder with a Google Maps link | Set `contact.mapEmbedUrl` |
| Instagram strip | Gallery photos linking to the profile; **not a live feed** | Optional: add a real feed integration |
| Privacy and terms | Templates, not legal advice | Owner review, ideally with a professional |
| Photos | Unsplash demo images | The client's own photography |

---

## Project structure

```
src/
  app/                 routes, metadata, sitemap, robots, OG image, API
  components/
    layout/            announcement bar, navbar + mobile menu, footer, floating actions, open status
    home/              homepage sections
    services/ booking/ gallery/ barbers/ contact/ faq/ quiz/
    ui/                buttons, headings, safe image, page header, badges, legal layout
  config/site.ts       ← everything a client changes
  lib/                 formatting, booking-link resolution, estimate logic, SEO, form schema
  types/site.ts        the typed data model
```

## Photo credits (Unsplash)
Agustin Fernandez, Redd Francisco, Nate Johnston, Nathon Oski, Allef Vinicius, delfina pan, Andrea Donato, Joshua Lawrence, Jason Leung, Gulom Nazarov, Federico Tonini, Michael DeMoya, Ahmad Ebadi, Salah Regouane, Amritpal Singh, Mr Shave, Obi, Hannah Skelly, Damian Barczak, Stephan Louis.
