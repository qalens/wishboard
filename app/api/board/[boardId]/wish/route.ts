import { createWish, getBoard, getBoardShallow } from "@/app/db/board"
import { NextResponse } from "next/server"

export async function POST(req: Request, { params }: { params: Promise<{ boardId: string }> }) {
    const { wish, salutation, from } = await req.json()
    const { boardId } = await params
    try {
        const board = await getBoardShallow(boardId)
        if (board != null) {
            const date = new Date(board.validTill)
            if (new Date() < date) {
                const result = await createWish(boardId, salutation, wish, from)
                return NextResponse.json({ "message": "your wish is posted", data: result }, { status: 201 })
            } else {
                return NextResponse.json({ "message": "Not allowed", data: "No more wishes can be posted on this board" }, { status: 400 })
            }

        } else {
            return NextResponse.json({ "message": "Not found", data: "board not found" }, { status: 201 })
        }

    } catch (e) {
        return NextResponse.json({ "message": "bad request" }, { status: 400 })
    }
}