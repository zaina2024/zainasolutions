export type Client = {
  /** Display name - also the image alt text. */
  name: string;
  /** File in /public/clients, e.g. "topvision.svg". */
  logo: string;
  /** Optional: links the logo to that client's case study. */
  slug?: string;
  /** Optional: nudge individual logos that optically read too large/small. */
  scale?: number;
  /** Optional: stay white on hover - for dark-coloured logos that vanish on the dark UI. */
  mono?: boolean;
};

/**
 * Client logos shown in the Proof section.
 * Drop files into /public/clients and add an entry here.
 * The section hides itself entirely while this list is empty.
 */
export const CLIENTS: Client[] = [
  { name: "Top Vision Security", logo: "topvision.png", slug: "topvision" },
  { name: "PANTHERKLAW", logo: "pantherklaw.png", slug: "pantherklaw", scale: 1.15 },
  { name: "Everything Supermarket", logo: "everything-supermarket.png", slug: "everything-supermarket", scale: 1.15 },
  { name: "Aardha Enterprises", logo: "aardha.png", slug: "aardha" },
  { name: "Nellissery Traders", logo: "nellissery.png", slug: "nellissery", mono: true },
  { name: "TBI MESCE", logo: "tbi-mesce.png", slug: "tbi-mesce" },
  { name: "MIS Data Automate", logo: "mis-data-automate.png", slug: "mis-vector" },
  { name: "KHDEC Engineering Consultancy", logo: "khdec.png", slug: "khdec-quotation" },
  { name: "Veridian Foodstuff Trading", logo: "veridian.png", slug: "veridian-foodstuff" },
];
