import { getBoard, updateBoard } from "@/app/db/board"
import { getUserFromSession } from "@/app/lib/session"
import { NextResponse } from "next/server"

export async function PATCH(req: Request,{ params }: { params: { boardId: string } }) {
    const { title, validTill } = await req.json()
    const {boardId} = params
    const payload = await getUserFromSession()
    const result = await updateBoard(boardId,payload.userId as string,title, validTill)
    return NextResponse.json({ message: "board updated", data: result }, { status: 200 })
}
export async function GET(req: Request,{ params }: { params: { boardId: string } }) {
    const {boardId} = params
    try{
        const result = await getBoard(boardId)
        return NextResponse.json({ message: "got board", data: result }, { status: 200 })
    } catch(e){
        return NextResponse.json({ message: "Not found", data: "board not found" }, { status: 404 })
    }
    
    
}