import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const id = `ORD-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
  return NextResponse.json({ id, ...body })
}
