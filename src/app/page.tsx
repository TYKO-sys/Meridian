'use client'

import { Navbar } from "@/components/site/navbar"
import { Hero } from "@/components/site/hero"
import { Services } from "@/components/site/services"
import { Process } from "@/components/site/process"
import { Showcase } from "@/components/site/showcase"
import { Testimonials } from "@/components/site/testimonials"
import { Pricing } from "@/components/site/pricing"
import { Faq } from "@/components/site/faq"
import { Contact } from "@/components/site/contact"
import { Footer } from "@/components/site/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Services />
        <Process />
        <Showcase />
        <Testimonials />
        <Pricing />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
