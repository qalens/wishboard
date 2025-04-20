import { deleteBoard, getBoard, getBoardShallow, updateBoard } from "@/app/db/board"
import { getUserFromSession } from "@/app/lib/session"
import { NextResponse } from "next/server"

export async function PATCH(req: Request,{ params }: { params: Promise<{ boardId: string }> }) {
    const { title, validTill } = await req.json()
    const {boardId} = await params
    const payload = await getUserFromSession()
    const result = await updateBoard(boardId,payload.userId as string,title, validTill)
    return NextResponse.json({ message: "board updated", data: result }, { status: 200 })
}
export async function GET(req: Request,{ params }: { params: Promise<{ boardId: string }> }) {
    const {boardId} = await params
    try{
        const result = await getBoard(boardId)
        if (result!=null)
            return NextResponse.json({ message: "got board", data: result }, { status: 200 })
        else
            throw Error("board not found")
    } catch(e){
        return NextResponse.json({ message: "Not found", data: "board not found" }, { status: 404 })
    }
}
export async function DELETE(_: Request, { params }: { params: Promise<{ boardId: string }> }) {
    const { boardId } = await params
    try {
        const board = await getBoardShallow(boardId)
        if (board != null) {
            const result = await deleteBoard(boardId)
            return NextResponse.json({ "message": "your board is deleted", data: result }, { status: 200 })
        } else {
            return NextResponse.json({ "message": "Not found", data: "board not found" }, { status: 404 })
        }
    } catch (e) {
        return NextResponse.json({ "message": "bad request" }, { status: 400 })
    }
}