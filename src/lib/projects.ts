export type Category = "Websites" | "Products" | "Branding" | "UI/UX";

export type CaseSection = { heading: string; body: string };

export type Project = {
  slug: string;
  title: string;
  category: Category;
  tag: string;
  /** One-line summary used on cards and in list schema. */
  blurb: string;
  cover?: number;
  pages?: number[];
  srcs?: string[];
  url?: string;

  /* ---------- case study ---------- */
  /** Client / sector line shown under the title. */
  client: string;
  sector: string;
  year: string;
  /** Short label for the kind of engagement, e.g. "Corporate website". */
  scope: string;
  /** Disciplines applied. */
  services: string[];
  /** Tools/stack, shown as small mono chips. */
  stack: string[];
  /** 2-3 sentence intro that sits under the case study H1. */
  overview: string;
  /** The narrative: challenge → approach → outcome. */
  sections: CaseSection[];
  /** Short, checkable statements about what shipped. No invented metrics. */
  delivered: string[];
  /** SEO */
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "topvision",
    title: "Top Vision Security",
    category: "Websites",
    tag: "Website",
    blurb:
      "A sleek corporate site for a Saudi security integrator - credibility, scale, and trust front and centre.",
    srcs: [
      "/work/ext-topvision-1.webp",
      "/work/ext-topvision-2.webp",
      "/work/ext-topvision-3.webp",
    ],
    url: "https://topvisioncompany.com/",
    client: "Top Vision Security Company LLC",
    sector: "Security systems · Saudi Arabia",
    year: "2026",
    scope: "Corporate website",
    services: ["Website Development", "UI/UX Design"],
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    overview:
      "Top Vision is a nationally recognised provider of custom-designed security equipment and consultancy in Saudi Arabia. They needed a corporate presence that matched the scale of the enterprise and government clients they pitch to.",
    sections: [
      {
        heading: "The challenge",
        body:
          "Security integration is a trust purchase. Buyers are procurement teams and facility managers comparing vendors on credibility before they ever compare price. Top Vision had the track record - eleven years, hundreds of completed projects, ISO 9001 certification - but nothing online that communicated it at a glance.",
      },
      {
        heading: "Our approach",
        body:
          "We built the homepage around proof rather than description. The hero states the promise plainly - securing your world with reliability - and the credibility markers sit immediately beside it, not buried on an About page: satisfied client count, ISO 9001 certification, years in market, projects delivered. The visual language borrows from the product world it sells into: deep navy, precise type, and a technical illustration style that reads as engineering rather than marketing.",
      },
      {
        heading: "The outcome",
        body:
          "A site that does the qualifying work before the first sales call. Services, partners, product ranges and brands each get a clear route from the main navigation, so a procurement visitor can self-serve their way to a shortlist decision and arrive at the contact form already convinced.",
      },
    ],
    delivered: [
      "Credibility-first homepage with trust markers above the fold",
      "Structured service, product and partner sections",
      "Responsive build across desktop, tablet and mobile",
      "Quote-request flow as the primary conversion path",
    ],
    metaTitle: "Top Vision Security - Corporate Website Case Study",
    metaDescription:
      "How Zaina Solutions designed and built a credibility-first corporate website for Top Vision Security, a Saudi Arabian security systems integrator.",
    keywords: [
      "corporate website design",
      "security company website",
      "Saudi Arabia web development",
      "B2B website case study",
    ],
  },
  {
    slug: "pantherklaw",
    title: "PANTHERKLAW",
    category: "Websites",
    tag: "Website",
    blurb:
      "A bold, cinematic studio site - dark and kinetic, built to make a film brand feel like a feature.",
    srcs: [
      "/work/ext-pantherklaw-1.webp",
      "/work/ext-pantherklaw-2.webp",
      "/work/ext-pantherklaw-3.webp",
    ],
    url: "https://pantherklaw.com/",
    client: "PANTHERKLAW",
    sector: "Film & production",
    year: "2026",
    scope: "Studio website",
    services: ["Website Development", "UI/UX Design", "Branding"],
    stack: ["Next.js", "Three.js / WebGL", "Framer Motion"],
    overview:
      "A production studio's website has one job: make people believe in the studio's taste before they see a single frame of work. PANTHERKLAW needed a site that felt like the films, not like a brochure about them.",
    sections: [
      {
        heading: "The challenge",
        body:
          "Creative studios are judged on craft instantly. A generic template - however well organised - actively costs a film brand work, because clients read the website as a sample of the studio's eye. The brief was atmosphere first: the site itself had to be a piece of the portfolio.",
      },
      {
        heading: "Our approach",
        body:
          "We went fully dark and kinetic. A WebGL particle field sits behind the type so the page has depth and motion without a single stock image. Typography carries the weight: oversized, confident, sparse. Everything that could be decoration was removed so that motion and scale do the work - the same discipline a good title sequence uses.",
      },
      {
        heading: "The outcome",
        body:
          "A site that reads as a statement rather than a directory. The brand mark, the darkness and the movement do the positioning work in the first two seconds, which is all a scrolling prospect gives you.",
      },
    ],
    delivered: [
      "Cinematic dark-mode art direction",
      "WebGL/Three.js animated hero background",
      "Kinetic typography and scroll-driven motion",
      "Performance-tuned so the effects never block first paint",
    ],
    metaTitle: "PANTHERKLAW - Cinematic Studio Website Case Study",
    metaDescription:
      "How Zaina Solutions built a dark, kinetic WebGL website for film studio PANTHERKLAW - motion-led art direction that makes the site part of the portfolio.",
    keywords: [
      "creative studio website",
      "WebGL website design",
      "film production website",
      "dark website design",
    ],
  },
  {
    slug: "aardha",
    title: "Aardha Enterprises",
    category: "Websites",
    tag: "Website",
    blurb:
      "An interactive 3D website giving a 25-year precision rubber-parts manufacturer a modern, premium presence.",
    srcs: [
      "/work/ext-aardha-1.webp",
      "/work/ext-aardha-2.webp",
      "/work/ext-aardha-3.webp",
    ],
    url: "https://aardha.in/",
    client: "Aardha Enterprises",
    sector: "Precision rubber manufacturing",
    year: "2026",
    scope: "Manufacturer website with 3D product views",
    services: ["Website Development", "UI/UX Design", "3D / Interaction"],
    stack: ["Next.js", "Three.js", "Tailwind CSS"],
    overview:
      "Aardha has spent 25 years engineering rubber sealing components for industries where a failed seal is a serious problem - dam and water infrastructure among them. Their online presence didn't reflect that level of precision.",
    sections: [
      {
        heading: "The challenge",
        body:
          "Industrial manufacturers are consistently under-served by web design. The category default is a grey table of part numbers, which makes a 25-year specialist look interchangeable with a trading company. Aardha needed buyers to feel the engineering quality before they reached a spec sheet.",
      },
      {
        heading: "Our approach",
        body:
          "We treated the components as products worth showing. Interactive 3D lets a visitor rotate and inspect parts in the browser rather than squint at a catalogue photo. A confident gold-on-dark palette signals premium without shouting, and the messaging leads with the two things that actually close industrial deals - precision and trust - supported by the numbers that back them: years in operation, clients served, applications covered.",
      },
      {
        heading: "The outcome",
        body:
          "A manufacturer site that looks like the quality of the parts it sells. Applications and industries are structured so a procurement engineer can find their use case quickly, and the 3D views give the brand a differentiator almost nobody in the category has.",
      },
    ],
    delivered: [
      "Interactive 3D product viewer in the browser",
      "Industry and application-led information architecture",
      "Premium dark and gold visual system",
      "Enquiry flow built around specification requests",
    ],
    metaTitle: "Aardha Enterprises - 3D Manufacturing Website Case Study",
    metaDescription:
      "How Zaina Solutions built an interactive 3D website for Aardha Enterprises, a precision rubber component manufacturer - modern, premium and engineered for procurement buyers.",
    keywords: [
      "manufacturing website design",
      "3D product website",
      "industrial website India",
      "Three.js website case study",
    ],
  },
  {
    slug: "nellissery",
    title: "Nellissery Traders",
    category: "Websites",
    tag: "Website",
    blurb: "A clean, fast business website built for clarity and long-term use.",
    cover: 13,
    pages: [12, 13, 14, 15],
    client: "Nellissery Traders",
    sector: "Sanitaryware & interiors · Kerala",
    year: "2026",
    scope: "Business website",
    services: ["Website Development", "UI/UX Design"],
    stack: ["Next.js", "Tailwind CSS"],
    overview:
      "A long-established trading business that needed a straightforward, credible website - one that shows the range properly and stays easy to maintain for years.",
    sections: [
      {
        heading: "The challenge",
        body:
          "Showroom businesses lose enquiries online for an unglamorous reason: visitors can't quickly tell what's stocked or whether the business is still active. The site needed to answer both in seconds, and it needed to stay cheap to run.",
      },
      {
        heading: "Our approach",
        body:
          "Clarity over cleverness. Large, well-lit product photography carries the quality of the range, the layout stays calm and readable on a phone, and contact details are never more than a scroll away. We kept the build deliberately light so pages load fast on ordinary mobile connections - the way most local customers actually arrive.",
      },
      {
        heading: "The outcome",
        body:
          "A site that does the basics properly: fast, clear, current, and simple enough that the business isn't dependent on a developer for routine changes.",
      },
    ],
    delivered: [
      "Product-led page structure with room to grow",
      "Mobile-first layout tuned for local traffic",
      "Lightweight build for fast loads",
      "Clear contact and enquiry routes throughout",
    ],
    metaTitle: "Nellissery Traders - Business Website Case Study",
    metaDescription:
      "How Zaina Solutions designed a clean, fast business website for Nellissery Traders - clear product presentation, mobile-first, and built for long-term use.",
    keywords: [
      "business website Kerala",
      "small business web design",
      "sanitaryware website",
      "local business website India",
    ],
  },
  {
    slug: "soorya",
    title: "Soorya Maternity & Children's Care",
    category: "Websites",
    tag: "Website",
    blurb:
      "A warm, trustworthy presence for a maternity & children's care hospital.",
    cover: 20,
    pages: [19, 20],
    client: "Soorya Maternity & Children's Care",
    sector: "Healthcare · Maternity & paediatrics",
    year: "2026",
    scope: "Healthcare website",
    services: ["Website Development", "UI/UX Design"],
    stack: ["Next.js", "Tailwind CSS"],
    overview:
      "Choosing where to have a baby is one of the most emotional decisions a family makes. The website had to feel like the kind of place you would trust with that.",
    sections: [
      {
        heading: "The challenge",
        body:
          "Most hospital websites are built for administrators, not for anxious parents at 1am. Information is buried in PDF-style pages, tone is clinical, and the one thing a visitor actually wants - who will care for us, and how do we reach them - takes four clicks.",
      },
      {
        heading: "Our approach",
        body:
          "We led with warmth and reassurance: real photography of mothers and children, soft colour, generous type, and language that speaks to families rather than to the medical board. Departments and specialists are presented as people you can trust, and contact and appointment routes are repeated wherever a visitor might decide to act.",
      },
      {
        heading: "The outcome",
        body:
          "A site that carries the feeling of the care itself - trusted care for mothers and children - and works as well on a phone in a waiting room as on a desktop.",
      },
    ],
    delivered: [
      "Warm, family-first art direction",
      "Departments and services structured for quick scanning",
      "Appointment and contact routes on every key page",
      "Fully responsive across phone, tablet and desktop",
    ],
    metaTitle: "Soorya Maternity & Children's Care - Hospital Website Case Study",
    metaDescription:
      "How Zaina Solutions designed a warm, trustworthy website for Soorya Maternity & Children's Care - family-first art direction with clear appointment routes.",
    keywords: [
      "hospital website design",
      "healthcare web design India",
      "maternity hospital website",
      "clinic website Kerala",
    ],
  },
  {
    slug: "oneness",
    title: "The Oneness Living",
    category: "Websites",
    tag: "Website",
    blurb: "A considered brand website with a calm, editorial feel.",
    cover: 23,
    pages: [22, 23, 24],
    client: "The Oneness Living",
    sector: "Lifestyle & living",
    year: "2026",
    scope: "Brand website",
    services: ["Website Development", "UI/UX Design", "Branding"],
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    overview:
      "A lifestyle brand whose whole proposition is calm. The website had to embody that rather than describe it.",
    sections: [
      {
        heading: "The challenge",
        body:
          "Brands built on a feeling are the easiest to get wrong online. Add too much - busy grids, competing calls to action, stock imagery - and the proposition collapses. The hard part was restraint.",
      },
      {
        heading: "Our approach",
        body:
          "We designed it like an editorial publication: deep, quiet space, a slow scroll rhythm, and photography given room to breathe. Motion is minimal and soft. Every element that didn't earn its place was cut, so the pace of the page itself communicates the brand before a word is read.",
      },
      {
        heading: "The outcome",
        body:
          "A site that feels considered and unhurried - a brand experience rather than a page of information.",
      },
    ],
    delivered: [
      "Editorial layout system with generous whitespace",
      "Photography-led storytelling",
      "Subtle scroll-linked motion",
      "Calm, restrained interaction design",
    ],
    metaTitle: "The Oneness Living - Brand Website Case Study",
    metaDescription:
      "How Zaina Solutions designed a calm, editorial brand website for The Oneness Living - restrained layout, photography-led storytelling, and subtle motion.",
    keywords: [
      "brand website design",
      "editorial web design",
      "lifestyle brand website",
      "minimal website design India",
    ],
  },
  {
    slug: "gobeyond",
    title: "Go Beyond Gym",
    category: "Products",
    tag: "SaaS Platform",
    blurb:
      "An all-in-one gym management platform that replaces manual tracking with one easy system.",
    cover: 33,
    pages: [31, 32, 33, 34],
    url: "https://gobeyondgym.com",
    client: "Go Beyond Gym (Zaina product)",
    sector: "Fitness SaaS",
    year: "2026",
    scope: "Multi-tenant SaaS platform",
    services: ["MVP Development", "UI/UX Design", "Branding"],
    stack: ["Next.js", "Supabase", "PostgreSQL", "WhatsApp Cloud API"],
    overview:
      "Most independent gyms still run on a paper register, a WhatsApp group and the owner's memory. Go Beyond Gym is our own product, built to replace all three with one system a gym owner can actually operate.",
    sections: [
      {
        heading: "The challenge",
        body:
          "Gym software exists, but it is built for chains - priced and designed for staff who have time to learn it. An independent gym owner is coaching on the floor. If membership renewal takes more than a few taps, the software gets abandoned and the register comes back.",
      },
      {
        heading: "Our approach",
        body:
          "We designed around the owner's real day rather than a feature list. Members, plans, attendance, payments and renewals live in one dashboard with the daily actions surfaced first. Renewal reminders and receipts go out over WhatsApp, because that is where members already are. Each gym gets its own branded space within a shared multi-tenant platform, so onboarding a new gym costs nothing in setup.",
      },
      {
        heading: "The outcome",
        body:
          "A platform that runs a gym end to end - membership, attendance, billing and member communication - without the owner needing training, and priced for single-location businesses rather than chains.",
      },
    ],
    delivered: [
      "Multi-tenant architecture with per-gym branding",
      "Membership, attendance, plans and payments in one dashboard",
      "Automated WhatsApp renewal reminders and receipts",
      "Member-facing app alongside the owner dashboard",
    ],
    metaTitle: "Go Beyond Gym - Gym Management SaaS Case Study",
    metaDescription:
      "How Zaina Solutions designed and built Go Beyond Gym, a multi-tenant gym management platform with memberships, attendance, payments and WhatsApp automation.",
    keywords: [
      "gym management software",
      "SaaS development India",
      "gym software Kerala",
      "multi-tenant SaaS case study",
    ],
  },
  {
    slug: "hostel",
    title: "Hostel Management",
    category: "Products",
    tag: "SaaS Platform",
    blurb:
      "Hotel & mess management with digital tracking, NFC access, and automated, fair billing.",
    cover: 36,
    pages: [35, 36],
    client: "Hostel & Mess Management",
    sector: "Hospitality & institutional software",
    year: "2026",
    scope: "Management platform",
    services: ["MVP Development", "UI/UX Design"],
    stack: ["Next.js", "Supabase", "NFC"],
    overview:
      "A smart hostel and mess management system built to track food usage accurately and bill students fairly - replacing manual registers and paper coupons with digital tracking and automated billing.",
    sections: [
      {
        heading: "The challenge",
        body:
          "Mess billing by paper coupon is unfair in both directions. Students pay flat rates for meals they never ate, wardens can't prove consumption, and the kitchen over-produces because nobody has real numbers. Everyone accepts the waste because the tracking cost more than the loss.",
      },
      {
        heading: "Our approach",
        body:
          "We made capture effortless: NFC taps at the point of service record actual consumption, and billing is generated from that record rather than from an assumption. Wardens get transparency over usage and wastage, students get itemised bills they can verify, and the kitchen gets demand data it never had.",
      },
      {
        heading: "The outcome",
        body:
          "Billing that students can trust because it reflects what they actually consumed, and an operations view that turns mess management from guesswork into numbers.",
      },
    ],
    delivered: [
      "NFC-based access and consumption capture",
      "Automated, itemised billing from real usage",
      "Warden dashboard for transparency and wastage control",
      "Mobile-first student interface",
    ],
    metaTitle: "Hostel & Mess Management - Platform Case Study",
    metaDescription:
      "How Zaina Solutions built a hostel and mess management platform with NFC tracking and automated, fair billing - replacing paper coupons and manual registers.",
    keywords: [
      "hostel management software",
      "mess management system",
      "NFC attendance system",
      "institutional software India",
    ],
  },
  {
    slug: "jarbot",
    title: "Jar Bot",
    category: "Products",
    tag: "Connected System",
    blurb:
      "Turns everyday physical interaction into structured digital insight for better control.",
    cover: 38,
    pages: [37, 38],
    client: "Jar Bot",
    sector: "Connected hardware / IoT",
    year: "2026",
    scope: "Connected product system",
    services: ["MVP Development", "UI/UX Design", "Branding"],
    stack: ["IoT", "Embedded sensing", "Cloud dashboard"],
    overview:
      "Jar Bot is a connected system designed to monitor, measure and manage usage with precision - turning everyday physical interaction into structured digital insight.",
    sections: [
      {
        heading: "The challenge",
        body:
          "Consumption that nobody measures is consumption nobody controls. The interesting design problem was not the sensing - it was keeping the product simple enough that people would actually use it, while the intelligence stayed out of the way.",
      },
      {
        heading: "Our approach",
        body:
          "Simple on the surface, intelligent where it matters. The physical object stays an ordinary object - you use it exactly as you would otherwise - while measurement happens quietly underneath. The digital layer turns those raw interactions into a record that supports accountability and better decisions, presented as answers rather than as raw telemetry.",
      },
      {
        heading: "The outcome",
        body:
          "A connected product that adds visibility and control without adding friction to the everyday action it measures.",
      },
    ],
    delivered: [
      "Connected hardware and sensing concept",
      "Usage monitoring and measurement logic",
      "Insight dashboard for control and accountability",
      "Product identity and presentation",
    ],
    metaTitle: "Jar Bot - Connected Product System Case Study",
    metaDescription:
      "How Zaina Solutions designed Jar Bot, a connected system that monitors and measures everyday usage - simple on the surface, intelligent underneath.",
    keywords: [
      "IoT product development",
      "connected device design",
      "smart product India",
      "hardware MVP development",
    ],
  },
  {
    slug: "linkafe",
    title: "Linkafe",
    category: "Branding",
    tag: "Identity System",
    blurb: "A brand identity built to translate consistently across every platform.",
    cover: 40,
    pages: [39, 40, 41, 42, 43],
    client: "Linkafe",
    sector: "Coffee & hospitality · Gulf",
    year: "2026",
    scope: "Brand identity system",
    services: ["Branding", "UI/UX Design"],
    stack: ["Identity system", "Packaging", "Signage"],
    overview:
      "A coffee brand identity designed to hold together across bilingual signage, packaging, storefront and digital - without losing its character in any of them.",
    sections: [
      {
        heading: "The challenge",
        body:
          "A coffee brand lives in wildly different contexts on the same day: a cup in someone's hand, a sign read at 60km/h, a social post two centimetres tall. Bilingual Arabic and Latin lockups make that harder - most identities end up with a strong version in one language and a compromise in the other.",
      },
      {
        heading: "Our approach",
        body:
          "We built the mark first as a piece of geometry that survives scale - clean enough to read on architectural signage, distinct enough to hold as a small avatar. Arabic and Latin lockups were designed as equals rather than translations. A warm, earthy palette carries the coffee category without resorting to the usual brown clichés, and the system was documented so packaging, storefront and digital all pull from the same rules.",
      },
      {
        heading: "The outcome",
        body:
          "An identity that is recognisably the same brand on a building, a bag of beans and a phone screen - which is the only real test of an identity system.",
      },
    ],
    delivered: [
      "Primary mark and bilingual Arabic/Latin lockups",
      "Colour and typography system",
      "Packaging and storefront signage application",
      "Usage rules for consistent rollout",
    ],
    metaTitle: "Linkafe - Coffee Brand Identity Case Study",
    metaDescription:
      "How Zaina Solutions built the Linkafe brand identity - a bilingual Arabic and Latin system designed to hold up across packaging, signage and digital.",
    keywords: [
      "brand identity design",
      "coffee brand branding",
      "bilingual logo design",
      "identity system case study",
    ],
  },
  {
    slug: "uiux",
    title: "UI / UX Designs",
    category: "UI/UX",
    tag: "Product Design",
    blurb:
      "Selected interface work - mobile app flows and screens designed to feel right.",
    cover: 26,
    pages: [25, 26, 27, 28, 29, 30],
    client: "Selected product design work",
    sector: "Mobile apps · Various",
    year: "2026",
    scope: "Interface and flow design",
    services: ["UI/UX Design"],
    stack: ["Figma", "Design systems", "Prototyping"],
    overview:
      "A selection of interface work across mobile products - health and fitness, travel, and commerce - focused on flows that feel obvious in use.",
    sections: [
      {
        heading: "The challenge",
        body:
          "Most app ideas fail at the second screen. The concept is sound, but the flow asks for too much too early, or buries the one action the user came for. Good interface design is mostly the discipline of removing steps.",
      },
      {
        heading: "Our approach",
        body:
          "We design flows before screens: what the user is trying to do, in what order, and what can be deferred or removed. Once the flow holds up, visual design does its job - clear hierarchy, honest type sizes, generous tap targets, and motion used to explain transitions rather than to decorate them. Everything is built on a component system so the product stays consistent as it grows.",
      },
      {
        heading: "The outcome",
        body:
          "Interfaces that feel obvious in the hand - which is the hardest thing to achieve and the easiest thing to take for granted.",
      },
    ],
    delivered: [
      "End-to-end flows before visual design",
      "Component-based design systems",
      "High-fidelity screens across light and dark",
      "Interactive prototypes for validation",
    ],
    metaTitle: "UI/UX Design Work - Mobile App Case Study",
    metaDescription:
      "Selected UI/UX design work by Zaina Solutions - mobile app flows and screens across health, travel and commerce, built on component design systems.",
    keywords: [
      "UI UX design India",
      "mobile app design",
      "product design case study",
      "app UI designer Kerala",
    ],
  },
];

export const CATEGORIES: Category[] = ["Websites", "Products", "Branding", "UI/UX"];

export const img = (pg: number) => `/work/pg-${String(pg).padStart(2, "0")}.webp`;
export const coverOf = (p: Project) => p.srcs?.[0] ?? img(p.cover ?? 0);
export const pagesOf = (p: Project) => p.srcs ?? (p.pages ?? []).map(img);

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

/** Next project in the list, wrapping around - used for case study footers. */
export function nextProject(slug: string) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  if (i === -1) return PROJECTS[0];
  return PROJECTS[(i + 1) % PROJECTS.length];
}
