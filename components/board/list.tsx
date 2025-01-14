'use client'
import { deleteBoardAtom, setBulkBoardsAtom, boardsAtom } from "@/state/board";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { useDisclosure } from "@nextui-org/modal";
import { useAtom, useAtomValue } from "jotai";
import ViewEdit from "./viewedit";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
export default function List() {
    const currentBoards = useAtomValue(boardsAtom)
    const [selected, setSelected] = useState<number | null>(null)
    console.log(JSON.stringify(currentBoards))
    return <ul className="flex flex-col gap-2">
        {Object.entries(currentBoards).map(([_, board]) => <li key={board.id} id={"" + board.id} className={"hover:bg-slate-700 border rounded-xl p-1 " + (selected == board.id ? "bg-slate-700" : "")}>
            <SingleBoard board={board} onEditOpenChange={(isOpen) => {
                if (isOpen) setSelected(board.id)
                else setSelected(null)
            }} />
        </li>)}
    </ul>
}
function SingleBoard({ board, onEditOpenChange }: { board: { id:string,title:string,validTill:string }, onEditOpenChange: (isOpen: boolean) => void }) {
    const { toast } = useToast()
    const [, deleteBoard] = useAtom(deleteBoardAtom)
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    useEffect(() => {
        onEditOpenChange(isOpen)
    }, [isOpen])
    return <>
        <div className="p-1 flex flex-row items-center justify-left" onClick={onOpen}>
            <div className="flex flex-row items-center justify-left gap-3 grow">
                <div className="text-xl">{board.title}</div>
            </div>
            <Button onClick={() => {
                deleteBoard({ id: board.id })
                    .then((resp) => {
                        toast({
                            title: 'Success',
                            description: resp.message,
                        })
                        return true
                    }).catch(e => {
                        toast({
                            title: 'Failure',
                            description: e.message,
                            variant: 'destructive'
                        })
                        return false
                    })
            }}>Delete</Button>
        </div>
        <ViewEdit board={board} isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
}