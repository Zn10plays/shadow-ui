import { getFirstChapterIdByNovelId, getNextChapterByNovelIdAndUserId } from "@/prisma/connector"
import Link from "next/link"

interface SummaryShortcutsProps {
    novelId: number
}

export default async function SummaryShortcuts({ novelId }: SummaryShortcutsProps) {
    const [firstChapterID, nextChapterID] = await Promise.all([
        getFirstChapterIdByNovelId(novelId), 
        getNextChapterByNovelIdAndUserId(novelId)
    ])

    return <div className="my-2">
        <span className="flex">
            <Link href={'/chapter/' + firstChapterID} className="flex-1">
                <button type="button" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition">
                    Read First
                </button>
            </Link>
            <span className="mx-1" />
            <Link href={'/chapter/' + nextChapterID} className="flex-1">
                <button type="button" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition">
                    Read Next
                </button>
            </Link>
        </span>
      </div>
}