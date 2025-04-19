import { createBoard, CreateBoardPayload, deleteBoard, updateBoard, UpdateBoardPayload } from "@/services/board";
import { atom } from "jotai";

export const boardsAtom = atom<Record<string,any>>({})
export const setBulkBoardsAtom = atom(null, (get, set, payload: {boards:any[]}) => {
    const boardsVal:Record<number,any>={}
    for (const board of payload.boards){
        boardsVal[board.id]=board
    }
    set(boardsAtom, boardsVal)
})
export const createBoardAtom = atom(null, async (get, set, payload: CreateBoardPayload ) => {
    const response = await createBoard(payload)
    const boardsVal={...get(boardsAtom)}
    boardsVal[response.data.id]=response.data
    set(boardsAtom, boardsVal)
    return response

})
export const updateBoardAtom = atom(null, async (get, set, payload: UpdateBoardPayload ) => {
    const response = await updateBoard(payload)
    const boardsVal={...get(boardsAtom)}
    boardsVal[response.data.id]=response.data
    set(boardsAtom, boardsVal)
    return response
})
export const deleteBoardAtom = atom(null, async (get, set, payload: { id: string }) => {
    const board = await deleteBoard(payload.id)
    const boardsVal={...get(boardsAtom)}
    delete boardsVal[payload.id]
    set(boardsAtom, boardsVal)
    return board

})