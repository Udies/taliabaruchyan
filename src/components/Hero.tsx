import VideoEmbed from "@/components/VideoEmbed";
import { showreel } from "@/config/site";

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

        {/* Featured showreel (Vimeo-ready; shows "coming soon" until an id is set) */}
        <div id="reel" className="mt-14 scroll-mt-28 sm:mt-20">
          <VideoEmbed
            vimeoId={showreel.vimeoId || undefined}
            vimeoHash={showreel.vimeoHash || undefined}
            poster={showreel.poster || undefined}
            title="סרט הרזומה של טליה ברוכיאן"
            label={showreel.label}
            caption={showreel.caption}
          />
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
