'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Reveal } from "@/components/site/reveal"
import { SectionHeading } from "@/components/site/section-heading"

const faqs = [
  {
    question: "How does a one-shot build actually work?",
    answer:
      "You send a single brief: your business, your audience, what you sell, and any sites you admire. That brief is turned into a complete, working website in one pass — layout, code, copy, and deployment together. You review the live draft and we refine from there. There is no wireframe stage, no design-apping back and forth, and no weekly status calls.",
  },
  {
    question: "What do I need to provide?",
    answer:
      "One message. Describe your business like you would to a smart friend: what you do, who it is for, what makes it different, and the feeling you want the site to give. Links to sites you like help but are optional. Logo files, brand colors, and existing copy are welcome — never required. We can generate a starting brand identity and rewrite everything to match.",
  },
  {
    question: "Can I update the site after launch?",
    answer:
      "Yes, two ways. Prompt-driven: you describe the change — \u201cadd a testimonials section,\u201d \u201cmake the hero darker\u201d — and it lands on the live site in minutes. Or hands-on: you own the full codebase, so any developer can work on it. You are never locked into us to make a change.",
  },
  {
    question: "Do I own the code and design?",
    answer:
      "One hundred percent. The moment your site launches, the code, copy, and visual design are yours. It is a standard, modern Next.js codebase — readable, documented, and portable. Take it to any host, any developer, any future version of your business.",
  },
  {
    question: "How does hosting and the domain work?",
    answer:
      "Your site goes live on a preview URL within minutes of your brief, so you can review it on any device immediately. When you are happy, we connect your custom domain — you buy it, we wire the DNS, SSL included. If you ever want to move hosts, the codebase exports cleanly.",
  },
  {
    question: "How fast is \u201cfast,\u201d really?",
    answer:
      "First drafts land in minutes. A polished launch — refinements included — typically ships the same day. The longest part of any project is usually deciding what you want, not waiting for us to build it. If you brief us tonight, you can realistically be live tonight.",
  },
]

export function Faq() {
  return (
    <section id="faq" className="relative border-t border-border/40 bg-secondary/40 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Questions, answered." />

        <Reveal>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`item-${i}`} className="border-border/60">
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline sm:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
