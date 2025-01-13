import { createUser, getUsers } from "@/db/user"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const { email, password } = await req.json()
    try {
        const result = await createUser(email, password)
        return Response.json(result)
    } catch (e) {
        return NextResponse.json({ "message": "user already exists" }, { status: 400 })
    }

}
// export async function GET(req: Request) {
//     const users = await getUsers()
//     return Response.json(users)
// }