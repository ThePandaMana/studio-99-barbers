/**
 * Data model for the barbershop template.
 * Every page reads from `src/config/site.ts`, which must satisfy `SiteConfig`.
 */

export type ImageAsset = {
  /** Absolute URL (allowed in next.config.ts) or a path inside /public, e.g. "/photos/hero.jpg". */
  src: string;
  /** Describe what is in the photo for screen readers and SEO. */
  alt: string;
  /** CSS object-position, e.g. "50% 30%" to keep a face in frame when cropped. */
  position?: string;
  /** Photographer credit (shown in the README credits, not on the page). */
  credit?: string;
};

export type ThemeConfig = {
  colors: {
    background: string;
    surface: string;
    text: string;
    muted: string;
    accent: string;
    /** Text colour used on top of the accent colour (buttons). */
    onAccent: string;
    border: string;
    silver: string;
  };
  /**
   * Font family names. The font files themselves are imported in src/app/layout.tsx
   * via @fontsource packages — change both places when swapping fonts.
   */
  fonts: { display: string; body: string; serif: string };
};

export type Address = {
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
};

export type DayKey = "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su";

export type OpeningHoursEntry = {
  day: DayKey;
  label: string;
  /** 24h "HH:MM", or null when closed. */
  open: string | null;
  close: string | null;
};

export type ServiceCategoryId = "haircuts" | "beard" | "packages";

export type ServiceCategory = {
  id: ServiceCategoryId;
  label: string;
  description: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  /** Price in whole currency units. */
  price: number;
  /** Show "from" before the price when the final price depends on the client. */
  priceFrom?: boolean;
  durationMinutes: number;
  category: ServiceCategoryId;
  image?: ImageAsset;
  popular?: boolean;
  /** Overrides the shop-wide booking URL for this service. */
  bookingUrl?: string;
  /** Other service ids already included (used to warn about double-booking in the estimator). */
  includes?: string[];
};

export type Barber = {
  slug: string;
  name: string;
  specialty: string;
  /** Years behind the chair. Leave undefined if unknown. */
  yearsExperience?: number;
  shortBio: string;
  bio: string[];
  favoriteStyles: string[];
  /** Service id shown as "Book them for" on the profile. */
  signatureServiceId?: string;
  portrait: ImageAsset;
  instagram?: string;
  /** Barber-specific booking page (e.g. their Booksy or Square staff link). */
  bookingUrl?: string;
};

export type GalleryCategoryId = "fades" | "tapers" | "textured" | "scissor" | "beard" | "shop";

export type GalleryItem = {
  id: string;
  title: string;
  caption: string;
  category: GalleryCategoryId;
  image: ImageAsset;
  /** Controls the tile shape in the editorial grid. */
  shape: "tall" | "wide" | "square";
  /** Optional link to the barber who did the work. */
  barberSlug?: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  detail: string;
  /** Mark sample content so it is labelled on the page. Set to false only for real, permitted reviews. */
  isSample: boolean;
};

export type BookingProvider = "none" | "square" | "fresha" | "booksy" | "vagaro" | "setmore" | "custom";

export type BookingConfig = {
  provider: BookingProvider;
  /** Public booking page. Leave empty to run the booking page in demo mode. */
  url: string;
  /** Name shown on buttons, e.g. "Square". */
  providerLabel: string;
  cancellationPolicy: string[];
  /** Show a deposit / payment note under the summary. */
  paymentNote?: string;
};

export type FaqItem = { question: string; answer: string };

export type StyleRecommendation = {
  id: string;
  name: string;
  description: string;
  maintenance: "low" | "medium" | "high";
  length: "short" | "medium" | "long";
  fade: "none" | "low" | "mid" | "high";
  finish: "clean" | "textured";
  galleryIds: string[];
  serviceId: string;
};

export type Milestone = { year: string; title: string; text: string };

export type SiteConfig = {
  /** When true, sample figures, testimonials and staff are labelled as demo content and search indexing is disabled. */
  demoMode: boolean;
  business: {
    name: string;
    /** Wordmark lines. `mark` is the large numeral/monogram. */
    wordmark: { top: string; mark: string; bottom: string };
    tagline: string;
    description: string;
    foundedYear?: number;
    priceRange: string;
    currency: string;
    locale: string;
    /** IANA time zone of the shop, used for the "open now" indicator. */
    timeZone: string;
  };
  theme: ThemeConfig;
  contact: {
    phoneDisplay: string;
    /** E.164 format, e.g. +15550100199 */
    phoneE164: string;
    email: string;
    address: Address;
    neighborhood?: string;
    /** Optional Google Maps embed URL (Share > Embed a map > copy the src). */
    mapEmbedUrl?: string;
    parkingNote?: string;
    geo?: { latitude: number; longitude: number };
  };
  hours: OpeningHoursEntry[];
  social: { label: string; handle: string; url: string }[];
  announcement: { enabled: boolean; message: string; href?: string; linkLabel?: string };
  stats: { rating: number; reviewCount: number; yearsInBusiness: number; cutsDelivered: string; reviewPlatformUrl?: string };
  booking: BookingConfig;
  serviceCategories: ServiceCategory[];
  services: Service[];
  barbers: Barber[];
  galleryCategories: { id: GalleryCategoryId; label: string }[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  values: { title: string; text: string }[];
  about: {
    headline: string;
    intro: string;
    story: string[];
    philosophy: string;
    mission: string;
    experience: { title: string; text: string }[];
    milestones: Milestone[];
    images: ImageAsset[];
  };
  faqs: FaqItem[];
  styles: StyleRecommendation[];
  images: {
    hero: ImageAsset;
    heroSecondary: ImageAsset;
    cta: ImageAsset;
    servicesHeader: ImageAsset;
  };
  seo: {
    siteUrl: string;
    defaultTitle: string;
    titleTemplate: string;
    description: string;
    keywords: string[];
    /** Set to true for a real client launch. Ignored (forced off) while demoMode is true. */
    allowIndexing: boolean;
  };
  legal: { companyName: string; lastUpdated: string; jurisdiction: string };
};
