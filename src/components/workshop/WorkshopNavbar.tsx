"use client";

import { useEffect, useState } from "react";
import { workshop } from "@/config/workshop";

const navLinks = [
  { href: "#what", label: "מהי וידאותרפיה" },
  { href: "#process", label: "התהליך" },
  { href: "#about", label: "עליי" },
  { href: "#details", label: "פרטים" },
];

export default function WorkshopNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "border-b border-line bg-paper/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="container-page flex h-20 items-center justify-between gap-4"
        aria-label="ניווט ראשי"
      >
        {/* Brand */}
        <a href="#top" onClick={close} className="flex flex-col leading-none">
          <span className="font-display text-lg font-extrabold tracking-tight text-ink">
            {workshop.brand}
          </span>
          <span className="mt-1 text-[11px] font-medium tracking-[0.2em] text-accent">
            {workshop.brandSub}
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
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
          <a
            href="#lead"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-transform duration-300 ease-out-expo hover:-translate-y-0.5"
          >
            להשארת פרטים
          </a>
        </div>

        {/* Mobile toggler */}
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

      {/* Mobile menu */}
      <div id="mobile-menu" className={`md:hidden ${menuOpen ? "block" : "hidden"}`}>
        <ul className="container-page flex flex-col gap-1 pb-6 pt-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={close}
                className="block border-b border-line/60 py-4 font-display text-2xl font-bold text-ink transition-colors hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-4">
            <a
              href="#lead"
              onClick={close}
              className="inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper"
            >
              להשארת פרטים
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
