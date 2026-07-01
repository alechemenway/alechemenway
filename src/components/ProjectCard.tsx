import Link from 'next/link'
import Image from 'next/image'

import { TiltCard } from '@/components/motion/TiltCard'
import { ProjectCover, type ProjectCoverVariant } from '@/components/ProjectCover'

export type Project = {
  title: string
  index: string
  description: string
  outcome: string
  chips: string[]
  href: string
  cover?: ProjectCoverVariant
  image?: {
    src: string
    alt: string
  }
  /** Footer link label (e.g. "Open demo"). Omit to hide the link row. */
  link?: string
  /** Cover badge, e.g. "Live" / "Open source" / "Demo". */
  badge?: string
}

/** Image-led project card with a generative cover and 3D pointer-tilt. */
export function ProjectCard({
  project,
  seed = 0,
}: {
  project: Project
  seed?: number
}) {
  return (
    <TiltCard className="h-full">
      <Link
        href={project.href}
        className="group flex h-full flex-col overflow-hidden border border-line bg-surface transition-colors duration-300 hover:border-accent/50"
      >
        <div className="relative">
          {project.image ? (
            <div className="relative aspect-[16/10] overflow-hidden bg-[#0d0d0f]">
              <Image
                src={project.image.src}
                alt={project.image.alt}
                fill
                sizes="(max-width: 880px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
          ) : (
            <ProjectCover seed={seed} variant={project.cover} className="aspect-[16/10]" />
          )}
          <span className="absolute top-4 left-5 font-mono text-[13px] text-accent">
            {project.index}
          </span>
          {project.badge && (
            <span className="absolute top-4 right-4 bg-accent px-2 py-1 font-mono text-[10.5px] tracking-[0.12em] text-bg uppercase">
              {project.badge}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-7">
          <h3 className="text-[23px] font-bold tracking-[-0.02em]">
            {project.title}
          </h3>
          <p className="mt-3 text-[14.5px] leading-[1.6] text-ink-2">
            {project.description}
          </p>
          <div className="mt-auto pt-6">
            <div className="text-[13px] font-semibold text-ink">
              {project.outcome}
            </div>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {project.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-ink-2"
                >
                  {chip}
                </span>
              ))}
            </div>
            {project.link && (
              <div className="mt-5 flex items-center justify-between border-t border-line pt-4 font-mono text-[12.5px] text-ink-2 transition-colors group-hover:text-accent">
                <span>{project.link}</span>
                <span aria-hidden="true">→</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </TiltCard>
  )
}
