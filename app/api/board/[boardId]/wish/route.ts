import { createWish } from "@/app/db/board"
import { NextResponse } from "next/server"

export async function POST(req: Request, { params }: { params: Promise<{ boardId: string }> }) {
    const { wish, salutation, from } = await req.json()
    const { boardId } = await params
    try {
        const result = await createWish(boardId, salutation, wish, from)
        return NextResponse.json({ "message": "your wish is posted", data: result }, { status: 201 })
    } catch (e) {
        return NextResponse.json({ "message": "bad request" }, { status: 400 })
    }
}