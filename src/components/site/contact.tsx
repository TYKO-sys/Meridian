'use client'

import * as React from "react"
import { Check, Loader2, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Reveal } from "@/components/site/reveal"

type FormErrors = { name?: string; email?: string; message?: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const reassurances = [
  "Send your business context — messy is perfect",
  "A live draft appears in minutes, not weeks",
  "Refine anything on the live site",
  "You own every line of the result",
]

export function Contact() {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [message, setMessage] = React.useState("")
  const [errors, setErrors] = React.useState<FormErrors>({})
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success">("idle")

  function validate(): FormErrors {
    const next: FormErrors = {}
    if (name.trim().length < 2) next.name = "Please tell us your name."
    if (!EMAIL_RE.test(email.trim())) next.email = "That email does not look right."
    if (message.trim().length < 10) next.message = "Give us at least a sentence or two."
    return next
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "submitting") return

    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus("submitting")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      setStatus("success")
      setName("")
      setEmail("")
      setMessage("")
      toast({
        title: "Brief received",
        description: "We are on it. Expect a reply within the hour.",
      })
    } catch (error) {
      setStatus("idle")
      console.error("Contact form submission failed:", error)
      toast({
        title: "Something went wrong",
        description: "Could not send your brief. Please try again in a moment.",
        variant: "destructive",
      })
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_20%,transparent_75%)]" />
        <div className="animate-orb-slow absolute bottom-0 left-1/2 size-[28rem] -translate-x-1/2 translate-y-1/3 rounded-full bg-fuchsia-500/15 blur-[120px] dark:bg-fuchsia-500/20" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <Reveal className="flex flex-col justify-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet-600 dark:text-violet-400">
            Start
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            One message.
            <span className="block bg-linear-to-r from-violet-400 via-fuchsia-400 to-rose-400 bg-clip-text text-transparent">
              That&apos;s the whole process.
            </span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            However it comes out — voice notes transcribed, a wall of text, half
            thoughts at midnight — send it. Structure is our job, not yours.
          </p>

          <ul className="mt-8 space-y-3">
            {reassurances.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base">
                <Check className="mt-0.5 size-4 shrink-0 text-violet-600 dark:text-violet-400" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.12}>
          <Card className="border-border/60 bg-card/70 shadow-xl backdrop-blur">
            <CardHeader>
              <CardTitle className="text-xl">Tell us what we&apos;re building</CardTitle>
              <CardDescription>
                Two minutes now saves you weeks of agency ping-pong.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Name</Label>
                    <Input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                    />
                    {errors.name ? (
                      <p id="contact-name-error" className="text-sm text-destructive">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                    />
                    {errors.email ? (
                      <p id="contact-email-error" className="text-sm text-destructive">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message">What are we building?</Label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Brain-dump welcome: your business, your audience, what you sell, sites you like, the vibe you want…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                  />
                  {errors.message ? (
                    <p id="contact-message-error" className="text-sm text-destructive">
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "submitting"}
                  className="w-full border-0 bg-linear-to-r from-violet-500 to-fuchsia-500 text-white shadow-[0_0_36px_-12px_rgba(217,70,239,0.6)] hover:opacity-90"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      Sending your brief…
                    </>
                  ) : (
                    <>
                      Send the brief
                      <Send className="size-4" />
                    </>
                  )}
                </Button>

                {status === "success" ? (
                  <p
                    role="status"
                    className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400"
                  >
                    <Check className="size-4 shrink-0" />
                    Got it — your brief is in. Check your inbox soon.
                  </p>
                ) : null}
              </form>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}
