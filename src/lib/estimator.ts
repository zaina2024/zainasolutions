export type ProjectType = "basic" | "ecommerce" | "custom";
export type DesignMode = "template" | "custom";
export type ContentEditing = "cms" | "zaina";
export type Timeline = "standard" | "rush";
export type Hosting = "free" | "paid";

export type FeatureKey =
  | "booking"
  | "blog"
  | "multilang"
  | "dashboard"
  | "chat"
  | "payments";

export const PROJECT_TYPES: { value: ProjectType; label: string; blurb: string; base: number }[] = [
  { value: "basic", label: "Basic Website", blurb: "Informational or portfolio site.", base: 15000 },
  { value: "ecommerce", label: "E-commerce", blurb: "Online store with cart and checkout.", base: 45000 },
  { value: "custom", label: "Custom Software", blurb: "SaaS, platform, or dashboard-style build.", base: 85000 },
];

export const DESIGN_MODES: { value: DesignMode; label: string; blurb: string; add: number }[] = [
  { value: "template", label: "Template-based", blurb: "A proven layout, customized to your brand.", add: 0 },
  { value: "custom", label: "Fully Custom Design", blurb: "Designed from scratch, nothing off the shelf.", add: 10000 },
];

export const CONTENT_EDITING: { value: ContentEditing; label: string; blurb: string; add: number }[] = [
  { value: "cms", label: "Yes, I'll edit it myself", blurb: "We set up a CMS/admin panel so you're independent.", add: 8000 },
  { value: "zaina", label: "No, Zaina can handle edits", blurb: "You come back to us whenever something needs to change.", add: 0 },
];

export const FEATURES: { value: FeatureKey; label: string; blurb: string; add: number }[] = [
  { value: "booking", label: "Booking / Appointments", blurb: "Let visitors book a slot directly.", add: 8000 },
  { value: "blog", label: "Blog / News", blurb: "A section for articles and updates.", add: 4000 },
  { value: "multilang", label: "Multi-language", blurb: "Serve the same site in more than one language.", add: 6000 },
  { value: "dashboard", label: "Admin Dashboard", blurb: "See stats and manage content from one place.", add: 10000 },
  { value: "chat", label: "Live Chat / WhatsApp", blurb: "A direct line for visitors to reach you.", add: 3000 },
  { value: "payments", label: "Payment Gateway", blurb: "Accept payments directly on your site.", add: 6000 },
];

export const TIMELINES: { value: Timeline; label: string; blurb: string; add: number }[] = [
  { value: "standard", label: "Standard", blurb: "3-4 weeks - our usual pace.", add: 0 },
  { value: "rush", label: "Rush", blurb: "1-2 weeks - prioritized on our schedule.", add: 12000 },
];

export const HOSTING_OPTIONS: { value: Hosting; label: string; blurb: string }[] = [
  {
    value: "free",
    label: "Free Hosting",
    blurb:
      "Good for smaller sites getting started - zero monthly cost, but with limits on scale, uptime guarantees, and support response time.",
  },
  {
    value: "paid",
    label: "Paid Hosting",
    blurb:
      "Roughly ₹500-₹2,000/month depending on traffic - better uptime, faster support, and room to grow without hitting a wall.",
  },
];

export type EstimatorAnswers = {
  projectType: ProjectType | null;
  designMode: DesignMode | null;
  contentEditing: ContentEditing | null;
  features: FeatureKey[];
  timeline: Timeline | null;
  hosting: Hosting | null;
  domain: string;
};

export const INITIAL_ANSWERS: EstimatorAnswers = {
  projectType: null,
  designMode: null,
  contentEditing: null,
  features: [],
  timeline: null,
  hosting: null,
  domain: "",
};

export function calculateEstimate(answers: EstimatorAnswers): number {
  let total = 0;
  const project = PROJECT_TYPES.find((p) => p.value === answers.projectType);
  total += project?.base ?? 0;

  const design = DESIGN_MODES.find((d) => d.value === answers.designMode);
  total += design?.add ?? 0;

  const editing = CONTENT_EDITING.find((c) => c.value === answers.contentEditing);
  total += editing?.add ?? 0;

  for (const key of answers.features) {
    const feature = FEATURES.find((f) => f.value === key);
    total += feature?.add ?? 0;
  }

  const timeline = TIMELINES.find((t) => t.value === answers.timeline);
  total += timeline?.add ?? 0;

  return total;
}
