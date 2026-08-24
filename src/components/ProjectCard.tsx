import type { Project } from "@/types/project";
import VideoEmbed from "@/components/VideoEmbed";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const {
    title,
    category,
    year,
    role,
    duration,
    description,
    accent,
    vimeoId,
    vimeoHash,
    poster,
    status,
  } = project;

  const comingSoon = status === "coming-soon" || !vimeoId;

  return (
    <article className="group flex h-full flex-col">
      {vimeoId ? (
        // Real clip: privacy-aware Vimeo facade
        <VideoEmbed
          vimeoId={vimeoId}
          vimeoHash={vimeoHash}
          poster={poster}
          accent={accent}
          title={title}
          label={duration}
          rounded="xl"
        />
      ) : (
        // Placeholder thumbnail until a clip is uploaded
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

          {/* coming-soon badge */}
          {comingSoon && (
            <span className="absolute bottom-3 end-3 rounded-full border border-paper/30 bg-paper/10 px-3 py-1 text-[11px] font-semibold tracking-widest text-paper/85 backdrop-blur-sm">
              בקרוב
            </span>
          )}

          {/* bottom caption */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
            <span className="text-xs font-medium tracking-wide text-paper/80">
              {duration}
            </span>
          </div>
        </div>
      )}

      {/* Meta */}
      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
          <span>{category}</span>
          <span aria-hidden className="text-line">·</span>
          <span className="text-muted">{year}</span>
        </div>
        <h3 className="mt-2 font-display text-xl font-bold text-ink transition-colors duration-300 group-hover:text-accent">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
        )}
        {role && (
          <p className="mt-3 text-xs font-medium tracking-wide text-muted/80">
            {role}
          </p>
        )}
      </div>
    </article>
  );
}
