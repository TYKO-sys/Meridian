'use client'

import { ArrowUpRight } from "lucide-react"

import { Reveal } from "@/components/site/reveal"
import { SectionHeading } from "@/components/site/section-heading"

type Project = {
  name: string
  category: string
  description: string
  art: string
  url: string
}

const projects: Project[] = [
  {
    name: "Aurora",
    category: "Fashion launch",
    description:
      "Dark editorial storefront with scroll-driven motion and a checkout that never drops a cart.",
    url: "aurora.example",
    art: "from-violet-500/70 via-fuchsia-500/50 to-rose-500/60",
  },
  {
    name: "Pulse",
    category: "SaaS product",
    description:
      "Interactive product tour, living docs, and pricing pages that demo the tool while they sell it.",
    url: "pulse.example",
    art: "from-rose-500/60 via-orange-400/40 to-amber-300/50",
  },
  {
    name: "Atlas",
    category: "Creative portfolio",
    description:
      "Film-style hero, case studies with depth, and a contact flow clients actually finish.",
    url: "atlas.example",
    art: "from-emerald-500/60 via-lime-400/40 to-emerald-300/50",
  },
]

export function Showcase() {
  return (
    <section id="work" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Selected work"
          title="Sites that feel like the future."
          description="A few directions from recent briefs. Yours takes this slot next."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.name} delay={i * 0.1}>
              <article className="group h-full">
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-xl border border-border/60 bg-linear-to-br ${project.art} transition-transform duration-300 group-hover:-translate-y-1`}
                >
                  {/* Abstract UI skeleton inside the artwork */}
                  <div aria-hidden="true" className="absolute inset-0 p-5">
                    <div className="rounded-lg border border-white/25 bg-black/25 backdrop-blur-sm">
                      <div className="flex items-center gap-1.5 border-b border-white/20 px-3 py-2">
                        <span className="size-2 rounded-full bg-white/50" />
                        <span className="size-2 rounded-full bg-white/50" />
                        <span className="size-2 rounded-full bg-white/50" />
                      </div>
                      <div className="space-y-2 p-3">
                        <div className="h-6 w-3/5 rounded-md bg-white/35" />
                        <div className="h-2 w-4/5 rounded-full bg-white/20" />
                        <div className="h-2 w-2/3 rounded-full bg-white/20" />
                        <div className="flex gap-1.5 pt-1">
                          <div className="h-5 w-16 rounded-md bg-white/30" />
                          <div className="h-5 w-12 rounded-md border border-white/25" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {project.category}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold tracking-tight">
                      {project.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-all duration-300 group-hover:border-fuchsia-500/50 group-hover:text-fuchsia-500 dark:group-hover:text-fuchsia-400"
                  >
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
