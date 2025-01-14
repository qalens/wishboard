import { createSession } from "@/app/lib/session"
import { createUser, getUsers } from "@/app/db/user"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const { username, password } = await req.json()
    try {
        const result = await createUser(username, password)
        await createSession(result.id)
        return NextResponse.json({ "message": "signup success" }, { status: 201 })
    } catch (e) {
        return NextResponse.json({ "message": "user already exists" }, { status: 400 })
    }

}
// export async function GET(req: Request) {
//     const users = await getUsers()
//     return Response.json(users)
// }