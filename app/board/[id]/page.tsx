import Board from "@/components/board/board";

export default function IndividualBoard({params:{id}}:{params:{id:string}}){
    return <Board id={id}/>
}