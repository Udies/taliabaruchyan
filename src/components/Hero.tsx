export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* soft ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(60% 55% at 78% 8%, rgba(180,85,47,0.10), transparent 60%), radial-gradient(45% 40% at 10% 20%, rgba(63,90,107,0.10), transparent 60%)",
        }}
      />

      <div className="container-page pb-14 pt-16 sm:pb-20 sm:pt-24">
        <div className="max-w-3xl animate-fade-up">
          <p className="eyebrow">במאית • תסריטאית • מפיקה</p>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            סיפורים שנשארים
            <br />
            <span className="text-muted">הרבה אחרי הקרדיטים.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            יוצרת קולנועית שעובדת בין העלילתי לתיעודי. אני מחפשת את הרגע הקטן
            והאמיתי שבו דמות נחשפת — ובונה סביבו עולם שלם של תמונה, קול ורגש.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#reel"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-transform duration-300 ease-out-expo hover:-translate-y-0.5"
            >
              <PlayGlyph className="h-3.5 w-3.5" />
              צפייה בסרט הרזומה
            </a>
            <a
              href="#works"
              className="link-underline text-sm font-semibold text-ink"
            >
              לכל העבודות ↖
            </a>
          </div>
        </div>

        {/* Featured reel placeholder */}
        <div id="reel" className="mt-14 scroll-mt-28 sm:mt-20">
          <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-ink">
            {/* cinematic placeholder gradient */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-90 transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
              style={{
                background:
                  "linear-gradient(135deg, #1c1a16 0%, #2c2a24 45%, #3a2c26 100%)",
              }}
            />
            {/* grain / vignette */}
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(70% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)",
              }}
            />

            {/* play control */}
            <button
              type="button"
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-paper"
              aria-label="הפעלת סרט הרזומה"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-paper/40 bg-paper/10 backdrop-blur-sm transition-all duration-300 ease-out-expo group-hover:scale-110 group-hover:bg-paper/20 sm:h-20 sm:w-20">
                <PlayGlyph className="ms-0.5 h-6 w-6 sm:h-7 sm:w-7" />
              </span>
              <span className="text-xs font-medium uppercase tracking-widest text-paper/80">
                Showreel · 2024
              </span>
            </button>

            {/* corner caption */}
            <div className="absolute bottom-4 start-5 text-paper/70">
              <p className="text-[11px] font-medium tracking-widest">
                סרט רזומה — אוסף קטעים נבחרים
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
