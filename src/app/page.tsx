import type { Metadata } from "next";
import WorkshopNavbar from "@/components/workshop/WorkshopNavbar";
import LeadForm from "@/components/workshop/LeadForm";
import { workshop } from "@/config/workshop";

export const metadata: Metadata = {
  title: "וידאותרפיה · טליה ברוכיאן — סדנה קבוצתית",
  description:
    "סדנת וידאותרפיה בהנחיית טליה ברוכיאן — תהליך יצירה רגשי בווידאו ומרחב להתבוננות, ביטוי וצמיחה. שישה מפגשים בתל אביב, החל מדצמבר.",
};

export default function Home() {
  const w = workshop;

  return (
    <>
      <WorkshopNavbar />

      <main id="top">
        {/* ---------- Hero ---------- */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(55% 50% at 80% 0%, rgba(180,85,47,0.14), transparent 60%), radial-gradient(50% 45% at 5% 15%, rgba(176,146,92,0.16), transparent 60%)",
            }}
          />
          <div className="container-page pb-16 pt-14 sm:pb-24 sm:pt-20">
            <div className="mx-auto max-w-3xl text-center animate-fade-up">
              <p className="eyebrow">סדנה קבוצתית · תל אביב</p>
              <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-7xl">
                {w.hero.title}
              </h1>
              <p className="mx-auto mt-5 max-w-xl font-display text-xl font-semibold text-muted sm:text-2xl">
                {w.hero.tagline}
              </p>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {w.hero.intro}
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="#lead"
                  className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-transform duration-300 ease-out-expo hover:-translate-y-0.5"
                >
                  {w.hero.cta}
                </a>
                <a href="#what" className="link-underline text-sm font-semibold text-ink">
                  מהי וידאותרפיה? ↖
                </a>
              </div>

              {/* quick facts */}
              <ul className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-muted">
                <li>שישה מפגשים</li>
                <li aria-hidden className="text-line">•</li>
                <li>תל אביב · ימי רביעי בערב</li>
                <li aria-hidden className="text-line">•</li>
                <li>החל מדצמבר</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- What is ---------- */}
        <Section id="what" tint>
          <div className="mx-auto max-w-3xl">
            <SectionHeading>{w.whatIs.heading}</SectionHeading>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              {w.whatIs.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </Section>

        {/* ---------- Process ---------- */}
        <Section id="process">
          <div className="mx-auto max-w-3xl">
            <SectionHeading>{w.process.heading}</SectionHeading>
            <p className="mt-6 text-lg leading-relaxed text-muted">{w.process.intro}</p>

            <ul className="mt-8 flex flex-wrap gap-3">
              {w.process.activities.map((a) => (
                <li
                  key={a}
                  className="rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-semibold text-ink shadow-sm"
                >
                  {a}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-lg leading-relaxed text-muted">{w.process.outro}</p>
          </div>
        </Section>

        {/* ---------- Who for ---------- */}
        <Section id="whofor" tint>
          <div className="mx-auto max-w-3xl">
            <SectionHeading>{w.whoFor.heading}</SectionHeading>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
              {w.whoFor.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Important note */}
            <div className="mt-10 rounded-2xl border border-line bg-paper p-5">
              <p className="text-sm font-semibold uppercase tracking-widest text-accent">
                {w.important.heading}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{w.important.text}</p>
            </div>
          </div>
        </Section>

        {/* ---------- About ---------- */}
        <Section id="about">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Portrait placeholder */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-line bg-surface lg:mx-0">
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(160deg, #efe7da 0%, #e3d4bd 55%, #d8c2a4 100%)",
                  }}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-ink/40">
                  <span className="font-display text-5xl font-extrabold tracking-tight">
                    ט.ב
                  </span>
                  <span className="text-xs font-medium tracking-widest">תמונה של טליה</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-7">
              <SectionHeading>{w.about.heading}</SectionHeading>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted">
                {w.about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ---------- Details ---------- */}
        <Section id="details" tint>
          <div className="mx-auto max-w-3xl">
            <SectionHeading center>{w.details.heading}</SectionHeading>
            <div className="mt-10 overflow-hidden rounded-3xl bg-ink p-8 text-paper sm:p-10">
              <dl className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
                {w.details.items.map((item) => (
                  <div key={item.label} className="border-b border-paper/15 pb-5">
                    <dt className="text-xs font-semibold uppercase tracking-widest text-accent">
                      {item.label}
                    </dt>
                    <dd className="mt-2 font-display text-lg font-semibold text-paper">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-8 text-center">
                <a
                  href="#lead"
                  className="inline-flex rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white transition-transform duration-300 ease-out-expo hover:-translate-y-0.5"
                >
                  {w.details.cta}
                </a>
              </div>
            </div>
          </div>
        </Section>

        {/* ---------- Lead form ---------- */}
        <Section id="lead">
          <div className="mx-auto max-w-2xl">
            <div className="text-center">
              <SectionHeading center>{w.form.heading}</SectionHeading>
              <p className="mt-4 font-display text-xl font-bold text-ink">
                {w.form.subheading}
              </p>
              <p className="mt-2 text-base leading-relaxed text-muted">{w.form.note}</p>
            </div>
            <div className="mt-8">
              <LeadForm />
            </div>
          </div>
        </Section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-line">
        <div className="container-page flex flex-col items-center gap-3 py-12 text-center">
          <a href="#top" className="font-display text-lg font-extrabold tracking-tight text-ink">
            {w.brand}
            <span className="text-accent"> · וידאותרפיה</span>
          </a>
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} טליה ברוכיאן. כל הזכויות שמורות.
          </p>
          <a
            href="/portfolio"
            className="link-underline mt-1 text-sm font-medium text-muted hover:text-ink"
          >
            לעבודות הקולנוע שלי ↖
          </a>
        </div>
      </footer>
    </>
  );
}

/* ---------- small layout helpers ---------- */

function Section({
  id,
  tint,
  children,
}: {
  id: string;
  tint?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-24 border-t border-line py-20 sm:py-28 ${
        tint ? "bg-surface" : ""
      }`}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

function SectionHeading({
  children,
  center,
}: {
  children: React.ReactNode;
  center?: boolean;
}) {
  return (
    <h2
      className={`font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl ${
        center ? "text-center" : ""
      }`}
    >
      {children}
    </h2>
  );
}
