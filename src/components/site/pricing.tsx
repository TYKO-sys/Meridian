'use client'

import Link from "next/link"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Reveal } from "@/components/site/reveal"
import { SectionHeading } from "@/components/site/section-heading"

type Tier = {
  name: string
  price: string
  period: string
  tagline: string
  features: string[]
  featured: boolean
  cta: string
}

const tiers: Tier[] = [
  {
    name: "Starter",
    price: "$490",
    period: "one-time",
    tagline: "A sharp one-page launch, live the same day.",
    features: [
      "One-page site, fully responsive",
      "Copy written from your brief",
      "Contact form wired to your inbox",
      "One refinement pass included",
    ],
    featured: false,
    cta: "Start small",
  },
  {
    name: "Studio",
    price: "$1,900",
    period: "one-time",
    tagline: "The full site most businesses actually need.",
    features: [
      "Multi-section site with blog-ready structure",
      "Brand polish: palette, type, favicon",
      "SEO metadata + analytics wired in",
      "Three refinement passes",
      "Code handover — you own everything",
    ],
    featured: true,
    cta: "Start your project",
  },
  {
    name: "Scale",
    price: "Custom",
    period: "scope-based",
    tagline: "E-commerce, integrations, and ongoing momentum.",
    features: [
      "Storefronts and checkout flows",
      "Custom integrations & APIs",
      "Ongoing prompt-driven updates",
      "Priority turnaround",
    ],
    featured: false,
    cta: "Talk scope",
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple scopes. No retainers."
          description="Pay once per launch. Refinements come in passes, not invoices that never end."
        />

        <div className="grid items-stretch gap-4 sm:gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.1} className="h-full">
              <Card
                className={`relative flex h-full flex-col ${
                  tier.featured
                    ? "border-fuchsia-500/50 bg-card/70 shadow-[0_24px_64px_-24px_rgba(217,70,239,0.45)] lg:-my-3 lg:py-3"
                    : "border-border/60 bg-card/50"
                }`}
              >
                {tier.featured ? (
                  <Badge className="absolute -top-2.5 left-1/2 -translate-x-1/2 border-0 bg-linear-to-r from-violet-500 to-fuchsia-500 text-white">
                    Most popular
                  </Badge>
                ) : null}

                <CardHeader className="pb-2">
                  <h3 className="text-lg font-semibold tracking-tight">{tier.name}</h3>
                  <p className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-4xl font-semibold tracking-tight">{tier.price}</span>
                    <span className="text-sm text-muted-foreground">{tier.period}</span>
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {tier.tagline}
                  </p>
                </CardHeader>

                <CardContent className="flex-1">
                  <ul className="space-y-2.5">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 size-4 shrink-0 text-violet-600 dark:text-violet-400" />
                        <span className="leading-relaxed text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    asChild
                    className={`w-full ${tier.featured ? "border-0 bg-linear-to-r from-violet-500 to-fuchsia-500 text-white shadow-[0_0_36px_-12px_rgba(217,70,239,0.6)] hover:opacity-90" : ""}`}
                    variant={tier.featured ? "default" : "outline"}
                  >
                    <Link href="#contact">{tier.cta}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
