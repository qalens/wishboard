'use client'

import { getSingleBoard } from "@/services/board"
import { useEffect, useState } from "react"

export default function Board({ id }: { id: string }) {
    const [error, setError] = useState<string | null>(null)
    const [board, setBoard] = useState<null | any>(null)
    const [loading, setLoading] = useState<boolean>(true)
    useEffect(() => {
        getSingleBoard(id).then(resp => {
            setBoard(resp.data)
            setLoading(false)
        }).catch(e=>{
            setError(e.message)
            setLoading(false)
        })
    },[])
    return error ? <div>
        {error}
    </div> : (loading ? <div>Loading...</div> : (board ? 
    <div>
        <div>{board.title}</div>
        <div>Created By: {board.createdBy.username}</div>
    </div> : <></>))
}