'use client'

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Reveal } from "@/components/site/reveal"
import { SectionHeading } from "@/components/site/section-heading"

type Testimonial = {
  quote: string
  name: string
  role: string
  initials: string
  ring: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      "We described the site in one email. It was live before the meeting ended. I keep re-watching the brief turn into pages — it still doesn't feel legal.",
    name: "Maya Chen",
    role: "Founder, Aurora",
    initials: "MC",
    ring: "from-violet-500 to-fuchsia-500",
  },
  {
    quote:
      "It replaced a six-week agency process with a one-hour conversation. First draft was 90% there; we launched three days later.",
    name: "Daniel Okafor",
    role: "CEO, Pulse",
    initials: "DO",
    ring: "from-rose-500 to-amber-400",
  },
  {
    quote:
      "Every agency promised \u201cfast.\u201d This was the only one where fast meant minutes. And the code is genuinely ours — clean, documented, portable.",
    name: "Sofia Reyes",
    role: "Creative Director, Atlas",
    initials: "SR",
    ring: "from-emerald-500 to-lime-400",
  },
]

export function Testimonials() {
  return (
    <section className="relative border-y border-border/40 bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Word of mouth"
          title="Briefed once. Launched fast."
        />

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <Card className="h-full border-border/60 bg-card/50">
                <CardContent className="flex h-full flex-col p-6">
                  <blockquote className="flex-1">
                    <p className="text-base leading-relaxed text-foreground/90">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback
                        className={`bg-linear-to-br ${t.ring} font-semibold text-white`}
                      >
                        {t.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-sm text-muted-foreground">{t.role}</p>
                    </div>
                  </figcaption>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
