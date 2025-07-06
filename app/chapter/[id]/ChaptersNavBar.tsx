import { chapter } from "@/app/generated/prisma";
import { ArrowLeft, ArrowRight, Menu } from "lucide-react";
import Link from "next/link";

interface ChaptersNavBarProps {
  chapter: chapter
  previousChapterId: null | number
  nextChapterId: null | number
}

export default function ChaptersnavBar({previousChapterId, nextChapterId, chapter}: ChaptersNavBarProps) {
  return <div className="flex p-4 bg-slate-950 items-centerm">
    <Link href={'/novel/' + chapter.novel_id} className="flex-none items-center flex">
      <Menu  />
    </Link>
    <div className="flex-1 justify-center flex flex-col mx-1">
      <p className="">
        Chapter: {chapter.chapter_number}
      </p>
    </div>
    {
      previousChapterId ? (
        <Link href={'/chapter/' + previousChapterId} className="p-1 m-1 rounded-md bg-blue-800">
          <ArrowLeft />
        </Link>
      ) : (
        <div className="p-1 m-1 rounded-md bg-slate-800">
          <ArrowLeft />
        </div>
      )
    }

    
    <span className="mx-1"/>

    {
      nextChapterId ? (
        <Link href={'/chapter/' + nextChapterId} className="p-1 m-1 rounded-md bg-blue-800">
          <ArrowRight />
        </Link>
      ) : (
        <div className="p-1 m-1 rounded-md bg-slate-800">
          <ArrowRight />
        </div>
      )
    }
  </div>
}