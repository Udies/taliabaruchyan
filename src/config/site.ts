/**
 * Site-wide content configuration.
 *
 * Fill these in once real assets are hosted on Vimeo. Until then, empty ids make
 * the UI render a tasteful "coming soon" state instead of a broken embed.
 */

export const showreel = {
  /** Vimeo id of the 60–90s showreel. Leave "" to show the "coming soon" state. */
  vimeoId: "",
  /** Privacy hash for an UNLISTED Vimeo showreel (the `h=` param). */
  vimeoHash: "",
  /** Poster image (path under /public) shown before playback. */
  poster: "",
  label: "Showreel",
  caption: "סרט רזומה · אוסף קטעים נבחרים",
} as const;

export const contact = {
  email: "hello@taliabaruchyan.com",
  socials: {
    vimeo: "https://vimeo.com",
    imdb: "https://www.imdb.com",
    instagram: "https://instagram.com",
  },
} as const;
