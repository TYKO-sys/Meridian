import { NextResponse } from "next/server"
import { z } from "zod"

import { db } from "@/lib/db"

const ContactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().max(200),
  message: z.string().trim().min(10).max(5000),
})

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)
    if (body === null) {
      return NextResponse.json(
        { ok: false, error: "Invalid JSON body" },
        { status: 400 }
      )
    }

    const parsed = ContactSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Please fill every field correctly." },
        { status: 400 }
      )
    }

    const { name, email, message } = parsed.data
    await db.contactMessage.create({
      data: { name, email, message },
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("[POST /api/contact] failed:", error)
    return NextResponse.json(
      { ok: false, error: "Server error — please try again." },
      { status: 500 }
    )
  }
}
