'use client'

import * as React from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Check, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

const PROMPT =
  "Build my business a website - dark, cinematic, mobile-first. Live tonight."

const stats = [
  { value: "1", label: "prompt is all it takes" },
  { value: "0", label: "templates, ever" },
  { value: "60s", label: "brief to live draft" },
  { value: "100%", label: "of the code is yours" },
]

type Phase = "typing" | "generating" | "done"

export function Hero() {
  const reduceMotion = useReducedMotion()
  const [chars, setChars] = React.useState(reduceMotion ? PROMPT.length : 0)
  const [phase, setPhase] = React.useState<Phase>(reduceMotion ? "done" : "typing")

  React.useEffect(() => {
    if (reduceMotion) return

    const typing = window.setInterval(() => {
      setChars((prev) => {
        if (prev >= PROMPT.length) {
          window.clearInterval(typing)
          setPhase("generating")
          return prev
        }
        return prev + 1
      })
    }, 38)

    return () => window.clearInterval(typing)
  }, [reduceMotion])

  React.useEffect(() => {
    if (phase !== "generating") return
    const finish = window.setTimeout(() => setPhase("done"), 1900)
    return () => window.clearTimeout(finish)
  }, [phase])

  const generated = phase !== "typing"

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black_30%,transparent_75%)]" />
        <div className="animate-orb absolute -top-24 left-1/2 size-[34rem] -translate-x-[70%] rounded-full bg-fuchsia-500/20 blur-[130px] dark:bg-fuchsia-500/25" />
        <div className="animate-orb-slow absolute -top-10 left-1/2 size-[30rem] translate-x-[15%] rounded-full bg-violet-500/20 blur-[130px] dark:bg-violet-500/25" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-fuchsia-500/50 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-20 text-center sm:px-6 sm:pt-28">
        {/* Badge */}
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur"
        >
          <Sparkles className="size-3.5 text-violet-500 dark:text-violet-400" />
          Prompt-to-production studio
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-muted-foreground/40" />
          <span className="relative flex items-center gap-1.5">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            accepting briefs
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mx-auto max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-6xl lg:text-7xl"
        >
          Next-generation websites,
          <span className="block bg-linear-to-r from-violet-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
            from a single prompt.
          </span>
        </motion.h1>

        <motion.p
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
        >
          Send one brief — as messy as it comes — and watch a complete site
          materialize: designed, coded, copywritten, and deployed while you
          watch. No wireframes. No agency retainers. No back-and-forth.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="h-12 border-0 bg-linear-to-r from-violet-500 to-fuchsia-500 px-7 text-base text-white shadow-[0_0_44px_-12px_rgba(217,70,239,0.65)] transition-opacity hover:opacity-90"
          >
            <Link href="#contact">
              Start your project
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 px-7 text-base">
            <Link href="#process">See how it works</Link>
          </Button>
        </motion.div>

        {/* Prompt-to-site mockup */}
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.34 }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/70 text-left shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-2 border-b border-border/60 px-4 py-3">
              <span aria-hidden="true" className="size-3 rounded-full bg-rose-500/70" />
              <span aria-hidden="true" className="size-3 rounded-full bg-amber-400/70" />
              <span aria-hidden="true" className="size-3 rounded-full bg-emerald-500/70" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">
                meridian — new brief
              </span>
            </div>

            <div className="p-5 sm:p-6">
              <p className="min-h-6 font-mono text-sm leading-relaxed sm:text-base">
                <span className="mr-2 text-fuchsia-500 dark:text-fuchsia-400">$</span>
                <span>{PROMPT.slice(0, chars)}</span>
                {phase === "typing" ? (
                  <span
                    aria-hidden="true"
                    className="animate-caret ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 bg-fuchsia-400"
                  />
                ) : null}
              </p>

              {generated ? (
                <motion.div
                  initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45 }}
                  className="mt-5"
                >
                  {phase === "generating" ? (
                    <div>
                      <p className="mb-2 font-mono text-xs text-muted-foreground">
                        Generating 4 sections, 12 components…
                      </p>
                      <div
                        role="progressbar"
                        aria-label="Generating website"
                        className="h-1.5 overflow-hidden rounded-full bg-muted"
                      >
                        <div className="animate-shimmer h-full w-2/5 rounded-full bg-linear-to-r from-violet-500 to-fuchsia-500" />
                      </div>
                    </div>
                  ) : null}

                  {phase === "done" ? (
                    <div>
                      {/* Mini generated site */}
                      <div className="overflow-hidden rounded-xl border border-border/60 bg-background/80">
                        <div className="flex items-center gap-2 border-b border-border/60 px-3 py-2">
                          <span aria-hidden="true" className="size-2 rounded-full bg-border" />
                          <span aria-hidden="true" className="size-2 rounded-full bg-border" />
                          <span className="rounded-md bg-muted px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                            meridian.site
                          </span>
                        </div>
                        <div className="space-y-3 p-4">
                          <div className="h-14 rounded-lg bg-linear-to-r from-violet-500/60 via-fuchsia-500/60 to-rose-500/60" />
                          <div className="h-2.5 w-3/4 rounded-full bg-muted" />
                          <div className="h-2.5 w-1/2 rounded-full bg-muted" />
                          <div className="flex gap-2 pt-1">
                            <span className="h-7 w-24 rounded-md bg-linear-to-r from-violet-500 to-fuchsia-500" />
                            <span className="h-7 w-20 rounded-md border border-border/70" />
                          </div>
                        </div>
                      </div>

                      {/* Status pills */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {["Code generated", "Deployed", "Live in 60s"].map((label, i) => (
                          <motion.span
                            key={label}
                            initial={reduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.35, delay: 0.15 + i * 0.12 }}
                            className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs text-muted-foreground"
                          >
                            <Check className="size-3 text-emerald-500 dark:text-emerald-400" />
                            {label}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </motion.div>
              ) : null}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.dl
          initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border/60 bg-card/50 p-4 text-left"
            >
              <dt className="order-2 text-xs text-muted-foreground sm:text-sm">
                {stat.label}
              </dt>
              <dd className="order-1 mb-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
