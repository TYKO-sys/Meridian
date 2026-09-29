'use client'

import Link from "next/link"

import { Logo } from "@/components/site/navbar"

const footerLinks = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#work", label: "Work" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
]

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A prompt-to-production studio. One brief in, one next-generation
              website out — designed, coded, and deployed in a single pass.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Explore
            </p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Meridian Studio. All rights reserved.
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            Generated end-to-end from a single brief.
          </p>
        </div>
      </div>
    </footer>
  )
}
