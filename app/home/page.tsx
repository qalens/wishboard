import List from "@/components/board/list";
import Header from "@/components/header";
import { redirect } from 'next/navigation';
import { cookies } from "next/headers";
import { getAllBoardsForUser } from "../db/board";
import { getUserFromSession } from "../lib/session";
export default async function Board({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams
  const payload = await getUserFromSession()
  const boards = await getAllBoardsForUser(payload.userId as string)
  console.log("Boards ",boards)
  return (<>
    <Header boards={boards} q={q ? q : ''} />
    <div className="container mx-auto max-w-7xl p-6 flex-grow border my-2 rounded-xl ">
      <List />
    </div>
  </>
  );
}
