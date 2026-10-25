"use client";

import { useMemo, useState } from "react";
import projectsData from "@/data/projects.json";
import type { Project } from "@/types/project";
import ProjectCard from "@/components/ProjectCard";

interface ProjectGridProps {
  /** Projects to render. Defaults to the mock data set. */
  projects?: Project[];
}

const ALL = "הכל";

export default function ProjectGrid({
  projects = projectsData as Project[],
}: ProjectGridProps) {
  const [active, setActive] = useState<string>(ALL);

  // Unique category list, built once from the data.
  const categories = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.category)));
    return [ALL, ...unique];
  }, [projects]);

  const filtered = useMemo(
    () =>
      active === ALL
        ? projects
        : projects.filter((p) => p.category === active),
    [active, projects],
  );

  return (
    <section id="works" className="scroll-mt-24 border-t border-line py-20 sm:py-28">
      <div className="container-page">
        {/* Section header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">עבודות נבחרות</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
              עבודות
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              מבחר פרויקטים מהשנים האחרונות: עלילתי, תיעודי, סדרות וקליפים.
              כל כרטיס הוא מקום שמור לפרויקט אמיתי.
            </p>
          </div>

          {/* Category filter */}
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="סינון עבודות לפי קטגוריה"
          >
            {categories.map((cat) => {
              const isActive = cat === active;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActive(cat)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "border-ink bg-ink text-paper"
                      : "border-line text-muted hover:border-ink/40 hover:text-ink"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-muted">
            אין עבודות בקטגוריה זו עדיין.
          </p>
        )}
      </div>
    </section>
  );
}
