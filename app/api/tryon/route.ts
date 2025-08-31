import { NextResponse } from "next/server"

export async function POST() {
  // In a real integration, would compose images server-side.
  return NextResponse.json({ ok: true })
}
