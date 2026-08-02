export type Category = "Websites" | "Products" | "Branding" | "UI/UX";
export type Project = {
  slug: string;
  title: string;
  category: Category;
  tag: string;
  blurb: string;
  cover?: number;
  pages?: number[];
  srcs?: string[];
  url?: string;
};

export const PROJECTS: Project[] = [
  { slug: "topvision", title: "Top Vision Security", category: "Websites", tag: "Website", blurb: "A sleek corporate site for a Saudi security integrator - credibility, scale, and trust front and centre.", srcs: ["/work/ext-topvision-1.webp", "/work/ext-topvision-2.webp", "/work/ext-topvision-3.webp"], url: "https://topvisioncompany.com/" },
  { slug: "pantherklaw", title: "PANTHERKLAW", category: "Websites", tag: "Website", blurb: "A bold, cinematic studio site - dark and kinetic, built to make a film brand feel like a feature.", srcs: ["/work/ext-pantherklaw-1.webp", "/work/ext-pantherklaw-2.webp", "/work/ext-pantherklaw-3.webp"], url: "https://pantherklaw.com/" },
  { slug: "aardha", title: "Aardha Enterprises", category: "Websites", tag: "Website", blurb: "An interactive 3D website giving a 25-year precision rubber-parts manufacturer a modern, premium presence.", srcs: ["/work/ext-aardha-1.webp", "/work/ext-aardha-2.webp", "/work/ext-aardha-3.webp"], url: "https://aardha.in/" },
  { slug: "nellissery", title: "Nellissery Traders", category: "Websites", tag: "Website", blurb: "A clean, fast business website built for clarity and long-term use.", cover: 13, pages: [12, 13, 14, 15] },
  { slug: "soorya", title: "Soorya Maternity & Children's Care", category: "Websites", tag: "Website", blurb: "A warm, trustworthy presence for a maternity & children's care hospital.", cover: 20, pages: [19, 20] },
  { slug: "oneness", title: "The Oneness Living", category: "Websites", tag: "Website", blurb: "A considered brand website with a calm, editorial feel.", cover: 23, pages: [22, 23, 24] },
  { slug: "gobeyond", title: "Go Beyond Gym", category: "Products", tag: "SaaS Platform", blurb: "An all-in-one gym management platform that replaces manual tracking with one easy system.", cover: 33, pages: [31, 32, 33, 34] },
  { slug: "hostel", title: "Hostel Management", category: "Products", tag: "SaaS Platform", blurb: "Hotel & mess management with digital tracking, NFC access, and automated, fair billing.", cover: 36, pages: [35, 36] },
  { slug: "jarbot", title: "Jar Bot", category: "Products", tag: "Connected System", blurb: "Turns everyday physical interaction into structured digital insight for better control.", cover: 38, pages: [37, 38] },
  { slug: "linkafe", title: "Linkafe", category: "Branding", tag: "Identity System", blurb: "A brand identity built to translate consistently across every platform.", cover: 40, pages: [39, 40, 41, 42, 43] },
  { slug: "uiux", title: "UI / UX Designs", category: "UI/UX", tag: "Product Design", blurb: "Selected interface work - mobile app flows and screens designed to feel right.", cover: 26, pages: [25, 26, 27, 28, 29, 30] },
];
