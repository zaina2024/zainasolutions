export type Client = {
  /** Display name - also the image alt text. */
  name: string;
  /** File in /public/clients, e.g. "topvision.svg". */
  logo: string;
  /** Optional: links the logo to that client's case study. */
  slug?: string;
  /** Optional: nudge individual logos that optically read too large/small. */
  scale?: number;
};

/**
 * Client logos shown in the Proof section.
 * Drop files into /public/clients and add an entry here.
 * The section hides itself entirely while this list is empty.
 */
export const CLIENTS: Client[] = [];
