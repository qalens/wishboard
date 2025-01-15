import { getBaseURL } from "@/lib/helper";
export type CreateBoardPayload = { title:string,validTill:string }
export type UpdateBoardPayload = { id:string,title?:string,validTill?:string }
export async function createBoard(payload:CreateBoardPayload){
    const resp=await fetch(`${getBaseURL()}/board`,{
        method:'POST',
        body:JSON.stringify(payload)
    })
    if (resp.status==201){
        return (await resp.json())
    } else {
        const body =await resp.json()
        throw Error(body.message+" "+body.data)
    }
}
export async function updateBoard(payload:UpdateBoardPayload){
    const {id,...body}=payload
    const resp=await fetch(`${getBaseURL()}/board/${id}`,{
        method:'PATCH',
        body:JSON.stringify(body)
    })
    if (resp.status==200){
        return (await resp.json())
    } else {
        const body =await resp.json()
        throw Error(body.data)
    }
}
export async function getSingleBoard(id:string){
    const resp=await fetch(`${getBaseURL()}/board/${id}`)
    if (resp.status==200){
        return (await resp.json())
    } else {
        const body =await resp.json()
        throw Error(body.data)
    }
}
export async function deleteBoard(id:string){
    const resp=await fetch(`${getBaseURL()}/board/${id}`,{
        method:'DELETE'
    })
    if (resp.status==200){
        return (await resp.json())
    } else {
        const body =await resp.json()
        throw Error(body.data)
    }
}
export async function getAllBoards(token:string,q:string){
    const resp=await fetch(`${getBaseURL()}/board?q=${q}`,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
    const data=await resp.json()
    return data.data;
}