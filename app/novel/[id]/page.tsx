import { 
  getNovelById, 
  getTotalChaptersByNovelId, 
  getTotalChaptersFilledByNovelId, 
  getTotalTranslatedChaptersByNovelId 
} from "@/prisma/connector"
import { formatTitle } from "@/utils/strings"
import { Metadata } from "next"
import Image from "next/image"
import NovelSummary from "./NovelSummary"

interface NovelInfoPageProps {
  params: Promise<{id: string}>
}

export default async function NovelInfoPage(props: NovelInfoPageProps) {
  let {id} = await props.params
  // parce to int
  const novelId = parseInt(id)
  
  
  const novel = await getNovelById(novelId)

  if (!novel) {
    return <> Novel Does Not Exist </>
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