const footerLinks = [
  { href: "#works", label: "עבודות" },
  { href: "#about", label: "אודות" },
  { href: "#contact", label: "צור קשר" },
];

const footerSocials = [
  { href: "https://vimeo.com", label: "Vimeo" },
  { href: "https://www.imdb.com", label: "IMDb" },
  { href: "https://instagram.com", label: "Instagram" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between">
        {/* Brand + copyright */}
        <div>
          <a
            href="#top"
            className="font-display text-lg font-extrabold tracking-tight text-ink"
          >
            טליה ברוכיאן
          </a>
          <p className="mt-2 text-sm text-muted">
            © {year} טליה ברוכיאן. כל הזכויות שמורות.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex flex-wrap gap-x-6 gap-y-2" dir="ltr">
            {footerSocials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-ink"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
