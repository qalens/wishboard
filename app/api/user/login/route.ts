import { createUser, getUsers, login } from "@/db/user"
import { NextResponse } from "next/server"
import type { NextApiRequest, NextApiResponse } from 'next'
export async function POST(req: Request) {
    const { email, password } = await req.json()
    try {
        const result = await login(email, password)
        if(result!=null){
            return Response.json(result)
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