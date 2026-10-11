import type { ImageAsset, SiteConfig } from "@/types/site";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  STUDIO 99 BARBERS — central configuration
 *
 *  This is the ONLY file you need to edit to rebrand the template for a new shop.
 *  Everything here is fictional demonstration content: the shop, address, phone
 *  number, barbers, statistics and testimonials are placeholders. Replace them
 *  with your client's real details and set `demoMode: false` before launch.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Helper for Unsplash CDN photos (free Unsplash License). */
const unsplash = (id: string, alt: string, credit: string, position?: string): ImageAsset => ({
  src: `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=2400`,
  alt,
  credit,
  position,
});

const photos = {
  razorDetail: unsplash("1599351431202-1e0f0137899a", "Tattooed barber using a straight razor to finish a client's haircut", "Agustin Fernandez", "50% 35%"),
  razorSteam: unsplash("1672642150228-3fcd5826ec26", "Barber working a straight razor through rising steam during a hot towel shave", "Redd Francisco"),
  scissorCut: unsplash("1647140655214-e4a2d914971f", "Barber cutting a client's hair with scissors and comb", "Nate Johnston"),
  chairBrick: unsplash("1585747860715-2ba37e788b70", "Black leather barber chair against an exposed brick wall", "Nathon Oski"),
  clientInChair: unsplash("1503951914875-452162b0f3f1", "Client seated in a barber's chair waiting for his cut", "Allef Vinicius"),
  blowDry: unsplash("1605497788044-5a32c7078486", "Barber in a denim apron blow-drying and styling a client's hair", "delfina pan"),
  tools: unsplash("1621605815971-fbc98d665033", "Two hair clippers, scissors, a comb and grooming products laid out on slate", "Andrea Donato"),
  silverChair: unsplash("1621645582931-d1d3e6564943", "Black and silver vintage barber chair", "Joshua Lawrence"),
  interior: unsplash("1536520002442-39764a41e987", "Shop interior lit by warm pendant lamps", "Jason Leung"),
  thinningShears: unsplash("1657105052497-f996284ffff8", "Barber using thinning shears and a comb to add texture on top", "Gulom Nazarov"),
  beardMono: unsplash("1517832606299-7ae9b720a186", "Black and white close-up of scissors shaping a client's beard", "Nathon Oski"),
  shopFront: unsplash("1678356164573-9a534fe43958", "Two men standing outside a barbershop storefront", "Federico Tonini"),
  whiteShirtCut: unsplash("1593702275687-f8b402bf1fb5", "Barber in a white shirt cutting a client's hair", "Michael DeMoya"),
  beardProfile: unsplash("1630827020718-3433092696e7", "Profile of a man with a full, shaped beard and dark hair", "Ahmad Ebadi"),
  clipperCut: unsplash("1635273051937-a0ddef9573b6", "Client getting his sides taken down with clippers", "Salah Regouane"),
  closeCut: unsplash("1635273051839-003bf06a8751", "Close-up of a barber blending the side of a haircut", "Salah Regouane"),
  headDetail: unsplash("1568339434343-2a640a1a9946", "Close-up of a fresh men's haircut from behind", "Amritpal Singh"),
  beardScissors: unsplash("1599011176306-4a96f1516d4d", "Barber trimming a client's beard with scissors", "Mr Shave"),
  clipperObi: unsplash("1567894340315-735d7c361db0", "Barber cutting a client's hair in the shop", "Obi"),
  portraitA: unsplash("1562004760-aceed7bb0fe3", "Portrait of a man in a black button-up shirt", "Hannah Skelly", "50% 25%"),
  portraitB: unsplash("1618049049816-43a00d5b0c3d", "Portrait of a man in a white collared shirt", "Damian Barczak", "50% 25%"),
  portraitC: unsplash("1599834562135-b6fc90e642ca", "Portrait of a man in a black zip-up jacket", "Stephan Louis", "50% 25%"),
};

export const site: SiteConfig = {
  demoMode: true,

  business: {
    name: "Studio 99 Barbers",
    wordmark: { top: "Studio", mark: "99", bottom: "Barbers" },
    tagline: "Precision cuts. Individual style. No compromises.",
    description:
      "A modern barbershop for skin fades, tapers, scissor work and beard grooming. Every appointment starts with a consultation and ends with a cut that fits you.",
    foundedYear: 2016,
    priceRange: "$$",
    currency: "USD",
    locale: "en-US",
    timeZone: "America/Los_Angeles",
  },

  theme: {
    colors: {
      background: "#101010",
      surface: "#191919",
      text: "#F5F1E8",
      muted: "#A8A49D",
      accent: "#D47B4A",
      onAccent: "#101010",
      border: "#303030",
      silver: "#C9C7C2",
    },
    fonts: {
      display: "'Big Shoulders Display'",
      body: "'Archivo Variable'",
      serif: "'Instrument Serif'",
    },
  },

  contact: {
    phoneDisplay: "(555) 010-0199",
    phoneE164: "+15550100199",
    email: "hello@studio99.example",
    address: {
      street: "99 Mercer Lane",
      city: "Riverside",
      region: "CA",
      postalCode: "90099",
      country: "US",
    },
    neighborhood: "Arts District",
    parkingNote: "Street parking on Mercer Lane; paid lot one block east on 4th Street.",
    // mapEmbedUrl: "https://www.google.com/maps/embed?pb=...",
  },

  hours: [
    { day: "Mo", label: "Monday", open: null, close: null },
    { day: "Tu", label: "Tuesday", open: "10:00", close: "19:00" },
    { day: "We", label: "Wednesday", open: "10:00", close: "19:00" },
    { day: "Th", label: "Thursday", open: "10:00", close: "20:00" },
    { day: "Fr", label: "Friday", open: "10:00", close: "20:00" },
    { day: "Sa", label: "Saturday", open: "09:00", close: "17:00" },
    { day: "Su", label: "Sunday", open: "10:00", close: "15:00" },
  ],

  social: [
    { label: "Instagram", handle: "@studio99barbers", url: "https://www.instagram.com/" },
    { label: "TikTok", handle: "@studio99barbers", url: "https://www.tiktok.com/" },
    { label: "Facebook", handle: "Studio 99 Barbers", url: "https://www.facebook.com/" },
  ],

  announcement: {
    enabled: true,
    message: "Now booking — your next cut starts here",
    href: "/booking",
    linkLabel: "Book a chair",
  },

  stats: {
    rating: 4.9,
    reviewCount: 640,
    yearsInBusiness: 9,
    cutsDelivered: "28k",
    // reviewPlatformUrl: "https://g.page/r/your-google-review-link",
  },

  booking: {
    provider: "none",
    // Paste the client's public booking link here (Square, Fresha, Booksy, Vagaro, Setmore…)
    // to switch the booking page from demo mode to live hand-off.
    url: "",
    providerLabel: "our booking partner",
    cancellationPolicy: [
      "Please give at least 24 hours' notice to cancel or reschedule.",
      "Arriving more than 10 minutes late may mean a shorter service or a new time.",
      "Repeated no-shows may require a deposit for future bookings.",
    ],
    paymentNote: "Payment is taken in the shop after your service. Card, Apple Pay and Google Pay accepted.",
  },

  serviceCategories: [
    { id: "haircuts", label: "Haircuts", description: "Every cut includes a consultation, wash on request and a styled finish." },
    { id: "beard", label: "Beard & shave", description: "Shaping, line-ups and traditional hot towel work." },
    { id: "packages", label: "Packages", description: "Combined services at a better rate than booking separately." },
  ],

  services: [
    { id: "classic-haircut", name: "Classic haircut", category: "haircuts", price: 40, durationMinutes: 45,
      description: "Clipper and scissor cut tailored to your head shape, finished with a neck shave and style.", image: photos.whiteShirtCut },
    { id: "skin-fade", name: "Skin fade", category: "haircuts", price: 48, durationMinutes: 50, popular: true,
      description: "Seamless blend down to the skin — low, mid or high — with a sharp outline and textured top.", image: photos.clipperCut },
    { id: "taper-fade", name: "Taper fade", category: "haircuts", price: 45, durationMinutes: 45,
      description: "A softer fade at the temples and neckline that grows out clean between visits.", image: photos.closeCut },
    { id: "scissor-cut", name: "Scissor cut", category: "haircuts", price: 55, durationMinutes: 60,
      description: "Shears only, for natural movement and weight where you want it. Ideal for longer tops.", image: photos.scissorCut },
    { id: "buzz-cut", name: "Buzz cut", category: "haircuts", price: 28, durationMinutes: 25,
      description: "One length all over, cleaned-up edges and a crisp line-up." },
    { id: "long-haircut", name: "Long haircut", category: "haircuts", price: 65, durationMinutes: 70, priceFrom: true,
      description: "Shape, layers and weight removal for shoulder-length hair and longer.", image: photos.blowDry },
    { id: "beard-trim", name: "Beard trim", category: "beard", price: 22, durationMinutes: 20,
      description: "Length taken down evenly with clean cheek and neck lines." },
    { id: "beard-shaping", name: "Beard shaping", category: "beard", price: 30, durationMinutes: 30, popular: true,
      description: "Full sculpt with razor-defined lines, hot towel and beard oil.", image: photos.beardScissors },
    { id: "hot-towel-shave", name: "Hot towel shave", category: "beard", price: 45, durationMinutes: 40,
      description: "Traditional straight-razor shave with hot towels, pre-shave oil and a cold finish.", image: photos.razorSteam },
    { id: "cut-and-beard", name: "Haircut & beard", category: "packages", price: 65, durationMinutes: 70, popular: true,
      includes: ["classic-haircut", "beard-trim"],
      description: "Any classic or fade haircut with a beard trim and line-up. The most-booked visit in the shop.", image: photos.beardProfile },
    { id: "full-chair", name: "The Full Chair", category: "packages", price: 110, durationMinutes: 105,
      includes: ["classic-haircut", "beard-shaping", "hot-towel-shave"],
      description: "Haircut, beard sculpt, hot towel shave and a scalp treatment. Ninety minutes that are entirely yours.", image: photos.razorDetail },
  ],

  barbers: [
    {
      slug: "marcus-hale",
      name: "Marcus Hale",
      specialty: "Skin fades & sharp line-ups",
      yearsExperience: 11,
      shortBio: "Known for fades so smooth you can't see where the guard changes.",
      bio: [
        "Marcus learned to cut in his uncle's shop and never stopped chasing a cleaner blend. He works mostly with clippers and foil shavers and is obsessive about a symmetrical outline.",
        "If you want a fade that still looks right two weeks later, he's the one to book.",
      ],
      favoriteStyles: ["High skin fade", "Burst fade", "Drop fade with a hard part"],
      signatureServiceId: "skin-fade",
      portrait: photos.portraitA,
      instagram: "https://www.instagram.com/",
    },
    {
      slug: "teo-navarro",
      name: "Teo Navarro",
      specialty: "Scissor work & longer styles",
      yearsExperience: 8,
      shortBio: "Brings salon-level shear work to the barber chair.",
      bio: [
        "Teo trained in a hair salon before switching to barbering, and it shows in how he handles length. He cuts to how your hair falls naturally, not against it.",
        "Book Teo for textured crops, curtains, flow and anything that needs movement.",
      ],
      favoriteStyles: ["Textured crop", "Modern mullet", "Classic scissor taper"],
      signatureServiceId: "scissor-cut",
      portrait: photos.portraitB,
      instagram: "https://www.instagram.com/",
    },
    {
      slug: "kofi-mensah",
      name: "Kofi Mensah",
      specialty: "Beards & hot towel shaves",
      yearsExperience: 6,
      shortBio: "Patient, precise and the calmest straight razor in the building.",
      bio: [
        "Kofi focuses on beard design: finding the line that suits your jaw and keeping it there. His hot towel shave is the quiet highlight of the shop.",
        "He's also great with curly and coily hair and with first-time clients who aren't sure what to ask for.",
      ],
      favoriteStyles: ["Sculpted full beard", "Taper with a defined beard", "Traditional wet shave"],
      signatureServiceId: "beard-shaping",
      portrait: photos.portraitC,
      instagram: "https://www.instagram.com/",
    },
  ],

  galleryCategories: [
    { id: "fades", label: "Fades" },
    { id: "tapers", label: "Tapers" },
    { id: "textured", label: "Textured crops" },
    { id: "scissor", label: "Scissor cuts" },
    { id: "beard", label: "Beard work" },
    { id: "shop", label: "The shop" },
  ],

  gallery: [
    { id: "g01", title: "Razor-finished fade", caption: "Straight-razor detailing around the ear after a skin fade.", category: "fades", shape: "tall", image: photos.razorDetail, barberSlug: "marcus-hale" },
    { id: "g02", title: "Clipper work", caption: "Taking the sides down before blending into the top.", category: "fades", shape: "wide", image: photos.clipperCut, barberSlug: "marcus-hale" },
    { id: "g03", title: "Scissor over comb", caption: "Shear work to keep natural weight on top.", category: "scissor", shape: "square", image: photos.scissorCut, barberSlug: "teo-navarro" },
    { id: "g04", title: "Hot towel shave", caption: "Steam, oil and a straight razor.", category: "beard", shape: "tall", image: photos.razorSteam, barberSlug: "kofi-mensah" },
    { id: "g05", title: "Taper blend", caption: "A soft taper at the temple that grows out clean.", category: "tapers", shape: "square", image: photos.closeCut },
    { id: "g06", title: "Texture on top", caption: "Thinning shears to add movement to a crop.", category: "textured", shape: "wide", image: photos.thinningShears, barberSlug: "teo-navarro" },
    { id: "g07", title: "Beard sculpt", caption: "Shaping the beard to the jawline.", category: "beard", shape: "square", image: photos.beardScissors, barberSlug: "kofi-mensah" },
    { id: "g08", title: "The finish", caption: "Blow-dry and style before you leave the chair.", category: "textured", shape: "tall", image: photos.blowDry },
    { id: "g09", title: "Clean taper", caption: "Neckline and sides tapered with clippers.", category: "tapers", shape: "tall", image: photos.clipperObi },
    { id: "g10", title: "Classic cut", caption: "Clipper and scissor cut with a neat part.", category: "scissor", shape: "wide", image: photos.whiteShirtCut },
    { id: "g11", title: "Full beard", caption: "A full beard kept full — just tidier.", category: "beard", shape: "tall", image: photos.beardProfile },
    { id: "g12", title: "Fresh from the back", caption: "The view your barber checks twice.", category: "fades", shape: "square", image: photos.headDetail },
    { id: "g13", title: "Chair three", caption: "Leather, brick and good light.", category: "shop", shape: "wide", image: photos.chairBrick },
    { id: "g14", title: "Tools of the trade", caption: "Clippers, shears and finishing products.", category: "shop", shape: "square", image: photos.tools },
    { id: "g15", title: "Under the pendants", caption: "The front of the shop on a weekday afternoon.", category: "shop", shape: "tall", image: photos.interior },
    { id: "g16", title: "Beard in mono", caption: "Scissor-trimmed beard, close up.", category: "beard", shape: "wide", image: photos.beardMono },
  ],

  testimonials: [
    {
      quote: "I've had the same fade for six years and this is the first time it looked exactly the way I picture it. Booked my next one before I left.",
      author: "Sample client",
      detail: "Skin fade with Marcus",
      isSample: true,
    },
    {
      quote: "Teo spent ten minutes asking how I style my hair before he picked up the scissors. That never happens.",
      author: "Sample client",
      detail: "Scissor cut with Teo",
      isSample: true,
    },
  ],

  values: [
    { title: "Precision", text: "Clean blends, sharp outlines and a second check in the mirror before you leave the chair." },
    { title: "Consultation first", text: "We talk through your hair, routine and reference photos before anything gets cut." },
    { title: "Better products", text: "Professional tools and finishing products, with honest advice on what to use at home." },
    { title: "Consistency", text: "Your barber keeps notes on your cut so the next one starts where the last one left off." },
  ],

  about: {
    headline: "Built around the chair.",
    intro:
      "Studio 99 started with one idea: a great haircut is a conversation, not a production line. Replace this story with your client's own.",
    story: [
      "We opened with three chairs, one playlist and a rule that nobody gets rushed. The shop is small on purpose — it means the person who cuts your hair has time to get it right.",
      "Our barbers come from different backgrounds: old-school shops, hair salons, competition floors. What they share is a habit of checking every line twice.",
    ],
    philosophy:
      "Your cut should look like you on a good day, every day. That means designing for how your hair grows, how you style it and how long you go between visits.",
    mission: "To make every client walk out sharper and more confident than they walked in.",
    experience: [
      { title: "Consultation", text: "We start by asking how you wear your hair and what's not working." },
      { title: "The cut", text: "Clippers, shears and razor work matched to your hair type." },
      { title: "The finish", text: "Hot towel, styling and product advice you can repeat at home." },
      { title: "Next time", text: "We note your cut so your next visit starts from the same place." },
    ],
    milestones: [
      { year: "2016", title: "Doors open", text: "Three chairs and a waiting list by the end of the first month." },
      { year: "2019", title: "Second floor", text: "Expanded to six chairs and added a dedicated shave station." },
      { year: "2022", title: "Training nights", text: "Started monthly sessions for apprentice barbers in the neighbourhood." },
      { year: "2025", title: "Online booking", text: "Moved every chair onto online booking with live availability." },
    ],
    images: [photos.interior, photos.chairBrick, photos.silverChair, photos.shopFront],
  },

  faqs: [
    { question: "How do I book an appointment?", answer: "Use the Book button anywhere on the site. Choose your service and barber, then pick a time on our booking page. You'll get a confirmation from the booking system once it's done." },
    { question: "Do you take walk-ins?", answer: "When a chair is free, yes. Weekday mornings are your best chance. Booking ahead is the only way to guarantee a time with a specific barber." },
    { question: "What payment methods do you accept?", answer: "Card, contactless, Apple Pay, Google Pay and cash. Tips can be added to card payments." },
    { question: "What happens if I'm running late?", answer: "Call us as soon as you know. Up to 10 minutes late we'll do our best to complete your full service; beyond that we may need to shorten it or move you to a later time." },
    { question: "What's your cancellation policy?", answer: "Please give at least 24 hours' notice to cancel or reschedule so we can offer the slot to someone else. Repeated no-shows may need a deposit for future bookings." },
    { question: "Not sure what cut to ask for?", answer: "Every appointment starts with a consultation. Bring a reference photo if you have one, or try our style finder to get some ideas before you come in." },
    { question: "Do you cut children's hair?", answer: "Yes, for ages 5 and up. Book a classic haircut and mention the child's age in the booking notes." },
    { question: "Where can I park?", answer: "Street parking is available on Mercer Lane, and there's a paid lot one block east on 4th Street." },
    { question: "What are your opening hours?", answer: "Tuesday to Sunday — the full schedule is in the footer and on the contact page. We're closed on Mondays." },
  ],

  styles: [
    { id: "high-skin-fade", name: "High skin fade", description: "Sides taken to the skin high up for maximum contrast with the top.", maintenance: "high", length: "short", fade: "high", finish: "clean", galleryIds: ["g01", "g12"], serviceId: "skin-fade" },
    { id: "mid-fade-crop", name: "Mid fade with textured crop", description: "A mid fade under a choppy, forward-styled top. Easy to style with matte paste.", maintenance: "medium", length: "short", fade: "mid", finish: "textured", galleryIds: ["g06", "g02"], serviceId: "skin-fade" },
    { id: "low-taper", name: "Low taper", description: "Clean at the neckline and temples while keeping fullness on the sides.", maintenance: "low", length: "medium", fade: "low", finish: "clean", galleryIds: ["g05", "g09"], serviceId: "taper-fade" },
    { id: "scissor-classic", name: "Classic scissor cut", description: "Natural shape and movement, cut entirely with shears. Grows out gracefully.", maintenance: "low", length: "medium", fade: "none", finish: "clean", galleryIds: ["g03", "g10"], serviceId: "scissor-cut" },
    { id: "textured-flow", name: "Textured flow", description: "Longer length with weight removed for movement. Air-dry friendly.", maintenance: "low", length: "long", fade: "none", finish: "textured", galleryIds: ["g08", "g06"], serviceId: "long-haircut" },
    { id: "buzz-lineup", name: "Buzz with sharp line-up", description: "One length all over with a crisp outline. Minimal effort, maximum definition.", maintenance: "medium", length: "short", fade: "none", finish: "clean", galleryIds: ["g12", "g02"], serviceId: "buzz-cut" },
    { id: "taper-curls", name: "Taper with natural curls", description: "A taper fade that lets curls or coils sit naturally on top.", maintenance: "medium", length: "medium", fade: "low", finish: "textured", galleryIds: ["g09", "g05"], serviceId: "taper-fade" },
  ],

  images: {
    hero: photos.razorDetail,
    heroSecondary: photos.tools,
    cta: photos.chairBrick,
    servicesHeader: photos.razorSteam,
  },

  seo: {
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://studio99.example",
    defaultTitle: "Studio 99 Barbers — Skin fades, tapers & beard grooming",
    titleTemplate: "%s | Studio 99 Barbers",
    description:
      "Premium barbershop for skin fades, taper fades, scissor cuts, beard shaping and hot towel shaves. Book your chair online.",
    keywords: ["barbershop", "barber", "skin fade", "taper fade", "beard trim", "hot towel shave", "men's haircut"],
    allowIndexing: false,
  },

  legal: {
    companyName: "Studio 99 Barbers (demo business)",
    lastUpdated: "October 2026",
    jurisdiction: "[State / country — confirm with the business owner]",
  },
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Our Barbers", href: "/barbers" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
