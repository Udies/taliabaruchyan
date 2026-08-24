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
}
