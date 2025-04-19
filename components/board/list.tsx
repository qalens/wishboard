'use client'
import { deleteBoardAtom, setBulkBoardsAtom, boardsAtom } from "@/state/board";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { useDisclosure } from "@nextui-org/modal";
import { useAtom, useAtomValue } from "jotai";
import ViewEdit from "./viewedit";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import Link from "next/link";
import {EditRegular} from "@fluentui/react-icons"
export default function List() {
    const currentBoards = useAtomValue(boardsAtom)
    const [selected, setSelected] = useState<number | null>(null)
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
    const { isOpen, onOpen, onOpenChange } = useDisclosure()
    useEffect(() => {
        onEditOpenChange(isOpen)
    }, [isOpen])
    return <>
        <Link href={`/board/${board.id}`}className="p-1 flex flex-row items-center justify-left">
            <div className="flex flex-row items-center justify-left gap-3 grow">
                <div className="text-xl">{board.title}</div>
            </div>
            <EditRegular onClick={(e)=>{
                e.preventDefault()
                onOpen()
            }}/>
        </Link>
        <ViewEdit board={board} isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
}