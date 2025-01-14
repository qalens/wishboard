import { prisma } from "./client";

export async function createBoard(title:string,createdById:string,validTill:string){
    const data={
        title,
        createdById,
        validTill
    }
    console.log("Create Board data",data)
    return prisma.board.create({
        data
    })
}
export async function getAllBoardsForUser(createdById:string){
    return prisma.board.findMany({
        where:{
            createdById
        }
    })
}