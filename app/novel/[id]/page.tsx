import { 
  getNovelById, 
  getTotalChaptersByNovelId, 
  getTotalChaptersFilledByNovelId, 
  getTotalTranslatedChaptersByNovelId 
} from "@/prisma/connector"
import { Metadata } from "next"
import NovelSummary from "./NovelSummary"
import ChapterList from "./ChapterList"
import { notFound } from "next/navigation"

interface NovelInfoPageProps {
  params: Promise<{id: string}> // this for the /novel/id
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> // this for the ?page=1...
}

export default async function NovelInfoPage({params, searchParams}: NovelInfoPageProps) {
  const {id} = await params
  // parce to int
  const novelId = parseInt(id)
  
  
  const novel = await getNovelById(novelId)

  if (!novel) {
    notFound()
  }

  // Start all three fetches *without* awaiting immediately
  const totalChaptersPromise = getTotalChaptersByNovelId(novelId);
  const totalFilledPromise = getTotalChaptersFilledByNovelId(novelId);
  const translatedChaptersPromise = getTotalTranslatedChaptersByNovelId(novelId);

  // Use Promise.all to wait for all promises to resolve concurrently
  const [totalChapters, totalFilled, translatedChapters] = await Promise.all([
    totalChaptersPromise,
    totalFilledPromise,
    translatedChaptersPromise,
  ]);

  return <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5 mx-auto lg:mx-8">
    {/* novel Cover */}
    <NovelSummary novel={novel} totalChapters={totalChapters} totalFilled={totalFilled} translatedChapters={translatedChapters} />

    {/* chapter list */}
    <div>
      <ChapterList novel={novel} totalChapters={totalChapters} searchParams={searchParams}/>
    </div>
  </div>
}

export const metadata: Metadata = {
  title: "Shadow UI",
  description: "Novel Summary",
  icons: {
    icon: "/icon_primary.jpg",
  }
};