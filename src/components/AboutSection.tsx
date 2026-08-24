const filmography = [
  { year: "2024", title: "שתיקה בין הקירות", note: "תחרות הסטודנטים · פסטיבל ירושלים" },
  { year: "2023", title: "אור מצטבר", note: "הקרנת בכורה · דוקאביב" },
  { year: "2023", title: "קו הפרדה", note: "פיתוח סדרה · קרן הקולנוע" },
  { year: "2022", title: "חדר 323", note: "מבחר רשמי · פסטיבל הסרטים הקצרים" },
  { year: "2022", title: "ימים של מלח", note: "וידאו-ארט · תערוכה קבוצתית" },
  { year: "2021", title: "בין הצלילים", note: "קמפיין מותג · פרס יצירתיות" },
];

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-line py-20 sm:py-28">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait placeholder */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-surface lg:mx-0">
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(160deg, #ece7df 0%, #d9d1c4 55%, #c9bda9 100%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-ink/40">
                <span className="font-display text-5xl font-extrabold tracking-tight">
                  ט.ב
                </span>
                <span className="text-xs font-medium tracking-widest">
                  תמונת פורטרט
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="lg:col-span-7">
            <p className="eyebrow">אודות</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
              טליה ברוכיאן
            </h2>

            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted sm:text-lg">
              <p>
                טליה ברוכיאן היא במאית, תסריטאית ומפיקה. עבודותיה נעות בין דרמה
                עלילתית לתיעוד, ומחפשות תמיד את הרגע האנושי הקטן שממנו נפרש סיפור
                גדול.
              </p>
              <p>
                בבסיס העשייה שלה עומדת אמונה שקולנוע טוב מתחיל בהקשבה — לדמויות,
                למרחב ולשקט שביניהם. היא עובדת בשיתוף פעולה הדוק עם צוותי צילום,
                עריכה ופסקול כדי לבנות שפה חזותית מדויקת לכל פרויקט.
              </p>
              <p className="text-ink">
                * זהו טקסט זמני. כאן יופיע הביוגרפיה המלאה, ההשכלה, הפרסים
                והרקע המקצועי של טליה.
              </p>
            </div>

            {/* Filmography */}
            <div className="mt-10">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-ink">
                פילמוגרפיה נבחרת
              </h3>
              <ul className="mt-4 divide-y divide-line border-t border-line">
                {filmography.map((item) => (
                  <li
                    key={`${item.year}-${item.title}`}
                    className="group flex flex-wrap items-baseline gap-x-4 gap-y-1 py-3.5 transition-colors"
                  >
                    <span className="w-12 shrink-0 font-display text-sm font-bold tabular-nums text-accent">
                      {item.year}
                    </span>
                    <span className="font-display text-base font-semibold text-ink transition-colors group-hover:text-accent">
                      {item.title}
                    </span>
                    <span className="ms-auto text-xs text-muted">
                      {item.note}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
