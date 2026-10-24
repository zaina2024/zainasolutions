export type Category = "Websites" | "Software" | "Products" | "Branding" | "UI/UX";

/**
 * "client"  - built for a paying client
 * "product" - Zaina's own product, built and owned in-house
 */
export type Ownership = "client" | "product";

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
  /** Client work vs Zaina's own product. Defaults to client work. */
  ownership?: Ownership;
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
    slug: "everything-supermarket",
    title: "Everything Supermarket",
    category: "Websites",
    tag: "Website",
    blurb:
      "A website for a nine-store supermarket group in Kozhikode - every outlet easy to find, every order one WhatsApp message away.",
    srcs: [
      "/work/everything-supermarket-1.webp",
      "/work/everything-supermarket-2.webp",
      "/work/everything-supermarket-3.webp",
    ],
    url: "https://everythingsupermarket.in/",
    client: "Everything Supermarket",
    sector: "Grocery retail · Kozhikode",
    year: "2026",
    scope: "Multi-store retail website",
    services: ["Website Development", "UI/UX Design"],
    stack: ["HTML / CSS / JavaScript", "Static site build", "Structured data", "Vercel"],
    overview:
      "Everything Supermarket runs nine neighbourhood stores across Kozhikode under four names - Everything, Values, Anona and Wagonmart. Their old website had gone offline, while customers kept searching for each store by name.",
    sections: [
      {
        heading: "The challenge",
        body:
          "Nobody searches for \"a supermarket\". They search for the one near them - the Kovoor store's phone number, the West Hill store's timings. With four store names under one group and no working website, those searches ended on directory listings or nowhere at all.",
      },
      {
        heading: "Our approach",
        body:
          "We built the site around the stores rather than the brand. Each of the nine outlets has its own page with its address, phone number, opening hours and directions, marked up so search engines read it as an individual grocery store. Ordering stays where customers already are: a shopping list built on the site goes straight to the store on WhatsApp, and a dedicated page covers home delivery. It is a static build with no CMS or database, so it loads fast on mobile data and costs almost nothing to run.",
      },
      {
        heading: "The outcome",
        body:
          "A site that answers the question each visitor actually has - which store, what number, open now? - and turns it into a WhatsApp order in a couple of taps.",
      },
    ],
    delivered: [
      "Nine store pages with address, phone number and opening hours",
      "Shopping list that sends straight to the store on WhatsApp",
      "Home-delivery page with an English and Malayalam delivery poster",
      "Store-level structured data, sitemap and instant indexing",
    ],
    metaTitle: "Everything Supermarket - Multi-Store Retail Website Case Study",
    metaDescription:
      "How Zaina Solutions built the Everything Supermarket website - nine store pages across Kozhikode, WhatsApp shopping lists and local SEO for a neighbourhood supermarket group.",
    keywords: [
      "supermarket website design",
      "retail website Kozhikode",
      "WhatsApp ordering website",
      "local SEO Kerala",
    ],
  },
  {
    slug: "pantherklaw",
    title: "PANTHERKLAW",
    category: "Websites",
    tag: "Website",
    blurb:
      "A cinematic portfolio for a film publicity studio - every release campaign gets its own scroll-driven set piece.",
    srcs: [
      "/work/pantherklaw-1.webp",
      "/work/pantherklaw-2.webp",
      "/work/pantherklaw-3.webp",
    ],
    url: "https://pantherklaw.com/",
    client: "PANTHERKLAW",
    sector: "Film publicity & key art",
    year: "2026",
    scope: "Studio website redesign",
    services: ["Website Development", "UI/UX Design"],
    stack: ["HTML / CSS / JavaScript", "Scroll-driven animation", "Self-hosted fonts"],
    overview:
      "PANTHERKLAW designs key art, title logos, title animation and complete release campaigns for cinema. A studio like that is judged on taste in the first few seconds, so its website has to feel like a film - not a brochure about one.",
    sections: [
      {
        heading: "The challenge",
        body:
          "The first site we built for the studio was a statement piece: dark, kinetic, a WebGL particle field behind oversized type. As the slate of films grew, the work itself needed the stage. For a studio whose product is the poster and the campaign, the films have to be the hero - not a gallery at the bottom of the page.",
      },
      {
        heading: "Our approach",
        body:
          "We rebuilt the site from scratch around the films. Each campaign gets its own scroll-driven set piece that echoes how it was released: Kattalan plays on an IMAX screen that grows full-bleed behind rows of cinema seats; Derby takes over a floodlit stadium, and scrolling scrubs through its title animation frame by frame; Dheeram, Toxic and the rest each get their own staging. It is written in plain JavaScript with no animation libraries, and the fonts are self-hosted, so the effects stay smooth on an ordinary phone.",
      },
      {
        heading: "The outcome",
        body:
          "A portfolio where every project is presented the way it was released - so a producer sees the studio's range and craft before reading a word.",
      },
    ],
    delivered: [
      "A custom scroll set piece for each film campaign",
      "Title animation scrubbed frame by frame on scroll",
      "Library-free JavaScript with self-hosted fonts",
      "Tuned for smooth playback on mobile",
    ],
    metaTitle: "PANTHERKLAW - Film Publicity Studio Website Case Study",
    metaDescription:
      "How Zaina Solutions redesigned the PANTHERKLAW website - a cinematic portfolio where each film campaign gets its own scroll-driven set piece, built library-free for mobile.",
    keywords: [
      "film studio website",
      "creative studio website",
      "scroll animation website",
      "portfolio website design Kerala",
    ],
  },
  {
    slug: "heywash",
    title: "heyWash",
    category: "Products",
    tag: "SaaS Platform",
    blurb:
      "Retention software for car washes - scan a number plate and the customer's visits, stamps and rewards are already there.",
    srcs: ["/work/heywash-1.webp", "/work/heywash-2.webp", "/work/heywash-3.webp"],
    url: "https://heywash.in/",
    ownership: "product",
    client: "Zaina Solutions - in-house product",
    sector: "Car wash SaaS",
    year: "2026",
    scope: "Multi-tenant SaaS platform",
    services: ["MVP Development", "App Development", "UI/UX Design"],
    stack: ["React", "TypeScript", "Supabase", "PostgreSQL", "Vision AI"],
    overview:
      "Most car washes have no idea who their regulars are. heyWash is our own product, built on one idea: a wash's real business is the customer who comes back, so the software should be built around bringing them back.",
    sections: [
      {
        heading: "The challenge",
        body:
          "Car wash software usually means a billing screen. It records the job and forgets the customer. Paper loyalty cards get lost, nobody notices when a regular stops coming, and asking for a phone number at the bay slows the queue down.",
      },
      {
        heading: "Our approach",
        body:
          "We made the vehicle the starting point. Staff point a phone at the number plate, it is read automatically, and the customer's history, digital stamp card and rewards come up - no app for the customer and no typing for staff. Customers are grouped by how recently they came, not just how often, so a regular who has gone quiet is flagged while there is still time to win them back. The business rules live in the database itself, with row-level security keeping every wash's data separate.",
      },
      {
        heading: "The outcome",
        body:
          "A platform sold in two packages: Retain, the loyalty and retention engine, and Run, which adds staff attendance, payroll, expenses and profit and loss for owners who want the whole business in one place.",
      },
    ],
    delivered: [
      "Automatic number-plate reading from the phone camera",
      "Digital stamp cards, rewards and offers",
      "Customer segments that flag regulars at risk",
      "Two packages with limits enforced in the database",
    ],
    metaTitle: "heyWash - Car Wash Retention SaaS Case Study",
    metaDescription:
      "How Zaina Solutions built heyWash, a car wash retention platform with number-plate scanning, digital stamp cards and at-risk customer alerts.",
    keywords: [
      "car wash software India",
      "customer loyalty software",
      "SaaS development India",
      "number plate recognition app",
    ],
  },
  {
    slug: "nellissery",
    title: "Nellissery Traders",
    category: "Websites",
    tag: "Website",
    blurb:
      "A catalogue-first website for a plumbing and sanitaryware shop - 27 brands, and an enquiry list that goes straight to WhatsApp.",
    srcs: [
      "/work/nellissery-1.webp",
      "/work/nellissery-2.webp",
      "/work/nellissery-3.webp",
    ],
    url: "https://nellisserytraders.in/",
    client: "Nellissery Traders",
    sector: "Plumbing & sanitaryware · Ettumanoor, Kottayam",
    year: "2026",
    scope: "Catalogue website redesign",
    services: ["Website Development", "UI/UX Design"],
    stack: ["HTML / CSS / JavaScript", "Prerendered static pages", "Vercel"],
    overview:
      "Nellissery Traders has sold plumbing and sanitaryware on MC Road, Ettumanoor since 2003. We built their first website; this is the full redesign that replaced it - a catalogue first and foremost, built to be found in local search.",
    sections: [
      {
        heading: "The challenge",
        body:
          "People don't browse a hardware shop's website. They want to know one thing: does this shop carry this brand of this product, and what does it cost today? Prices move too often to publish, and a good-looking homepage doesn't answer the question.",
      },
      {
        heading: "Our approach",
        body:
          "We built it like the shop counter. Products are organised two ways - by category and by brand - across 12 categories and 27 brands. Customers add what they need to an enquiry list and send it to the shop on WhatsApp for the current price, so the site never shows a stale one. Every category, product and brand has its own prerendered page with a proper title, so each can rank in local search, and every address from the old site redirects to its new page.",
      },
      {
        heading: "The outcome",
        body:
          "A site that answers \"do you have it?\" in a search result and \"how much?\" in a WhatsApp chat - with the shop's real storefront photo and map location a tap away.",
      },
    ],
    delivered: [
      "Catalogue of 86 products across 12 categories and 27 brands",
      "Enquiry list sent straight to the shop on WhatsApp",
      "Prerendered pages for every product, category and brand",
      "Redirects from the old site, sitemap and search indexing",
    ],
    metaTitle: "Nellissery Traders - Plumbing Shop Catalogue Website Case Study",
    metaDescription:
      "How Zaina Solutions redesigned the Nellissery Traders website - a catalogue of 27 plumbing and sanitaryware brands with WhatsApp enquiries, built for local search in Ettumanoor.",
    keywords: [
      "plumbing shop website",
      "sanitaryware website Kerala",
      "catalogue website design",
      "local business website India",
    ],
  },
  {
    slug: "addmyads",
    title: "AddMyAds",
    category: "Products",
    tag: "Ad Platform",
    blurb:
      "A screen-advertising network for local venues - TVs in gyms, cafés and clinics play ads, and every play is counted.",
    srcs: ["/work/addmyads-1.webp", "/work/addmyads-2.webp", "/work/addmyads-3.webp"],
    url: "https://addmyads.in/",
    ownership: "product",
    client: "Zaina Solutions - in-house product",
    sector: "Digital out-of-home advertising",
    year: "2026",
    scope: "Ad network platform and TV app",
    services: ["App Development", "Website Development", "UI/UX Design"],
    stack: ["Next.js", "PostgreSQL", "Supabase", "Flutter (Android TV)"],
    overview:
      "Local businesses have few ways to advertise to people nearby that they can actually verify. AddMyAds puts their video or poster on TVs where people wait - gyms, cafés, clinics, shops - and proves every play.",
    sections: [
      {
        heading: "The challenge",
        body:
          "Screen advertising in small venues runs on trust: the advertiser pays and hopes the ad played. Without proof, renewals are a hard sell. And a venue owner won't keep a TV app that needs babysitting.",
      },
      {
        heading: "Our approach",
        body:
          "We built three pieces that work as one. An Android TV app loops the ads and updates itself. A platform schedules campaigns across screens and logs every play the moment an ad starts. Advertisers get proof without an account: a private report link they can open any time, plus PDF and CSV exports of every play by screen and by day. The public site keeps it just as simple - no sign-up, just an enquiry that reaches the team.",
      },
      {
        heading: "The outcome",
        body:
          "A network a venue can join by plugging in a TV, and an ad product an advertiser can check for themselves.",
      },
    ],
    delivered: [
      "Android TV player app with automatic updates",
      "Campaign scheduling across screens and venues",
      "Every play logged the moment an ad starts",
      "Private proof-of-play report link with PDF and CSV exports",
    ],
    metaTitle: "AddMyAds - Screen Advertising Platform Case Study",
    metaDescription:
      "How Zaina Solutions built AddMyAds, a screen-advertising network with an Android TV player, campaign scheduling and proof-of-play reports for advertisers.",
    keywords: [
      "digital signage software",
      "DOOH advertising platform",
      "proof of play reporting",
      "Android TV app development",
    ],
  },
  {
    slug: "tbi-mesce",
    title: "TBI MESCE",
    category: "Websites",
    tag: "Website",
    blurb:
      "A scroll-told website for the startup incubator at MES College of Engineering - from a student's idea to a company on campus.",
    srcs: [
      "/work/tbi-mesce-1.webp",
      "/work/tbi-mesce-2.webp",
      "/work/tbi-mesce-3.webp",
    ],
    url: "https://tbimesce.in/",
    client: "TBI MESCE - Technology Business Incubator",
    sector: "Startup incubation · Kuttippuram",
    year: "2026",
    scope: "Incubator website",
    services: ["Website Development", "UI/UX Design"],
    stack: ["HTML / CSS / JavaScript", "GSAP ScrollTrigger", "Vercel"],
    overview:
      "TBI MESCE is the technology business incubator at MES College of Engineering, Kuttippuram - an IEDC initiative where students build ideas, meet mentors and launch startups. Zaina Solutions is one of the startups incubated there.",
    sections: [
      {
        heading: "The challenge",
        body:
          "An incubator has to sell a feeling before it sells desks: that this is a place where a student project turns into a company. A list of facilities - cabins, WiFi, a FabLab - is accurate but flat, and it is what every co-working page already says.",
      },
      {
        heading: "Our approach",
        body:
          "We told it as a story. The page opens on the campus, then a scroll-driven sequence of real footage follows a lone student becoming a team in the lab. The facilities come in that order - five cabins for teams of four to six, the FabLab, mentors and a break zone. Colour does the pacing, shifting from light to cyan to the incubator's navy as you go deeper, and a wall of incubated startups closes the page as proof.",
      },
      {
        heading: "The outcome",
        body:
          "A site that reads as an invitation rather than a facilities sheet - built strictly from the two colours in the TBI logo and real photographs of its campus and cabins.",
      },
    ],
    delivered: [
      "Scroll-driven story sequence built from real campus footage",
      "Cabins, facilities and after-class sections",
      "Logo wall of startups incubated at TBI",
      "Colour system drawn strictly from the TBI logo",
    ],
    metaTitle: "TBI MESCE - Startup Incubator Website Case Study",
    metaDescription:
      "How Zaina Solutions designed the TBI MESCE website - a scroll-driven story for the technology business incubator at MES College of Engineering, Kuttippuram.",
    keywords: [
      "incubator website design",
      "college website Kerala",
      "scroll animation website",
      "startup incubator India",
    ],
  },
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
    slug: "mis-vector",
    title: "MIS Vector",
    category: "Software",
    tag: "AI Data Platform",
    blurb:
      "AI data analysis for businesses - upload spreadsheets or connect an API, and get dashboards, reports and reconciliations in minutes.",
    srcs: ["/work/mis-vector-1.webp", "/work/mis-vector-2.webp", "/work/mis-vector-3.webp"],
    url: "https://misvector.com/",
    client: "MIS Data Automate",
    sector: "Business intelligence SaaS",
    year: "2026",
    scope: "AI data-analysis platform",
    services: ["MVP Development", "UI/UX Design"],
    stack: ["React", "Vite", "Tailwind CSS", "AI analysis"],
    overview:
      "Most small businesses report from spreadsheets: someone exports the data, pastes it into another sheet, reconciles it by hand and rebuilds the same report every month. MIS Vector, built for MIS Data Automate, takes that job off their desk.",
    sections: [
      {
        heading: "The challenge",
        body:
          "MIS reporting is manual, scattered and slow. Data sits across spreadsheets, exports and accounting software in different formats, reconciliation eats days of copy-pasting, and every report is rebuilt from scratch.",
      },
      {
        heading: "Our approach",
        body:
          "Start from the files people already have. MIS Vector takes CSV, Excel, JSON, PDF and Tally exports, or connects to an API, and AI turns them into dashboards, reports and reconciliations - with no template to set up first. Plans are priced for Indian businesses, starting from ₹1,999 a month.",
      },
      {
        heading: "The outcome",
        body:
          "Reporting that takes minutes instead of days, for businesses that will never hire a data team.",
      },
    ],
    delivered: [
      "Upload-to-dashboard flow for CSV, Excel, JSON, PDF and Tally",
      "Automatic reconciliation and recurring reports",
      "Tiered subscription plans with online checkout",
      "Product marketing site",
    ],
    metaTitle: "MIS Vector - AI Data Analysis Platform Case Study",
    metaDescription:
      "How Zaina Solutions built MIS Vector for MIS Data Automate - an AI data-analysis platform that turns spreadsheets, Tally exports and APIs into dashboards, reports and reconciliations.",
    keywords: [
      "AI data analysis tool",
      "MIS reporting software",
      "business dashboard India",
      "Tally reporting software",
    ],
  },
  {
    slug: "khdec-quotation",
    title: "KHDEC Quotation Software",
    category: "Software",
    tag: "Business Software",
    blurb:
      "Quotation software for an interior fit-out firm - pick items from a catalogue, adjust, and download a branded PDF quote.",
    srcs: [
      "/work/khdec-quotation-1.webp",
      "/work/khdec-quotation-2.webp",
      "/work/khdec-quotation-3.webp",
    ],
    client: "KHDEC Engineering Consultancy",
    sector: "Interior works · Kerala",
    year: "2026",
    scope: "Quotation and PDF software",
    services: ["App Development", "UI/UX Design"],
    stack: ["React", "TypeScript", "Vite", "PDF generation"],
    overview:
      "KHDEC fits out interiors - kitchens, wardrobes, panelling - and every job starts with a detailed quotation. Theirs were built by hand in a spreadsheet, room by room. We turned that spreadsheet into software.",
    sections: [
      {
        heading: "The challenge",
        body:
          "An interior quotation is long and repetitive: rooms, items with sizes and specifications, exclusions, material notes, terms and a payment schedule. Copying last month's quote and editing it is how errors and stale prices creep in - and a spreadsheet printout doesn't look like the work of a premium firm.",
      },
      {
        heading: "Our approach",
        body:
          "We modelled the spreadsheet instead of replacing it with something unfamiliar. The firm keeps a catalogue of categories and items with standard descriptions and prices. A quote is built room by room by picking from it, and every amount stays editable for the job at hand. Discount, GST and round-off are one toggle each, the total updates live and is written out in words, and the finished quote downloads as a properly typeset PDF in KHDEC's own brand.",
      },
      {
        heading: "The outcome",
        body:
          "Quotes that take minutes instead of an evening, look the same every time, and carry the firm's brand to every client.",
      },
    ],
    delivered: [
      "Catalogue of categories and items with standard specs and prices",
      "Room-by-room quote builder with editable amounts",
      "Discount, GST, round-off and payment schedule",
      "One-click branded PDF quotation",
    ],
    metaTitle: "KHDEC Quotation Software - Interior Quotation App Case Study",
    metaDescription:
      "How Zaina Solutions built quotation software for KHDEC Engineering Consultancy - a catalogue-driven, room-by-room quote builder with branded PDF output.",
    keywords: [
      "quotation software",
      "interior design quotation app",
      "custom business software Kerala",
      "PDF quotation generator",
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
    slug: "veridian-foodstuff",
    title: "Veridian Foodstuff",
    category: "Websites",
    tag: "E-commerce Demo",
    blurb:
      "A storefront demo for a UAE trader of Indian spices - built for shoppers and bulk buyers alike, with a request-for-quote flow.",
    srcs: [
      "/work/veridian-foodstuff-1.webp",
      "/work/veridian-foodstuff-2.webp",
      "/work/veridian-foodstuff-3.webp",
    ],
    client: "Veridian Foodstuff Trading LLC",
    sector: "Food & spice trading · UAE",
    year: "2026",
    scope: "E-commerce website demo",
    services: ["Website Development", "UI/UX Design"],
    stack: ["HTML / CSS / JavaScript", "GSAP", "Single-page app"],
    overview:
      "Veridian trades premium Indian spices and food products out of the UAE and had no web presence yet. Before committing to a build, they wanted to see their catalogue working online - so we built a clickable demo of the whole flow.",
    sections: [
      {
        heading: "The challenge",
        body:
          "Food trading sits between retail and wholesale. One buyer wants a 250 g pack; another wants a grade, an HS code and a minimum order. The catalogue runs to hundreds of products across 20 categories, and a standard shop template only serves the first buyer.",
      },
      {
        heading: "Our approach",
        body:
          "We designed for both. Shoppers get a warm, photo-led storefront with categories, deals and a cart. Trade buyers get an enquiry list that becomes a request for quotation in three steps, product pages with specification tables, and a box where they can paste a supplier-style list and have quantities and units matched to products. Search understands the trade names buyers actually use - kaju, elaichi - as well as the English ones.",
      },
      {
        heading: "The outcome",
        body:
          "A demo the client can put in front of buyers and partners, with every flow working end to end. It is a proof of concept with sample prices and details, not a live store.",
      },
    ],
    delivered: [
      "Storefront for 300+ products across 20 categories",
      "Three-step request-for-quote flow for bulk buyers",
      "Paste-your-list matching and trade-name search",
      "Light and dark themes with scroll-driven motion",
    ],
    metaTitle: "Veridian Foodstuff - Spice Trading E-commerce Demo Case Study",
    metaDescription:
      "How Zaina Solutions designed an e-commerce demo for Veridian Foodstuff, a UAE trader of Indian spices - a retail storefront with a request-for-quote flow for bulk buyers.",
    keywords: [
      "e-commerce website design",
      "spice export website",
      "B2B ordering website",
      "UAE website development",
    ],
  },
  {
    slug: "everything-supermarket-apps",
    title: "Everything Supermarket Staff Apps",
    category: "Software",
    tag: "Web Apps",
    blurb:
      "Two internal tools for a supermarket group - QR attendance with payroll, and an order tracker with area-wise sales reports.",
    srcs: [
      "/work/everything-supermarket-apps-1.webp",
      "/work/everything-supermarket-apps-2.webp",
      "/work/everything-supermarket-apps-3.webp",
    ],
    client: "Everything Supermarket",
    sector: "Grocery retail · Kozhikode",
    year: "2026",
    scope: "Internal staff applications",
    services: ["App Development", "UI/UX Design"],
    stack: ["React", "Supabase", "PostgreSQL", "Express"],
    overview:
      "Before the website, Everything Supermarket asked us to fix two things that ran on paper and spreadsheets: staff attendance across the outlets, and the record of online-delivery orders. We built a focused app for each.",
    sections: [
      {
        heading: "The challenge",
        body:
          "Attendance machines cost money per outlet and are easy to game. The delivery-order record was a shared spreadsheet: nobody could see which areas actually ordered, and anyone could edit any outlet's rows.",
      },
      {
        heading: "Our approach",
        body:
          "SmartAttendance needs no hardware. Staff check in by scanning a QR poster at the store entrance, and the app confirms by location that they are actually at the store. Hours, overtime against each employee's own working day, leave and monthly payroll all come from the same records, and wages are visible only to the roles that should see them. The order tracker gives every outlet its own login and shows each outlet only its own orders - enforced on the server, not just hidden on screen. The owner's dashboard leads with the report they asked for: orders and sales by area.",
      },
      {
        heading: "The outcome",
        body:
          "Two small, focused tools that replaced a register and a spreadsheet. Both run on the group's own subdomains, and each store's data is walled off from the others.",
      },
    ],
    delivered: [
      "QR and location check-in with no attendance hardware",
      "Per-employee hours, overtime, leave and monthly payroll",
      "Order tracker with one login per outlet, isolated server-side",
      "Area-wise orders and sales report for the owner",
    ],
    metaTitle: "Everything Supermarket Staff Apps - Attendance & Order Tracking Case Study",
    metaDescription:
      "How Zaina Solutions built SmartAttendance and an order tracker for Everything Supermarket - hardware-free QR attendance with payroll, and per-outlet order tracking with area-wise reports.",
    keywords: [
      "attendance software India",
      "QR attendance system",
      "retail staff management app",
      "custom business software Kerala",
    ],
  },
  {
    slug: "gobeyond",
    title: "Go Beyond Gym",
    category: "Products",
    tag: "SaaS Platform",
    blurb:
      "An all-in-one gym management platform that replaces manual tracking with one easy system.",
    srcs: ["/work/gobeyond-1.webp", "/work/gobeyond-2.webp", "/work/gobeyond-3.webp"],
    url: "https://gobeyondgym.com",
    ownership: "product",
    client: "Zaina Solutions - in-house product",
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
    slug: "balad-perfumes",
    title: "Balad Perfumes",
    category: "Websites",
    tag: "E-commerce Concept",
    blurb:
      "A storefront redesign concept for a Kozhikode perfume house - 80 fragrances with notes and scent families, in a dark oud-night palette.",
    srcs: [
      "/work/balad-perfumes-1.webp",
      "/work/balad-perfumes-2.webp",
      "/work/balad-perfumes-3.webp",
    ],
    client: "Balad Perfumes",
    sector: "Fragrance retail · Kozhikode",
    year: "2026",
    scope: "E-commerce redesign concept",
    services: ["Website Development", "UI/UX Design"],
    stack: ["HTML / CSS / JavaScript", "Single-page app", "Image cut-out pipeline"],
    overview:
      "Balad blends fragrances in Kozhikode and has its own house oud line. We redesigned its online store as a working concept, to show how much more of the brand a perfume shop can carry online.",
    sections: [
      {
        heading: "The challenge",
        body:
          "Perfume is the hardest thing to sell on a screen: you can't smell it. The existing store treated fragrances like any other product - a white-background photo, a name, a price - so 80 scents looked interchangeable.",
      },
      {
        heading: "Our approach",
        body:
          "We gave every fragrance a profile - notes, accords and a scent family - so a shopper can browse by how something smells rather than by name. The store went dark and warm, an oud-night palette that suits the house blends. The house line keeps its studio photography, and the rest of the catalogue gets clean cut-out bottles. The full journey works in the concept, from browsing and product pages to cart, checkout and wishlist, with Malayalam type support built in.",
      },
      {
        heading: "The outcome",
        body:
          "A storefront concept that sells the experience of a fragrance, not just the bottle - designed to plug into the store's existing backend.",
      },
    ],
    delivered: [
      "80-product catalogue with notes, accords and scent families",
      "Shop filters by scent family, gender and line",
      "Product pages with size options and WhatsApp ordering",
      "Cart, checkout, wishlist and policy pages",
    ],
    metaTitle: "Balad Perfumes - Perfume E-commerce Redesign Concept",
    metaDescription:
      "A redesign concept by Zaina Solutions for Balad Perfumes, Kozhikode - an oud-night storefront where 80 fragrances are browsed by notes and scent family.",
    keywords: [
      "perfume website design",
      "e-commerce redesign",
      "fragrance store website",
      "online perfume store Kerala",
    ],
  },
  {
    slug: "accounts-software",
    title: "Accounts Software",
    category: "Software",
    tag: "Accounting Software",
    blurb:
      "Tally-style double-entry accounts for a college alumni association - Day Book, Ledger and member fees, in plain black and white.",
    srcs: [
      "/work/accounts-software-1.webp",
      "/work/accounts-software-2.webp",
      "/work/accounts-software-3.webp",
    ],
    client: "College alumni association",
    sector: "Non-profit accounting",
    year: "2026",
    scope: "Accounting software",
    services: ["App Development", "UI/UX Design"],
    stack: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    overview:
      "An alumni association's books are kept by a volunteer accountant who thinks in Tally. They needed software for receipts, payments and member fees that would feel familiar from the first screen - not a new system to learn.",
    sections: [
      {
        heading: "The challenge",
        body:
          "Our first version was a complete accounting system, and the feedback was that it was too much. That was the most useful part of the brief: for someone fluent in Tally, anything that doesn't work the Tally way is friction, however well it is designed.",
      },
      {
        heading: "Our approach",
        body:
          "We rebuilt it around four screens an accountant already knows: Day Book, Ledger, Accounts and Members. Every account has a short code, so the bookkeeper types a code instead of hunting through a list, and a new account can be created in the middle of an entry. Purchase, payment and receipt vouchers post double-entry behind the scenes. Membership numbers continue the association's existing series, and a member's fee posts as a receipt automatically. Entries are never edited in place - corrections are reversal entries, the way an auditor expects. The whole interface is black and white, as the client asked.",
      },
      {
        heading: "The outcome",
        body:
          "Software a Tally user can sit down and use - because it was cut down to what they actually do, not everything accounting software could do.",
      },
    ],
    delivered: [
      "Day Book entry with purchase, payment and receipt vouchers",
      "Short-code account lookup with inline account creation",
      "Member register with automatic fee receipts",
      "Reversal-based corrections for a clean audit trail",
    ],
    metaTitle: "Accounts Software - Tally-Style Accounting App Case Study",
    metaDescription:
      "How Zaina Solutions built Tally-style accounting software for a college alumni association - Day Book, Ledger, short-code accounts and automatic membership fee receipts.",
    keywords: [
      "accounting software development",
      "Tally alternative",
      "association accounting software",
      "custom accounting app India",
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
    slug: "hostel",
    title: "Hostel Management",
    category: "Software",
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
    ownership: "product",
    client: "Zaina Solutions - in-house product",
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

export const CATEGORIES: Category[] = ["Websites", "Software", "Products", "Branding", "UI/UX"];

export const img = (pg: number) => `/work/pg-${String(pg).padStart(2, "0")}.webp`;
export const coverOf = (p: Project) => p.srcs?.[0] ?? img(p.cover ?? 0);
export const pagesOf = (p: Project) => p.srcs ?? (p.pages ?? []).map(img);

export const isOwnProduct = (p: Project) => p.ownership === "product";

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

/** Next project in the list, wrapping around - used for case study footers. */
export function nextProject(slug: string) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  if (i === -1) return PROJECTS[0];
  return PROJECTS[(i + 1) % PROJECTS.length];
}
