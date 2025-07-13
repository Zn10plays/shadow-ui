import { getChapterById, getChapterIdByNumberAndNovelId, getReleventTermsByChapterId } from "@/prisma/connector"
import { notFound } from "next/navigation"
import Orginizer from "./orginizer"
import ChaptersnavBar from "./ChaptersNavBar"
import dynamic from 'next/dynamic'

const DynamicTracker = dynamic(() => import('./Tracker'))

interface ChapterDispayProps {
  params: Promise<{id: string}> 
}

export default async function ChapterDispay({
  params
}: ChapterDispayProps) {
  const id = parseInt((await params).id)

  const [chapter, releventTerms ] = await Promise.all([getChapterById(id), getReleventTermsByChapterId(id)])

  if (!chapter) {
    notFound()
  }


  const [previousChapter, nextChapter] = await Promise.all([
    getChapterIdByNumberAndNovelId(chapter.novel_id, chapter.chapter_number - 1),
    getChapterIdByNumberAndNovelId(chapter.novel_id, chapter.chapter_number + 1)
  ])

  return <div>
    <div className="md:m-1" />
    <div className="container mx-auto bg-slate-900">
    <ChaptersnavBar chapter={chapter} nextChapterId={nextChapter} previousChapterId={previousChapter}/>
    {/* warning */}
    {
      !chapter.is_translated && (
        <div className="text-xl p-4">
          <span className="text-yellow-500"> Warning </span>
          <br />
          This chapter is not translated, however you can read the raw.
          <br />
          <span className="text-sm"> In order to request translation please login </span>
        </div>
      )
    }
    <Orginizer bibleInfo={releventTerms} chapter={chapter}/>
    {/* dynamically load tracker */}
    <DynamicTracker nextChapterId={nextChapter} chapterId={chapter.id} />
    <ChaptersnavBar chapter={chapter} nextChapterId={nextChapter} previousChapterId={previousChapter}/>
  </div>
  </div>
}