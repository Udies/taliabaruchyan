import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, category, year, role, duration, description, accent } = project;

  return (
    <article className="group flex h-full flex-col">
      <a
        href={`#works`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
        aria-label={`${title} — ${category}, ${year}`}
      >
        {/* Thumbnail placeholder */}
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-line bg-ink">
          <div
            aria-hidden
            className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
            style={{
              background: `linear-gradient(150deg, #1b1915 0%, ${accent} 165%)`,
            }}
          />
          {/* vignette */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(80% 80% at 50% 40%, transparent 45%, rgba(0,0,0,0.5) 100%)",
            }}
          />

          {/* year badge */}
          <span className="absolute top-3 start-3 rounded-full bg-black/25 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-paper/90 backdrop-blur-sm">
            {year}
          </span>

          {/* hover play cue */}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 scale-90 items-center justify-center rounded-full border border-paper/40 bg-paper/10 text-paper opacity-0 backdrop-blur-sm transition-all duration-300 ease-out-expo group-hover:scale-100 group-hover:opacity-100">
              <svg viewBox="0 0 24 24" fill="currentColor" className="ms-0.5 h-5 w-5" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>

          {/* bottom caption */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
            <span className="text-xs font-medium tracking-wide text-paper/80">
              {duration}
            </span>
          </div>
        </div>
      </a>

      {/* Meta */}
      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
          <span>{category}</span>
        </div>
        <h3 className="mt-2 font-display text-xl font-bold text-ink transition-colors duration-300 group-hover:text-accent">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
        <p className="mt-3 text-xs font-medium tracking-wide text-muted/80">
          {role}
        </p>
      </div>
    </article>
  );
}
