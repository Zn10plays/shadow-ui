import { novel } from "../generated/prisma";
import Image from "next/image";
import { formatTitle } from '@/utils/strings'
import { isNovelInBookshelf } from "@/prisma/connector";
import { getUser } from "@/utils/user";
import Link from "next/link";

interface ShowCaseItemProps {
  novel: novel
}

export default async function ShowCaseItem({novel}: ShowCaseItemProps) {
  const title = novel.title.includes('|') ? novel.title.split('|')[0] : novel.title;
  const user = await getUser();
  const is_bookshelfed = await isNovelInBookshelf(novel.id, parseInt(user.id))

  return <div className="w-full">
    <Link href={'/novel/' + novel.id}>
      <div className="relative w-full aspect-2/3">
        <Image src='/cover.png' alt="cover image" fill={true} className="object-fill rounded-md cursor-pointer"/>
        <div className="bottom-0 absolute bg-slate-950 opacity-75 rounded-t-md w-full">
          <p className="text-lg md:text-md overflow-hidden text-ellipsis hover:underline whitespace-nowrap font-semibold"> {formatTitle(title)} </p>
        </div>
        <div className="absolute right-0 bg-slate-950 cursor-pointer rounded-bl-md">
        {
          is_bookshelfed ? (
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m438-400 198-198-57-56-141 141-57-57-57 57 114 113ZM200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-7 md:w-7 lg:h-6 lg:w-6" viewBox="0 -960 960 960" fill="#e3e3e3"><path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/></svg>
          ) 
        }
        </div>
      </div>
    </Link>
  </div>
}
