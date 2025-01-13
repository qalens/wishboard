import { createSession } from '@/app/lib/session'
import { createUser } from '@/db/user'
 
export async function signup(username:string,password:string) {
    const user=await createUser(username,password)
    await createSession(user.id)  
}