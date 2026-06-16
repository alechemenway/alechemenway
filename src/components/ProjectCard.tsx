import Link from 'next/link'

export type Project = {
  title: string
  index: string
  description: string
  outcome: string
  chips: string[]
  href: string
  /** Footer link label (e.g. "Open demo"). Omit to hide the `.link` row. */
  link?: string
}

/**
 * Premium `.pcard` — used on the Home (4-up) and Projects (6-up) grids.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.href}
      className="group flex flex-col rounded-[18px] border border-line bg-card p-[30px] pb-[26px] transition duration-200 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-serif text-[27px] leading-[1.1] tracking-[-0.005em]">
          {project.title}
        </h3>
        <span className="mt-1 shrink-0 text-[13px] font-semibold text-soft">
          {project.index}
        </span>
      </div>
      <p className="mt-3 text-[14.5px] leading-[1.6] text-prose-3">
        {project.description}
      </p>
      <span className="mt-4 inline-flex items-center gap-[7px] text-[13px] font-bold text-accent">
        <span className="h-px w-4 shrink-0 bg-accent" />
        {project.outcome}
      </span>
      <div className="mt-4 flex flex-wrap gap-[7px]">
        {project.chips.map((chip) => (
          <span
            key={chip}
            className="rounded-full bg-cream-2 px-[11px] py-1 text-[12px] font-medium text-soft"
          >
            {chip}
          </span>
        ))}
      </div>
      {project.link && (
        <div className="mt-5 flex items-center justify-between border-t border-line pt-[18px] text-[13px] font-semibold text-espresso transition-colors group-hover:text-accent">
          <span>{project.link}</span>
          <span aria-hidden="true">→</span>
        </div>
      )}
    </Link>
  )
}
