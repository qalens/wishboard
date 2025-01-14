import { prisma } from "./client";

export async function getUsers() {
    const allUsers = await prisma.user.findMany()
    return allUsers
}
export async function createUser(username:string,password:string){
    return prisma.user.create({
        data:{
            username,
            password
        }
    })
}
export async function login(username:string,password:string){
    return prisma.user.findFirst({
        where:{
            username,
            password,
        }
    })
}