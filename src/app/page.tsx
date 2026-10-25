import type { Metadata } from "next";
import WorkshopNavbar from "@/components/workshop/WorkshopNavbar";
import LeadForm from "@/components/workshop/LeadForm";
import { workshop } from "@/config/workshop";

export const metadata: Metadata = {
  title: "וידאותרפיה · טליה ברוכיאן · סדנה קבוצתית",
  description:
    "סדנת וידאותרפיה בהנחיית טליה ברוכיאן. תהליך יצירה רגשי בווידאו ומרחב להתבוננות, ביטוי וצמיחה. שישה מפגשים בתל אביב, החל מדצמבר.",
};

export default function Home() {
  const w = workshop;
  const wa = w.contact.whatsapp ? `https://wa.me/${w.contact.whatsapp}` : null;

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
                "radial-gradient(45% 50% at 88% 0%, rgba(177,78,39,0.16), transparent 62%), radial-gradient(42% 45% at 0% 20%, rgba(181,137,74,0.18), transparent 60%)",
            }}
          />
          <div className="container-page pb-16 pt-12 sm:pb-24 sm:pt-16">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
              {/* Text */}
              <div className="animate-fade-up lg:col-span-7">
                <p className="eyebrow">
                  <span aria-hidden className="h-px w-6 bg-accent" />
                  סדנה קבוצתית · תל אביב
                </p>
                <h1 className="mt-6 font-serif text-6xl font-black leading-[0.98] tracking-tight text-ink sm:text-7xl lg:text-8xl">
                  {w.hero.title}
                </h1>
                <p className="mt-5 max-w-xl font-serif text-2xl font-medium leading-snug text-ink/80 sm:text-3xl">
                  {w.hero.tagline}
                </p>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                  {w.hero.intro}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <a
                    href="#lead"
                    className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition-transform duration-300 ease-out-expo hover:-translate-y-0.5"
                  >
                    {w.hero.cta}
                  </a>
                  <a href="#what" className="link-underline text-sm font-semibold text-ink">
                    מהי וידאותרפיה? ↓
                  </a>
                </div>

                <ul className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-medium text-muted">
                  <li>שישה מפגשים</li>
                  <li aria-hidden className="h-1 w-1 rounded-full bg-accent2" />
                  <li>תל אביב · ימי רביעי בערב</li>
                  <li aria-hidden className="h-1 w-1 rounded-full bg-accent2" />
                  <li>החל מדצמבר</li>
                </ul>
              </div>

              {/* Portrait */}
              <div className="lg:col-span-5">
                <div className="relative mx-auto w-full max-w-sm">
                  <div
                    aria-hidden
                    className="absolute -inset-4 -z-10 rounded-[2rem] opacity-70 blur-2xl"
                    style={{
                      background:
                        "linear-gradient(140deg, rgba(177,78,39,0.35), rgba(181,137,74,0.30))",
                    }}
                  />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-line bg-surface shadow-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/talia.jpg"
                      alt="טליה ברוכיאן, מנחת וידאותרפיה"
                      className="absolute inset-0 h-full w-full object-cover object-center"
                      style={{ filter: "sepia(0.14) contrast(1.02) brightness(1.02)" }}
                    />
                    <span className="absolute bottom-4 start-4 rounded-full bg-ink/70 px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-paper backdrop-blur-sm">
                      טליה ברוכיאן · מנחה
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- What is ---------- */}
        <Section id="what" tint>
          <div className="mx-auto max-w-3xl">
            <SectionHeading>{w.whatIs.heading}</SectionHeading>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted sm:text-xl">
              {w.whatIs.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "text-ink/90" : ""}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Section>

        {/* ---------- Process ---------- */}
        <Section id="process">
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading>{w.process.heading}</SectionHeading>
              <span className="font-serif text-lg font-semibold text-accent">
                שישה מפגשים
              </span>
            </div>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {w.process.intro}
            </p>

            <ol className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {w.process.activities.map((a, i) => (
                <li key={a} className="flex items-center gap-4 bg-surface px-6 py-7">
                  <span className="font-serif text-2xl font-bold tabular-nums text-accent/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg font-bold text-ink">{a}</span>
                </li>
              ))}
            </ol>

            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted">
              {w.process.outro}
            </p>
          </div>
        </Section>

        {/* ---------- Pull-quote ---------- */}
        <section className="relative overflow-hidden bg-ink py-20 text-paper sm:py-28">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "radial-gradient(45% 60% at 50% 0%, rgba(217,112,63,0.28), transparent 70%)",
            }}
          />
          <div className="container-page relative">
            <figure className="mx-auto max-w-3xl text-center">
              <span aria-hidden className="font-serif text-7xl leading-none text-accent">
                &rdquo;
              </span>
              <blockquote className="-mt-4 font-serif text-2xl font-medium leading-relaxed text-paper sm:text-[2rem] sm:leading-[1.4]">
                {w.pullQuote}
              </blockquote>
              <figcaption className="mt-7 text-sm font-semibold uppercase tracking-[0.2em] text-paper/60">
                טליה ברוכיאן
              </figcaption>
            </figure>
          </div>
        </section>

        {/* ---------- Who for ---------- */}
        <Section id="whofor" tint>
          <div className="mx-auto max-w-3xl">
            <SectionHeading>{w.whoFor.heading}</SectionHeading>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
              {w.whoFor.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border-s-2 border-accent bg-paper p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {w.important.heading}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{w.important.text}</p>
            </div>
          </div>
        </Section>

        {/* ---------- About ---------- */}
        <Section id="about">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionHeading>{w.about.heading}</SectionHeading>
              <div className="mt-6 space-y-5 text-lg leading-relaxed text-muted">
                {w.about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-line bg-surface p-7 sm:p-8 lg:sticky lg:top-28">
                <p className="eyebrow">
                  <span aria-hidden className="h-px w-6 bg-accent" />
                  רקע מקצועי
                </p>
                <ul className="mt-5 space-y-4">
                  {w.about.credentials.map((c) => (
                    <li
                      key={c}
                      className="flex items-start gap-3 border-b border-line pb-4 text-sm font-medium text-ink last:border-0 last:pb-0"
                    >
                      <span
                        aria-hidden
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Section>

        {/* ---------- Details ---------- */}
        <Section id="details" tint>
          <div className="mx-auto max-w-3xl">
            <SectionHeading center>{w.details.heading}</SectionHeading>
            <div className="relative mt-10 overflow-hidden rounded-[1.75rem] bg-ink p-8 text-paper sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-40"
                style={{
                  background:
                    "radial-gradient(40% 70% at 100% 0%, rgba(217,112,63,0.22), transparent 70%)",
                }}
              />
              <dl className="relative grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
                {w.details.items.map((item) => (
                  <div key={item.label} className="border-b border-paper/15 pb-5">
                    <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                      {item.label}
                    </dt>
                    <dd className="mt-2 font-serif text-lg font-semibold text-paper">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="relative mt-8 text-center">
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
              <p className="mt-4 font-serif text-2xl font-bold text-ink">
                {w.form.subheading}
              </p>
              <p className="mt-2 text-base leading-relaxed text-muted">{w.form.note}</p>
            </div>
            <div className="mt-8">
              <LeadForm />
            </div>
            {wa && (
              <p className="mt-6 text-center text-sm text-muted">
                מעדיפים וואטסאפ?{" "}
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline font-semibold text-ink"
                >
                  דברו איתי ישירות
                </a>
              </p>
            )}
          </div>
        </Section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-line">
        <div className="container-page flex flex-col items-center gap-2 py-12 text-center">
          <a href="#top" className="font-serif text-xl font-bold tracking-tight text-ink">
            {w.brand}
            <span className="text-accent"> · וידאותרפיה</span>
          </a>
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} טליה ברוכיאן. כל הזכויות שמורות.
          </p>
        </div>
      </footer>

      {/* ---------- Floating WhatsApp ---------- */}
      {wa && (
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="דברו איתי בוואטסאפ"
          className="fixed bottom-5 left-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-300 ease-out-expo hover:-translate-y-1"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden>
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.02h-.01c-1.52 0-3.01-.41-4.3-1.18l-.31-.18-3.2.84.85-3.12-.2-.32a8.2 8.2 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.23 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43l-.48-.01c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
          </svg>
        </a>
      )}
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
      className={`font-serif text-4xl font-bold tracking-tight text-ink sm:text-5xl ${
        center ? "text-center" : ""
      }`}
    >
      {children}
    </h2>
  );
}
