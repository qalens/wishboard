'use client'
import { setBulkBoardsAtom } from "@/state/board";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useDisclosure } from "@nextui-org/modal";
import { useAtom } from "jotai";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import CreateBoardModal from "./board/create";
import Link from "next/link";
const SearchIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};
export default function Header({ q, boards }: { boards: any[], q: string }) {
  const [query, setQuery] = useState(q)
  const [, setBulkBoards] = useAtom(setBulkBoardsAtom)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  useEffect(() => {
    setBulkBoards({ boards })
  }, [boards])
  return <div className="flex flex-row gap-2 items-center justify-left">
    <Input className="grow"
      startContent={<SearchIcon />}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          redirect(`/board?q=${query}`)
        }
      }}
    />
    <Button color="primary" onPress={onOpen}>Add</Button>
    <Link
      color="danger"
      href="/logout" prefetch={false}>Logout</Link>
    <CreateBoardModal isOpen={isOpen} onOpenChange={onOpenChange} />
  </div>
}