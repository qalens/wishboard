import { createBoard } from "@/app/db/board"
import { getUserFromSession } from "@/app/lib/session"
import { updateBoard } from "@/services/board"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const { title, validTill } = await req.json()
    const payload = await getUserFromSession()
    const result = await createBoard(title, payload.userId as string, validTill)
    return NextResponse.json({ message: "board created", data: result }, { status: 201 })
}