"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { href: "#works", label: "עבודות" },
  { href: "#about", label: "אודות" },
  { href: "#contact", label: "צור קשר" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Add a subtle surface + border once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-b border-line bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="container-page flex h-20 items-center justify-between gap-4"
        aria-label="ניווט ראשי"
      >
        {/* Brand */}
        <a
          href="#top"
          onClick={closeMenu}
          className="group flex flex-col leading-none"
        >
          <span className="font-display text-lg font-extrabold tracking-tight text-ink sm:text-xl">
            טליה ברוכיאן
          </span>
          <span className="mt-1 text-[11px] font-medium tracking-widest text-muted">
            במאית • תסריטאית • מפיקה
          </span>
        </a>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="link-underline text-sm font-medium text-ink/80 transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <span aria-hidden className="h-5 w-px bg-line" />

          {/* Language toggle — placeholder for future English localization */}
          <button
            type="button"
            className="rounded-full border border-line px-3 py-1 text-xs font-semibold tracking-wide text-muted transition-colors hover:border-ink/30 hover:text-ink"
            aria-label="החלפת שפה — עברית פעילה"
            title="English (בקרוב)"
          >
            <span className="text-ink">עב</span>
            <span className="px-1 text-line">/</span>
            <span>EN</span>
          </button>
        </div>

        {/* Mobile menu toggler */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-ink/5 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "סגירת התפריט" : "פתיחת התפריט"}
        >
          <span className="sr-only">תפריט</span>
          <span className="relative block h-4 w-5">
            <span
              className={`absolute inset-x-0 top-0 h-0.5 rounded bg-current transition-transform duration-300 ${
                menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 rounded bg-current transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute inset-x-0 bottom-0 h-0.5 rounded bg-current transition-transform duration-300 ${
                menuOpen ? "bottom-1/2 translate-y-1/2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        id="mobile-menu"
        className={`md:hidden ${menuOpen ? "block" : "hidden"}`}
      >
        <ul className="container-page flex flex-col gap-1 pb-8 pt-2">
          {navLinks.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={closeMenu}
                className="block border-b border-line/60 py-4 font-display text-2xl font-bold text-ink transition-colors hover:text-accent"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
