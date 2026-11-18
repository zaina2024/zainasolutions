import { SITE_CONTACT } from "@/lib/site";

/**
 * The /connect page is the tap target for Muhammed Shifal's NFC card.
 * Edit the details here; the page, the vCard and the share image all read
 * from this one object.
 */
export const CONNECT_PROFILE = {
  firstName: "Muhammed",
  lastName: "Shifal",
  name: "Muhammed Shifal",
  role: "Founder & CEO",
  company: "Zaina Solutions",
  tagline: "Building digital products and businesses.",
  phone: SITE_CONTACT.phone,
  phoneE164: "+918714313489",
  email: SITE_CONTACT.email,
  whatsappHref: `https://wa.me/918714313489?text=${encodeURIComponent(
    "Hi Shifal, I got your details from your Zaina Solutions card."
  )}`,
  site: "https://zainasolutions.com",
  linkedin: "https://www.linkedin.com/in/muhammedshifal/",
  instagram: "https://www.instagram.com/zainasolutions",
  address: {
    street: "HiLITE Business Park",
    city: "Calicut",
    region: "Kerala",
    country: "India",
  },
  connectUrl: "https://zainasolutions.com/connect",
  vcardPath: "/connect/muhammed-shifal.vcf",
} as const;

/** QR code for CONNECT_PROFILE.connectUrl (error correction M), one unit per module. */
export const CONNECT_QR = {
  size: 29,
  path: "M0 0h7v1h-7zM10 0h2v1h-2zM13 0h3v1h-3zM17 0h3v1h-3zM22 0h7v1h-7zM0 1h1v1h-1zM6 1h1v1h-1zM9 1h2v1h-2zM13 1h5v1h-5zM20 1h1v1h-1zM22 1h1v1h-1zM28 1h1v1h-1zM0 2h1v1h-1zM2 2h3v1h-3zM6 2h1v1h-1zM8 2h2v1h-2zM11 2h1v1h-1zM13 2h1v1h-1zM15 2h1v1h-1zM18 2h2v1h-2zM22 2h1v1h-1zM24 2h3v1h-3zM28 2h1v1h-1zM0 3h1v1h-1zM2 3h3v1h-3zM6 3h1v1h-1zM8 3h1v1h-1zM14 3h2v1h-2zM17 3h1v1h-1zM20 3h1v1h-1zM22 3h1v1h-1zM24 3h3v1h-3zM28 3h1v1h-1zM0 4h1v1h-1zM2 4h3v1h-3zM6 4h1v1h-1zM8 4h3v1h-3zM12 4h1v1h-1zM15 4h2v1h-2zM18 4h3v1h-3zM22 4h1v1h-1zM24 4h3v1h-3zM28 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM8 5h1v1h-1zM10 5h1v1h-1zM17 5h2v1h-2zM22 5h1v1h-1zM28 5h1v1h-1zM0 6h7v1h-7zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM20 6h1v1h-1zM22 6h7v1h-7zM8 7h3v1h-3zM12 7h1v1h-1zM14 7h1v1h-1zM16 7h1v1h-1zM19 7h2v1h-2zM0 8h1v1h-1zM2 8h5v1h-5zM11 8h2v1h-2zM17 8h1v1h-1zM19 8h1v1h-1zM22 8h5v1h-5zM0 9h1v1h-1zM3 9h2v1h-2zM8 9h8v1h-8zM17 9h8v1h-8zM28 9h1v1h-1zM0 10h3v1h-3zM4 10h3v1h-3zM9 10h7v1h-7zM17 10h1v1h-1zM20 10h2v1h-2zM0 11h1v1h-1zM2 11h2v1h-2zM5 11h1v1h-1zM7 11h1v1h-1zM11 11h3v1h-3zM15 11h2v1h-2zM19 11h2v1h-2zM23 11h1v1h-1zM25 11h1v1h-1zM27 11h1v1h-1zM2 12h1v1h-1zM4 12h1v1h-1zM6 12h1v1h-1zM8 12h1v1h-1zM10 12h1v1h-1zM14 12h4v1h-4zM19 12h1v1h-1zM25 12h2v1h-2zM0 13h1v1h-1zM3 13h2v1h-2zM8 13h1v1h-1zM10 13h3v1h-3zM16 13h5v1h-5zM22 13h3v1h-3zM28 13h1v1h-1zM0 14h1v1h-1zM3 14h2v1h-2zM6 14h1v1h-1zM10 14h3v1h-3zM15 14h2v1h-2zM20 14h2v1h-2zM23 14h4v1h-4zM0 15h1v1h-1zM2 15h2v1h-2zM7 15h3v1h-3zM14 15h1v1h-1zM22 15h1v1h-1zM27 15h1v1h-1zM1 16h1v1h-1zM4 16h1v1h-1zM6 16h1v1h-1zM10 16h3v1h-3zM15 16h1v1h-1zM17 16h3v1h-3zM25 16h2v1h-2zM0 17h2v1h-2zM3 17h3v1h-3zM10 17h1v1h-1zM12 17h3v1h-3zM16 17h9v1h-9zM26 17h1v1h-1zM28 17h1v1h-1zM0 18h1v1h-1zM2 18h1v1h-1zM4 18h3v1h-3zM12 18h6v1h-6zM22 18h3v1h-3zM26 18h1v1h-1zM0 19h1v1h-1zM2 19h1v1h-1zM8 19h1v1h-1zM11 19h3v1h-3zM15 19h2v1h-2zM20 19h1v1h-1zM22 19h1v1h-1zM24 19h1v1h-1zM27 19h1v1h-1zM0 20h1v1h-1zM2 20h3v1h-3zM6 20h1v1h-1zM8 20h4v1h-4zM14 20h2v1h-2zM17 20h1v1h-1zM20 20h5v1h-5zM26 20h3v1h-3zM8 21h2v1h-2zM11 21h1v1h-1zM16 21h1v1h-1zM18 21h3v1h-3zM24 21h5v1h-5zM0 22h7v1h-7zM15 22h1v1h-1zM17 22h4v1h-4zM22 22h1v1h-1zM24 22h3v1h-3zM0 23h1v1h-1zM6 23h1v1h-1zM8 23h1v1h-1zM10 23h2v1h-2zM14 23h1v1h-1zM16 23h1v1h-1zM19 23h2v1h-2zM24 23h1v1h-1zM27 23h2v1h-2zM0 24h1v1h-1zM2 24h3v1h-3zM6 24h1v1h-1zM8 24h2v1h-2zM17 24h1v1h-1zM20 24h5v1h-5zM26 24h2v1h-2zM0 25h1v1h-1zM2 25h3v1h-3zM6 25h1v1h-1zM8 25h1v1h-1zM10 25h1v1h-1zM13 25h2v1h-2zM16 25h4v1h-4zM25 25h4v1h-4zM0 26h1v1h-1zM2 26h3v1h-3zM6 26h1v1h-1zM8 26h1v1h-1zM13 26h3v1h-3zM17 26h1v1h-1zM19 26h1v1h-1zM21 26h7v1h-7zM0 27h1v1h-1zM6 27h1v1h-1zM10 27h2v1h-2zM16 27h1v1h-1zM19 27h2v1h-2zM22 27h1v1h-1zM25 27h1v1h-1zM27 27h1v1h-1zM0 28h7v1h-7zM8 28h2v1h-2zM17 28h1v1h-1zM19 28h1v1h-1zM21 28h1v1h-1zM25 28h2v1h-2z",
} as const;
