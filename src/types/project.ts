export interface Project {
  /** URL-safe unique identifier / slug */
  id: string;
  /** Display title (Hebrew) */
  title: string;
  /** Category label, e.g. "סרט עלילתי קצר" */
  category: string;
  /** Release / production year */
  year: number;
  /** Talia's role on the project */
  role: string;
  /** Human-readable runtime, e.g. "24 דק׳" */
  duration: string;
  /** Short description for the card */
  description: string;
  /** Hex color used to theme the placeholder thumbnail */
  accent: string;
  /** Whether the project is highlighted (e.g. shown larger) */
  featured?: boolean;

  // ---- Video (added for real content) ----
  /** Vimeo video id for the embedded clip. When empty, the card shows a "coming soon" state. */
  vimeoId?: string;
  /** Privacy hash for UNLISTED Vimeo videos (the `h=` param). Required to embed unlisted clips. */
  vimeoHash?: string;
  /** Poster image (path under /public or absolute URL) shown before playback. */
  poster?: string;
  /** Credits line, e.g. "בימוי: טליה ברוכיאן · צילום: ..." */
  credits?: string;
  /** Festival / award mentions. */
  festivals?: string[];
  /** Publish state. "coming-soon" renders a placeholder; "published" renders the clip. */
  status?: "published" | "coming-soon";
}
