import { NextResponse } from "next/server"

export async function POST() {
  const avatarUrl = "/generated-avatar.png"
  return NextResponse.json({ avatarUrl })
}
