"use client";

import { useState } from "react";

interface VideoEmbedProps {
  /** Vimeo video id. When absent, a "coming soon" placeholder is shown. */
  vimeoId?: string;
  /** Privacy hash for unlisted Vimeo videos (the `h=` param). */
  vimeoHash?: string;
  /** Accessible title / label for the clip. */
  title: string;
  /** Poster image URL shown before playback (falls back to an accent gradient). */
  poster?: string;
  /** Accent color for the gradient fallback. */
  accent?: string;
  /** Small overline label, e.g. "Showreel" or a duration. */
  label?: string;
  /** Caption shown in the corner. */
  caption?: string;
  /** Rounded corners size. */
  rounded?: "xl" | "2xl";
}

/**
 * Lightweight Vimeo "facade": renders a poster + play button and only loads the
 * heavy Vimeo player iframe once the viewer clicks. Keeps the page fast and
 * avoids third-party tracking until playback is requested (`dnt=1`).
 *
 * With no `vimeoId` it degrades to a tasteful "בקרוב" (coming soon) state, so
 * the layout is production-ready before real clips are uploaded.
 */
export default function VideoEmbed({
  vimeoId,
  vimeoHash,
  title,
  poster,
  accent = "#2c2a24",
  label,
  caption,
  rounded = "2xl",
}: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);

  const radius = rounded === "2xl" ? "rounded-2xl" : "rounded-xl";
  const hasVideo = Boolean(vimeoId);

  const src = hasVideo
    ? `https://player.vimeo.com/video/${vimeoId}?autoplay=1&dnt=1&title=0&byline=0&portrait=0${
        vimeoHash ? `&h=${vimeoHash}` : ""
      }`
    : "";

  return (
    <div
      className={`group relative aspect-video w-full overflow-hidden border border-line bg-ink ${radius}`}
    >
      {playing && hasVideo ? (
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          {/* Poster or gradient fallback */}
          {poster ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={poster}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
            />
          ) : (
            <div
              aria-hidden
              className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.03]"
              style={{
                background: `linear-gradient(135deg, #1b1915 0%, ${accent} 170%)`,
              }}
            />
          )}
          {/* vignette */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 70% at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)",
            }}
          />

          {hasVideo ? (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-paper"
              aria-label={`הפעלת הסרטון: ${title}`}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-paper/40 bg-paper/10 backdrop-blur-sm transition-all duration-300 ease-out-expo group-hover:scale-110 group-hover:bg-paper/20 sm:h-20 sm:w-20">
                <svg viewBox="0 0 24 24" fill="currentColor" className="ms-0.5 h-6 w-6 sm:h-7 sm:w-7" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              {label && (
                <span className="text-xs font-medium uppercase tracking-widest text-paper/80">
                  {label}
                </span>
              )}
            </button>
          ) : (
            // Coming-soon state
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-paper/80">
              <span className="rounded-full border border-paper/30 bg-paper/10 px-4 py-1.5 text-xs font-semibold tracking-widest backdrop-blur-sm">
                בקרוב
              </span>
              {label && (
                <span className="text-[11px] font-medium uppercase tracking-widest text-paper/60">
                  {label}
                </span>
              )}
            </div>
          )}

          {caption && (
            <div className="absolute bottom-4 start-5 text-paper/70">
              <p className="text-[11px] font-medium tracking-widest">{caption}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
