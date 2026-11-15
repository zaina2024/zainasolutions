import type { Metadata } from "next";
import { Background } from "@/components/site/Background";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Zaina Solutions collects, uses and protects the details you share through our website, chat, WhatsApp and Facebook or Instagram lead forms.",
  alternates: { canonical: "/privacy" },
};

const UPDATED = "15 November 2026";

type Section = { heading: string; body: React.ReactNode };

const SECTIONS: Section[] = [
  {
    heading: "Who we are",
    body: (
      <p>
        Zaina Solutions™ is run by Zaina Innovators LLP, HiLITE Business Park,
        Calicut, Kerala, India. This policy covers zainasolutions.com, our chat
        widget, our WhatsApp number and the lead forms we run on Facebook and
        Instagram.
      </p>
    ),
  },
  {
    heading: "What we collect",
    body: (
      <ul>
        <li>
          <strong>Contact form:</strong> your name, email, company, the service
          you are interested in and your message.
        </li>
        <li>
          <strong>Facebook and Instagram lead forms:</strong> the details you
          enter, such as your name, phone number, email, business name and your
          answers about the project you need. Meta passes these to us.
        </li>
        <li>
          <strong>WhatsApp, phone and email:</strong> the messages and details
          you send us.
        </li>
        <li>
          <strong>Chat widget:</strong> the questions you type, so an answer can
          be generated.
        </li>
        <li>
          <strong>Budget Calculator:</strong> the options you pick are used to
          show your estimate in your browser.
        </li>
        <li>
          <strong>Usage data:</strong> pages visited and buttons used, recorded
          by the Meta Pixel, and standard server logs from our hosting provider.
        </li>
      </ul>
    ),
  },
  {
    heading: "How we use it",
    body: (
      <ul>
        <li>To reply to your enquiry and prepare a quote.</li>
        <li>To contact you by phone, WhatsApp or email about the project you asked about.</li>
        <li>To measure which of our ads and pages bring enquiries.</li>
      </ul>
    ),
  },
  {
    heading: "Who processes it for us",
    body: (
      <ul>
        <li>Google (Google Forms) stores contact form entries.</li>
        <li>Meta (Facebook, Instagram, WhatsApp) delivers lead form entries and messages, and runs the Meta Pixel.</li>
        <li>Groq and Google Gemini generate chat widget answers.</li>
        <li>Vercel hosts the website.</li>
      </ul>
    ),
  },
  {
    heading: "What we don't do",
    body: (
      <p>
        We do not sell your details, and we do not share them with anyone except
        the services listed above, which we use to run this website and reply to
        you.
      </p>
    ),
  },
  {
    heading: "Cookies",
    body: (
      <p>
        The Meta Pixel uses cookies to measure our ads. You can block or clear
        cookies in your browser settings, and manage ad preferences in your
        Facebook or Instagram account.
      </p>
    ),
  },
  {
    heading: "How long we keep it",
    body: (
      <p>
        We keep enquiry details while we are discussing or delivering your
        project, and as business records afterwards. Ask us and we will delete
        them.
      </p>
    ),
  },
  {
    heading: "Your choices",
    body: (
      <p>
        You can ask to see, correct or delete the details we hold about you, or
        ask us to stop contacting you. Email{" "}
        <a href="mailto:info@zainasolutions.com">info@zainasolutions.com</a> or
        call <a href="tel:+918714313489">+91 87143 13489</a>.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Background />
      <Nav />
      <main className="relative">
        <article className="mx-auto max-w-3xl px-5 pb-24 pt-36 sm:px-8 sm:pt-44">
          <p className="label-mono text-[0.65rem]">Legal</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted">
            Last updated {UPDATED}
          </p>

          <div className="mt-12 space-y-10">
            {SECTIONS.map((s) => (
              <section key={s.heading}>
                <h2 className="font-display text-xl font-medium tracking-tight text-paper">
                  {s.heading}
                </h2>
                <div className="mt-3 font-sans text-base leading-relaxed text-muted [&_a]:text-paper [&_a]:underline [&_a]:decoration-line-strong [&_a]:underline-offset-4 hover:[&_a]:decoration-signal [&_li]:mt-2 [&_strong]:font-medium [&_strong]:text-paper [&_ul]:list-disc [&_ul]:pl-5">
                  {s.body}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
