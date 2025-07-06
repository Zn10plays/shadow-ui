import { getChapterById } from "@/prisma/connector"
import { notFound } from "next/navigation"

interface ChapterDispayProps {
  params: Promise<{id: string}> 
}

export default async function ChapterDispay({
  params
}: ChapterDispayProps) {
  const id = parseInt((await params).id)

  const chapter = await getChapterById(id)

  if (!chapter) {
    notFound()
  }

  return <div className="max-w-[50rem] mx-auto">
    <p className={'text-sm text-slate-600 '+ (chapter.is_translated ? 'hidden' : '')}> Chapter is not translated, however you are able to read the raw </p>
    <h1 className="text-xl"> 
      {chapter.is_translated ? chapter.translated_title : chapter.title}
    </h1>
    <div>
      {(chapter.is_translated ? chapter.translated_content : chapter.content)?.split('\n').map((row, index) => (
        <p key={index}>
          {row}
        </p>
      ))}
    </div>
  </div>
}