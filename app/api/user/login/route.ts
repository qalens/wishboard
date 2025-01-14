import { createUser, getUsers, login } from "@/app/db/user"
import { NextResponse } from "next/server"
import type { NextApiRequest, NextApiResponse } from 'next'
import { createSession } from "@/app/lib/session"
export async function POST(req: Request) {
    const { username, password } = await req.json()
    try {
        const result = await login(username, password)
        if(result!=null){
            await createSession(result.id)
            return NextResponse.json({ "message": "login successful" }, { status: 200 })    
        } else {
            return NextResponse.json({ "message": "invalid credentials" }, { status: 400 })    
        }
    } catch (e) {
        return NextResponse.json({ "message": "invalid credentials" }, { status: 400 })
    }

}
// export async function GET(req: Request) {
//     const users = await getUsers()
//     return Response.json(users)
// }