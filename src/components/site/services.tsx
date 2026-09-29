'use client'

import {
  Fingerprint,
  Gauge,
  Palette,
  PenLine,
  ShoppingBag,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/site/reveal"
import { SectionHeading } from "@/components/site/section-heading"

type Service = {
  icon: LucideIcon
  title: string
  description: string
}

const services: Service[] = [
  {
    icon: Palette,
    title: "Website design & build",
    description:
      "Art direction, layout, and production code generated together. Your site looks designed because it is — every pixel placed with intent, not lifted from a theme.",
  },
  {
    icon: Fingerprint,
    title: "Brand identity",
    description:
      "Logo mark, palette, and type system tuned to your voice. Consistent from favicon to footer, so your business looks like itself everywhere.",
  },
  {
    icon: ShoppingBag,
    title: "E-commerce",
    description:
      "Product pages, cart, and checkout flows that convert. Built mobile-first and load fast on the worst connection your customers have.",
  },
  {
    icon: Gauge,
    title: "SEO & performance",
    description:
      "Semantic markup, clean metadata, and Core-Web-Vitals-grade speed baked in from the first pass — not bolted on after launch.",
  },
  {
    icon: PenLine,
    title: "Copywriting",
    description:
      "Headlines, section copy, and calls-to-action written while the site is generated. Words that sell, in your tone, on the first draft.",
  },
  {
    icon: TrendingUp,
    title: "Analytics & growth",
    description:
      "Privacy-friendly analytics wired in from day one, so you know what visitors do — and what to prompt next to grow.",
  },
]

export function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What we do"
          title="Everything a launch needs, in one pass."
          description="One brief covers it all. Each discipline below is generated together with the rest — never outsourced, never stitched together from separate tools."
        />

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 0.08}>
              <Card className="group relative h-full overflow-hidden border-border/60 bg-card/50 transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-500/40 hover:shadow-[0_16px_48px_-16px_rgba(217,70,239,0.3)]">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-fuchsia-500/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg border border-border/60 bg-linear-to-br from-violet-500/15 to-fuchsia-500/15">
                    <service.icon className="size-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
