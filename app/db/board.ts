import { prisma } from "./client";

export async function createBoard(title: string, createdById: string, validTill: string) {
    const data = {
        title,
        createdById,
        validTill
    }
    return prisma.board.create({
        data
    })
}
export async function updateBoard(id: string, createdById: string, title?: string, validTill?: string) {
    const data = {
        title,
        validTill
    }
    return prisma.board.update({
        data,
        where: {
            id,
            createdById
        }
    })
}
export async function getBoard(id: string) {

    return prisma.board.findFirst({
        where: {
            id
        },
        include: {
            createdBy: {
                select: {
                    id: true,
                    username: true,
                }
            },
            wishes: {
                select: {
                    id: true,
                    salutation: true,
                    wish: true,
                    from: true,
                }
            }
        }
    })
}
export async function getAllBoardsForUser(createdById: string) {
    return prisma.board.findMany({
        where: {
            createdById
        }
    }).then(results => results.map(board => ({
        id: board.id,
        title: board.title,
        validTill: new Date(board.validTill).toISOString(),
        createdAt: new Date(board.createdAt).toISOString()
    })))
}
export async function createWish(boardId: string, salutation: string, wish: string, from: string) {
    const data = {
        boardId,
        salutation,
        wish,
        from
    }
    return prisma.wish.create({
        data,
    })
}