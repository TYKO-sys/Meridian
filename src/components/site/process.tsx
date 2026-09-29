'use client'

import {
  MessageSquareText,
  Rocket,
  SlidersHorizontal,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

import { Reveal } from "@/components/site/reveal"
import { SectionHeading } from "@/components/site/section-heading"

type Step = {
  number: string
  icon: LucideIcon
  title: string
  description: string
}

const steps: Step[] = [
  {
    number: "01",
    icon: MessageSquareText,
    title: "Send one brief",
    description:
      "One message with everything — your business, your audience, the vibe you want. Messy is fine; structure is our job, not yours.",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Watch it generate",
    description:
      "Design, code, and copy materialize together in a single pass. No wireframes, no sprint cycles, no waiting rooms.",
  },
  {
    number: "03",
    icon: SlidersHorizontal,
    title: "Refine live",
    description:
      "Tweak anything on the live site. \u201cWarmer.\u201d \u201cPunchier.\u201d \u201cAdd pricing.\u201d Changes land in minutes, not meetings.",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Ship it",
    description:
      "Custom domain, analytics, and a codebase you own outright. Launch the same day you briefed — that is the whole point.",
  },
]

export function Process() {
  return (
    <section id="process" className="relative border-y border-border/40 bg-secondary/40 py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-transparent to-fuchsia-500/[0.04]"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How it works"
          title="From brain-dump to live site in four moves."
          description="The entire agency workflow — compressed into a single conversation."
        />

        <ol className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.1}>
              <li className="group relative h-full rounded-xl border border-border/60 bg-card/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/40">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-medium text-fuchsia-500 dark:text-fuchsia-400">
                    {step.number}
                  </span>
                  <div className="inline-flex size-10 items-center justify-center rounded-lg border border-border/60 bg-linear-to-br from-violet-500/15 to-fuchsia-500/15">
                    <step.icon className="size-5 text-violet-600 dark:text-violet-400" />
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
