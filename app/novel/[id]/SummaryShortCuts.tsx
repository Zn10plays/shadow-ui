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
                <button type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Read First
                </button>
            </Link>
            <span className="mx-1" />
            <Link href={'/chapter/' + nextChapterID} className="flex-1">
                <button type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Read Next
                </button>
            </Link>
        </span>
      </div>
}