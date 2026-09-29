'use client'

import * as React from "react"
import { Reveal } from "@/components/site/reveal"

type SectionHeadingProps = {
  eyebrow: string
  title: React.ReactNode
  description?: string
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <Reveal className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet-600 dark:text-violet-400">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}
