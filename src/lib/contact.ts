export const SERVICES = [
  "Website Development",
  "App Development",
  "Branding",
  "UI/UX Design",
] as const;

export type Service = (typeof SERVICES)[number];

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
  company?: string;
  service?: string;
  website?: string;
}

export interface FieldErrors {
  [field: string]: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(
  input: unknown
): { ok: true; data: Required<Omit<ContactPayload, "website">> } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const body = (input ?? {}) as Record<string, unknown>;

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const name = str(body.name);
  const email = str(body.email);
  const message = str(body.message);
  const company = str(body.company);
  const service = str(body.service);
  const honeypot = str(body.website);

  if (!name) errors.name = "Please tell us your name.";
  else if (name.length > 120) errors.name = "That name is a little too long.";

  if (!email) errors.email = "We need an email to reply to.";
  else if (!EMAIL_RE.test(email)) errors.email = "That email doesn't look right.";

  if (!message) errors.message = "Add a short note about your project.";
  else if (message.length < 10) errors.message = "A few more words would help us help you.";
  else if (message.length > 4000) errors.message = "Please keep it under 4000 characters.";

  if (company.length > 160) errors.company = "Company name is too long.";

  if (!service) errors.service = "Please pick a service.";
  else if (!(SERVICES as readonly string[]).includes(service))
    errors.service = "Please pick a service from the list.";

  if (honeypot) errors.website = "Spam detected.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    data: {
      name,
      email,
      message,
      company: company || "-",
      service,
    },
  };
}
