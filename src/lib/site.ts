export const SITE_CONTACT = {
  email: "info@zainasolutions.com",
  phone: "+91 87143 13489",
  phoneHref: "tel:+918714313489",
  whatsappHref:
    process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/918714313489",
} as const;
